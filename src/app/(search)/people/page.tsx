"use client";

import { useEffect, useState } from "react";
import { Search, User2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAPI } from "@/api/User";
import { showErrorToast } from "@/lib/show-toast";
import { UserList } from "@/types/user_search/types";
import UserCard from "@/components/user-search/user_card";

export default function PeoplePage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [usersList, setUsersList] = useState<UserList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUsers = async () => {
    setLoading(true);
    await UserAPI.search({
      keyword: searchTerm,
    })
      .then((res) => {
        const { data, message, success } = res.data;

        setUsersList(data);
      })
      .catch((err) => {
        showErrorToast("Failed to fetch users");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-10 max-md:px-2">
      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex justify-between gap-4 max-md:flex-col">
          <div className=" relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              className="pl-10"
              placeholder="Search people or companies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchUsers();
                }
              }}
            />
          </div>
          <div className=" flex gap-2">
            <Button className="flex-1" onClick={fetchUsers}>
              Search People
            </Button>
            {/* <Sheet open={showMobileFilters} onOpenChange={setShowMobileFilters}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filter Jobs</SheetTitle>
                  <SheetDescription>
                    Narrow down your job search with these filters.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4 max-md:py-0 px-4">
                  <JobFilters
                    filters={filters}
                    setFilters={setFilters}
                    toggleJobType={toggleJobType}
                    applyFilters={() => {
                      applyFilters();
                      setShowMobileFilters(false);
                    }}
                    resetFilters={resetFilters}
                    isMobile={true}
                  />
                </div>
              </SheetContent>
            </Sheet> */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1  gap-6 w-full">
        {/* Sidebar - Desktop */}
        {/* <div className="hidden lg:block">
          <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
            <h2 className="font-semibold text-lg p-4">Our Network</h2>
            <hr></hr>
            <ul className="flex flex-col p-4 gap-4 text-lg text-gray-500 font-semibold">
              <Link href="">
                <li>Connection</li>
              </Link>
              <Link href="">
                <li>Followers & Following</li>
              </Link>
            </ul>
          </div>
        </div> */}

        {loading && (
          <div className="lg:col-span-3 space-y-4 w-full">
            <div className="border-1 shadow-sm rounded-lg mx-auto py-12 px-8 max-md:px-5">
              <div className="flex justify-center items-center text-center">
                <div className="min-h-[300px] w-full flex flex-col items-center justify-center">
                  <User2Icon className="h-16 w-16 text-muted-foreground" />
                  <h2 className="text-lg font-semibold mt-4">Loading...</h2>
                  <p className="text-gray-500 text-sm mt-2">
                    Please wait while we fetch the data
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* People Listings */}
        {!loading && usersList.length > 0 && (
          <div className="lg:col-span-3 space-y-4 w-full">
            <div className="border-1 shadow-sm rounded-lg mx-auto py-12 px-8 max-md:px-5">
              <div className="flex justify-center items-center text-center">
                <div className="grid grid-cols-4 max-md:grid-cols-1 gap-10  w-full ">
                  {usersList.map((People) => (
                    <UserCard key={People.id} People={People} />
                  ))}
                </div>
              </div>
            </div>

            {/* Pagination */}
            {/* {usersList.length > 0 && (
            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-1">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary text-white"
                >
                  1
                </Button>
                <Button variant="outline" size="sm">
                  2
                </Button>
                <Button variant="outline" size="sm">
                  3
                </Button>
                <Button variant="outline" size="sm">
                  Next
                </Button>
              </div>
            </div>
          )} */}
          </div>
        )}

        {/* No People Found */}
        {!loading && usersList.length === 0 && (
          <div className="lg:col-span-3 space-y-4 w-full">
            <div className="border-1 shadow-sm rounded-lg mx-auto py-12 px-8 max-md:px-5">
              <div className="flex justify-center items-center text-center">
                <div className="min-h-[300px] w-full flex flex-col items-center justify-center">
                  <User2Icon className="h-16 w-16 text-muted-foreground" />
                  <h2 className="text-lg font-semibold mt-4">Not found</h2>
                  <p className="text-gray-500 text-sm mt-2">
                    Please try adjusting your keyword
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
