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
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/session";

type tParams = Promise<{ id: string }>;

export default async function Page(props: { params: tParams }) {
  const { id } = await props.params;

  const { isAuthenticated } = await verifySession();

  const job = await JobAPI.getJob(id)
    .then((res) => {
      const { success, message, data } = res.data;
      return data;
    })
    .catch((err) => {
      redirect("/404");
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
                    {isAuthenticated && <ApplyCard job={job} />}
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
