import { Resend } from "resend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FROM_EMAIL_PATTERN =
  /^(?:[^\r\n<>]+<\s*[^\s@]+@[^\s@]+\.[^\s@]+\s*>|[^\s@]+@[^\s@]+\.[^\s@]+)$/;

const sanitizeText = (value) => {
  return String(value || "").trim();
};

const escapeHtml = (value) => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};

const extractEmailAddress = (value) => {
  const trimmedValue = sanitizeText(value);
  const match = trimmedValue.match(/<([^>]+)>/);

  return match?.[1]?.trim() || trimmedValue;
};

const looksLikeUrl = (value) => /^https?:\/\//i.test(sanitizeText(value));

const jsonResponse = (payload, status = 200, headers = {}) => {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  });
};

export const config = {
  runtime: "nodejs",
  maxDuration: 15,
};

export const handleContactRequest = async (
  request,
  environment = process.env,
) => {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405, {
      Allow: "POST",
    });
  }

  const resendApiKey = sanitizeText(environment.RESEND_API_KEY);
  const resendFromEmail = sanitizeText(environment.RESEND_FROM_EMAIL);
  const contactToEmail = extractEmailAddress(
    environment.CONTACT_TO_EMAIL || resendFromEmail,
  );

  if (!resendApiKey || !resendFromEmail || !contactToEmail) {
    return jsonResponse(
      {
        error:
          "Email sending is not configured yet. Add RESEND_API_KEY and RESEND_FROM_EMAIL on the server.",
      },
      500,
    );
  }

  if (looksLikeUrl(resendFromEmail) || !FROM_EMAIL_PATTERN.test(resendFromEmail)) {
    return jsonResponse(
      {
        error:
          "Server email sender is misconfigured. Set RESEND_FROM_EMAIL to sender@example.com or Name <sender@example.com>.",
      },
      500,
    );
  }

  if (!EMAIL_PATTERN.test(contactToEmail)) {
    return jsonResponse(
      {
        error:
          "Server inbox is misconfigured. Set CONTACT_TO_EMAIL to a valid email address.",
      },
      500,
    );
  }

  let body;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request payload." }, 400);
  }

  const name = sanitizeText(body?.name);
  const email = sanitizeText(body?.email).toLowerCase();
  const message = sanitizeText(body?.message);

  if (name.length < 2) {
    return jsonResponse({ error: "Please enter your name." }, 400);
  }

  if (!EMAIL_PATTERN.test(email)) {
    return jsonResponse({ error: "Please enter a valid email address." }, 400);
  }

  if (message.length < 4) {
    return jsonResponse({ error: "Please enter a longer message." }, 400);
  }

  const resend = new Resend(resendApiKey);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");

  const { data, error } = await resend.emails.send({
    from: resendFromEmail,
    to: [contactToEmail],
    replyTo: email,
    subject: `New portfolio contact from ${name}`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;">
        <h2 style="margin:0 0 16px;">New portfolio contact message</h2>
        <p style="margin:0 0 8px;"><strong>Name:</strong> ${safeName}</p>
        <p style="margin:0 0 16px;"><strong>Email:</strong> ${safeEmail}</p>
        <p style="margin:0 0 8px;"><strong>Message:</strong></p>
        <p style="margin:0;">${safeMessage}</p>
      </div>
    `,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    return jsonResponse(
      { error: error.message || "Failed to send email." },
      502,
    );
  }

  return jsonResponse({
    id: data?.id,
    message: "Message sent successfully.",
  });
};

export default {
  async fetch(request) {
    return handleContactRequest(request);
  },
};
