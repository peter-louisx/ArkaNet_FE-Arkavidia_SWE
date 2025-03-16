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
import { Job, JobFilters as JobFiltersType } from "@/types/job/types";

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<JobFiltersType>({
    jobType: "",
    experienceLevel: "",
    locationType: "",
    datePosted: "",
    salaryRange: [0, 200000],
    sortBy: "",
  });
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

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

  const resetFilters = () => {
    setSearchTerm("");
    setFilters({
      jobType: "",
      experienceLevel: "",
      locationType: "",
      datePosted: "",
      salaryRange: [0, 200000],
      sortBy: "",
    });
    fetchJobs();
  };

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

        {!loading && (
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
