"use client";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();
  return (
    <div>
      <h1>HomePage</h1>
      {user ? <p>{user.name}</p> : <p>Please login</p>}

      {user ? (
        <Button onClick={clearAuth}>logout</Button>
      ) : (
        <Button onClick={() => router.push("/login")}>login</Button>
      )}
    </div>
  );
}
