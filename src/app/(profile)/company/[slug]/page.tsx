import CompanyHeader from "@/components/company-profile/company-header";
import CompanyAbout from "@/components/company-profile/company-about";
import CompanyJobs from "@/components/company-profile/company-jobs";

const company = {
  headline: {
    id: "techcorp",
    name: "TechCorp Inc.",
    logo: "/placeholder.svg?height=128&width=128",
    cover: "/placeholder.svg?height=300&width=1200",
    industry: "Information Technology",

    about:
      "TechCorp Inc. is a leading technology company specializing in cloud solutions, software development, and digital transformation. We help businesses of all sizes leverage technology to drive growth and innovation. Our team of experts is dedicated to delivering high-quality solutions that meet the unique needs of our clients.",
    specialties: [
      "Cloud Computing",
      "Software Development",
      "AI & Machine Learning",
      "Digital Transformation",
      "Enterprise Solutions",
    ],
  },
  about:
    "TechCorp Inc. is a leading technology company specializing in cloud solutions, software development, and digital transformation. We help businesses of all sizes leverage technology to drive growth and innovation. Our team of experts is dedicated to delivering high-quality solutions that meet the unique needs of our clients.",
  jobs: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "Senior Level",
      salary: "$120,000 - $150,000",
      posted: "2 days ago",
      description:
        "We're looking for a Senior Frontend Developer with 5+ years of experience in React, TypeScript, and modern frontend frameworks.",
      skills: ["React", "TypeScript", "Next.js", "CSS"],
      applications: [
        {
          id: 1,
          jobId: 1,
          applicant: {
            name: "Jane Smith",
            title: "Senior Frontend Developer",
            photo: "/placeholder.svg?height=48&width=48",
          },
          date: "2023-05-15",
          status: "Under Review",
          resume: "resume-jane-smith.pdf",
          coverLetter: true,
        },
        {
          id: 2,
          jobId: 1,
          applicant: {
            name: "Michael Johnson",
            title: "Frontend Engineer",
            photo: "/placeholder.svg?height=48&width=48",
          },
          date: "2023-05-14",
          status: "Under Review",
          resume: "resume-michael-johnson.pdf",
          coverLetter: true,
        },
      ],
    },
    {
      id: 2,
      title: "Backend Engineer",
      location: "Austin, TX",
      experience: "Mid Level",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      posted: "1 week ago",
      description:
        "Join our backend team to build scalable APIs and microservices using Node.js and Python.",
      skills: ["Node.js", "Python", "AWS", "MongoDB"],
      applications: [
        {
          id: 3,
          jobId: 1,
          applicant: {
            name: "Emily Davis",
            title: "UI Developer",
            photo:
              "https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg",
          },
          date: "2023-05-13",
          status: "Rejected",
        },
        {
          id: 4,
          jobId: 2,
          applicant: {
            name: "David Wilson",
            title: "Backend Developer",
            photo:
              "https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg",
          },
          date: "2023-05-12",
          status: "Interview Scheduled",
        },
        {
          id: 5,
          jobId: 2,
          applicant: {
            name: "Sarah Brown",
            title: "Full Stack Developer",
            photo:
              "https://img.freepik.com/free-photo/young-adult-man-wearing-hoodie-beanie_23-2149393636.jpg",
          },
          date: "2023-05-11",
          status: "Under Review",
        },
      ],
    },
    {
      id: 3,
      title: "DevOps Engineer",
      location: "Seattle, WA",
      experience: "Mid Level",
      type: "Full-time",
      salary: "$130,000 - $160,000",
      posted: "5 days ago",
      description:
        "Manage our cloud infrastructure and CI/CD pipelines to ensure smooth deployments.",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      applications: [],
    },
    {
      id: 4,
      title: "Product Manager",
      location: "Chicago, IL",
      experience: "Senior Level",
      type: "Full-time",
      salary: "$115,000 - $145,000",
      posted: "1 day ago",
      description:
        "Lead product development from conception to launch, working with cross-functional teams.",
      skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"],
      applications: [],
    },
  ],
};

export default function CompanyProfilePage() {
  return (
    <>
      <div className="max-w-4xl mx-auto space-y-8 py-4">
        <CompanyHeader companyData={company.headline} />
        <CompanyAbout aboutData={company.about} />
        <CompanyJobs jobsData={company.jobs} />
      </div>
    </>
  );
}
