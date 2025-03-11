"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserAPI } from "@/api/User";
import { setAuthToken } from "@/lib/session";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function Page() {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;

    await UserAPI.login({
      email,
      password,
    })
      .then((res) => {
        const { success, message, data } = res.data;
        setAuthToken(data.token);
        toast("Login successful");
      })
      .catch((err) => {
        toast("Login failed. Please check your credentials");
      });
  }

  return (
    <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-20">
      <div className="container mx-auto px-14 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Login
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 max-w-md"
            >
              <div className="relative">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="relative">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          className="h-12"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button className="w-full h-12 text-base" type="submit">
                Sign in
              </Button>
              <div className="relative flex items-center gap-4 py-2">
                <div className="flex-1 border-t"></div>
                <span className="text-muted-foreground text-sm">or</span>
                <div className="flex-1 border-t"></div>
              </div>
              <Link
                href="/register"
                type="button"
                className="w-full h-12 text-base bg-white flex items-center justify-center rounded-lg shadow-sm"
              >
                Join now
              </Link>
            </form>
          </Form>
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
