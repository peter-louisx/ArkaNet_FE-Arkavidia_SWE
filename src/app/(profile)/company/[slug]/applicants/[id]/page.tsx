"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  Plus,
  Search,
  User,
  X,
  Mail,
  MoreVertical,
  Calendar,
} from "lucide-react";
import { ApplicationCard } from "@/components/company-profile/application-card";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { use } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { JobAPI } from "@/api/Job";
import { toast } from "sonner";
import { set } from "date-fns";

const statusConfig = [
  {
    name: "Under Review",
    color: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    name: "Interview",
    color: "bg-yellow-50 text-yellow-700 border-yellow-200",
  },
  {
    name: "Rejected",
    color: "bg-red-50 text-red-700 border-red-200",
  },
  {
    name: "Hired",
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
];

// const applications = [
//   {
//     id: 1,
//     user_id: "1",
//     name: "Jane Smith",
//     headline: "Senior Frontend Developer",
//     slug: "jane-smith",
//     profile_image: "/placeholder.svg?height=40&width=40",
//     applied_at: "2023-05-15",
//     status: "Under Review",
//   },
// ];

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const [applications, setApplications] = useState<
    {
      id: number;
      name: string;
      headline: string;
      profile_picture: string;
      status: string;
      applied_at: string;
      slug: string;
    }[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentTab, setCurrentTab] = useState("all");
  const [loading, setLoading] = useState(true);

  const { id } = use(params);

  // Filter applications based on search and tab
  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.headline.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      currentTab === "all" ||
      app.status.toLowerCase().replace(/\s+/g, "-") === currentTab;

    return matchesSearch && matchesTab;
  });

  const fetchApplications = async () => {
    await JobAPI.getApplications(id)
      .then((res) => {
        const { success, message, data } = res.data;
        setApplications(data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Failed to fetch applications");
      });
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Search and filters */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Applications</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search candidates by name, role, or job title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Tabs and Applications List */}
        <Card>
          <Tabs defaultValue="all" onValueChange={setCurrentTab}>
            <TabsList className="w-full justify-start border-b rounded-none p-0 h-auto">
              <TabsTrigger
                value="all"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                All ({applications.length})
              </TabsTrigger>
              <TabsTrigger
                value="under-review"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Under Review
              </TabsTrigger>
              <TabsTrigger
                value="interview"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Interview
              </TabsTrigger>
              <TabsTrigger
                value="rejected"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
              >
                Rejected
              </TabsTrigger>
            </TabsList>

            <TabsContent value={currentTab} className="m-0">
              {
                // Show loading state
                loading && (
                  <div className="p-8 text-center">
                    <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Loading applications
                    </h3>
                  </div>
                )
              }

              {!loading && (
                <div className="divide-y">
                  {filteredApplications.length === 0 ? (
                    <div className="p-8 text-center">
                      <User className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        No applications found
                      </h3>
                      <p className="text-gray-500">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  ) : (
                    filteredApplications.map((application) => (
                      <div
                        key={application.id}
                        className="p-4 hover:bg-gray-50"
                      >
                        <div className="flex items-start gap-4">
                          <Link href={`/seeker/${application.slug}`}>
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={application.profile_picture}
                                alt={application.name}
                              />
                              <AvatarFallback>
                                {application.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </Link>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-gray-900">
                                  {application.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  {application.headline}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={`${
                                    statusConfig.find(
                                      (status) =>
                                        status.name === application.status
                                    )?.color
                                  }`}
                                >
                                  {application.status}
                                </Badge>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-8 w-8 p-0"
                                    >
                                      <MoreVertical className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    {statusConfig.map((status) => (
                                      <DropdownMenuItem key={status.name}>
                                        {status.name}
                                      </DropdownMenuItem>
                                    ))}
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                Applied {application.applied_at}
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="ml-4">
                            <Mail className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </main>
  );
}
