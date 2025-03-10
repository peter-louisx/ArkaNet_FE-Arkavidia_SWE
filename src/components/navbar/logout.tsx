"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteSession } from "@/lib/session";
import { toast } from "sonner";

export default function Logout() {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        deleteSession();
        toast("Signed out successfully");
        router.push("/");
        router.refresh();
      }}
      className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
    >
      <span className="text-muted-foreground">
        <LogOut />
      </span>
      <span className="font-medium text-base">Sign Out</span>
    </div>
  );
}
