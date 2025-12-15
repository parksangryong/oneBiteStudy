import { createReview } from "@/actions/review.action";
import style from "./review_editor.module.css";

export default function ReviewEditor({ id }: { id: string }) {
  return (
    <section className={style.container}>
      <form action={createReview}>
        <input type="hidden" name="id" value={id} readOnly />
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={style.submit_container}>
          <input required type="text" name="author" placeholder="작성자" />
          <button type="submit">작성하기</button>
        </div>
      </form>
    </section>
  );
}
