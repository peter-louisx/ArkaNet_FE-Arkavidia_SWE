"use client";

import { Applicant } from "@/types/applicant/types";
import { Mail, MoreVertical, Calendar, Paperclip, Cloud } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statusConfig } from "@/lib/applicant-status";
import { COMPANY_PICTURE, PROFILE_PICTURE } from "@/lib/image-placeholder";
import { ChatAPI } from "@/api/Chat";
import { showErrorToast } from "@/lib/show-toast";
import { useRouter } from "next/navigation";

export function ChatUserCard({
  user,
}: {
  user: {
    id: string;
    name: string;
    profile_picture: string;
    type: string;
    slug: string;
  };
}) {
  const router = useRouter();

  const getChatRoom = async () => {
    await ChatAPI.getChatRoom(user.id)
      .then((res) => {
        const { success, message, data } = res.data;
        if (success) {
          router.push(`/chat/${data.id}`);
        }
      })
      .catch((err) => {
        showErrorToast("Failed to fetch chat room");
      });
  };

  return (
    <div key={user.id} className="p-4 hover:bg-gray-50">
      <div className="flex items-start gap-4">
        <Link
          href={
            user.type === "user"
              ? `/seeker/${user.slug}`
              : `/company/${user.slug}`
          }
        >
          <Avatar className="h-10 w-10">
            <AvatarImage
              src={
                user.profile_picture ||
                (user.type === "user" ? PROFILE_PICTURE : COMPANY_PICTURE)
              }
              alt={user.name}
            />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{user.name}</h3>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <Button
            size="sm"
            variant="outline"
            className="ml-4"
            onClick={getChatRoom}
          >
            <Cloud className="h-4 w-4 " />
            Chat
          </Button>
        </div>
      </div>
    </div>
  );
}
