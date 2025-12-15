"use client";

import { useActionState, useEffect, useRef } from "react";
import { deleteReview } from "@/actions/delete-review.action";

export default function DeleteReviewItemButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action, isPending] = useActionState(deleteReview, null);

  useEffect(() => {
    if (state && !state.success) {
      alert(state.message);
    }
  }, [state]);

  const onClickDelete = () => {
    if (!formRef.current) return;
    formRef.current.requestSubmit();
  };

  return (
    <form ref={formRef} action={action}>
      {isPending ? (
        <div>삭제중...</div>
      ) : (
        <div onClick={onClickDelete}>삭제하기</div>
      )}
      <input type="hidden" name="reviewId" value={reviewId} readOnly />
      <input type="hidden" name="bookId" value={bookId} readOnly />
    </form>
  );
}
