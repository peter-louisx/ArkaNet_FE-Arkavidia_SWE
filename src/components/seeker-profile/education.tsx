"use client";

import { useState, useEffect } from "react";
import { Calendar, Edit, GraduationCap, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { UserAPI } from "@/api/User";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { convertDateFormat, convertDateFormatToMonthYear } from "@/lib/utils";
import { SeekerEducation } from "@/types/seeker/types";
import { showErrorToast, showSuccessToast } from "@/lib/show-toast";

export default function Education({
  educationData,
  allowEdit = false,
}: {
  educationData: SeekerEducation[];
  allowEdit?: boolean;
}) {
  const router = useRouter();
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

  const [education, setEducation] = useState(educationData);
  const [isEditingEducation, setIsEditingEducation] = useState<boolean>(false);
  const [currentEducation, setCurrentEducation] = useState<string>("");

  useEffect(() => {
    setEducation(educationData);
  }, [educationData]);

  const editEducation = (edu: SeekerEducation) => {
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

  const deleteEducation = (id: string) => {
    UserAPI.deleteEducation({ id })
      .then(() => {
        showSuccessToast("Education deleted successfully");
        router.refresh();
      })
      .catch(() => {
        showErrorToast("Failed to delete education");
      });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { school, degree, field, startDate, endDate, description } = values;

    if (currentEducation) {
      await UserAPI.updateEducation({
        id: currentEducation,
        school_name: school,
        degree,
        field_of_study: field,
        start_date: convertDateFormat(startDate),
        end_date: convertDateFormat(endDate),
      })
        .then((res) => {
          showSuccessToast("Education updated successfully");
          router.refresh();
        })
        .catch((err) => {
          showErrorToast("Failed to update education");
        });
    } else {
      await UserAPI.addEducation({
        school_name: school,
        degree,
        field_of_study: field,
        start_date: convertDateFormat(startDate),
        end_date: convertDateFormat(endDate),
      })
        .then((res) => {
          showSuccessToast("Education added successfully");
          router.refresh();
        })
        .catch((err) => {
          showErrorToast("Failed to add education");
        });
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
          {!education.length && (
            <div className="flex justify-center items-center flex-col h-40">
              <GraduationCap className="h-20 w-20 text-primary" />
              No education added at the moment
            </div>
          )}
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
                      {convertDateFormatToMonthYear(edu.startDate)} -{" "}
                      {convertDateFormatToMonthYear(edu.endDate)}
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
        <Dialog
          open={isEditingEducation}
          onOpenChange={(open) => {
            if (!open) {
              setCurrentEducation("");
              setIsEditingEducation(false);
              form.reset();
              return;
            }

            setIsEditingEducation(true);
          }}
        >
          <DialogContent className="sm:max-w-[600px] [&>button]:hidden">
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
                        allowOverToday={true}
                      />
                    </div>
                    <div className="grid gap-2">
                      <DatePicker
                        form={form}
                        name="endDate"
                        label="End Date"
                        allowOverToday={true}
                      />
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
                      setCurrentEducation("");
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
