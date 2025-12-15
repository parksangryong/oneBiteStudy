import BookItem from "@/components/book-item";
import { BookData } from "@/types/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function SearchBooks({ q }: { q: string }) {
  await delay(3000);
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
        <Suspense fallback={<div>Loading...</div>}>
          <SearchBooks q={q || ""} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>에러가 발생했습니다.</div>;
  }
}
