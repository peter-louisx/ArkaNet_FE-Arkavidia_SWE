"use client";

import { useEffect, useState } from "react";
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
import { UserAPI } from "@/api/User";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Skills({
  skillsData,
  allowEdit = false,
}: {
  skillsData: {
    id?: string;
    skill_id: string;
    name: string;
  }[];
  allowEdit?: boolean;
}) {
  // Skills State
  const [skills, setSkills] = useState<
    {
      id?: string;
      name: string;
      skill_id: string;
    }[]
  >(skillsData);
  const router = useRouter();

  useEffect(() => {
    setSkills(skillsData);
  }, [skillsData]);

  // Update the addSkill function
  const addSkill = async (skillID: string, skillName: string) => {
    if (skillID && !skills.some((skill) => skill.skill_id === skillID)) {
      const newSkillObject: {
        skill_id: string;
        name: string;
      } = {
        skill_id: skillID,
        name: skillName,
      };

      await UserAPI.addSkill({
        skill_id: skillID,
      })
        .then((res) => {
          toast.success("Skill added successfully");
          router.refresh();
        })
        .catch((err) => {
          toast.error("Failed to add skill");
        });
    }
  };

  // Update the removeSkill function
  const removeSkill = async (id: string) => {
    await UserAPI.deleteSkill({
      id,
    })
      .then((res) => {
        toast.success("Skill deleted successfully");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Failed to delete skill");
      });
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
                  key={skill.skill_id}
                  variant="secondary"
                  className="group py-1.5 px-3"
                >
                  {skill.name}
                  {allowEdit && (
                    <button
                      onClick={() => removeSkill(skill.id ?? "")}
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
                <SkillInput addSkill={addSkill} />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
