import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "lucide-react";

export function ApplicationCard({
  application,
  changeApplicationStatus,
}: {
  application: any;
  changeApplicationStatus: (applicationId: number, status: string) => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Under Review":
        return "bg-blue-100 text-blue-800";
      case "Interview Scheduled":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Link
            href={"/seeker/fdasfds"}
            className="w-12 h-12 rounded-full bg-muted overflow-hidden flex-shrink-0"
          >
            <Image
              src={application.applicant.photo || "/placeholder.svg"}
              width={48}
              height={48}
              alt={application.applicant.name}
              className="object-cover h-full"
            />
          </Link>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{application.applicant.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {application.applicant.title}
                </p>
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  application.status
                )}`}
              >
                {application.status}
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                Applied on {new Date(application.date).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-4 bg-muted/10 border-t">
        <div className="flex gap-2">
          <Select
            defaultValue={application.status}
            // onValueChange={(value) => {
            //   changeApplicationStatus(application.id, value);
            // }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Under Review">Under Review</SelectItem>
              <SelectItem value="Interview Scheduled">
                Interview Scheduled
              </SelectItem>
              <SelectItem value="Rejected">Rejected</SelectItem>
              <SelectItem value="Hired">Hired</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm">Contact</Button>
        </div>
      </CardFooter>
    </Card>
  );
}
