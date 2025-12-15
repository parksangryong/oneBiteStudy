"use server";

import { revalidateTag } from "next/cache";
import { delay } from "@/util/delay";

export async function createReview(prevState: unknown, formData: FormData) {
  const id = formData.get("id");
  const content = formData.get("content");
  const author = formData.get("author");

  if (!id || !content || !author) {
    throw new Error("모든 필수 필드를 입력해주세요.");
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
      method: "POST",
      body: JSON.stringify({ bookId: id, content, author }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`review-${id}`, { expire: 0 });

    return { success: true, message: "리뷰가 작성되었습니다." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "리뷰 작성에 실패했습니다: " + error };
  }
}
