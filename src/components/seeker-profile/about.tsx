"use client";

import { useState } from "react";

import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UserAPI } from "@/api/User";
import { toast } from "sonner";
import { set } from "date-fns";

export default function About({
  personalInfoData,
  allowEdit = false,
}: {
  personalInfoData: {
    name: string;
    headline: string;
    location: string;
    cover: string;
    profilePicture: string;
    about: string;
  };
  allowEdit?: boolean;
}) {
  const [about, setAbout] = useState(personalInfoData.about);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [editedAbout, setEditedAbout] = useState(about);

  // About Handlers
  const openEditAbout = () => {
    setEditedAbout(about);
    setIsEditingAbout(true);
  };

  const saveAbout = async () => {
    setAbout(editedAbout);
    await UserAPI.updateProfile({
      about: editedAbout,
      address: personalInfoData.location,
      headline: null,
      current_title: personalInfoData.headline,
      name: personalInfoData.name,
      profile_picture: null,
    })
      .then((res) => {
        toast.success("About updated successfully");
      })
      .catch((err) => {
        toast.error("Failed to update about");
      });

    setEditedAbout("");
    setIsEditingAbout(false);
  };
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>About</CardTitle>
          </div>
          {allowEdit && (
            <Button onClick={openEditAbout} variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{about}</p>
        </CardContent>
      </Card>
      {/* About Edit Dialog */}

      {allowEdit && (
        <Dialog open={isEditingAbout} onOpenChange={setIsEditingAbout}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit About</DialogTitle>
              <DialogDescription>
                Tell others about yourself and your professional background
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Textarea
                value={editedAbout}
                onChange={(e) => setEditedAbout(e.target.value)}
                className="min-h-[200px]"
                placeholder="Write a summary about yourself..."
              />
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditingAbout(false)}
              >
                Cancel
              </Button>
              <Button onClick={saveAbout}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
