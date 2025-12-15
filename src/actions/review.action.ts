"use server";

export async function createReview(formData: FormData) {
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
  } catch (error) {
    console.error(error);
  }
}
