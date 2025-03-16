"use client";

import {
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
  FormDescription,
} from "./form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { get } from "http";
import { useEffect, useState } from "react";

export function DatePicker({
  form,
  name,
  label,
  description = "",
  disabled = false,
}: {
  form: any;
  name: string;
  label: string;
  description?: string;
  disabled?: boolean;
}) {
  const convertedDate = new Date(form.getValues(name));

  let getDay = "";
  let getMonth = "";
  let getYear = "";

  if (convertedDate.getFullYear() == 1970) {
    getDay = "";
    getMonth = "";
    getYear = "";
  } else {
    getDay = convertedDate.getDate().toString();
    getMonth = (convertedDate.getMonth() + 1).toString();
    getYear = convertedDate.getFullYear().toString();
  }

  const [day, setDay] = useState(getDay);
  const [month, setMonth] = useState(getMonth);
  const [year, setYear] = useState(getYear);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from(
    { length: new Date().getFullYear() - 1970 + 1 },
    (_, i) => 1970 + i
  );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    console.log(day, month, year);
    if (day != "" && month != "" && year != "") {
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      form.setValue(name, date);
    }
  }, [day, month, year]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex space-x-2">
              <Select
                onValueChange={(value) => setDay(value)}
                disabled={disabled}
                value={day}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="empty" className="hidden"></SelectItem>
                    {days.map((d) => (
                      <SelectItem key={d} value={d.toString()}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => setMonth(value)}
                disabled={disabled}
                value={month}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {months.map((m) => (
                      <SelectItem key={m} value={m.toString()}>
                        {monthNames[m - 1]}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => setYear(value)}
                disabled={disabled}
                value={year}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {years.map((y) => (
                      <SelectItem key={y} value={y.toString()}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
