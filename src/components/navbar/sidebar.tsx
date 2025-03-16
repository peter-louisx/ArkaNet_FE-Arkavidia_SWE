import Link from "next/link";
import { Button } from "../ui/button";
import {
  Briefcase,
  Users,
  MessageSquare,
  Bell,
  User,
  Menu,
  Loader2Icon,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Logout from "./logout";
import { getUserCookie } from "@/lib/session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GeneralProfile } from "@/types/seeker/types";
import { PROFILE_PICTURE, COMPANY_PICTURE } from "@/lib/image-placeholder";

export default async function Sidebar({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const user: GeneralProfile = await getUserCookie();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
        <SheetTitle></SheetTitle>

        <div className="flex flex-col h-full">
          {/* Mobile Sidebar Header */}
          {isAuthenticated && (
            <div className="border-b p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 overflow-hidden">
                  <Avatar className="w-full h-full">
                    <AvatarImage
                      src={
                        user.profile_picture ||
                        (user.role === "user"
                          ? PROFILE_PICTURE
                          : COMPANY_PICTURE)
                      }
                      alt={user.name}
                    />
                    <AvatarFallback>
                      {" "}
                      <Loader2Icon className="h-8 w-8 animate-spin" />
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h3 className="font-semibold">{user.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {user.current_title}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Navigation Items */}
          <div className="flex-1 overflow-auto py-2">
            <div className="px-2 space-y-1">
              <MobileNavItem icon={<Briefcase />} label="Jobs" href="/jobs" />
              <MobileNavItem icon={<Users />} label="People" href="/people" />
              {isAuthenticated && (
                <>
                  {" "}
                  <MobileNavItem icon={<MessageSquare />} label="Messaging" />
                  <MobileNavItem icon={<Bell />} label="Notifications" />
                </>
              )}
            </div>

            <div className="mt-4 pt-4 border-t px-2">
              <h4 className="px-3 text-sm font-medium text-muted-foreground mb-2">
                Account
              </h4>
              <div className="space-y-1">
                {isAuthenticated && (
                  <>
                    <MobileNavItem
                      icon={<User />}
                      label="View Profile"
                      href={"/seeker/" + user.slug}
                    />
                    <Logout />
                  </>
                )}
                {!isAuthenticated && (
                  <div className="flex flex-col gap-3 justify-center items-center">
                    <div>
                      <h1>Login to view</h1>
                    </div>
                    <Link
                      href={"/seeker/login"}
                      className="bg-primary px-4 py-2 text-white rounded-md"
                    >
                      Login
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function MobileNavItem({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
}) {
  return (
    <Link
      href={href || "#"}
      className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
    >
      <div className="text-muted-foreground">{icon}</div>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
