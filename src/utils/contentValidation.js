const DEFAULT_STORAGE_BUCKET = "portfolio-assets";

const asString = (value) => (typeof value === "string" ? value : "");
const trimText = (value, max = 2000) => asString(value).trim().slice(0, max);

const asArray = (value) => (Array.isArray(value) ? value : []);

const sanitizeText = (value, max = 160) => trimText(value, max);
const sanitizeLongText = (value, max = 4000) => trimText(value, max);

const sanitizeUrl = (value, options = {}) => {
  const {
    allowHash = true,
    allowRelative = true,
    allowMailto = false,
  } = options;
  const trimmed = trimText(value, 2048);

  if (!trimmed) {
    return "";
  }

  if (allowHash && trimmed.startsWith("#")) {
    return trimmed;
  }

  if (allowRelative && trimmed.startsWith("/")) {
    return trimmed;
  }

  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }

  if (allowMailto && /^mailto:/i.test(trimmed)) {
    return trimmed;
  }

  return "";
};

const buildStoragePrefix = (supabaseUrl, bucket) => {
  if (!supabaseUrl) {
    return "";
  }

  const baseUrl = supabaseUrl.replace(/\/$/, "");
  const bucketName = bucket || DEFAULT_STORAGE_BUCKET;

  return `${baseUrl}/storage/v1/object/public/${bucketName}/`;
};

const isSupabaseStorageUrl = (value, supabaseUrl, bucket) => {
  const trimmed = trimText(value, 2048);
  const prefix = buildStoragePrefix(supabaseUrl, bucket);

  if (!trimmed || !prefix) {
    return false;
  }

  return trimmed.startsWith(prefix);
};

const sanitizeImageUrl = (value, options = {}) => {
  const trimmed = trimText(value, 2048);

  if (!trimmed) {
    return "";
  }

  if (
    !isSupabaseStorageUrl(trimmed, options.supabaseUrl, options.storageBucket)
  ) {
    return "";
  }

  return trimmed;
};

const sanitizeTags = (value) =>
  asArray(value)
    .map((tag) => sanitizeText(tag, 40))
    .filter(Boolean)
    .slice(0, 12);

const sanitizeTechStack = (value) =>
  asArray(value)
    .map((item) => sanitizeText(item, 40))
    .filter(Boolean)
    .slice(0, 12);

const sanitizeSocials = (value) =>
  asArray(value)
    .map((social) => {
      const raw = social && typeof social === "object" ? social : {};

      return {
        name: sanitizeText(raw.name, 60),
        value: sanitizeText(raw.value, 140),
        iconKey: sanitizeText(raw.iconKey, 40),
        link: sanitizeUrl(raw.link, {
          allowHash: false,
          allowRelative: false,
          allowMailto: true,
        }),
        color: sanitizeText(raw.color, 120),
      };
    })
    .filter((social) => social.name || social.value || social.link);

const sanitizeSkillGroups = (value) =>
  asArray(value)
    .map((group) => {
      const rawGroup = group && typeof group === "object" ? group : {};
      const skills = asArray(rawGroup.skills)
        .map((skill) => {
          const rawSkill = skill && typeof skill === "object" ? skill : {};

          return {
            name: sanitizeText(rawSkill.name, 60),
            iconKey: sanitizeText(rawSkill.iconKey, 40),
            color: sanitizeText(rawSkill.color, 120),
          };
        })
        .filter((skill) => skill.name);

      return {
        category: sanitizeText(rawGroup.category, 80),
        skills,
      };
    })
    .filter((group) => group.category || group.skills.length > 0);

const sanitizeExperienceItems = (value) =>
  asArray(value)
    .map((item) => {
      const raw = item && typeof item === "object" ? item : {};

      return {
        title: sanitizeText(raw.title, 120),
        company: sanitizeText(raw.company, 120),
        year: sanitizeText(raw.year, 40),
        desc: sanitizeLongText(raw.desc, 800),
      };
    })
    .filter((item) => item.title || item.company || item.desc);

const sanitizeProjectItems = (value, options = {}) =>
  asArray(value)
    .map((item) => {
      const raw = item && typeof item === "object" ? item : {};

      return {
        title: sanitizeText(raw.title, 120),
        description: sanitizeLongText(raw.description, 1200),
        tags: sanitizeTags(raw.tags),
        image: sanitizeImageUrl(raw.image, options),
        link: sanitizeUrl(raw.link, { allowHash: false, allowRelative: false }),
        github: sanitizeUrl(raw.github, {
          allowHash: false,
          allowRelative: false,
        }),
      };
    })
    .filter(
      (item) => item.title || item.description || item.link || item.github,
    );

export const sanitizeSectionContent = (sectionKey, value, options = {}) => {
  const raw = value && typeof value === "object" ? value : {};

  switch (sectionKey) {
    case "hero":
      return {
        firstName: sanitizeText(raw.firstName, 60),
        lastName: sanitizeText(raw.lastName, 60),
        roleText: sanitizeText(raw.roleText, 120),
        primaryButtonText: sanitizeText(raw.primaryButtonText, 60),
        primaryButtonHref: sanitizeUrl(raw.primaryButtonHref, {
          allowHash: true,
          allowRelative: true,
        }),
        secondaryButtonText: sanitizeText(raw.secondaryButtonText, 60),
        secondaryButtonHref: sanitizeUrl(raw.secondaryButtonHref, {
          allowHash: true,
          allowRelative: true,
        }),
        imageSrc: sanitizeImageUrl(raw.imageSrc, options),
        imageAlt: sanitizeText(raw.imageAlt, 120),
      };
    case "about":
      return {
        fullText: sanitizeLongText(raw.fullText, 4000),
        profileImage: sanitizeImageUrl(raw.profileImage, options),
      };
    case "projects":
      return {
        titleLead: sanitizeText(raw.titleLead, 80),
        titleHighlight: sanitizeText(raw.titleHighlight, 80),
        description: sanitizeLongText(raw.description, 600),
        items: sanitizeProjectItems(raw.items, options),
      };
    case "skills":
      return {
        title: sanitizeText(raw.title, 80),
        subtitle: sanitizeLongText(raw.subtitle, 240),
        groups: sanitizeSkillGroups(raw.groups),
      };
    case "experience":
      return {
        title: sanitizeText(raw.title, 80),
        subtitle: sanitizeLongText(raw.subtitle, 240),
        items: sanitizeExperienceItems(raw.items),
      };
    case "contact":
      return {
        titleLead: sanitizeText(raw.titleLead, 80),
        titleHighlight: sanitizeText(raw.titleHighlight, 80),
        email: sanitizeText(raw.email, 120),
        description: sanitizeLongText(raw.description, 600),
        availabilityText: sanitizeText(raw.availabilityText, 120),
        socials: sanitizeSocials(raw.socials),
      };
    case "footer":
      return {
        headlinePrefix: sanitizeText(raw.headlinePrefix, 80),
        ownerName: sanitizeText(raw.ownerName, 80),
        rightsText: sanitizeText(raw.rightsText, 120),
        madeWithLabel: sanitizeText(raw.madeWithLabel, 80),
        techStack: sanitizeTechStack(raw.techStack),
        socials: sanitizeSocials(raw.socials),
      };
    default:
      return {};
  }
};

export const sanitizeSiteContent = (value, options = {}) => {
  const raw = value && typeof value === "object" ? value : {};

  return {
    hero: sanitizeSectionContent("hero", raw.hero, options),
    about: sanitizeSectionContent("about", raw.about, options),
    projects: sanitizeSectionContent("projects", raw.projects, options),
    skills: sanitizeSectionContent("skills", raw.skills, options),
    experience: sanitizeSectionContent("experience", raw.experience, options),
    contact: sanitizeSectionContent("contact", raw.contact, options),
    footer: sanitizeSectionContent("footer", raw.footer, options),
  };
};
