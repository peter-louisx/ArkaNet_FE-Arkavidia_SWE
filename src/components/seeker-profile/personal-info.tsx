"use client";

import { useState } from "react";
import Image from "next/image";
import { Briefcase, Edit, MapPin, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function PersonalInfo({
  personalInfoData,
}: {
  personalInfoData: {
    name: string;
    headline: string;
    location: string;
    industry: string;
  };
}) {
  const [personalInfo, setPersonalInfo] = useState(personalInfoData);

  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [editedPersonalInfo, setEditedPersonalInfo] = useState({
    ...personalInfo,
  });

  const openEditPersonalInfo = () => {
    setEditedPersonalInfo({ ...personalInfo });
    setIsEditingPersonalInfo(true);
  };

  const savePersonalInfo = () => {
    setPersonalInfo({ ...editedPersonalInfo });
    setIsEditingPersonalInfo(false);
  };

  return (
    <>
      <Card className="py-0">
        <CardContent className="p-0 ">
          {/* Cover Photo */}
          <div className="relative h-56 bg-primary/10 rounded-t-lg ">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white"
            >
              <Upload className="h-4 w-4 mr-2" />
              Change Cover
            </Button>
          </div>

          {/* Profile Info */}
          <div className="p-6 pt-0 relative">
            {/* Centered Profile Picture */}
            <div className="flex justify-center -mt-16 mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-muted overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=128&width=128"
                    width={128}
                    height={128}
                    alt="Profile"
                    className="object-cover"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-white shadow-sm hover:bg-muted"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-4 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0"
                onClick={openEditPersonalInfo}
              >
                <Edit className="h-4 w-4" />
              </Button>

              <div className="text-center">
                <h1 className="text-2xl font-bold">{personalInfo.name}</h1>
                <p className="text-muted-foreground">{personalInfo.headline}</p>
              </div>

              <div className="flex justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{personalInfo.location}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-4 w-4 mr-1" />
                  <span>{personalInfo.industry}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={isEditingPersonalInfo}
        onOpenChange={setIsEditingPersonalInfo}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Profile Information</DialogTitle>
            <DialogDescription>
              Update your personal and professional details
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={editedPersonalInfo.name}
                onChange={(e) =>
                  setEditedPersonalInfo({
                    ...editedPersonalInfo,
                    name: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="headline">Professional Headline</Label>
              <Input
                id="headline"
                value={editedPersonalInfo.headline}
                onChange={(e) =>
                  setEditedPersonalInfo({
                    ...editedPersonalInfo,
                    headline: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={editedPersonalInfo.location}
                onChange={(e) =>
                  setEditedPersonalInfo({
                    ...editedPersonalInfo,
                    location: e.target.value,
                  })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={editedPersonalInfo.industry}
                onChange={(e) =>
                  setEditedPersonalInfo({
                    ...editedPersonalInfo,
                    industry: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditingPersonalInfo(false)}
            >
              Cancel
            </Button>
            <Button onClick={savePersonalInfo}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
