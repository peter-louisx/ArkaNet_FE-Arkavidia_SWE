"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Edit,
  ExternalLink,
  Globe,
  MapPin,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const companyData = {
  id: "techcorp",
  name: "TechCorp Inc.",
  logo: "/placeholder.svg?height=128&width=128",
  coverImage: "/placeholder.svg?height=300&width=1200",
  industry: "Information Technology",
  size: "1,000-5,000 employees",
  location: "San Francisco, California",
  website: "https://techcorp-example.com",
  founded: "2005",
  about:
    "TechCorp Inc. is a leading technology company specializing in cloud solutions, software development, and digital transformation. We help businesses of all sizes leverage technology to drive growth and innovation. Our team of experts is dedicated to delivering high-quality solutions that meet the unique needs of our clients.",
  specialties: [
    "Cloud Computing",
    "Software Development",
    "AI & Machine Learning",
    "Digital Transformation",
    "Enterprise Solutions",
  ],
};

export default function CompanyHeader() {
  // Company state
  const [company, setCompany] = useState(companyData);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [editedCompany, setEditedCompany] = useState(companyData);

  // Company Info Handlers
  const openEditCompany = () => {
    setEditedCompany({ ...company });
    setIsEditingCompany(true);
  };

  const saveCompanyInfo = () => {
    setCompany({ ...editedCompany });
    setIsEditingCompany(false);
  };

  return (
    <>
      <Card className="py-0">
        <CardContent className="p-0">
          {/* Cover Photo */}
          <div className="relative h-56 bg-primary/10 rounded-t-lg">
            <Image
              src={company.coverImage || "/placeholder.svg"}
              alt={`${company.name} cover`}
              fill
              className="object-cover rounded-t-lg"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-white/80 hover:bg-white"
            >
              <Edit className="h-4 w-4 mr-2" />
              Change Cover
            </Button>
          </div>

          {/* Company Info */}
          <div className="p-6 pt-0 relative">
            {/* Centered Company Logo */}
            <div className="flex justify-center -mt-16 mb-6">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
                  <Image
                    src={company.logo || "/placeholder.svg"}
                    width={128}
                    height={128}
                    alt={`${company.name} logo`}
                    className="object-cover"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-white shadow-sm hover:bg-muted"
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Company info section */}
            <div className="space-y-4 relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-0 right-0"
                onClick={openEditCompany}
              >
                <Edit className="h-4 w-4" />
              </Button>

              <div className="text-center">
                <h1 className="text-2xl font-bold">{company.name}</h1>
                <p className="text-muted-foreground">{company.industry}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditingCompany} onOpenChange={setIsEditingCompany}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Edit Company Information</DialogTitle>
            <DialogDescription>Update your company details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 overflow-y-auto pr-1">
            <div className="grid gap-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                value={editedCompany.name}
                onChange={(e) =>
                  setEditedCompany({ ...editedCompany, name: e.target.value })
                }
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                value={editedCompany.industry}
                onChange={(e) =>
                  setEditedCompany({
                    ...editedCompany,
                    industry: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditingCompany(false)}
            >
              Cancel
            </Button>
            <Button onClick={saveCompanyInfo}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
