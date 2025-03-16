"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Search, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { use } from "react";
import { JobAPI } from "@/api/Job";
import { toast } from "sonner";
import { Applicant } from "@/types/applicant/types";
import { ApplicantCard } from "@/components/applicant/applicant-card";
import { statusConfig } from "@/lib/applicant-status";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [applications, setApplications] = useState<Applicant[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchApplications();
  }, []);

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
              {loading && (
                <div className="p-8 text-center">
                  <Briefcase className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Loading applications
                  </h3>
                </div>
              )}

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
                      <ApplicantCard
                        key={application.id}
                        applicant={application}
                      />
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
