import { getSupabaseAdminClient } from "@/lib/supabase";
import { jsonError, jsonSuccess } from "@/lib/api-response";
import { hasEnvVars, missingEnvVars } from "@/lib/env-guard";

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxFileSizeBytes = 10 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    if (!hasEnvVars(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"])) {
      return jsonError("Photo upload is temporarily unavailable. Please try again shortly.", {
        status: 503,
        code: "UPLOAD_SERVICE_UNAVAILABLE",
        details: {
          missing: missingEnvVars(["NEXT_PUBLIC_SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"])
        }
      });
    }

    const formData = await request.formData();
    const files = formData.getAll("files").filter((entry): entry is File => entry instanceof File);
    const bookingId = String(formData.get("bookingId") || "draft");
    const photoKind = String(formData.get("photoKind") || "other");

    if (!files.length) {
      return jsonError("No files provided", { status: 400, code: "NO_FILES" });
    }

    const supabase = getSupabaseAdminClient();
    const uploaded: {
      path: string;
      fileName: string;
      mimeType: string;
      sizeBytes: number;
      photoKind: string;
    }[] = [];

    for (const file of files) {
      if (!allowedMimeTypes.has(file.type)) {
        return jsonError(`Unsupported file type: ${file.type}`, {
          status: 400,
          code: "UNSUPPORTED_FILE_TYPE"
        });
      }

      if (file.size > maxFileSizeBytes) {
        return jsonError(`File too large: ${file.name}`, { status: 400, code: "FILE_TOO_LARGE" });
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const path = `${bookingId}/${Date.now()}-${file.name}`;

      const { error } = await supabase.storage.from("booking-photos").upload(path, buffer, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false
      });

      if (error) {
        throw new Error(error.message);
      }

      uploaded.push({
        path,
        fileName: file.name,
        mimeType: file.type,
        sizeBytes: file.size,
        photoKind
      });
    }

    return jsonSuccess({ uploaded });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Upload failed", {
      status: 400,
      code: "UPLOAD_FAILED"
    });
  }
}
