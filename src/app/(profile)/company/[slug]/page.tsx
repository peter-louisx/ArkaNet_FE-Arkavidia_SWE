import CompanyHeader from "@/components/company-profile/company-header";
import CompanyAbout from "@/components/company-profile/company-about";
import CompanyJobs from "@/components/company-profile/company-jobs";

export default function CompanyProfilePage() {
  return (
    <>
      <div className="max-w-4xl mx-auto space-y-8 py-4">
        <CompanyHeader />
        <CompanyAbout />
        <CompanyJobs />
      </div>
    </>
  );
}
