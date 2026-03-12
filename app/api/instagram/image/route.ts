import { NextRequest, NextResponse } from "next/server";

const REVALIDATE_SECONDS = 900;
const ALLOWED_HOST_SUFFIXES = ["cdninstagram.com", "fbcdn.net"];

export const runtime = "edge";
export const revalidate = 900;

function isAllowedHost(hostname: string): boolean {
  return ALLOWED_HOST_SUFFIXES.some((suffix) => hostname === suffix || hostname.endsWith(`.${suffix}`));
}

export async function GET(request: NextRequest) {
  const fallbackImageUrl = new URL("/images/instagram/post-1.svg", request.url);
  const rawUrl = request.nextUrl.searchParams.get("url");

  if (!rawUrl) {
    return NextResponse.redirect(fallbackImageUrl, 307);
  }

  let imageUrl: URL;

  try {
    imageUrl = new URL(rawUrl);
  } catch {
    return NextResponse.redirect(fallbackImageUrl, 307);
  }

  if (imageUrl.protocol !== "https:" || !isAllowedHost(imageUrl.hostname)) {
    return NextResponse.redirect(fallbackImageUrl, 307);
  }

  try {
    const upstream = await fetch(imageUrl.toString(), {
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

    return new NextResponse(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": `public, max-age=${REVALIDATE_SECONDS}, s-maxage=${REVALIDATE_SECONDS}, stale-while-revalidate=86400`
      }
    });
  } catch {
    return NextResponse.redirect(fallbackImageUrl, 307);
  }
}
