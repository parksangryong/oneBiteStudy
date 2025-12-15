import BookItem from "@/components/book-item";
import BookItemSkeleton from "@/components/book-item-skeleton";
import { BookData } from "@/types/types";
import { Suspense } from "react";

async function SearchBooks({ q }: { q: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/book/search?q=${q}`,
    {
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const books: BookData[] = await response.json();
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
  }>;
}) {
  try {
    const { q } = await searchParams;

    return (
      <div>
        <Suspense
          key={Math.random() + Date.now()}
          fallback={new Array(3).fill(0).map((_, index) => (
            <BookItemSkeleton key={`search-skeleton-${index}`} />
          ))}
        >
          <SearchBooks q={q || ""} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>에러가 발생했습니다.</div>;
  }
}
