"use client";

import Link from "next/link";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CompanyAPI } from "@/api/Company";
import { showErrorToast, showSuccessToast } from "@/lib/show-toast";
import { useState } from "react";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const router = useRouter();

  const formSchema: z.ZodSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    about: z.string(),
    industry: z.string().min(1),
    confirm_password: z
      .string()
      .min(6)
      .refine((data) => {
        return data === form.getValues().password;
      }, "Passwords do not match"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      about: "",
      industry: "",
      confirm_password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { name, email, password, about, industry } = values;
    setLoadingSubmit(true);

    await CompanyAPI.register({
      name,
      email,
      password,
      about,
      industry,
    })
      .then((res) => {
        showSuccessToast("Company registered successfully");
        router.push("/company/login");
      })
      .catch((err) => {
        showErrorToast("Company registration failed");
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  }

  return (
    <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-20">
      <div className="container mx-auto px-14 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Register
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 max-w-md"
            >
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your company name"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
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

              <div>
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

              <div>
                <FormField
                  control={form.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Re-enter your password"
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

              <div>
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>About</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your company"
                          className="h-12 bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Industry</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your industry"
                          className="h-12"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                className="w-full h-12 text-base cursor-pointer"
                type="submit"
                disabled={loadingSubmit}
              >
                {loadingSubmit ? <Loader2Icon className="animate-spin" /> : ""}
                Sign Up
              </Button>
              <div className="relative flex items-center gap-4 py-2">
                <div className="flex-1 border-t"></div>
                <span className="text-muted-foreground text-sm">or</span>
                <div className="flex-1 border-t"></div>
              </div>
              <Link
                href="/company/login"
                className="w-full h-12 text-base bg-white flex items-center justify-center rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
              >
                Already have an account? Sign in
              </Link>
              <Link
                href="/seeker/register"
                className="w-full h-12 text-base bg-white flex items-center justify-center rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
              >
                Register as a job seeker
              </Link>
            </form>
          </Form>
        </div>
        <div className="hidden md:block mb-10">
          <Image
            src="/login/company.svg"
            width={500}
            height={500}
            alt="Professional networking"
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
