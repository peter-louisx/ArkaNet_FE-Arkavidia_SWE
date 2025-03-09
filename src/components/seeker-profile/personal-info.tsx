"use client";

import { useState, useRef } from "react";
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

type ImageUploadType = "logo" | "cover";

export default function PersonalInfo({
  personalInfoData,
  allowEdit = false,
}: {
  personalInfoData: {
    name: string;
    headline: string;
    location: string;
    industry: string;
    cover: string;
    profilePicture: string;
  };
  allowEdit?: boolean;
}) {
  const [personalInfo, setPersonalInfo] = useState(personalInfoData);

  const [isEditingPersonalInfo, setIsEditingPersonalInfo] = useState(false);
  const [editedPersonalInfo, setEditedPersonalInfo] = useState({
    ...personalInfo,
  });

  // Image upload state
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadImageType, setUploadImageType] =
    useState<ImageUploadType>("logo");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openEditPersonalInfo = () => {
    setEditedPersonalInfo({ ...personalInfo });
    setIsEditingPersonalInfo(true);
  };

  const savePersonalInfo = () => {
    setPersonalInfo({ ...editedPersonalInfo });
    setIsEditingPersonalInfo(false);
  };

  // Image Upload Handlers
  const openImageUpload = (type: ImageUploadType) => {
    setUploadImageType(type);
    setImagePreview(null);
    setIsUploadingImage(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setImagePreview(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const saveImage = () => {
    if (imagePreview) {
      if (uploadImageType === "logo") {
        setPersonalInfo({ ...personalInfo, profilePicture: imagePreview });
      } else {
        setPersonalInfo({ ...personalInfo, cover: imagePreview });
      }
    }
    setIsUploadingImage(false);
  };

  return (
    <>
      <Card className="py-0">
        <CardContent className="p-0 ">
          <div className="relative bg-primary/10 rounded-t-lg ">
            <div className="h-56">
              <Image
                src={personalInfo.cover || "/placeholder.svg"}
                layout="fill"
                objectFit="cover"
                alt="Cover"
                className="rounded-t-lg"
              />
            </div>
            {allowEdit && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                onClick={() => openImageUpload("cover")}
              >
                <Upload className="h-4 w-4 mr-2" />
                Change Cover
              </Button>
            )}
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
                {allowEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openImageUpload("logo")}
                    className="absolute bottom-0 right-0 rounded-full bg-white shadow-sm hover:bg-muted"
                  >
                    <Upload className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            <div className="space-y-4 relative">
              {allowEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-0 right-0"
                  onClick={openEditPersonalInfo}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}

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

      {allowEdit && (
        <>
          {" "}
          <Dialog open={isUploadingImage} onOpenChange={setIsUploadingImage}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {uploadImageType === "logo"
                    ? "Upload Profile Logo"
                    : "Upload Cover Image"}
                </DialogTitle>
                <DialogDescription>
                  {uploadImageType === "logo"
                    ? "Upload a logo to represent your profile. Square images work best."
                    : "Upload a cover image for your  profile. Recommended size: 1200x300 pixels."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />

                {imagePreview ? (
                  <div className="flex flex-col items-center gap-4">
                    <div
                      className={`relative ${
                        uploadImageType === "logo"
                          ? "w-32 h-32 rounded-full"
                          : "w-full h-40 rounded-md"
                      } overflow-hidden border-2 border-dashed border-muted-foreground/25`}
                    >
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <Button variant="outline" onClick={triggerFileInput}>
                      Choose Different Image
                    </Button>
                  </div>
                ) : (
                  <div
                    className={`flex flex-col items-center justify-center gap-4 cursor-pointer ${
                      uploadImageType === "logo"
                        ? "w-32 h-32 rounded-full mx-auto"
                        : "w-full h-40 rounded-md"
                    } border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors`}
                    onClick={triggerFileInput}
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground text-center">
                      Click to upload, or drag and drop
                      <br />
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsUploadingImage(false)}
                >
                  Cancel
                </Button>
                <Button onClick={saveImage} disabled={!imagePreview}>
                  Save Image
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
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
      )}
    </>
  );
}
