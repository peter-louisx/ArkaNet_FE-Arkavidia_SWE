"use client";

import { useEffect, useState } from "react";
import { Briefcase, Plus, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
import { experienceLevels, jobTypes, locationTypes } from "@/lib/jobs-filters";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { JobCardCompany as JobCard } from "./job-card-company";
import SkillInput from "../skills/skill-input";
import { CompanyAPI } from "@/api/Company";
import { useRouter } from "next/navigation";
import { CompanyJob } from "@/types/company/types";
import { showErrorToast, showSuccessToast } from "@/lib/show-toast";

export default function CompanyJobs({
  jobsData,
  companyID,
  company_slug,
  allowEdit = false,
}: {
  companyID: string;
  jobsData: CompanyJob[];
  company_slug: string;
  allowEdit?: boolean;
}) {
  const router = useRouter();

  const formSchema = z.object({
    job_title: z.string().nonempty(),
    job_location: z.string().nonempty(),
    job_type: z.string().nonempty(),
    location_type: z.string().nonempty(),
    experience: z.string().nonempty(),
    min_salary: z.string(),
    max_salary: z.string(),
    job_description: z.string().nonempty(),
    skills: z.array(
      z.object({
        id: z.string().nullable(),
        skill_id: z.string().nonempty(),
        name: z.string().nonempty(),
      })
    ),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      job_title: "",
      job_location: "",
      job_type: "",
      location_type: "",
      experience: "",
      min_salary: "",
      max_salary: "",
      job_description: "",
      skills: [],
    },
  });

  const [jobs, setJobs] = useState(jobsData);
  const [isEditingJob, setIsEditingJob] = useState(false);
  const [currentJob, setCurrentJob] = useState<string>("");
  const [jobSearch, setJobSearch] = useState("");

  useEffect(() => {
    setJobs(jobsData);
  }, [jobsData]);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.location.toLowerCase().includes(jobSearch.toLowerCase()) ||
      job.description.toLowerCase().includes(jobSearch.toLowerCase())
  );

  const addNewJob = () => {
    setIsEditingJob(true);
  };

  const editJob = (job: CompanyJob) => {
    setCurrentJob(job.id);
    form.setValue("job_title", job.title);
    form.setValue("job_location", job.location);
    form.setValue("job_type", job.job_type);
    form.setValue("location_type", job.location_type);
    form.setValue("experience", job.experience);
    form.setValue("min_salary", job.min_salary.toString());
    form.setValue("max_salary", job.max_salary.toString());
    form.setValue("job_description", job.description);
    form.setValue("skills", job.skills);
    setIsEditingJob(true);
  };

  const deleteJob = (id: string) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const addSkill = (skillID: string, skillName: string) => {
    if (
      skillID &&
      !form
        .getValues("skills")
        .some(
          (skill: { id: string | null; skill_id: string; name: string }) =>
            skill.skill_id === skillID
        )
    ) {
      form.setValue("skills", [
        ...form.getValues("skills"),
        {
          id: null,
          skill_id: skillID,
          name: skillName,
        },
      ]);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const {
      job_title,
      job_location,
      job_type,
      location_type,
      experience,
      min_salary,
      max_salary,
      job_description,
      skills,
    } = values;

    if (currentJob) {
      await CompanyAPI.updateJob({
        company_id: companyID,
        job_id: currentJob,
        title: job_title,
        description: job_description,
        location: job_location,
        location_type: location_type,
        job_type: job_type,
        min_salary: parseInt(min_salary),
        max_salary: parseInt(max_salary),
        experience: experience,
        skills: skills.map(
          (s: { id: string | null; skill_id: string; name: string }) =>
            s.skill_id
        ),
      })
        .then((res) => {
          showSuccessToast("Job updated successfully");
          router.refresh();
        })
        .catch((err) => {
          showErrorToast("Failed to update job");
        });
      setCurrentJob("");
    } else {
      await CompanyAPI.addJob({
        company_id: companyID,
        title: job_title,
        description: job_description,
        location: job_location,
        location_type: location_type,
        job_type: job_type,
        min_salary: parseInt(min_salary),
        max_salary: parseInt(max_salary),
        experience: experience,
        skills: skills.map(
          (s: { id: string | null; skill_id: string; name: string }) =>
            s.skill_id
        ),
      })
        .then((res) => {
          showSuccessToast("Job added successfully");
          router.refresh();
        })
        .catch((err) => {
          showErrorToast("Failed to add job");
        });
    }

    form.reset();
    setIsEditingJob(false);
  }

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
                      ? "No jobs added yet."
                      : "No jobs match your search criteria."}
                  </p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onEdit={() => editJob(job)}
                    onDelete={() => deleteJob(job.id)}
                    allowEdit={allowEdit}
                    company_slug={company_slug}
                  />
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {allowEdit && (
        <>
          {/* Job Edit Dialog */}
          <Dialog
            open={isEditingJob}
            onOpenChange={(open) => {
              if (!open) {
                form.reset();
                setIsEditingJob(false);
                setCurrentJob("");
                return;
              }

              setIsEditingJob(open);
            }}
          >
            <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-scroll flex flex-col [&>button]:hidden">
              <DialogHeader>
                <DialogTitle>{currentJob ? "Edit Job" : "Add Job"}</DialogTitle>
                <DialogDescription>
                  Create or update job listing details
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="grid gap-4 py-4   pr-4 pl-2">
                    <FormField
                      control={form.control}
                      name="job_title"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="title">Job Title</Label>
                          <Input id="title" {...field} />
                          <FormMessage />
                        </div>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="job_location"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="location">Location</Label>
                          <Input id="location" {...field} />
                          <FormMessage />
                        </div>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="job_type"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="type">Job Type</Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
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
                          <FormMessage />
                        </div>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location_type"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="type">Location Type</Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select location type" />
                            </SelectTrigger>
                            <SelectContent>
                              {locationTypes.map((type) => (
                                <SelectItem key={type} value={type}>
                                  {type}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </div>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="type">Experience Level</Label>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger className="w-full">
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
                          <FormMessage />
                        </div>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="min_salary"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="salary">Minimum Salary</Label>
                          <Input
                            id="salary"
                            type="number"
                            {...field}
                            placeholder="e.g., $80,000"
                          />
                          <FormMessage />
                        </div>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="max_salary"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="salary">Maximum Salary</Label>
                          <Input
                            id="salary"
                            type="number"
                            {...field}
                            placeholder="e.g., $100,000"
                          />
                          <FormMessage />
                        </div>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="job_description"
                      render={({ field }) => (
                        <div className="grid gap-2">
                          <Label htmlFor="description">Job Description</Label>
                          <Textarea
                            id="description"
                            {...field}
                            className="min-h-[150px]"
                          />
                          <FormMessage />
                        </div>
                      )}
                    />

                    <div className="grid gap-2">
                      <Label htmlFor="skills">Required Skills</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {form.watch("skills").map(
                          (
                            skill: {
                              id: string | null;
                              skill_id: string;
                              name: string;
                            },
                            index: number
                          ) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="group py-1.5 px-3"
                            >
                              {skill.name}
                              <button
                                type="button"
                                onClick={() => {
                                  form.setValue(
                                    "skills",
                                    form
                                      .getValues("skills")
                                      .filter(
                                        (s: {
                                          id: string | null;
                                          skill_id: string;
                                          name: string;
                                        }) => s.skill_id !== skill.skill_id
                                      )
                                  );
                                }}
                                className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          )
                        )}
                      </div>
                      <div className="flex gap-2">
                        <SkillInput addSkill={addSkill} />
                      </div>
                    </div>
                  </div>

                  <DialogFooter>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => {
                        form.reset();
                        setIsEditingJob(false);
                        setCurrentJob("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
}
