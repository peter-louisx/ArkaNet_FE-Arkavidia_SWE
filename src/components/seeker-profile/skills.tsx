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
import { SeekerSkill } from "@/types/seeker/types";
import { showErrorToast, showSuccessToast } from "@/lib/show-toast";

export default function Skills({
  skillsData,
  allowEdit = false,
}: {
  skillsData: SeekerSkill[];
  allowEdit?: boolean;
}) {
  const router = useRouter();
  const [skills, setSkills] = useState<SeekerSkill[]>(skillsData);

  useEffect(() => {
    setSkills(skillsData);
  }, [skillsData]);

  const addSkill = async (skillID: string, skillName: string) => {
    if (skillID && !skills.some((skill) => skill.skill_id === skillID)) {
      await UserAPI.addSkill({
        skill_id: skillID,
      })
        .then((res) => {
          showSuccessToast("Skill added successfully");
          router.refresh();
        })
        .catch((err) => {
          showErrorToast("Failed to add skill");
        });
    }
  };

  const removeSkill = async (id: string) => {
    await UserAPI.deleteSkill({
      id,
    })
      .then((res) => {
        showSuccessToast("Skill deleted successfully");
        router.refresh();
      })
      .catch((err) => {
        showErrorToast("Failed to delete skill");
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
