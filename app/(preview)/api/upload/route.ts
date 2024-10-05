import { NextResponse } from 'next/server';
import { createResource } from "@/lib/actions/resources";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const content = await file.text();
  const result = await createResource({ content });

  return NextResponse.json({ message: result });
}