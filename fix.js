const fs = require('fs');
const path = require('path');

function processDir(dir) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            processDir(fullPath);
        } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let original = content;
            
            // Remove conflicting Tailwind classes
            content = content.replace(/object-cover/g, '');
            content = content.replace(/object-center/g, '');
            // Clean up empty className
            content = content.replace(/className="\s+"/g, '');
            
            // Update <Image /> tags
            content = content.replace(/<Image([\s\S]*?)\/?>/g, (match, p1) => {
                let inner = p1;
                // Add fill if missing
                if (!/\bfill\b/.test(inner) && !/\bwidth=/.test(inner) && !/\bheight=/.test(inner)) {
                    inner += '\n        fill';
                }
                // Add or replace style
                if (/style={{/.test(inner)) {
                    inner = inner.replace(/style={{[^}]+}}/, `style={{ objectFit: 'contain' }}`);
                } else {
                    inner += `\n        style={{ objectFit: 'contain' }}`;
                }
                // Add or replace quality
                if (/quality=\{/.test(inner)) {
                    inner = inner.replace(/quality=\{[^}]+\}/, `quality={80}`);
                } else {
                    inner += `\n        quality={80}`;
                }
                return `<Image${inner} />`;
            });

            if (content !== original) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

// Ensure swcMinify and remove unoptimized
const configPath = path.join(__dirname, 'next.config.mjs');
if (fs.existsSync(configPath)) {
    let nextConfigContent = fs.readFileSync(configPath, 'utf8');
    nextConfigContent = nextConfigContent.replace(/images:\s*\{\s*unoptimized:\s*true,?\s*\},?/, '');
    if (!nextConfigContent.includes('swcMinify')) {
        nextConfigContent = nextConfigContent.replace(/(const nextConfig = \{)/, '$1\n  swcMinify: true,');
    }
    fs.writeFileSync(configPath, nextConfigContent, 'utf8');
    console.log('Fixed next.config.mjs');
} else {
    console.log('next.config.mjs not found');
}

processDir(path.join(__dirname, 'app'));
processDir(path.join(__dirname, 'components'));
