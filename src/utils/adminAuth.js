const parseAdminEmailList = () => {
  const raw = import.meta.env.VITE_ADMIN_EMAILS || "";

  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
};

export const allowedAdminEmails = parseAdminEmailList();

export const isAdminEmailAllowed = (email) => {
  if (!email) {
    return false;
  }

  if (allowedAdminEmails.length === 0) {
    return true;
  }

  return allowedAdminEmails.includes(email.toLowerCase());
};
