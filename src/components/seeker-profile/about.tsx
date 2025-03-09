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

export default function About({
  aboutData,
  allowEdit = false,
}: {
  aboutData: string;
  allowEdit?: boolean;
}) {
  const [about, setAbout] = useState(aboutData);
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [editedAbout, setEditedAbout] = useState(about);

  // About Handlers
  const openEditAbout = () => {
    setEditedAbout(about);
    setIsEditingAbout(true);
  };

  const saveAbout = () => {
    setAbout(editedAbout);
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
