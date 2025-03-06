"use client";

import { useState } from "react";
import { Briefcase, Filter, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import JobCard from "@/components/jobs/job-card";

// Mock job data
const jobListings = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    logo: "/placeholder.svg?height=40&width=40",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    posted: "2 days ago",
    description:
      "We're looking for a Senior Frontend Developer with 5+ years of experience in React, TypeScript, and modern frontend frameworks.",
    skills: ["React", "TypeScript", "Next.js", "CSS"],
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "InnovateTech",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $140,000",
    posted: "1 week ago",
    description:
      "Join our backend team to build scalable APIs and microservices using Node.js and Python.",
    skills: ["Node.js", "Python", "AWS", "MongoDB"],
  },
  {
    id: 3,
    title: "UX/UI Designer",
    company: "DesignHub",
    logo: "/placeholder.svg?height=40&width=40",
    location: "New York, NY",
    type: "Contract",
    salary: "$90,000 - $120,000",
    posted: "3 days ago",
    description:
      "Create beautiful and intuitive user interfaces for web and mobile applications.",
    skills: ["Figma", "Adobe XD", "UI Design", "Prototyping"],
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudSystems",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    posted: "5 days ago",
    description:
      "Manage our cloud infrastructure and CI/CD pipelines to ensure smooth deployments.",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    id: 5,
    title: "Product Manager",
    company: "ProductFirst",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$115,000 - $145,000",
    posted: "1 day ago",
    description:
      "Lead product development from conception to launch, working with cross-functional teams.",
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"],
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "DataInsights",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $155,000",
    posted: "2 weeks ago",
    description:
      "Analyze large datasets to extract insights and build predictive models.",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
  },
  {
    id: 7,
    title: "Mobile Developer (iOS)",
    company: "AppWorks",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$80,000 - $100,000",
    posted: "4 days ago",
    description:
      "Develop and maintain iOS applications using Swift and SwiftUI.",
    skills: ["Swift", "iOS", "SwiftUI", "Xcode"],
  },
  {
    id: 8,
    title: "Full Stack Developer",
    company: "WebSolutions",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Denver, CO",
    type: "Full-time",
    salary: "$100,000 - $130,000",
    posted: "1 week ago",
    description:
      "Build end-to-end web applications using modern JavaScript frameworks.",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
  },
];

// Filter options
const jobTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Temporary",
];
const experienceLevels = ["Entry Level", "Mid Level", "Senior Level"];
const datePosted = ["Past 24 hours", "Past week", "Past month", "Any time"];

// Combined Filters Component
function JobFilters({
  filters,
  setFilters,
  toggleJobType,
  toggleExperienceLevel,
  applyFilters,
  resetFilters,
  isMobile = false,
}: {
  filters: any;
  setFilters: any;
  toggleJobType: (type: string) => void;
  toggleExperienceLevel: (level: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  isMobile?: boolean;
}) {
  const idPrefix = isMobile ? "mobile-" : "";

  return (
    <div className="space-y-6">
      <Accordion
        type="multiple"
        defaultValue={["job-type", "experience", "date-posted", "salary"]}
      >
        <AccordionItem value="job-type">
          <AccordionTrigger>Job Type</AccordionTrigger>
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

        <AccordionItem value="experience">
          <AccordionTrigger>Experience Level</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${idPrefix}exp-level-${level}`}
                    checked={filters.experienceLevels.includes(level)}
                    onCheckedChange={() => toggleExperienceLevel(level)}
                  />
                  <Label htmlFor={`${idPrefix}exp-level-${level}`}>
                    {level}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="date-posted">
          <AccordionTrigger>Date Posted</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {datePosted.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${idPrefix}date-${option}`}
                    checked={filters.datePosted === option}
                    onCheckedChange={() =>
                      setFilters({ ...filters, datePosted: option })
                    }
                  />
                  <Label htmlFor={`${idPrefix}date-${option}`}>{option}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="salary">
          <AccordionTrigger>Salary Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-6">
              <div className="pt-4">
                <Slider
                  defaultValue={[0, 200000]}
                  max={200000}
                  step={10000}
                  value={filters.salaryRange}
                  onValueChange={(value) =>
                    setFilters({
                      ...filters,
                      salaryRange: value as [number, number],
                    })
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">
                  ${filters.salaryRange[0].toLocaleString()}
                </span>
                <span className="text-sm">
                  ${filters.salaryRange[1].toLocaleString()}
                </span>
              </div>
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
    experienceLevels: [] as string[],
    datePosted: "",
    salaryRange: [0, 200000],
    remoteOnly: false,
    easyApplyOnly: false,
    featuredOnly: false,
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

      // Salary range filter
      const jobSalaryMin = Number.parseInt(
        job.salary.split(" - ")[0].replace(/\$|,/g, "")
      );
      if (jobSalaryMin < filters.salaryRange[0]) {
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
      experienceLevels: [],
      datePosted: "",
      salaryRange: [0, 200000],
      remoteOnly: false,
      easyApplyOnly: false,
      featuredOnly: false,
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

  // Toggle experience level filter
  const toggleExperienceLevel = (level: string) => {
    if (filters.experienceLevels.includes(level)) {
      setFilters({
        ...filters,
        experienceLevels: filters.experienceLevels.filter((l) => l !== level),
      });
    } else {
      setFilters({
        ...filters,
        experienceLevels: [...filters.experienceLevels, level],
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
              placeholder="Search job titles, companies, or keywords"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className=" flex gap-2">
            <Button className="flex-1" onClick={applyFilters}>
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
                <div className="py-4">
                  <JobFilters
                    filters={filters}
                    setFilters={setFilters}
                    toggleJobType={toggleJobType}
                    toggleExperienceLevel={toggleExperienceLevel}
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
              toggleExperienceLevel={toggleExperienceLevel}
              applyFilters={applyFilters}
              resetFilters={resetFilters}
            />
          </div>
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-4 max-md:flex-col max-md:gap-3">
            <h1 className="text-xl font-bold">
              {filteredJobs.length} {filteredJobs.length === 1 ? "Job" : "Jobs"}{" "}
              Found
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden md:inline">
                Sort by:
              </span>
              <Select defaultValue="relevance">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Most Relevant</SelectItem>
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
            filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
          )}

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
