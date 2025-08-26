import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://app.t-cert.us/api/diamond');
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error('Proxy error fetching diamond API:', err);
    return NextResponse.json({ statusCode: 500, message: 'Proxy error' }, { status: 500 });
  }
}
