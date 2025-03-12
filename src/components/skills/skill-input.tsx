import React, { useState } from "react";
import { Input } from "@/components/ui/input";

export default function SkillInput({
  addSkill,
}: {
  addSkill: (skill: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");
  const [filteredSkills, setFilteredSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "CSS",
    "HTML",
    "Python",
    "Java",
    "C#",
    "C++",
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
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSkills(filtered);
      setLoading(false);
    } else {
      setFilteredSkills([]);
    }
  };

  const handleSkillClick = (skill: string) => {
    addSkill(skill);
    setInputValue("");
    setFilteredSkills([]);
  };

  return (
    <div className="flex flex-col w-full">
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
        <div className="w-full bg-white border border-gray-200 rounded-md shadow mt-1">
          <ul>
            {filteredSkills.map((skill, index) => (
              <li
                className="hover:bg-gray-100 p-2 border-b border-gray-200 cursor-pointer"
                key={index}
                onClick={() => handleSkillClick(skill)}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
