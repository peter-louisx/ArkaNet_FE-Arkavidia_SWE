"use client";

import { BookMarked, Briefcase, Cloud, CloudAlert } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { COMPANY_PICTURE, PROFILE_PICTURE } from "@/lib/image-placeholder";
import { ChatAPI } from "@/api/Chat";
import { showErrorToast } from "@/lib/show-toast";
import { useRouter } from "next/navigation";
import { ChatRoom } from "@/types/chat/types";
import { Notification } from "@/types/notification/types";

export function NotificationCard({
  notification,
}: {
  notification: Notification;
}) {
  //   const readNotification = async () => {
  //     await NotificationAPI.readNotification(notification.id)
  //       .then((response) => {
  //         const { success, message, data } = response.data;
  //         if (success) {
  //           fetchNotifications();
  //         }
  //       })
  //       .catch((error) => {
  //         showErrorToast(error);
  //       });
  //   }

  return (
    <div className="p-4 hover:bg-gray-50">
      <div className="flex items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-5">
            {notification.notification_type == "Message" && (
              <Cloud className="h-8 w-8 text-blue-500" />
            )}
            {notification.notification_type == "Job Application" && (
              <Briefcase className="h-8 w-8 text-blue-500" />
            )}
            <div>
              <h3 className="font-medium text-gray-900">
                {notification.title}
              </h3>
              <p className="text-sm text-gray-500">{notification.message}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          {/* <Button size="sm" variant="outline" className="ml-4">
            <BookMarked className="h-4 w-4 " />
            Mark as read
          </Button> */}
        </div>
      </div>
    </div>
  );
}
