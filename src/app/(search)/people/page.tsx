"use client";

import { useState } from "react";
import { Briefcase, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import JobCard from "@/components/jobs/job-card";
import {
  jobTypes,
  experienceLevels,
  datePosted,
  locationTypes,
} from "@/lib/jobs-filters";
import { Job } from "@/types/job/types";

// Mock job data
const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    experience: "Senior Level",
    company: "TechCorp Inc.",
    logo: "https://karirlab-prod-bucket.s3.ap-southeast-1.amazonaws.com/files/privates/aHR0cHM6Ly9jZG4uc2VqdXRhY2l0YS5pZC82Mjk5ODAyNmI5ZGRjNTAwMTM4NDBiMTAvT3RoZXJzLzFhOTM0MTYwLWI3YmYtNDMyYi1iNzk3LWVmMTc0NmMwMjU4NC5wbmc%3D.png",
    location: "San Francisco, CA",
    location_type: "Remote",
    type: "Full-time",
    min_salary: 120000,
    max_salary: 150000,
    posted: "03-10-2025",
    description:
      "We're looking for a Senior Frontend Developer with 5+ years of experience in React, TypeScript, and modern frontend frameworks.",
    skills: ["React", "TypeScript", "Next.js", "CSS"],
  },
  {
    id: 2,
    title: "Backend Engineer",
    experience: "Mid Level",
    location_type: "Remote",
    company: "InnovateTech",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Austin, TX",
    type: "Full-time",
    min_salary: 110000,
    max_salary: 140000,
    posted: "03-10-2025",
    description:
      "Join our backend team to build scalable APIs and microservices using Node.js and Python.",
    skills: ["Node.js", "Python", "AWS", "MongoDB"],
  },
  {
    id: 3,
    title: "UX/UI Designer",
    location_type: "Remote",
    experience: "Entry Level",
    company: "DesignHub",
    logo: "/placeholder.svg?height=40&width=40",
    location: "New York, NY",
    type: "Contract",
    min_salary: 90000,
    max_salary: 120000,
    posted: "02-10-2025",

    description:
      "Create beautiful and intuitive user interfaces for web and mobile applications.",
    skills: ["Figma", "Adobe XD", "UI Design", "Prototyping"],
  },
  {
    id: 4,
    title: "DevOps Engineer",
    location_type: "Remote",
    min_salary: 90000,
    max_salary: 120000,
    experience: "Mid Level",
    company: "CloudSystems",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Seattle, WA",
    type: "Full-time",
    posted: "01-10-2025",

    description:
      "Manage our cloud infrastructure and CI/CD pipelines to ensure smooth deployments.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  },
];

// Combined Filters Component
function JobFilters({
  filters,
  setFilters,
  toggleJobType,
  applyFilters,
  resetFilters,
  isMobile = false,
}: {
  filters: any;
  setFilters: any;
  toggleJobType: (type: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  isMobile?: boolean;
}) {
  const idPrefix = isMobile ? "mobile-" : "";

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={["job-type"]}>
        <AccordionItem value="job-type">
          <AccordionTrigger>Connection Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${idPrefix}job-type-${type}`}
                    checked={filters.jobTypes.includes(type)}
                    onCheckedChange={() => toggleJobType(type)}
                  />
                  <Label htmlFor={`${idPrefix}job-type-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="mt-6 space-y-2">
        <Button className="w-full" onClick={applyFilters}>
          Apply Filters
        </Button>
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    jobTypes: [] as string[],
  });
  const [filteredJobs, setFilteredJobs] = useState(jobListings);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Apply filters
  const applyFilters = () => {
    const results = jobListings.filter((job) => {
      // Search term filter
      if (
        searchTerm &&
        !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !job.company.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !job.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Job type filter
      if (filters.jobTypes.length > 0 && !filters.jobTypes.includes(job.type)) {
        return false;
      }

      return true;
    });

    setFilteredJobs(results);
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      jobTypes: [],
    });
    setFilteredJobs(jobListings);
  };

  // Toggle job type filter
  const toggleJobType = (type: string) => {
    if (filters.jobTypes.includes(type)) {
      setFilters({
        ...filters,
        jobTypes: filters.jobTypes.filter((t) => t !== type),
      });
    } else {
      setFilters({
        ...filters,
        jobTypes: [...filters.jobTypes, type],
      });
    }
  };

  return (
    <div className="p-10 max-md:px-2">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex justify-between gap-4 max-md:flex-col">
          <div className=" relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search people"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className=" flex gap-2">
            <Button className="flex-1" onClick={applyFilters}>
              Search People
            </Button>
            <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filter Jobs</SheetTitle>
                  <SheetDescription>
                    Narrow down your job search with these filters.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 max-md:py-0 px-4">
                  <JobFilters
                    filters={filters}
                    setFilters={setFilters}
                    toggleJobType={toggleJobType}
                    applyFilters={() => {
                      applyFilters();
                      setShowMobileFilters(false);
                    }}
                    resetFilters={resetFilters}
                    isMobile={true}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar - Desktop */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            <JobFilters
              filters={filters}
              setFilters={setFilters}
              toggleJobType={toggleJobType}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
            />
          </div>
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3 space-y-4">
          {/* {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">No jobs found</h2>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search criteria or removing some filters.
              </p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          ) : (
            filteredJobs.map((job: Job) => <JobCard key={job.id} job={job} />)
          )} */}

          {/* Pagination */}
          {filteredJobs.length > 0 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary text-white"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
