import { NextResponse } from 'next/server'

// Proxies external images through our domain so the browser can draw them
// onto a Canvas without CORS errors (used for background removal in Hero).
export async function GET(request: Request) {
  const src = new URL(request.url).searchParams.get('src')
  if (!src) return new NextResponse('missing src', { status: 400 })

  try {
    const res = await fetch(src, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return new NextResponse('upstream error', { status: 502 })

    const buf = await res.arrayBuffer()
    const ct  = res.headers.get('content-type') || 'image/jpeg'

    return new NextResponse(buf, {
      headers: {
        'Content-Type':                ct,
        'Access-Control-Allow-Origin': '*',
        'Cache-Control':               'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch {
    return new NextResponse('fetch failed', { status: 502 })
  }
}
