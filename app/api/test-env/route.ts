import { NextResponse } from 'next/server';

export async function GET() {
  const envKeys = Object.keys(process.env);
  const info = {
    PORT: process.env.PORT || 'not_set',
    NODE_ENV: process.env.NODE_ENV || 'not_set',
    envKeys: envKeys,
  };
  return NextResponse.json(info);
}
