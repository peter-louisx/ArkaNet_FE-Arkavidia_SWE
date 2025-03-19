"use client";

import { Bell, Cloud, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

import { showErrorToast } from "@/lib/show-toast";
import { Notification } from "@/types/notification/types";
import { NotificationCard } from "@/components/notification/notification-card";
import { NotificationAPI } from "@/api/Notification";

export default function Page() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchNotifications = async () => {
    await NotificationAPI.getNotifications()
      .then((response) => {
        const { success, message, data } = response.data;
        setNotifications(data);
      })
      .catch((error) => {
        showErrorToast(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Search and filters */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Notifications</h1>
          </div>
        </div>

        {/* Tabs and Applications List */}
        <Card>
          <div className="m-0">
            {loading && (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  Loading notifications
                </h3>
              </div>
            )}

            {!loading && (
              <div className="divide-y">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No notifications found
                    </h3>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                    />
                  ))
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}
