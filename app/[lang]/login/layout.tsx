import type { Metadata } from "next";

// There is no authentication backend yet: keep this page out of search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
