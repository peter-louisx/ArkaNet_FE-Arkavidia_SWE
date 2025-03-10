"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserAPI } from "@/api/User";
import { setAuthToken } from "@/lib/session";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitLogin = async () => {
    await UserAPI.login({
      email,
      password,
    })
      .then((res) => {
        const { success, message, data } = res.data;
        setAuthToken(data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-20">
      <div className="container mx-auto px-14 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Login
          </h1>
          <div className="space-y-4 max-w-md">
            <div className="relative">
              <Input
                placeholder="Email or phone number"
                className="h-12"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="relative">
              <Input
                placeholder="Password"
                type="password"
                className="h-12"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <Button
              className="w-full h-12 text-base"
              onClick={() => {
                submitLogin();
              }}
            >
              Sign in
            </Button>
            <div className="relative flex items-center gap-4 py-2">
              <div className="flex-1 border-t"></div>
              <span className="text-muted-foreground text-sm">or</span>
              <div className="flex-1 border-t"></div>
            </div>
            <Button variant="outline" className="w-full h-12 text-base">
              Join now
            </Button>
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src="/login/login.svg"
            width={570}
            height={570}
            alt="Professional networking"
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
