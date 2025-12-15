import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types/types";
import { Suspense } from "react";
import { delay } from "@/util/delay";

export const dynamic = "force-dynamic";

async function AllBooks() {
  await delay(3000);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book`, {
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={`reco-${book.id}`} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/random`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={`reco-${book.id}`} {...book} />
      ))}
    </div>
  );
}

export default async function Page() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<div>Loading...</div>}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<div>Loading...</div>}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
