import { UserList } from "@/types/user_search/types";
import { AvatarImage, Avatar, AvatarFallback } from "@/components/ui/avatar";
import { COMPANY_PICTURE, PROFILE_PICTURE } from "@/lib/image-placeholder";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UserCard({ People }: { People: UserList }) {
  return (
    <div
      key={People.id}
      className="border-1 shadow-sm p-5 max-md:px-1 rounded-lg flex flex-col justify-between items-center "
    >
      <div className="rounded-md overflow-hidden flex-shrink-0 ">
        <Avatar className="w-16 h-16">
          <AvatarImage
            width={100}
            height={100}
            src={
              People.profile_picture ||
              (People.type === "company" ? COMPANY_PICTURE : PROFILE_PICTURE)
            }
          />
          <AvatarFallback>
            <Loader2Icon className="h-4 w-4 animate-spin" />{" "}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className=" mt-2">
        <p className="font-semibold">{People.name}</p>
        <p className="text-sm text-gray-500">{People.headline}</p>
      </div>
      <Link
        href={
          People.type === "company"
            ? `/company/${People.slug}`
            : `/seeker/${People.slug}`
        }
        className="w-full px-2"
      >
        <Button className="w-full max-md:px-2 mt-2 rounded-full border-1 border-primary bg-white text-primary hover:bg-gray-100 cursor-pointer">
          View Profile
        </Button>
      </Link>
    </div>
  );
}
