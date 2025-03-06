"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function Skills({
  skillsData,
}: {
  skillsData: {
    id: number;
    name: string;
  }[];
}) {
  // Skills State
  const [skills, setSkills] = useState<
    {
      id: number;
      name: string;
    }[]
  >(skillsData);

  const [newSkillName, setNewSkillName] = useState("");

  // Update the addSkill function
  const addSkill = () => {
    if (
      newSkillName.trim() &&
      !skills.some(
        (skill) =>
          skill.name.toLowerCase() === newSkillName.trim().toLowerCase()
      )
    ) {
      const newSkill: {
        id: number;
        name: string;
      } = {
        id: Date.now(),
        name: newSkillName.trim(),
      };
      setSkills([...skills, newSkill]);
      setNewSkillName("");
    }
  };

  // Update the removeSkill function
  const removeSkill = (id: number) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Skills</CardTitle>
            <CardDescription>Add your key skills and expertise</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="group py-1.5 px-3"
                >
                  {skill.name}
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add a new skill"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addSkill();
                  }
                }}
              />
              <Button onClick={addSkill} type="button">
                Add
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
