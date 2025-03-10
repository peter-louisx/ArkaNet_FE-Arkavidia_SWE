"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Briefcase,
  Calendar,
  Clock,
  DollarSign,
  Edit,
  Locate,
  MapPin,
  Plus,
  Search,
  SquareKanban,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { experienceLevels, jobTypes, locationTypes } from "@/lib/jobs-filters";

export default function CompanyJobs({
  jobsData,
  allowEdit = false,
}: {
  jobsData: {
    id: number;
    title: string;
    location: string;
    type: string;
    experience: string;
    salary: string;
    posted: string;
    description: string;
    skills: string[];
    applications: {
      id: number;
      jobId: number;
      applicant: {
        name: string;
        title: string;
        photo: string;
      };
      date: string;
      status: string;
    }[];
  }[];
  allowEdit?: boolean;
}) {
  // Jobs state
  const [jobs, setJobs] = useState(jobsData);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [currentJob, setCurrentJob] = useState<any>(null);
  const [jobSearch, setJobSearch] = useState("");
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [showApplications, setShowApplications] = useState(false);

  // Add this with the other state variables
  const [newSkillName, setNewSkillName] = useState("");

  // Filter jobs based on search
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.location.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.description.toLowerCase().includes(jobSearch.toLowerCase())
  );

  // Get applications for selected job
  const jobApplications =
    jobs.find((job) => job.id === selectedJobId)?.applications || [];

  // Job Handlers
  const addNewJob = () => {
    setCurrentJob({
      id: Date.now(),
      title: "",
      location: "",
      type: "Full-time",
      salary: "",
      posted: "Just now",
      description: "",
      skills: [],
      isRemote: false,
      applications: 0,
    });
    setIsEditingJob(true);
  };

  const editJob = (job: any) => {
    setCurrentJob({ ...job });
    setIsEditingJob(true);
  };

  const saveJob = () => {
    if (jobs.find((job) => job.id === currentJob.id)) {
      setJobs(jobs.map((job) => (job.id === currentJob.id ? currentJob : job)));
    } else {
      setJobs([...jobs, currentJob]);
    }
    setIsEditingJob(false);
  };

  const deleteJob = (id: number) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const viewApplications = (jobId: number) => {
    setSelectedJobId(jobId);
    setShowApplications(true);
  };

  // Add this with the other functions
  const addSkill = () => {
    if (
      newSkillName.trim() &&
      !currentJob.skills.some(
        (skill: string) =>
          skill.toLowerCase() === newSkillName.trim().toLowerCase()
      )
    ) {
      setCurrentJob({
        ...currentJob,
        skills: [...currentJob.skills, newSkillName.trim()],
      });
      setNewSkillName("");
    }
  };

  const changeApplicationStatus = (applicationId: number, status: string) => {
    setJobs(
      jobs.map((job) => ({
        ...job,
        applications: job.applications.map((app: any) => ({
          ...app,
          status: app.id === applicationId ? status : app.status,
        })),
      }))
    );
  };

  return (
    <>
      {/* Jobs */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Jobs</CardTitle>
          </div>
          {allowEdit && (
            <Button onClick={addNewJob} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Job
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and filter */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                className="pl-10"
                placeholder="Search jobs by title, location, or description"
                value={jobSearch}
                onChange={(e) => setJobSearch(e.target.value)}
              />
            </div>

            {/* Job listings */}
            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-8">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                  <p className="text-muted-foreground mb-4">
                    {jobs.length === 0
                      ? "You haven't posted any jobs yet."
                      : "No jobs match your search criteria."}
                  </p>
                  {jobs.length === 0 && (
                    <Button onClick={addNewJob}>
                      <Plus className="h-4 w-4 mr-2" />
                      Post Your First Job
                    </Button>
                  )}
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={() => editJob(job)}
                    onDelete={() => deleteJob(job.id)}
                    onViewApplications={() => viewApplications(job.id)}
                    allowEdit={allowEdit}
                  />
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {allowEdit && (
        <>
          {" "}
          {/* Job Edit Dialog */}
          <Dialog open={isEditingJob} onOpenChange={setIsEditingJob}>
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>
                  {currentJob?.id ? "Edit Job" : "Add Job"}
                </DialogTitle>
                <DialogDescription>
                  Create or update job listing details
                </DialogDescription>
              </DialogHeader>
              {currentJob && (
                <div className="grid gap-4 py-4 overflow-y-auto pr-4 pl-2">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={currentJob.title}
                      onChange={(e) =>
                        setCurrentJob({ ...currentJob, title: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={currentJob.location}
                      onChange={(e) =>
                        setCurrentJob({
                          ...currentJob,
                          location: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2 ">
                    <Label htmlFor="type">Job Type</Label>
                    <Select
                      value={currentJob.type}
                      onValueChange={(value) =>
                        setCurrentJob({ ...currentJob, type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select job type" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 ">
                    <Label htmlFor="type">Location Type</Label>
                    <Select
                      value={currentJob.location_type}
                      onValueChange={(value) =>
                        setCurrentJob({ ...currentJob, location_type: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a location type" />
                      </SelectTrigger>
                      <SelectContent>
                        {locationTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2 ">
                    <Label htmlFor="type">Experience Level</Label>
                    <Select
                      value={currentJob.experience}
                      onValueChange={(value) =>
                        setCurrentJob({ ...currentJob, experience: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="salary">Salary Range</Label>
                    <Input
                      id="salary"
                      value={currentJob.salary}
                      onChange={(e) =>
                        setCurrentJob({ ...currentJob, salary: e.target.value })
                      }
                      placeholder="e.g., $80,000 - $100,000"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Job Description</Label>
                    <Textarea
                      id="description"
                      value={currentJob.description}
                      onChange={(e) =>
                        setCurrentJob({
                          ...currentJob,
                          description: e.target.value,
                        })
                      }
                      className="min-h-[150px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="skills">Required Skills</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {currentJob.skills.map((skill: string, index: number) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="group py-1.5 px-3"
                        >
                          {skill}
                          <button
                            onClick={() => {
                              const updatedSkills = [...currentJob.skills];
                              updatedSkills.splice(index, 1);
                              setCurrentJob({
                                ...currentJob,
                                skills: updatedSkills,
                              });
                            }}
                            className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Input
                        id="newSkill"
                        placeholder="Add a required skill"
                        value={newSkillName}
                        onChange={(e) => setNewSkillName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                      />
                      <Button type="button" onClick={addSkill}>
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsEditingJob(false)}
                >
                  Cancel
                </Button>
                <Button onClick={saveJob}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* Applications Dialog */}
          <Dialog open={showApplications} onOpenChange={setShowApplications}>
            <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle>
                  Applications for{" "}
                  {jobs.find((job) => job.id === selectedJobId)?.title}
                </DialogTitle>
                <DialogDescription>
                  Review and manage candidate applications
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 overflow-y-auto pr-1">
                {jobApplications.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      No applications yet
                    </h3>
                    <p className="text-muted-foreground">
                      There are no applications for this job posting yet.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Tabs defaultValue="all">
                      <TabsList className="mb-4">
                        <TabsTrigger value="all">
                          All ({jobApplications.length})
                        </TabsTrigger>
                        <TabsTrigger value="review">Under Review</TabsTrigger>
                        <TabsTrigger value="interview">Interview</TabsTrigger>
                        <TabsTrigger value="rejected">Rejected</TabsTrigger>
                      </TabsList>

                      <TabsContent value="all" className="space-y-4">
                        {jobApplications.map((application) => (
                          <ApplicationCard
                            key={application.id}
                            application={application}
                            changeApplicationStatus={changeApplicationStatus}
                          />
                        ))}
                      </TabsContent>

                      <TabsContent value="review" className="space-y-4">
                        {jobApplications
                          .filter((app) => app.status === "Under Review")
                          .map((application) => (
                            <ApplicationCard
                              key={application.id}
                              application={application}
                              changeApplicationStatus={changeApplicationStatus}
                            />
                          ))}
                      </TabsContent>

                      <TabsContent value="interview" className="space-y-4">
                        {jobApplications
                          .filter(
                            (app) =>
                              app.status === "Interview Scheduled" ||
                              app.status === "Screening"
                          )
                          .map((application) => (
                            <ApplicationCard
                              key={application.id}
                              application={application}
                              changeApplicationStatus={changeApplicationStatus}
                            />
                          ))}
                      </TabsContent>

                      <TabsContent value="rejected" className="space-y-4">
                        {jobApplications
                          .filter((app) => app.status === "Rejected")
                          .map((application) => (
                            <ApplicationCard
                              key={application.id}
                              application={application}
                              changeApplicationStatus={changeApplicationStatus}
                            />
                          ))}
                      </TabsContent>
                    </Tabs>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={() => setShowApplications(false)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}

// Application Card Component
function ApplicationCard({
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
            onValueChange={(value) => {
              changeApplicationStatus(application.id, value);
            }}
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
// Job Card Component
function JobCard({
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
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 mr-1" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{job.posted}</span>
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
                {job.skills.map((skill: string) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
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
