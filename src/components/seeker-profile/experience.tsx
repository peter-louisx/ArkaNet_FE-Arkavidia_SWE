"use client";

import { useState } from "react";
import {
  Briefcase,
  Building,
  Calendar,
  Edit,
  MapPin,
  Plus,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Experience({
  experienceData,
  allowEdit = false,
}: {
  experienceData: {
    id: number;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  allowEdit?: boolean;
}) {
  // Experience State
  const [experiences, setExperiences] = useState(experienceData);

  const [isEditingExperience, setIsEditingExperience] = useState(false);
  const [currentExperience, setCurrentExperience] = useState<any>(null);

  // Experience Handlers
  const editExperience = (experience: any) => {
    setCurrentExperience(experience);
    setIsEditingExperience(true);
  };

  const addNewExperience = () => {
    setCurrentExperience({
      id: Date.now(),
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    });
    setIsEditingExperience(true);
  };

  const saveExperience = (experience: any) => {
    if (experiences.find((e) => e.id === experience.id)) {
      setExperiences(
        experiences.map((e) => (e.id === experience.id ? experience : e))
      );
    } else {
      setExperiences([...experiences, experience]);
    }
    setIsEditingExperience(false);
  };

  const deleteExperience = (id: number) => {
    setExperiences(experiences.filter((e) => e.id !== id));
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Experience</CardTitle>
          </div>
          {allowEdit && (
            <Button onClick={addNewExperience} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="border rounded-lg p-4 relative group"
            >
              <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {allowEdit && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => editExperience(experience)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => deleteExperience(experience.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{experience.title}</h3>
                  <div className="flex items-center text-muted-foreground">
                    <Building className="h-4 w-4 mr-1" />
                    <span>{experience.company}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {experience.startDate} - {experience.endDate}
                    </span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{experience.location}</span>
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    {experience.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      {allowEdit && (
        <Dialog
          open={isEditingExperience}
          onOpenChange={setIsEditingExperience}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {currentExperience?.id ? "Edit Experience" : "Add Experience"}
              </DialogTitle>
              <DialogDescription>
                Add or update your work experience details
              </DialogDescription>
            </DialogHeader>
            {currentExperience && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input
                    id="title"
                    value={currentExperience.title}
                    onChange={(e) =>
                      setCurrentExperience({
                        ...currentExperience,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    value={currentExperience.company}
                    onChange={(e) =>
                      setCurrentExperience({
                        ...currentExperience,
                        company: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={currentExperience.location}
                    onChange={(e) =>
                      setCurrentExperience({
                        ...currentExperience,
                        location: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      value={currentExperience.startDate}
                      onChange={(e) =>
                        setCurrentExperience({
                          ...currentExperience,
                          startDate: e.target.value,
                        })
                      }
                      placeholder="e.g., Jan 2020"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      value={currentExperience.endDate}
                      onChange={(e) =>
                        setCurrentExperience({
                          ...currentExperience,
                          endDate: e.target.value,
                        })
                      }
                      placeholder="e.g., Present"
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={currentExperience.description}
                    onChange={(e) =>
                      setCurrentExperience({
                        ...currentExperience,
                        description: e.target.value,
                      })
                    }
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditingExperience(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => saveExperience(currentExperience)}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
