import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="bg-gray-800 text-white p-4 flex gap-4">
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
          <Link href="/profiles">Profiles</Link>
          <Link href="/admin/profiles">Admin Profiles</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
