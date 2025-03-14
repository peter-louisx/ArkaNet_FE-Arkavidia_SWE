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
      id: "1",
      name: "React",
    },
    {
      id: "2",
      name: "Vue",
    },
    {
      id: "3",
      name: "Angular",
    },
    {
      id: "4",
      name: "Svelte",
    },
    {
      id: "5",
      name: "Ember",
    },
    {
      id: "6",
      name: "Backbone",
    },
    {
      id: "7",
      name: "Meteor",
    },
    {
      id: "8",
      name: "Aurelia",
    },
    {
      id: "9",
      name: "Polymer",
    },
    {
      id: "10",
      name: "Knockout",
    },
    {
      id: "11",
      name: "Vanilla JS",
    },
    {
      id: "12",
      name: "jQuery",
    },
    {
      id: "13",
      name: "Lodash",
    },
    {
      id: "14",
      name: "Underscore",
    },
    {
      id: "15",
      name: "Ramda",
    },
    {
      id: "16",
      name: "Redux",
    },
    {
      id: "17",
      name: "MobX",
    },
    {
      id: "18",
      name: "RxJS",
    },
    {
      id: "19",
      name: "Ngrx",
    },
    {
      id: "20",
      name: "Vuex",
    },
    {
      id: "21",
      name: "React Router",
    },
    {
      id: "22",
      name: "Vue Router",
    },
    {
      id: "23",
      name: "Angular Router",
    },
    {
      id: "24",
      name: "Svelte Router",
    },
    {
      id: "25",
      name: "Ember Router",
    },
    {
      id: "26",
      name: "Backbone Router",
    },
    {
      id: "27",
      name: "Meteor Router",
    },
    {
      id: "28",
      name: "Aurelia Router",
    },
    {
      id: "29",
      name: "Polymer Router",
    },
    {
      id: "30",
      name: "Knockout Router",
    },
    {
      id: "31",
      name: "AWS",
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
