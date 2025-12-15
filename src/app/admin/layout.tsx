import { ReactNode } from "react";
import Link from "next/link";

export default function Layout({
  children,
  notification,
  user,
}: {
  children: ReactNode;
  notification: ReactNode;
  user: ReactNode;
}) {
  return (
    <div>
      <header style={{ display: "flex", gap: "10px" }}>
        <Link href="/admin" style={{ color: "blue" }}>
          Admin
        </Link>
        <Link href="/admin/archived" style={{ color: "blue" }}>
          Archived
        </Link>
      </header>
      {children}
      {notification}
      {user}
    </div>
  );
}
