import { isSupabaseConfigured, supabase } from "./client";

const storageBucket =
  import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || "portfolio-assets";

const isSessionMissingError = (error) => {
  const errorMessage = error?.message?.toLowerCase() || "";

  return (
    error?.name === "AuthSessionMissingError" ||
    errorMessage.includes("auth session missing")
  );
};

const toSafeFileName = (fileName) => {
  const extension = fileName.includes(".")
    ? fileName.split(".").pop()?.toLowerCase()
    : "bin";
  const baseName = fileName.replace(/\.[^/.]+$/, "");
  const safeBaseName = baseName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

  const normalizedBaseName = safeBaseName || "file";
  const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  return `${normalizedBaseName}-${uniqueSuffix}.${extension}`;
};

export const getStorageBucketName = () => storageBucket;

export const uploadPortfolioImage = async ({ file, folder = "general" }) => {
  if (!file) {
    throw new Error("No file selected.");
  }

  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY.",
    );
  }

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();

  if (sessionError && !isSessionMissingError(sessionError)) {
    throw new Error(sessionError.message || "Failed to validate auth session.");
  }

  if (!sessionData?.session) {
    throw new Error("Your admin session has expired. Please log in again.");
  }

  const objectPath = `${folder}/${toSafeFileName(file.name)}`;

  const { error: uploadError } = await supabase.storage
    .from(storageBucket)
    .upload(objectPath, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type || undefined,
    });

  if (uploadError) {
    const uploadMessage = uploadError.message || "Upload failed.";

    if (uploadMessage.toLowerCase().includes("auth session missing")) {
      throw new Error("Your admin session has expired. Please log in again.");
    }

    throw new Error(uploadMessage);
  }

  const { data: publicUrlData } = supabase.storage
    .from(storageBucket)
    .getPublicUrl(objectPath);

  if (!publicUrlData?.publicUrl) {
    throw new Error("Upload succeeded but public URL was not returned.");
  }

  return {
    bucket: storageBucket,
    path: objectPath,
    publicUrl: publicUrlData.publicUrl,
  };
};
