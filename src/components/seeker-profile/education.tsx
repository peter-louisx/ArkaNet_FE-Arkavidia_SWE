"use client";

import { useState } from "react";
import { Calendar, Edit, GraduationCap, Plus, Trash2 } from "lucide-react";
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

export default function Education({
  educationData,
  allowEdit = false,
}: {
  educationData: {
    id: number;
    school: string;
    degree: string;
    field: string;
    startYear: string;
    endYear: string;
    description: string;
  }[];
  allowEdit?: boolean;
}) {
  // Education State
  const [education, setEducation] = useState(educationData);

  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<any>(null);

  // Education Handlers
  const editEducation = (edu: any) => {
    setCurrentEducation(edu);
    setIsEditingEducation(true);
  };

  const addNewEducation = () => {
    setCurrentEducation({
      id: Date.now(),
      school: "",
      degree: "",
      field: "",
      startYear: "",
      endYear: "",
      description: "",
    });
    setIsEditingEducation(true);
  };

  const saveEducation = (edu: any) => {
    if (education.find((e) => e.id === edu.id)) {
      setEducation(education.map((e) => (e.id === edu.id ? edu : e)));
    } else {
      setEducation([...education, edu]);
    }
    setIsEditingEducation(false);
  };

  const deleteEducation = (id: number) => {
    setEducation(education.filter((e) => e.id !== id));
  };
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Education</CardTitle>
            <CardDescription>Add your educational background</CardDescription>
          </div>
          {allowEdit && (
            <Button onClick={addNewEducation} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {education.map((edu) => (
            <div key={edu.id} className="border rounded-lg p-4 relative group">
              <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {allowEdit && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => editEducation(edu)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => deleteEducation(edu.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                  <GraduationCap className="h-6 w-6 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-lg">{edu.school}</h3>
                  <div className="text-muted-foreground">
                    {edu.degree}, {edu.field}
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>
                      {edu.startYear} - {edu.endYear}
                    </span>
                  </div>
                  <p className="mt-2 text-muted-foreground">
                    {edu.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      {allowEdit && (
        <Dialog open={isEditingEducation} onOpenChange={setIsEditingEducation}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>
                {currentEducation?.id ? "Edit Education" : "Add Education"}
              </DialogTitle>
              <DialogDescription>
                Add or update your education details
              </DialogDescription>
            </DialogHeader>
            {currentEducation && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="school">School/University</Label>
                  <Input
                    id="school"
                    value={currentEducation.school}
                    onChange={(e) =>
                      setCurrentEducation({
                        ...currentEducation,
                        school: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="degree">Degree</Label>
                  <Input
                    id="degree"
                    value={currentEducation.degree}
                    onChange={(e) =>
                      setCurrentEducation({
                        ...currentEducation,
                        degree: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="field">Field of Study</Label>
                  <Input
                    id="field"
                    value={currentEducation.field}
                    onChange={(e) =>
                      setCurrentEducation({
                        ...currentEducation,
                        field: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startYear">Start Year</Label>
                    <Input
                      id="startYear"
                      value={currentEducation.startYear}
                      onChange={(e) =>
                        setCurrentEducation({
                          ...currentEducation,
                          startYear: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="endYear">End Year</Label>
                    <Input
                      id="endYear"
                      value={currentEducation.endYear}
                      onChange={(e) =>
                        setCurrentEducation({
                          ...currentEducation,
                          endYear: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="eduDescription">Description</Label>
                  <Textarea
                    id="eduDescription"
                    value={currentEducation.description}
                    onChange={(e) =>
                      setCurrentEducation({
                        ...currentEducation,
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
                onClick={() => setIsEditingEducation(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => saveEducation(currentEducation)}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
