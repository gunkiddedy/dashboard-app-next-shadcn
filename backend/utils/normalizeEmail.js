const normalizeEmail = (email) => {
  if (!email) return "";

  // Convert the entire email to lowercase
  email = email.trim().toLowerCase();

  // Split local part and domain
  const [localPart, domain] = email.split("@");

  // Gmail-specific normalization (ignoring dots in the local part)
  if (domain === "gmail.com" || domain === "googlemail.com") {
    return localPart.replace(/\./g, "") + "@gmail.com";
  }

  return `${localPart}@${domain}`;
};

module.exports = normalizeEmail;
