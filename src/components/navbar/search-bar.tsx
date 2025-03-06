"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";

export default function SearchBar() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // prevent SSR mismatch

  return (
    <div className="relative hidden md:block max-w-xl w-full">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input
        className="pl-10 bg-muted/50"
        placeholder="Search for jobs, people, posts..."
      />
    </div>
  );
}
