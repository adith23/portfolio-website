import React from "react";
import { MapPin, Contact, BriefcaseBusiness, SkullIcon } from "lucide-react";
import { getFeaturedProjects, getProfile } from "@/lib/content";
import { buildPersonJsonLd, buildWebsiteJsonLd } from "@/lib/jsonld";
import { ThemeToggle, ExpandableSection } from "@/components/interactive-ui";

// --- REUSABLE UI COMPONENTS ---

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({ children, className = "" }) => (
  <span
    className={`inline-flex items-center rounded-full border border-gray-300 px-2.5 py-0.5 text-xs font-medium text-gray-800 bg-white ${className}`}
  >
    {children}
  </span>
);

// --- DOMAIN COMPONENTS ---

const ProfileHeader: React.FC<{ profile: any }> = ({ profile }) => {
  return (
    <header className="relative flex flex-col items-center pt-12 pb-8 text-center">
      <ThemeToggle />

      <div className="relative mb-4">
        <img
          src={profile.avatar?.url || "https://api.dicebear.com/7.x/avataaars/svg?seed=Cezar"}
          alt={profile.avatar?.alt || "Profile Avatar"}
          className="w-24 h-24 rounded-full object-cover border border-gray-200 shadow-sm filter grayscale"
        />
      </div>

      <div className="flex items-center gap-3 mb-1">
        {/* Fallback to "Cezar Kelso" if profile.name isn't defined in CMS yet */}
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          {profile.fullName  || "Cezar Kelso"}
        </h1>
      </div>

      <p className="text-lg text-gray-700 mb-2">
        {profile.headline || "Senior Detective"}
      </p>  

      <div className="flex items-center text-gray-500 text-sm">
        <MapPin size={16} className="mr-1.5" />
        <span>Colombo, Sri Lanka</span>
      </div>
    </header>
  );
};

const ExperienceCard: React.FC<{ project: any }> = ({ project }) => {
  return (
    <article className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900 uppercase tracking-wide">
          {project.title}
        </h3>
        <Badge>{project.period || "Recent Work"}</Badge>
      </div>

      <div className="flex items-center text-gray-500 text-sm mb-4">
        <MapPin size={14} className="mr-1.5" />
        <span>
          {project.projectUrl ? (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              View Project
            </a>
          ) : (
            "Remote"
          )}
        </span>
      </div>

      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li className="pl-1">{project.description}</li>
        {project.technologies && project.technologies.length > 0 && (
          <li className="pl-1">
            Technologies: {project.technologies.join(", ")}
          </li>
        )}
      </ul>
    </article>
  );
};

// --- MAIN PAGE LAYOUT ---

export default async function HomePage() {
  const [profile, featuredProjects] = await Promise.all([
    getProfile(),
    getFeaturedProjects(),
  ]);

  return (
    <main className="min-h-screen bg-[#fafafa] font-sans selection:bg-gray-200">
      <div className="max-w-8xl mx-auto px-6 py-8 md:py-12 bg-white min-h-screen shadow-sm relative">
        <ProfileHeader profile={profile} />

        <div className="max-w-6xl mx-auto px-2 md:px-8">
          <ExpandableSection
            title="About"
            icon={<Contact size={28} strokeWidth={1.5} />}
          >
            <p className="text-gray-700 leading-relaxed text-base">
              {/* Gracefully fallbacks to hardcoded text if CMS is empty */}
              {profile.longBio ||
                profile.shortBio ||
                "Highly skilled and experienced professional..."}
            </p>
          </ExpandableSection>

          <ExpandableSection
            title="Skills"
            icon={<BriefcaseBusiness size={28} strokeWidth={1.5} />}
          >
            <div className="space-y-6">
              {featuredProjects && featuredProjects.length > 0 ? (
                featuredProjects.map((project: any) => (
                  <ExperienceCard key={project.slug} project={project} />
                ))
              ) : (
                <ExperienceCard
                  project={{
                    title: "SENIOR DETECTIVE",
                    period: "1990 - Present",
                    description:
                      "Lead investigations into organized crime, drug trafficking, and high-profile homicide cases.",
                    technologies: ["Investigation", "Leadership"],
                  }}
                />
              )}
            </div>
          </ExpandableSection>

          <ExpandableSection
            title="Work"
            icon={<BriefcaseBusiness size={28} strokeWidth={1.5} />}
          >
            <div className="space-y-6">
              {featuredProjects && featuredProjects.length > 0 ? (
                featuredProjects.map((project: any) => (
                  <ExperienceCard key={project.slug} project={project} />
                ))
              ) : (
                <ExperienceCard
                  project={{
                    title: "SENIOR DETECTIVE",
                    period: "1990 - Present",
                    description:
                      "Lead investigations into organized crime, drug trafficking, and high-profile homicide cases.",
                    technologies: ["Investigation", "Leadership"],
                  }}
                />
              )}
            </div>
          </ExpandableSection>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            buildPersonJsonLd(profile),
            buildWebsiteJsonLd(),
          ]),
        }}
      />
    </main>
  );
}
