import { revalidateTag } from "next/cache";

export async function GET() {
  await revalidateTag("random-books", "default");

  return new Response("random-books 태그가 리밸리드되었습니다.");
}
