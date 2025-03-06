import Link from "next/link";
import { LogOut } from "lucide-react";
export default function Logout() {
  return (
    <Link
      href="#"
      className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
    >
      <span className="text-muted-foreground">
        <LogOut />
      </span>
      <span className="font-medium text-base">Sign Out</span>
    </Link>
  );
}
