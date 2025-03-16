"use client";

import { useState } from "react";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CompanyAPI } from "@/api/Company";
import { toast } from "sonner";
import { CompanyHeader } from "@/types/company/types";

export default function CompanyAbout({
  companyData,
  allowEdit = false,
}: {
  companyData: CompanyHeader;
  allowEdit?: boolean;
}) {
  const [about, setAbout] = useState<string>(companyData.about);
  const [isEditingAbout, setIsEditingAbout] = useState<boolean>(false);
  const [editedAbout, setEditedAbout] = useState<string>(about);

  const openEditAbout = () => {
    setEditedAbout(about);
    setIsEditingAbout(true);
  };

  const saveAbout = async () => {
    await CompanyAPI.updateProfile({
      company_id: companyData.id,
      name: companyData.name,
      logo: null,
      cover: null,
      about: editedAbout,
      industry: companyData.industry,
    })
      .then(() => {
        toast.success("About updated successfully");
      })
      .catch((err) => {
        toast.error("Failed to update about");
      });

    setAbout(editedAbout);
    setIsEditingAbout(false);
  };

  return (
    <>
      {/* About */}
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

      {allowEdit && (
        <Dialog open={isEditingAbout} onOpenChange={setIsEditingAbout}>
          <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle>Edit About</DialogTitle>
              <DialogDescription>
                Update your company overview and mission
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 overflow-y-auto pr-1">
              <Textarea
                value={editedAbout}
                onChange={(e) => setEditedAbout(e.target.value)}
                className="min-h-[200px]"
                placeholder="Write about your company, mission, values, and culture..."
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
