import PersonalInfo from "@/components/seeker-profile/personal-info";
import About from "@/components/seeker-profile/about";
import Experience from "@/components/seeker-profile/experience";
import Education from "@/components/seeker-profile/education";
import Skills from "@/components/seeker-profile/skills";
import { UserAPI } from "@/api/User";

export default async function Page({ params }: { params: { slug: string } }) {
  const data = {
    personalInfo: {
      name: "John Doe",
      headline: "Senior Software Engineer at TechCorp Inc.",
      cover: "/placeholder.svg?height=300&width=1200",
      profilePicture: "/placeholder.svg?height=128&width=128",
      location: "San Francisco, California",
    },
    about:
      "Experienced software engineer with a passion for building scalable web applications. Skilled in JavaScript, React, and Node.js. Strong team leadership and project management abilities.",
    experience: [
      {
        id: 1,
        title: "Senior Software Engineer",
        company: "TechCorp Inc.",
        location: "San Francisco, CA",
        startDate: new Date("01-01-2020"),
        endDate: null,
        description:
          "Led development of cloud-based solutions for enterprise clients. Managed a team of 5 developers and implemented CI/CD pipelines.",
      },
      {
        id: 2,
        title: "Software Developer",
        company: "InnovateTech",
        location: "Austin, TX",
        startDate: new Date("01-01-2018"),
        endDate: new Date("01-01-2020"),
        description:
          "Developed and maintained web applications using React and Node.js. Collaborated with design team to implement UI/UX improvements.",
      },
    ],
    education: [
      {
        id: 1,
        school: "Stanford University",
        degree: "Master of Science",
        field: "Computer Science",
        startDate: new Date("01-01-2020"),
        endDate: new Date("01-01-2022"),
        description:
          "Specialized in Artificial Intelligence and Machine Learning. Thesis on neural networks for natural language processing.",
      },
      {
        id: 2,
        school: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: new Date("01-01-2011"),
        endDate: new Date("01-01-2015"),
        description:
          "Dean's List, Computer Science Student Association, Hackathon Winner",
      },
    ],
    skills: [
      { id: 1, name: "JavaScript" },
      { id: 2, name: "React" },
      { id: 3, name: "Node.js" },
      { id: 4, name: "TypeScript" },
      { id: 5, name: "Python" },
      { id: 6, name: "AWS" },
      { id: 7, name: "Docker" },
      { id: 8, name: "Kubernetes" },
      { id: 9, name: "GraphQL" },
      { id: 10, name: "SQL" },
      { id: 11, name: "Project Management" },
      { id: 12, name: "Team Leadership" },
      { id: 13, name: "Agile Methodologies" },
    ],
  };

  const profileData = await UserAPI.getProfile({
    slug: params.slug,
  }).then((res) => {
    const { success, message, data } = res.data;
    data.experiences.forEach((experience: any) => {
      experience.startDate = new Date(experience.startDate);
      experience.endDate = experience.endDate
        ? new Date(experience.endDate)
        : null;
    });

    data.educations.forEach((education: any) => {
      education.startDate = new Date(education.startDate);
      education.endDate = new Date(education.endDate);
    });

    return data;
  });

  const allowEdit = true;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <PersonalInfo
          personalInfoData={profileData.personal_info}
          allowEdit={allowEdit}
        />

        {/* About */}
        <About
          aboutData={profileData.personal_info.about}
          allowEdit={allowEdit}
        />

        {/* Experience */}
        <Experience
          experienceData={profileData.experiences}
          allowEdit={allowEdit}
        />

        {/* Education */}
        <Education
          educationData={profileData.educations}
          allowEdit={allowEdit}
        />

        {/* Skills */}
        <Skills skillsData={profileData.skills} allowEdit={allowEdit} />
      </div>
    </div>
  );
}
