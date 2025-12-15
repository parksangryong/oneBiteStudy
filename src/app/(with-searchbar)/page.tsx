import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types/types";
import { Suspense } from "react";
import BookItemSkeleton from "@/components/book-item-skeleton";

export const dynamic = "force-dynamic";

async function AllBooks() {
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
        <Suspense
          key={Math.random() + Date.now()}
          fallback={new Array(3).fill(0).map((_, index) => (
            <BookItemSkeleton key={`reco-skeleton-${index}`} />
          ))}
        >
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense
          key={Math.random() + Date.now()}
          fallback={new Array(3).fill(0).map((_, index) => (
            <BookItemSkeleton key={`all-skeleton-${index}`} />
          ))}
        >
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
