"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function ApplyCard({ job }: { job: any }) {
  const [isApplying, setIsApplying] = useState(false);
  const [applicationData, setApplicationData] = useState({
    resume: null as File | null,
  });

  const handleApply = () => {
    setIsApplying(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setApplicationData({
        ...applicationData,
        resume: e.target.files[0],
      });
    }
  };
  return (
    <>
      <Button onClick={() => setIsApplying(true)}>Apply for this job</Button>

      <Dialog open={isApplying} onOpenChange={setIsApplying}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Apply for {job.title}</DialogTitle>
            <DialogDescription>
              Complete the form below to apply for this position at{" "}
              {job.company}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 overflow-y-auto pr-1">
            <div className="grid gap-2">
              <Label htmlFor="resume">Resume</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="resume"
                  type="file"
                  onChange={handleFileChange}
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Accepted formats: PDF, DOCX, DOC (Max 5MB)
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsApplying(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply}>Submit Application</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
