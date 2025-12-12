import ClientComponent from "../client-component";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage(props: Props) {
  const { q } = await props.searchParams;
  return (
    <ClientComponent>
      <h1>검색 페이지: {q}</h1>
    </ClientComponent>
  );
}
