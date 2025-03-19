"use client";

import { use } from "react";
import { useState, useRef, useEffect } from "react";
import { Loader2Icon, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import api from "@/api/api";
import { getUserCookie } from "@/lib/session";
import { showErrorToast } from "@/lib/show-toast";
import { ChatAPI } from "@/api/Chat";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { ChatContact, ChatMessage } from "@/types/chat/types";
import { GeneralProfile } from "@/types/seeker/types";

export default function Page({
  params,
}: {
  params: Promise<{ room: string }>;
}) {
  const { room } = use(params);
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const [userInfo, setUserInfo] = useState<GeneralProfile>({
    name: "",
    profile_picture: "",
    role: "",
    slug: "",
    current_title: "",
  });
  const [contact, setContact] = useState<ChatContact>({
    name: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  //   useEffect(() => {
  //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  //   }, [messages]);

  useEffect(() => {
    socketRef.current = new WebSocket(api.BASE_URL + `/ws/${room}`);

    socketRef.current.onopen = () => {
      console.log("Chat Established");
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);

      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socketRef.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      socketRef.current?.close();
    };
  }, [room]);

  const fetchUser = async () => {
    await getUserCookie().then((data) => {
      setUserInfo(data);
    });
  };

  const fetchMessages = async () => {
    await ChatAPI.getMessages(room)
      .then((res) => {
        const { success, message, data } = res.data;
        setMessages(data.messages);
        setContact({
          name: data.name,
          avatar: data.profile_picture,
        });
      })
      .catch((err) => {
        showErrorToast("Error fetching messages");
      });
  };

  useEffect(() => {
    Promise.all([fetchUser(), fetchMessages()]).then(() => {
      setLoading(false);
    });
  }, []);

  const sendMessage = async () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      const message = {
        message: newMessage,

        sender: userInfo.name,

        profile_picture: userInfo.profile_picture,
      };

      await ChatAPI.sendMessage({
        room_id: room,
        message: newMessage,
      })
        .then((res) => {
          socketRef.current?.send(JSON.stringify(message));
          setNewMessage("");
        })
        .catch((err) => {
          showErrorToast("Error sending message");
        });
    } else {
      showErrorToast("Error sending message");
    }
  };

  return (
    <div className=" bg-gray-50 flex flex-col min-h-[90vh]">
      {/* Messages */}

      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/chats" className="text-gray-500 hover:text-gray-700">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              {loading && <Loader2Icon className="h-5 w-5" />}

              {!loading && (
                <>
                  {" "}
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={contact.avatar} alt={contact.name} />
                    <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-semibold">{contact.name}</h2>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4 container">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-4">
            {messages.map((message, index) => {
              //   const isCurrentUser = message.senderId === currentUser.id;
              const isCurrentUser = message.sender == userInfo.name;
              return (
                <div
                  key={index}
                  className={`flex ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex gap-2 max-w-[70%]">
                    {!isCurrentUser && (
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarImage
                          src={message.profile_picture}
                          alt={message.sender}
                        />
                        <AvatarFallback>
                          {message.sender.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div
                        className={`rounded-lg p-3 ${
                          isCurrentUser
                            ? "bg-primary text-white"
                            : "bg-white border"
                        }`}
                      >
                        <p
                          className={`${
                            isCurrentUser ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {message.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-white sticky bottom-0 z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                className="pr-10 rounded-full"
              />
            </div>

            <Button
              size="icon"
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="rounded-full"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
