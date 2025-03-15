import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Briefcase,
  Clock,
  DollarSign,
  MapPin,
  Locate,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApplyCard } from "@/components/job/apply-card";
import { formatNumberCommas } from "@/lib/utils";
import { JobAPI } from "@/api/Job";

const jobDetails = {
  id: "1",
  title: "Senior Frontend Developer",
  company: "TechCorp Inc.",
  company_slug: "techcorp",
  logo: "/placeholder.svg?height=80&width=80",
  location: "San Francisco, CA",
  location_type: "onsite",
  type: "Full-time",
  min_salary: 120000,
  max_salary: 140000,
  posted: "2 days ago",
  description: `
      <p>TechCorp Inc. is looking for a Senior Frontend Developer to join our growing team. You will be responsible for building and maintaining user interfaces for our web applications.</p>
      
      <h3>Responsibilities:</h3>
      <ul>
        <li>Develop and implement user interface components using React.js and related technologies</li>
        <li>Optimize applications for maximum speed and scalability</li>
        <li>Collaborate with back-end developers and designers to improve usability</li>
        <li>Help maintain code quality, organization, and automatization</li>
        <li>Mentor junior developers and review code</li>
      </ul>
      
      <h3>Requirements:</h3>
      <ul>
        <li>5+ years of experience in frontend development</li>
        <li>Strong proficiency in JavaScript, including DOM manipulation and the JavaScript object model</li>
        <li>Thorough understanding of React.js and its core principles</li>
        <li>Experience with popular React.js workflows (such as Redux)</li>
        <li>Familiarity with newer specifications of ECMAScript</li>
        <li>Experience with data structure libraries (e.g., Immutable.js)</li>
        <li>Knowledge of isomorphic React is a plus</li>
        <li>Understanding of server-side rendering</li>
      </ul>
      
      <h3>Benefits:</h3>
      <ul>
        <li>Competitive salary and equity options</li>
        <li>Health, dental, and vision insurance</li>
        <li>401(k) with company match</li>
        <li>Flexible work hours and remote work options</li>
        <li>Professional development budget</li>
        <li>Paid time off and parental leave</li>
      </ul>
    `,
  skills: [
    "React",
    "TypeScript",
    "Next.js",
    "CSS",
    "Redux",
    "JavaScript",
    "HTML",
    "Git",
  ],
};

type tParams = Promise<{ id: string }>;

export default async function Page(props: { params: tParams }) {
  const { id } = await props.params;

  const job = await JobAPI.getJob(id).then((res) => {
    const { success, message, data } = res.data;
    return data;
  });

  return (
    <>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <Link
              href="/jobs"
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to job listings
            </Link>
          </div>

          <div className="w-full">
            {/* Main content - job details */}
            <div className="w-full space-y-6">
              {/* Job header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-md bg-muted overflow-hidden flex-shrink-0">
                      <Image
                        src={job.logo || "/placeholder.svg"}
                        width={64}
                        height={64}
                        alt={`${job.company} logo`}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold">{job.title}</h1>
                      <Link
                        href={`/company/${job.company_slug}`}
                        className="text-primary hover:underline"
                      >
                        {job.company}
                      </Link>

                      <div className="flex flex-wrap gap-y-2 gap-x-4 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Briefcase className="h-4 w-4 mr-1" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 mr-1" />
                          <span>
                            {formatNumberCommas(job.min_salary) +
                              " - " +
                              formatNumberCommas(job.max_salary)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Posted {job.posted}</span>
                        </div>
                        <div className="flex items-center">
                          <Locate className="h-4 w-4 mr-1" />
                          <span>{job.location_type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-6">
                    <ApplyCard job={job} />
                  </div>
                </CardContent>
              </Card>

              {/* Job description */}
              <Card>
                <CardHeader>
                  <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                  <CardDescription>
                    Required skills for this position
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
