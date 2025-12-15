import { ReactNode } from "react";

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
      {children}
      {notification}
      {user}
    </div>
  );
}
