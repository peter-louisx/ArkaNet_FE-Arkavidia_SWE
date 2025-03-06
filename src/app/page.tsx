import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, MessageSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-12 md:py-28">
        <div className="container mx-auto px-14 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900">
              Welcome to your professional community
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Connect with professionals, discover opportunities, and grow your
              career with the world's largest professional network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="bg-primary text-white px-8 py-3 rounded-lg"
              >
                Join Now
              </Link>
            </div>
          </div>
          <div className=" md:block">
            <Image
              src="/landing/hero.svg"
              width={570}
              height={570}
              alt="Professional networking"
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Connect to opportunities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Briefcase className="h-8 w-8 text-primary" />}
              title="Find the right job"
              description="Search for jobs that match your skills and interests."
            />
            <FeatureCard
              icon={<Users className="h-8 w-8 text-primary" />}
              title="Connect with people"
              description="Build your network with professionals in your industry."
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8 text-primary" />}
              title="Learn new skills"
              description="Discover courses to advance your career."
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Join your colleagues, classmates, and friends
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 overflow-hidden">
                    <Image
                      src={`https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg`}
                      width={48}
                      height={48}
                      alt={`User ${i}`}
                      className="object-cover h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">
                      Product Manager at TechCorp
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  "ArkaNet helped me connect with industry leaders and find my
                  dream job. The networking opportunities are invaluable."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="800M+" label="Members" />
            <StatCard number="58M+" label="Companies" />
            <StatCard number="120K+" label="Jobs posted" />
            <StatCard number="190+" label="Countries" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">
            Join your professional community
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Connect with professionals, stay informed with industry news, and
            find your next opportunity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="px-8">
              Join now
            </Button>

            <Button size="lg" variant="outline" className="px-8">
              Sign in
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-lg border bg-white hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div>
      <div className="text-3xl font-bold text-primary mb-2">{number}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  );
}
