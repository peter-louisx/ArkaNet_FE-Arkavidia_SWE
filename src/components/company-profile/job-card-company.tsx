import { Card, CardContent, CardFooter } from "../ui/card";
import { formatNumberCommas } from "@/lib/utils";
import { countTimeAfterDate } from "@/lib/utils";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  SquareKanban,
  Locate,
  Users,
  Edit,
  Trash2,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export function JobCardCompany({
  job,
  onEdit,
  onDelete,
  onViewApplications,
  allowEdit,
}: {
  job: any;
  onEdit: () => void;
  onDelete: () => void;
  onViewApplications: () => void;
  allowEdit: boolean;
}) {
  return (
    <Card className="overflow-hidden hover:shadow-sm transition-shadow">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex items-start justify-between max-md:flex-col max-md:gap-4">
            <div>
              <h2 className="text-lg font-semibold">{job.title}</h2>

              <div className="flex flex-wrap gap-y-1 gap-x-4 mt-2 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{job.job_type}</span>
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
                  <SquareKanban className="h-4 w-4 mr-1" />
                  <span>{job.experience}</span>
                </div>
                <div className="flex items-center">
                  <Locate className="h-4 w-4 mr-1" />
                  <span>{job.location_type}</span>
                </div>
              </div>

              <p className="mt-3 text-sm line-clamp-2">{job.description}</p>

              <div className="flex flex-wrap gap-2 mt-3">
                {job.skills.map(
                  (skill: { id: string; skill_id: string; name: string }) => (
                    <Badge
                      key={skill.skill_id}
                      variant="secondary"
                      className="text-xs"
                    >
                      {skill.name}
                    </Badge>
                  )
                )}
              </div>
            </div>
            {allowEdit && (
              <div className="flex items-start gap-2">
                <Button variant="ghost" size="icon" onClick={onEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={onDelete}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 bg-muted/10 border-t max-md:flex-col max-md:gap-4">
        <div className="flex items-center text-sm">
          <Users className="h-4 w-4 mr-1 text-muted-foreground" />
          <span>
            {job.applications.length} application
            {job.applications.length !== 1 ? "s" : ""}
          </span>
        </div>
        {allowEdit && (
          <Button size="sm" onClick={onViewApplications}>
            View Applications
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
