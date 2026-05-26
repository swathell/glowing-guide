import { NextResponse } from "next/server";
import type { ApiFailure, ApiSuccess } from "@/lib/http";

export function jsonSuccess<T>(data: T, init?: ResponseInit) {
  return NextResponse.json<ApiSuccess<T>>(
    {
      ok: true,
      data
    },
    init
  );
}

export function jsonError(
  error: string,
  init?: ResponseInit & { code?: string; details?: unknown }
) {
  return NextResponse.json<ApiFailure>(
    {
      ok: false,
      error,
      code: init?.code,
      details: init?.details
    },
    init
  );
}
