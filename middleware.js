import { NextResponse } from 'next/server';

export const config = {
  matcher: [
    '/agent/:path*',
    '/api/generate/:path*',
    '/api/newtopic/:path*',
    '/api/publish/:path*',
    '/api/topics/:path*',
    '/api/video/:path*',
    '/api/youtube/:path*',
    '/api/facebook/:path*',
  ],
};

export function middleware(req) {
  const user = process.env.AGENT_USER;
  const pass = process.env.AGENT_PASSWORD;
  if (!user || !pass) {
    return new NextResponse('Agent is locked: login not configured.', { status: 503 });
  }
  const header = req.headers.get('authorization') || '';
  if (header.startsWith('Basic ')) {
    try {
      const decoded = atob(header.slice(6));
      const i = decoded.indexOf(':');
      if (decoded.slice(0, i) === user && decoded.slice(i + 1) === pass) {
        return NextResponse.next();
      }
    } catch (e) {}
  }
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Funparks Agent", charset="UTF-8"' },
  });
}