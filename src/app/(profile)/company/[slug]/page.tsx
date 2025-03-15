import CompanyHeader from "@/components/company-profile/company-header";
import CompanyAbout from "@/components/company-profile/company-about";
import CompanyJobs from "@/components/company-profile/company-jobs";
import { CompanyAPI } from "@/api/Company";

const company = {
  headline: {
    id: "techcorp",
    name: "TechCorp Inc.",
    logo: "/placeholder.svg?height=128&width=128",
    cover: "/placeholder.svg?height=300&width=1200",
    industry: "Information Technology",

    about:
      "TechCorp Inc. is a leading technology company specializing in cloud solutions, software development, and digital transformation. We help businesses of all sizes leverage technology to drive growth and innovation. Our team of experts is dedicated to delivering high-quality solutions that meet the unique needs of our clients.",
  },
  company_jobs: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      location_type: "Remote",
      location: "San Francisco, CA",
      type: "Full-time",
      experience: "Senior Level",
      min_salary: 120000,
      max_salary: 150000,
      posted: "03-10-2025",
      description:
        "We're looking for a Senior Frontend Developer with 5+ years of experience in React, TypeScript, and modern frontend frameworks.",
      skills: [
        {
          id: "1",
          skill_id: "1",
          name: "React",
        },
      ],
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
      location_type: "Remote",
      experience: "Mid Level",
      type: "Full-time",
      min_salary: 120000,
      max_salary: 150000,
      posted: "02-10-2025",

      description:
        "Join our backend team to build scalable APIs and microservices using Node.js and Python.",
      skills: [
        {
          id: "2",
          skill_id: "2",
          name: "Vue",
        },
      ],
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
      location_type: "Remote",
      location: "Seattle, WA",
      experience: "Mid Level",
      min_salary: 120000,
      max_salary: 150000,
      type: "Full-time",
      posted: "02-10-2025",

      description:
        "Manage our cloud infrastructure and CI/CD pipelines to ensure smooth deployments.",
      skills: [
        {
          id: "31",
          skill_id: "31",
          name: "AWS",
        },
      ],
      applications: [],
    },
  ],
};
type tParams = Promise<{ slug: string }>;
export default async function CompanyProfilePage(props: { params: tParams }) {
  const { slug } = await props.params;

  const data = await CompanyAPI.getProfile({ slug: slug }).then((res) => {
    let { success, message, data } = res.data;

    data.company_jobs = data.company_jobs.map((application: any) => {
      application.applications = [
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
      ];
      return application;
    });

    return data;
  });

  const allowEdit = true;

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-8 py-8 max-md:px-4">
        <CompanyHeader companyData={data.company_info} allowEdit={allowEdit} />
        <CompanyAbout
          aboutData={data.company_info.about}
          allowEdit={allowEdit}
        />
        <CompanyJobs jobsData={data.company_jobs} allowEdit={allowEdit} />
      </div>
    </>
  );
}
