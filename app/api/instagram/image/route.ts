import { NextRequest, NextResponse } from "next/server";

const REVALIDATE_SECONDS = 900;
const ALLOWED_HOSTS = ["cdninstagram.com", "fbcdn.net"];

export const revalidate = 900;

function isAllowedInstagramHost(hostname: string): boolean {
  return ALLOWED_HOSTS.some((suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`));
}

export async function GET(request: NextRequest) {
  const fallbackImageUrl = new URL("/images/instagram/post-1.svg", request.url);
  const rawUrl = request.nextUrl.searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.json({ error: "Missing image url parameter." }, { status: 400 });
  }

  let parsedUrl: URL;

  try {
    parsedUrl = new URL(rawUrl);
  } catch {
    return NextResponse.json({ error: "Invalid image url parameter." }, { status: 400 });
  }

  if (parsedUrl.protocol !== "https:" || !isAllowedInstagramHost(parsedUrl.hostname)) {
    return NextResponse.json({ error: "Image host is not allowed." }, { status: 400 });
  }

  try {
    const upstream = await fetch(parsedUrl.toString(), {
      headers: {
        Accept: "image/*",
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        Referer: "https://www.instagram.com/"
      },
      next: { revalidate: REVALIDATE_SECONDS }
    });

    if (!upstream.ok || !upstream.body) {
      return NextResponse.redirect(fallbackImageUrl, 307);
    }

    const contentType = upstream.headers.get("content-type") ?? "image/jpeg";
    const cacheControl =
      upstream.headers.get("cache-control") ??
      `public, max-age=${REVALIDATE_SECONDS}, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=86400`;

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": cacheControl
      }
    });
  } catch {
    return NextResponse.redirect(fallbackImageUrl, 307);
  }
}
