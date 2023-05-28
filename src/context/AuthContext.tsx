"use client";
import type { AuthContextProps } from "@/types/global";
import { SessionProvider } from "next-auth/react";

export default function AuthContext({ children }: AuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
