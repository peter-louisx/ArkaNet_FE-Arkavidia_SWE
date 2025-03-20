"use client";

import {
  Briefcase,
  Clock,
  DollarSign,
  KanbanSquare,
  Locate,
  Loader2Icon,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { countTimeAfterDate, formatNumberCommas } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Job } from "@/types/job/types";
import { COMPANY_PICTURE } from "@/lib/image-placeholder";

export default function JobCard({ job }: { job: Job }) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start gap-4 max-md:flex-col">
            <Link
              href={"/company/" + job.company_slug}
              className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center"
            >
              <Avatar className="w-full h-full">
                <AvatarImage
                  src={job.logo || COMPANY_PICTURE}
                  alt={job.company}
                />
                <AvatarFallback>
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold line-clamp-1">
                    {job.title}
                  </h2>
                  <p className="text-muted-foreground">{job.company}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-y-1 gap-x-4 mt-2 text-sm text-muted-foreground">
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
                  <span>{countTimeAfterDate(job.posted)}</span>
                </div>
                <div className="flex items-center">
                  <KanbanSquare className="h-4 w-4 mr-1" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center">
                  <Locate className="h-4 w-4 mr-1" />
                  <span>{job.location_type}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end  bg-muted/10 ">
        <Link href={"/job/" + job.id}>
          <Button size="sm" className={"opacity-80"}>
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
