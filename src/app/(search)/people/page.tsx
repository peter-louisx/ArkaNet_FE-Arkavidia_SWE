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
import { COMPANY_PICTURE, PROFILE_PICTURE } from "@/lib/image-placeholder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";

// Mock job data
const PeopleListings = [
  {
    id: 1,
    name: "Nickolas ",
    title: "Student at Universitas Indonesia",
  },
  {
    id: 2,
    name: "Don Joe",
    title: "Student at Brawijaya University",
  },
  {
    id: 3,
    name: "John Doe",
    title: "Student at Institut Teknologi Bandung",
  },
  {
    id: 4,
    name: "Michael Doe",
    title: "Student at Universitas Gadjah Mada",
  },
  {
    id: 5,
    name: "Jason",
    title: "Student at University of Toronto",
  },
  {
    id: 6,
    name: "Bambang",
    title: "Student at Universitas Kadiri ",
  },
  {
    id: 7,
    name: "Leon",
    title: "Student at Universitas Petra",
  },
  {
    id: 8,
    name: "Doe",
    title: "Student at Universitas Gadjah Mada",
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

export default function PeoplePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    jobTypes: [] as string[],
  });
  const [filteredJobs, setFilteredJobs] = useState(PeopleListings);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Apply filters
  const applyFilters = () => {
    const results = PeopleListings.filter((People) => {
      // Search term filter
      if (
        searchTerm &&
        !People.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !People.title.toLowerCase().includes(searchTerm.toLowerCase())
        // && !job.description.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Job type filter
      if (
        filters.jobTypes.length > 0 &&
        !filters.jobTypes.includes(People.title)
      ) {
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
    setFilteredJobs(PeopleListings);
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
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block">
          <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
            <h2 className="font-semibold text-lg p-4">Our Network</h2>
            <hr></hr>
            <ul className="flex flex-col p-4 gap-4 text-lg text-gray-500 font-semibold">
              <Link href="">
                <li>Connection</li>
              </Link>
              <Link href="">
                <li>Followers & Following</li>
              </Link>
            </ul>
          </div>
        </div>

        {/* People Listings */}
        <div className="lg:col-span-3 space-y-4">
          <div className="border-1 p-4 shadow-sm rounded-lg mx-auto">
            <div className="flex justify-center items-center text-center">
              <div className="grid grid-cols-3 max-md:grid-cols-1 gap-10">
                {filteredJobs.map((People) => (
                  <div
                    key={People.id}
                    className="border-1 shadow-sm p-5 rounded-lg flex flex-col justify-between items-center "
                  >
                    <div className="rounded-md overflow-hidden flex-shrink-0 ">
                      <Avatar className="w-16 h-16">
                        <AvatarImage
                          width={100}
                          height={100}
                          src={PROFILE_PICTURE}
                        />
                        <AvatarFallback>
                          <Loader2Icon className="h-4 w-4 animate-spin" />{" "}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="px-5 mt-2">
                      <p className="font-semibold">{People.name}</p>
                      <p className="text-sm text-gray-500">{People.title}</p>
                    </div>
                    <Button className="px-16 mt-2 rounded-full border-1 border-primary bg-white text-primary hover:bg-white">
                      Hubungkan
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
