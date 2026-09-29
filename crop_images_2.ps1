Add-Type -AssemblyName System.Drawing

function Crop-Image {
    param(
        [string]$InputPath,
        [string]$OutputPath,
        [int]$X,
        [int]$Y,
        [int]$Width,
        [int]$Height
    )
    $src = [System.Drawing.Image]::FromFile($InputPath)
    $rect = New-Object System.Drawing.Rectangle($X, $Y, $Width, $Height)
    $bmp = ([System.Drawing.Bitmap]$src).Clone($rect, $src.PixelFormat)
    $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    $src.Dispose()
    Write-Host "Cropped: $OutputPath ($Width x $Height)"
}

$mediaDir = "C:\Users\danyl\.gemini\antigravity\brain\179798ab-268b-4fc7-9e19-acd91a8636d2"
$outDir = "c:\Users\danyl\Downloads\mainsteel-robotics\public\images"

$cropX = 58
$cropY = 76
$cropW = 344
$cropH = 340

# 1. Montacargas Compacto
Crop-Image "$mediaDir\media__1786982517106.png" "$outDir\producto-montacargas-compacto.png" $cropX $cropY $cropW $cropH

# 2. Dobladora de alambre
Crop-Image "$mediaDir\media__1786982841425.png" "$outDir\producto-dobladora-alambre.png" $cropX $cropY $cropW $cropH

# 3. Paneladora
Crop-Image "$mediaDir\media__1786982892686.png" "$outDir\producto-paneladora.png" $cropX $cropY $cropW $cropH

# 4. Dobladora de lamina
Crop-Image "$mediaDir\media__1786982925937.png" "$outDir\producto-dobladora-lamina.png" $cropX $cropY $cropW $cropH

# 5. Robot corte laser
Crop-Image "$mediaDir\media__1786983079201.png" "$outDir\producto-robot-corte-laser.png" $cropX $cropY $cropW $cropH

Write-Host "All images cropped successfully!"
