import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Briefcase,
  Users,
  MessageSquare,
  Bell,
  ChevronDown,
  Search,
  User,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  return (
    <header className="border-b sticky top-0 z-10 bg-white">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <Link href="/" className="text-2xl font-bold text-primary">
            ArkaNet
          </Link>
          <div className="relative hidden md:block max-w-xl w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10 bg-muted/50"
              placeholder="Search for jobs, people, posts..."
            />
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          <NavItem icon={<Briefcase />} label="Jobs" />
          <NavItem icon={<Users />} label="Network" />
          <NavItem icon={<MessageSquare />} label="Messaging" />
          <NavItem icon={<Bell />} label="Notifications" />
          <div className="flex flex-col items-center px-3 py-1 hover:bg-muted rounded-md cursor-pointer">
            <div className="w-6 h-6 rounded-full bg-muted-foreground/20 overflow-hidden">
              <Image
                src="https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg"
                width={24}
                height={24}
                alt="Profile"
                className="object-cover"
              />
            </div>
            <div className="flex items-center text-xs">
              <span>Me</span>
              <ChevronDown className="h-3 w-3" />
            </div>
          </div>
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[80%] sm:w-[350px] p-0">
              <div className="flex flex-col h-full">
                {/* Mobile Sidebar Header */}
                <div className="border-b p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 overflow-hidden">
                      <Image
                        src="https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg"
                        width={48}
                        height={48}
                        alt="Profile"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">John Doe</h3>
                      <p className="text-sm text-muted-foreground">
                        View your profile
                      </p>
                    </div>
                  </div>
                </div>

                {/* Mobile Navigation Items */}
                <div className="flex-1 overflow-auto py-2">
                  <div className="px-2 space-y-1">
                    <MobileNavItem icon={<Briefcase />} label="Jobs" />
                    <MobileNavItem icon={<Users />} label="My Network" />
                    <MobileNavItem icon={<MessageSquare />} label="Messaging" />
                    <MobileNavItem icon={<Bell />} label="Notifications" />
                  </div>

                  <div className="mt-4 pt-4 border-t px-2">
                    <h4 className="px-3 text-sm font-medium text-muted-foreground mb-2">
                      Account
                    </h4>
                    <div className="space-y-1">
                      <MobileNavItem icon={<User />} label="View Profile" />
                      <MobileNavItem icon={<Settings />} label="Settings" />
                      <MobileNavItem icon={<LogOut />} label="Sign Out" />
                    </div>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center px-3 py-1 hover:bg-muted rounded-md cursor-pointer">
      {icon}
      <span className="text-xs">{label}</span>
    </div>
  );
}

function MobileNavItem({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href="#"
      className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted"
    >
      <div className="text-muted-foreground">{icon}</div>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
