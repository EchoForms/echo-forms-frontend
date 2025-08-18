"use client";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthCallback() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");
    if (token) {
      Cookies.set("auth_token", token, { expires: 7 });
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [params, router]);

  return <p>Signing you in...</p>;
} 