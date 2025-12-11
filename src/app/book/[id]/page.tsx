type Props = {
  params: Promise<{ id: string }>;
};

export default async function BookPage(props: Props) {
  const { id } = await props.params;
  return <h1>책 페이지: {id}</h1>;
}
