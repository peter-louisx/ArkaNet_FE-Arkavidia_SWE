import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, MessageSquare } from "lucide-react";
import Link from "next/link";

const testimonials = [
  {
    name: "Sarah Johnson",
    title: "Product Manager at TechCorp",
    avatar:
      "https://img.freepik.com/free-photo/portrait-happy-asian-woman-smiling-posing-confident-cross-arms-chest-standing-against-studio-background_1258-89269.jpg?t=st=1742486823~exp=1742490423~hmac=c449c6c662923a29e1a25b67f4f1e7947b5a480017f72e7b9d8bdd8f987ffebb&w=1380",
    message:
      "ArkaNet helped me connect with industry leaders and find my dream job. The networking opportunities are invaluable.",
  },
  {
    name: "John Smith",
    title: "Software Engineer at DevWorks",
    avatar:
      "https://img.freepik.com/free-photo/portrait-smiling-young-man_23-2149393640.jpg",
    message:
      "Thanks to ArkaNet, I was able to expand my professional network and land a great job in my field.",
  },
  {
    name: "Emily Davis",
    title: "Marketing Specialist at MarketGuru",
    avatar:
      "https://img.freepik.com/free-photo/lifestyle-people-emotions-casual-concept-confident-nice-smiling-asian-woman-cross-arms-chest-confident-ready-help-listening-coworkers-taking-part-conversation_1258-59335.jpg?t=st=1742486942~exp=1742490542~hmac=9d74ef74de9c9f58daaf49d3ffd579297b9178a9d9e957a231e123ef03975720&w=1380",
    message:
      "ArkaNet is a fantastic platform for connecting with professionals and discovering new career opportunities.",
  },
];

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
            <div className="flex flex-col max-md:justify-center sm:flex-row gap-4">
              <Link
                href="/seeker/login"
                className="bg-primary text-white px-8 py-3 rounded-lg text-center"
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
          <div className="grid md:grid-cols-2 gap-8 px-24 max-md:px-0 ">
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
            {testimonials.map((testimonial, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      width={48}
                      height={48}
                      alt={`User ${i}`}
                      className="object-cover h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.message}</p>
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
            <Link href="/seeker/register">
              <Button size="lg" className="px-8">
                Join now
              </Button>
            </Link>

            <Link href="/seeker/login">
              <Button size="lg" variant="outline" className="px-8">
                Sign in
              </Button>
            </Link>
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
