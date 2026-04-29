export const getContactEmail = (contact) => {
  const directEmail = contact?.email?.trim();

  if (directEmail) {
    return directEmail;
  }

  const emailSocial = (contact?.socials || []).find((social) => {
    if (social?.iconKey === "email" && social?.value) {
      return true;
    }

    return typeof social?.link === "string" && social.link.startsWith("mailto:");
  });

  if (!emailSocial) {
    return "";
  }

  if (emailSocial.value?.includes("@")) {
    return emailSocial.value.trim();
  }

  if (emailSocial.link?.startsWith("mailto:")) {
    return emailSocial.link.replace(/^mailto:/i, "").trim();
  }

  return "";
};

export const getMailToHref = (contact) => {
  const email = getContactEmail(contact);

  return email ? `mailto:${email}` : "#contact";
};
