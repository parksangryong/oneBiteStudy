import style from "./page.module.css";
import { BookData, ReviewData } from "@/types/types";
import ReviewEditor from "@/components/review_editor";
import ReviewItem from "@/components/review-item";

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const books: BookData[] = await response.json();
  return books.map((book) => ({ id: book.id.toString() }));
}

export const dynamicParams = false;

async function BookDetail({ id }: { id: string }) {
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
  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section>
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
    </section>
  );
}

async function ReviewList({ id }: { id: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/review/book/${id}`,
    {
      next: {
        tags: [`review-${id}`],
      },
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={review.id} {...review} />
      ))}
    </section>
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className={style.container}>
      <BookDetail id={id} />
      <ReviewEditor id={id} />
      <ReviewList id={id} />
    </div>
  );
}
