"use client";

import { useEffect, useState } from "react";
import { Briefcase, Filter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import JobCard from "@/components/jobs/job-card";
import { JobFilters } from "@/components/search/job-filters";
import { JobAPI } from "@/api/Job";
import { toast } from "sonner";

// // Mock job data
// const jobListings = [
//   {
//     id: 1,
//     title: "Senior Frontend Developer",
//     experience: "Senior Level",
//     company: "TechCorp Inc.",
//     logo: "https://karirlab-prod-bucket.s3.ap-southeast-1.amazonaws.com/files/privates/aHR0cHM6Ly9jZG4uc2VqdXRhY2l0YS5pZC82Mjk5ODAyNmI5ZGRjNTAwMTM4NDBiMTAvT3RoZXJzLzFhOTM0MTYwLWI3YmYtNDMyYi1iNzk3LWVmMTc0NmMwMjU4NC5wbmc%3D.png",
//     location: "San Francisco, CA",
//     location_type: "Remote",
//     type: "Full-time",
//     min_salary: 120000,
//     max_salary: 150000,
//     posted: "03-10-2025",
//     description:
//       "We're looking for a Senior Frontend Developer with 5+ years of experience in React, TypeScript, and modern frontend frameworks.",
//     skills: ["React", "TypeScript", "Next.js", "CSS"],
//   },
//   {
//     id: 2,
//     title: "Backend Engineer",
//     experience: "Mid Level",
//     location_type: "Remote",
//     company: "InnovateTech",
//     logo: "/placeholder.svg?height=40&width=40",
//     location: "Austin, TX",
//     type: "Full-time",
//     min_salary: 110000,
//     max_salary: 140000,
//     posted: "03-10-2025",
//     description:
//       "Join our backend team to build scalable APIs and microservices using Node.js and Python.",
//     skills: ["Node.js", "Python", "AWS", "MongoDB"],
//   },
//   {
//     id: 3,
//     title: "UX/UI Designer",
//     location_type: "Remote",
//     experience: "Entry Level",
//     company: "DesignHub",
//     logo: "/placeholder.svg?height=40&width=40",
//     location: "New York, NY",
//     type: "Contract",
//     min_salary: 90000,
//     max_salary: 120000,
//     posted: "02-10-2025",

//     description:
//       "Create beautiful and intuitive user interfaces for web and mobile applications.",
//     skills: ["Figma", "Adobe XD", "UI Design", "Prototyping"],
//   },
//   {
//     id: 4,
//     title: "DevOps Engineer",
//     location_type: "Remote",
//     min_salary: 90000,
//     max_salary: 120000,
//     experience: "Mid Level",
//     company: "CloudSystems",
//     logo: "/placeholder.svg?height=40&width=40",
//     location: "Seattle, WA",
//     type: "Full-time",
//     posted: "01-10-2025",

//     description:
//       "Manage our cloud infrastructure and CI/CD pipelines to ensure smooth deployments.",
//     skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
//   },
// ];

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    jobType: "",
    experienceLevel: "",
    locationType: "",
    datePosted: "",
    salaryRange: [0, 200000],
    remoteOnly: false,
    easyApplyOnly: false,
    featuredOnly: false,
    sortBy: "",
  });
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    await JobAPI.searchJobs({
      title: searchTerm,
      location_type: filters.locationType,
      job_type: filters.jobType,
      min_salary: filters.salaryRange[0],
      max_salary: filters.salaryRange[1],
      experience_level: filters.experienceLevel,
      date_posted: filters.datePosted,
      sort_by: filters.sortBy,
    })
      .then((res) => {
        const { success, message, data } = res.data;
        setFilteredJobs(data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Failed to fetch jobs");
      });
  };

  useEffect(() => {
    fetchJobs();
  }, [filters.sortBy]);

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      jobType: "",
      experienceLevel: "",
      locationType: "",
      datePosted: "",
      salaryRange: [0, 200000],
      remoteOnly: false,
      easyApplyOnly: false,
      featuredOnly: false,
      sortBy: "",
    });
    fetchJobs();
  };

  // Set job type filter
  const setJobType = (type: string) => {
    setFilters({
      ...filters,
      jobType: filters.jobType === type ? "" : type,
    });
  };

  const setLocationType = (type: string) => {
    setFilters({
      ...filters,
      locationType: filters.locationType === type ? "" : type,
    });
  };

  // Set experience level filter
  const setExperienceLevel = (level: string) => {
    setFilters({
      ...filters,
      experienceLevel: filters.experienceLevel === level ? "" : level,
    });
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
              placeholder="Search job titles, companies, or keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className=" flex gap-2">
            <Button className="flex-1" onClick={fetchJobs}>
              Search Jobs
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
                    setJobType={setJobType}
                    setExperienceLevel={setExperienceLevel}
                    setLocationType={setLocationType}
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
              setJobType={setJobType}
              setExperienceLevel={setExperienceLevel}
              resetFilters={resetFilters}
              setLocationType={setLocationType}
              fetchJobs={fetchJobs}
            />
          </div>
        </div>

        {/* Job Listings */}

        {!loading && filteredJobs.length > 0 && (
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 max-md:flex-col max-md:gap-3">
              <h1 className="text-xl font-bold">
                {filteredJobs.length}{" "}
                {filteredJobs.length === 1 ? "Job" : "Jobs"} Found
              </h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden md:inline">
                  Sort by:
                </span>
                <Select
                  defaultValue={filters.sortBy}
                  onValueChange={(value) => {
                    setFilters({
                      ...filters,
                      sortBy: value as string,
                    });
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Most Recent</SelectItem>
                    <SelectItem value="salary-high">Highest Salary</SelectItem>
                    <SelectItem value="salary-low">Lowest Salary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">No jobs found</h2>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or removing some filters.
                </p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            ) : (
              filteredJobs.map((job, idx) => <JobCard key={idx} job={job} />)
            )}

            {/* Pagination
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
            )} */}
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center lg:col-span-3 flex justify-center items-center">
            <div>
              <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-xl font-semibold mb-2">Loading jobs...</h2>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
