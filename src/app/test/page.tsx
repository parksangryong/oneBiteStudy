"use client";

import { useRef } from "react";
import { loginAction } from "./login.action";

export default function Page() {
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onClickLogin = async () => {
    if (!idRef.current || !passwordRef.current) return;

    const id = idRef.current.value;
    const password = passwordRef.current.value;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("password", password);
    await loginAction(formData);
  };

  return (
    <div>
      <input type="text" name="id" ref={idRef} />
      <input type="password" name="password" ref={passwordRef} />
      <button onClick={onClickLogin}>Login</button>
    </div>
  );
}
