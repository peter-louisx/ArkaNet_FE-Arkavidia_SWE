import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { SkillAPI } from "@/api/Skill";
import { showErrorToast } from "@/lib/show-toast";

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

  const [skills, setSkills] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);

  const fetchSkills = async () => {
    await SkillAPI.getSkills()
      .then((response) => {
        const { success, message, data } = response.data;
        setSkills(data);
      })
      .catch((error) => {
        showErrorToast("Failed to fetch skills");
      });
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      setLoading(true);

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
