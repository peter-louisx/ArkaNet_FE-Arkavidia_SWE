import { Applicant } from "@/types/applicant/types";
import { Mail, MoreVertical, Calendar, Paperclip } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { statusConfig } from "@/lib/applicant-status";

export function ApplicantCard({ applicant }: { applicant: Applicant }) {
  return (
    <div key={applicant.id} className="p-4 hover:bg-gray-50">
      <div className="flex items-start gap-4">
        <Link href={`/seeker/${applicant.slug}`}>
          <Avatar className="h-10 w-10">
            <AvatarImage src={applicant.profile_picture} alt={applicant.name} />
            <AvatarFallback>{applicant.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{applicant.name}</h3>
              <p className="text-sm text-gray-500">{applicant.headline}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={`${
                  statusConfig.find(
                    (status) => status.name === applicant.status
                  )?.color
                }`}
              >
                {applicant.status}
              </Badge>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {statusConfig.map((status) => (
                    <DropdownMenuItem key={status.name}>
                      {status.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Applied {applicant.applied_at}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <Button size="sm" variant="outline" className="ml-4">
            <Mail className="h-4 w-4 mr-2" />
            Contact
          </Button>

          <Link href={applicant.resume_url} target="_blank">
            <Button size="sm" variant="outline" className="mt-2 ml-4">
              <Paperclip className="h-4 w-4 mr-2" />
              Resume
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
