"use client";

import { useState } from "react";
import {
  Calendar,
  Edit,
  GraduationCap,
  Plus,
  School,
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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { DatePicker } from "../ui/date-picker";
import { zodResolver } from "@hookform/resolvers/zod";
import { set } from "date-fns";

export default function Education({
  educationData,
  allowEdit = false,
}: {
  educationData: {
    id: number;
    school: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate: Date;
    description: string;
  }[];
  allowEdit?: boolean;
}) {
  const formSchema = z.object({
    school: z.string().nonempty("School is required"),
    degree: z.string().nonempty("Degree is required"),
    field: z.string().nonempty("Field of study is required"),
    startDate: z.date(),
    endDate: z.date(),
    description: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school: "",
      degree: "",
      field: "",
      // @ts-ignore
      startDate: null,
      // @ts-ignore
      endDate: null,
      description: "",
    },
  });

  // Education State
  const [education, setEducation] = useState(educationData);

  const [isEditingEducation, setIsEditingEducation] = useState(false);
  const [currentEducation, setCurrentEducation] = useState<number>(0);

  // Education Handlers
  const editEducation = (edu: any) => {
    setCurrentEducation(edu.id);
    form.setValue("school", edu.school);
    form.setValue("degree", edu.degree);
    form.setValue("field", edu.field);
    form.setValue("startDate", edu.startDate);
    form.setValue("endDate", edu.endDate);
    form.setValue("description", edu.description);
    setIsEditingEducation(true);
  };

  const addNewEducation = () => {
    setIsEditingEducation(true);
  };

  const deleteEducation = (id: number) => {
    setEducation(education.filter((e) => e.id !== id));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { school, degree, field, startDate, endDate, description } = values;

    if (currentEducation) {
      setEducation(
        education.map((e) =>
          e.id === currentEducation
            ? { ...e, school, degree, field, startDate, endDate, description }
            : e
        )
      );
      setCurrentEducation(0);
    } else {
      setEducation([
        ...education,
        {
          id: education.length + 1,
          school,
          degree,
          field,
          startDate,
          endDate,
          description,
        },
      ]);
    }

    setIsEditingEducation(false);
    form.reset();
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Education</CardTitle>
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
              <div className="flex gap-4 max-md:flex-col">
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
                      {edu.startDate.toLocaleDateString()} -{" "}
                      {edu.endDate.toLocaleDateString()}
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
                {currentEducation ? "Edit Education" : "Add Education"}
              </DialogTitle>
              <DialogDescription>
                Add or update your education details
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-4 py-4">
                  <FormField
                    control={form.control}
                    name="school"
                    render={({ field }) => (
                      <div className="grid gap-2">
                        <Label htmlFor="school">School/University</Label>
                        <Input id="school" {...field} />
                        <FormMessage />
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="degree"
                    render={({ field }) => (
                      <div className="grid gap-2 mt-4">
                        <Label htmlFor="degree">Degree</Label>
                        <Input id="degree" {...field} />
                        <FormMessage />
                      </div>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="field"
                    render={({ field }) => (
                      <div className="grid gap-2 mt-4">
                        <Label htmlFor="field">Field of Study</Label>
                        <Input id="field" {...field} />
                        <FormMessage />
                      </div>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="grid gap-2">
                      <DatePicker
                        form={form}
                        name="startDate"
                        label="Start Date"
                      />
                    </div>
                    <div className="grid gap-2">
                      <DatePicker form={form} name="endDate" label="End Date" />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <div className="grid gap-2 mt-4">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" {...field} />
                        <FormMessage />
                      </div>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => {
                      setCurrentEducation(0);
                      setIsEditingEducation(false);
                      form.reset();
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
      )}
    </>
  );
}
