export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>설정 레이아웃 헤더</header>
      {children}
      <footer>설정 레이아웃 푸터</footer>
    </div>
  );
}
