"use client";

import { Cloud, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ChatUserCard } from "@/components/chat/chat-user";
import { ChatAPI } from "@/api/Chat";
import { showErrorToast } from "@/lib/show-toast";

export default function Page() {
  const [chatRooms, setChatRooms] = useState<
    {
      id: string;
      name: string;
      profile_picture: string;
      type: string;
      slug: string;
    }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    ChatAPI.getRooms()
      .then((res) => {
        const { success, message, data } = res.data;

        setChatRooms(data);
        setLoading(false);
      })
      .catch((err) => {
        showErrorToast("Failed to fetch chat rooms");
        setLoading(false);
      });
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Search and filters */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Messages</h1>
          </div>
        </div>

        {/* Tabs and Applications List */}
        <Card>
          <div className="m-0">
            {loading && (
              <div className="p-8 text-center">
                <Cloud className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Loading chats</h3>
              </div>
            )}

            {!loading && (
              <div className="divide-y">
                {chatRooms.length === 0 ? (
                  <div className="p-8 text-center">
                    <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">No chats found</h3>
                  </div>
                ) : (
                  chatRooms.map((user) => (
                    <ChatUserCard key={user.id} user={user} />
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
