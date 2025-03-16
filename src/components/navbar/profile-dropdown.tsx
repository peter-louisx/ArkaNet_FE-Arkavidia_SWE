import Link from "next/link";
import { ChevronDown, Loader2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Logout from "./logout";
import { getUserCookie } from "@/lib/session";
import { GeneralProfile } from "@/types/seeker/types";
import { PROFILE_PICTURE, COMPANY_PICTURE } from "@/lib/image-placeholder";

export default async function Profile() {
  const user: GeneralProfile = await getUserCookie();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col items-center px-3 py-1 hover:bg-muted rounded-md cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-muted-foreground/20 overflow-hidden">
            <Avatar className="w-full h-full">
              <AvatarImage
                src={
                  user.profile_picture ||
                  (user.role === "user" ? PROFILE_PICTURE : COMPANY_PICTURE)
                }
                alt={user.name}
              />
              <AvatarFallback>
                <Loader2Icon className="h-4 w-4 animate-spin" />
              </AvatarFallback>
            </Avatar>
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
              <Avatar className="w-full h-full">
                <AvatarImage
                  src={
                    user.profile_picture ||
                    (user.role === "user" ? PROFILE_PICTURE : COMPANY_PICTURE)
                  }
                  alt="@shadcn"
                />
                <AvatarFallback>
                  {" "}
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                </AvatarFallback>
              </Avatar>
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
              href={
                user.role === "user"
                  ? "/seeker/" + user.slug
                  : "/company/" + user.slug
              }
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
