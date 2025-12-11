type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage(props: Props) {
  console.log(props);
  const { q } = await props.searchParams;
  return <h1>검색 페이지: {q}</h1>;
}
