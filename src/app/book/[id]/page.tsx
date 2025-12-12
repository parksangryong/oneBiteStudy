import style from "./page.module.css";
import { BookData } from "@/types/types";

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const books: BookData[] = await response.json();
  return books.map((book) => ({ id: book.id.toString() }));
}

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/book/${id}`,
      {
        cache: "force-cache",
      }
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const book: BookData = await response.json();
    const { title, subTitle, description, author, publisher, coverImgUrl } =
      book;

    return (
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>에러가 발생했습니다.</div>;
  }
}
