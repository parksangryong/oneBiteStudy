export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>검색 레이아웃 헤더</header>
      {children}
      <footer>검색 레이아웃 푸터</footer>
    </div>
  );
}
