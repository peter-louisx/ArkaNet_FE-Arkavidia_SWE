import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Page() {
  return (
    <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-20">
      <div className="container mx-auto px-14 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
            Login
          </h1>
          <div className="space-y-4 max-w-md">
            <div className="relative">
              <Input placeholder="Email or phone number" className="h-12" />
            </div>
            <div className="relative">
              <Input placeholder="Password" type="password" className="h-12" />
            </div>
            <div className="flex items-center justify-between">
              <Link
                href="#"
                className="text-sm text-primary font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Button className="w-full h-12 text-base">Sign in</Button>
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
