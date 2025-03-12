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
import SkillInput from "../skills/skill-input";

export default function Skills({
  skillsData,
  allowEdit = false,
}: {
  skillsData: {
    id: number;
    name: string;
  }[];
  allowEdit?: boolean;
}) {
  // Skills State
  const [skills, setSkills] = useState<
    {
      id: number;
      name: string;
    }[]
  >(skillsData);

  // Update the addSkill function
  const addSkill = (newSkill: string) => {
    if (
      newSkill.trim() &&
      !skills.some(
        (skill) => skill.name.toLowerCase() === newSkill.trim().toLowerCase()
      )
    ) {
      const newSkillObject: {
        id: number;
        name: string;
      } = {
        id: Date.now(),
        name: newSkill.trim(),
      };
      setSkills([...skills, newSkillObject]);
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
                  {allowEdit && (
                    <button
                      onClick={() => removeSkill(skill.id)}
                      className="ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
            {allowEdit && (
              <div className="flex gap-2">
                {/* <Input
                  placeholder="Add a new skill"
                  value={newSkillName}
                  onChange={(e) => setNewSkillName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                /> */}
                <SkillInput addSkill={addSkill} />
                {/* <Button onClick={addSkill} type="button">
                  Add
                </Button> */}
                {/* <SkillInput /> */}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
