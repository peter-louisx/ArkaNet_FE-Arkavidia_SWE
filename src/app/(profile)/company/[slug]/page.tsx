import CompanyHeader from "@/components/company-profile/company-header";
import CompanyAbout from "@/components/company-profile/company-about";
import CompanyJobs from "@/components/company-profile/company-jobs";
import { CompanyAPI } from "@/api/Company";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/session";

type tParams = Promise<{ slug: string }>;
export default async function CompanyProfilePage(props: { params: tParams }) {
  const { slug } = await props.params;

  const { isAuthenticated, user } = await verifySession();

  const data = await CompanyAPI.getProfile({ slug: slug })
    .then((res) => {
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
    })
    .catch((err) => {
      redirect("/404");
    });

  const allowEdit =
    isAuthenticated && user.slug == slug && user.role == "company";

  return (
    <>
      <div className="max-w-4xl mx-auto space-y-8 py-8 max-md:px-4">
        <CompanyHeader companyData={data.company_info} allowEdit={allowEdit} />
        <CompanyAbout companyData={data.company_info} allowEdit={allowEdit} />
        <CompanyJobs
          companyID={data.company_info.id}
          jobsData={data.company_jobs}
          allowEdit={allowEdit}
          company_slug={slug}
        />
      </div>
    </>
  );
}
