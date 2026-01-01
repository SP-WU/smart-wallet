"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState("正在驗證中...");

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      setStatus("缺少 token，無法登入");
      return;
    }

    async function verify() {
      try {
        const res = await fetch("https://api.turnkey.com/v1/auth/magic-link/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            appId: "12041842", // 你的 Smart Wallet App ID
          }),
        });

        const data = await res.json();

        if (data.success) {
          setStatus("登入成功！");
          router.push("/wallet");
        } else {
          setStatus("登入失敗，請重新嘗試");
        }
      } catch (err) {
        setStatus("登入錯誤，請稍後再試");
      }
    }

    verify();
  }, [params, router]);

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>自救樂觀主義 Smart Wallet</h1>
      <p>{status}</p>
    </div>
  );
}