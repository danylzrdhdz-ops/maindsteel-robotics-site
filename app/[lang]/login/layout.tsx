import type { Metadata } from "next";
import { notFound } from "next/navigation";

// There is no authentication backend yet. A login form that does nothing can
// get the domain flagged as phishing, so the route returns 404 until a real
// auth system exists and ENABLE_LOGIN=true is set.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  if (process.env.ENABLE_LOGIN !== "true") notFound();
  return children;
}
