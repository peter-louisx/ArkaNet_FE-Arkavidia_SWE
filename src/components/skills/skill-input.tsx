import React, { useState } from "react";
import { Input } from "@/components/ui/input";

export default function SkillInput({
  addSkill,
}: {
  addSkill: (skillID: string, skillName: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const skills = [
    {
      id: "b9e31a75-2852-4a28-a2a2-c8d900396444",
      name: "React",
      created_at: null,
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "40be58e8-20f0-41e3-84ec-60dd97e7f92d",
      name: "AngularJS",
      created_at: null,
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "cfa78db7-67c1-4886-8709-b81dfd3abf99",
      name: "AWS",
      created_at: null,
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "108d1dcc-7541-4b40-885d-b2632aab79b7",
      name: "Docker",
      created_at: null,
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "f6c96854-99f6-474d-a52c-0a7224afa2e8",
      name: "TypeScript",
      created_at: null,
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "4509850d-4ead-4fda-8439-e6111c0962c0",
      name: "Next.js",
      created_at: null,
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "e043b5f1-60c7-41f8-b7ab-bb731e9b2de1",
      name: "Python",
      created_at: null,
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "6bf0a983-7a35-4e46-996f-5de89bd2822b",
      name: "Docker",
      created_at: null,
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "55b6ca9a-64b2-4a78-a22a-01baa056e1c0",
      name: "Kubernetes",
      created_at: null,
      updated_at: null,
      deleted_at: null,
    },
    {
      id: "87e4f075-2cab-4a48-b63e-eaca97cf082a",
      name: "CI/CD",
      created_at: null,
      updated_at: null,
      deleted_at: null,
    },
  ];

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      setLoading(true);
      // Simulate an async operation
      await new Promise((resolve) => setTimeout(resolve, 500));
      const filtered = skills.filter((skill) =>
        skill.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkills(filtered);
      setLoading(false);
    } else {
      setFilteredSkills([]);
    }
  };

  const handleSkillClick = (skill: { id: string; name: string }) => {
    addSkill(skill.id, skill.name);
    setInputValue("");
    setFilteredSkills([]);
  };

  return (
    <div className="flex flex-col w-full relative">
      <Input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="w-full"
        placeholder="Type a skill..."
      />
      {loading && (
        <div className="w-full bg-white border border-gray-200 rounded-md shadow mt-1 text-center p-4">
          Loading...
        </div>
      )}
      {!loading && filteredSkills.length > 0 && (
        <div className="w-full bg-white border border-gray-200 rounded-md shadow mt-10 overflow-y-scroll max-h-[140px] absolute">
          <ul>
            {filteredSkills.map((skill, index) => (
              <li
                className="hover:bg-gray-100 p-2 border-b border-gray-200 cursor-pointer"
                key={index}
                onClick={() => handleSkillClick(skill)}
              >
                {skill.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
