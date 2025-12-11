export default function WithSearchbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <input placeholder="검색어를 입력해주세요." />
      {children}
    </div>
  );
}
