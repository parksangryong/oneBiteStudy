import "./globals.css";
import "@fontsource/noto-sans-kr"; // Defaults to weight 400
import "@fontsource/noto-sans-kr/400.css";

import Link from "next/link";
import style from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <footer>제작 @winterload</footer>
        </div>
      </body>
    </html>
  );
}
