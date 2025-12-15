"use client";

import { useEffect } from "react";
import { createReview } from "@/actions/review.action";
import { useActionState } from "react";
import style from "./review_editor.module.css";

export default function ReviewEditor({ id }: { id: string }) {
  const [state, action, isPending] = useActionState(createReview, null);

  useEffect(() => {
    if (state && !state.success) {
      alert(state.message);
    }
  }, [state]);

  return (
    <section className={style.container}>
      <form action={action}>
        <input type="hidden" name="id" value={id} readOnly />
        <textarea
          required
          name="content"
          placeholder="리뷰 내용"
          disabled={isPending}
        />
        <div className={style.submit_container}>
          <input
            required
            type="text"
            name="author"
            placeholder="작성자"
            disabled={isPending}
          />
          <button type="submit" disabled={isPending}>
            작성하기
          </button>
        </div>
      </form>
    </section>
  );
}
