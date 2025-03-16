import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  jobTypes,
  datePosted,
  experienceLevels,
  locationTypes,
} from "@/lib/jobs-filters";

export function JobFilters({
  filters,
  setFilters,
  resetFilters,
  isMobile = false,
  fetchJobs,
}: {
  filters: any;
  setFilters: any;
  resetFilters: () => void;
  isMobile?: boolean;
  fetchJobs?: () => void;
}) {
  const idPrefix = isMobile ? "mobile-" : "";

  return (
    <div className="space-y-6">
      <Accordion type="multiple">
        <AccordionItem value="job-type">
          <AccordionTrigger>Job Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${idPrefix}job-type-${type}`}
                    checked={filters.jobType === type}
                    onCheckedChange={() => {
                      setFilters({
                        ...filters,
                        jobType: filters.jobType === type ? "" : type,
                      });
                    }}
                  />
                  <Label htmlFor={`${idPrefix}job-type-${type}`}>{type}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="location-type">
          <AccordionTrigger>Location Type</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {locationTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${idPrefix}location-type-${type}`}
                    checked={filters.locationType === type}
                    onCheckedChange={() => {
                      setFilters({
                        ...filters,
                        locationType: filters.locationType === type ? "" : type,
                      });
                    }}
                  />
                  <Label htmlFor={`${idPrefix}location-type-${type}`}>
                    {type}
                  </Label>
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
                    checked={filters.experienceLevel === level}
                    onCheckedChange={() => {
                      setFilters({
                        ...filters,
                        experienceLevel:
                          filters.experienceLevel === level ? "" : level,
                      });
                    }}
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
        <Button className="w-full" onClick={fetchJobs}>
          Apply Filters
        </Button>
        <Button variant="outline" className="w-full" onClick={resetFilters}>
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
