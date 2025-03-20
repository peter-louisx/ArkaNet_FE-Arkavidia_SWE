import PersonalInfo from "@/components/seeker-profile/personal-info";
import About from "@/components/seeker-profile/about";
import Experience from "@/components/seeker-profile/experience";
import Education from "@/components/seeker-profile/education";
import Skills from "@/components/seeker-profile/skills";
import { UserAPI } from "@/api/User";
import { getUserCookie } from "@/lib/session";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/session";
import PostSection from "@/components/post/post-section";

type tParams = Promise<{ slug: string }>;

export default async function Page(props: { params: tParams }) {
  const { slug } = await props.params;

  const { isAuthenticated, user } = await verifySession();

  const profileData = await UserAPI.getProfile({
    slug: slug,
  })
    .then((res) => {
      const { success, message, data } = res.data;
      data.experiences.forEach((experience: any) => {
        experience.startDate = new Date(experience.startDate);
        experience.endDate =
          experience.endDate == "01-01-1970"
            ? null
            : new Date(experience.endDate);
      });

      data.educations.forEach((education: any) => {
        education.startDate = new Date(education.startDate);
        education.endDate = new Date(education.endDate);
      });

      return data;
    })
    .catch((err) => {
      redirect("/404");
    });

  const allowEdit = isAuthenticated && user.slug == slug && user.role == "user";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <PersonalInfo
          personalInfoData={profileData.personal_info}
          allowEdit={allowEdit}
          canChat={isAuthenticated}
        />

        {/* About */}
        <About
          personalInfoData={profileData.personal_info}
          allowEdit={allowEdit}
        />

        <PostSection allowEdit={allowEdit} posts={profileData.posts} />

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
