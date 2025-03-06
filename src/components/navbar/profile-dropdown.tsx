import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronDown, LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function Profile() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="flex flex-col items-center px-3 py-1 hover:bg-muted rounded-md cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-muted-foreground/20 overflow-hidden">
            <Image
              src="https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg"
              width={24}
              height={24}
              alt="Profile"
              className="object-cover"
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
                src="https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg"
                width={40}
                height={40}
                alt="Profile"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <h3 className="font-semibold text-sm">John Doe</h3>
              <p className="text-xs text-muted-foreground">
                Software Developer
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-2">
            View Profile
          </Button>
        </div>

        <div className="py-2 border-t">
          <Link
            href="#"
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-muted"
          >
            <span className="text-muted-foreground">
              <LogOut className="h-4 w-4" />
            </span>
            <span>Sign Out</span>
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
