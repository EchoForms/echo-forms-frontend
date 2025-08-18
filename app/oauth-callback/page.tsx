"use client";
import { Suspense } from "react";
import OAuthCallback from "./OAuthCallback";

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<div>Signing you in...</div>}>
      <OAuthCallback />
    </Suspense>
  );
} 