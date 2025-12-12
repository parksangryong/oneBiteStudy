"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WithSearchbarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [input, setInput] = useState("");

  const handleSearch = () => {
    router.push(`/search?q=${input}`);
  };

  return (
    <div>
      <input
        placeholder="검색어를 입력해주세요."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>검색</button>
      {children}
    </div>
  );
}
