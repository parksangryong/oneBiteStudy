"use server";

import { revalidateTag } from "next/cache";

export async function deleteReview(prevState: unknown, formData: FormData) {
  const reviewId = formData.get("reviewId");
  const bookId = formData.get("bookId");

  if (!reviewId) {
    return { success: false, message: "삭제할 리뷰가 없습니다." };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/review/${reviewId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    revalidateTag(`review-${bookId}`, { expire: 0 });

    return { success: true, message: "리뷰가 삭제되었습니다." };
  } catch (error) {
    return { success: false, message: "리뷰 삭제에 실패했습니다: " + error };
  }
}
