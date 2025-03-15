import Link from "next/link";
import Image from "next/image";
import { ChevronDown, LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Logout from "./logout";
import { getUserCookie } from "@/lib/session";

export default async function Profile() {
  const user = await getUserCookie();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col items-center px-3 py-1 hover:bg-muted rounded-md cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-muted-foreground/20 overflow-hidden">
            <Image
              src={user.profile_picture || "./avatar.png"}
              width={24}
              height={24}
              alt="Profile"
              className="object-cover h-full"
              priority
            />
          </div>
          <div className="flex items-center text-xs">
            <span>Me</span>
            <ChevronDown className="h-3 w-3" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-56 p-0" align="end">
        <div className="p-3 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 overflow-hidden">
              <Image
                src={user.profile_picture || "./avatar.png"}
                width={40}
                height={40}
                alt="Profile"
                className="object-cover h-full"
                priority
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm">{user.name}</h3>
              <p className="text-xs text-muted-foreground">
                {user.current_title}
              </p>
            </div>
          </div>
          <div className="mt-2 flex justify-center px-2">
            <Link
              href={"/seeker/" + user.slug}
              className="w-full mt-2 border rounded-md p-1 text-md text-center shadow-sm hover:bg-muted bg-white"
            >
              View Profile
            </Link>
          </div>
        </div>

        <div className="py-2 border-t">
          <Logout />
        </div>
      </PopoverContent>
    </Popover>
  );
}
