import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = "force-dynamic";

const suggestionsFile = path.join(process.cwd(), 'data', 'suggestions.json');

export async function POST(req: NextRequest) {
  try {
    const suggestion = await req.json();

    let suggestions: any[] = [];
    if (fs.existsSync(suggestionsFile)) {
      const fileData = fs.readFileSync(suggestionsFile, 'utf8');
      suggestions = fileData ? JSON.parse(fileData) : [];
    }
    suggestions.push({
      ...suggestion,
      submittedAt: new Date().toISOString(),
    });
    fs.writeFileSync(suggestionsFile, JSON.stringify(suggestions, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
      console.error('Error saving suggestion:', error);
    return NextResponse.json({ error: 'Failed to save suggestion' }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(suggestionsFile)) {
      return NextResponse.json([]);
    }
    const fileData = fs.readFileSync(suggestionsFile, 'utf8');
    const suggestions = fileData ? JSON.parse(fileData) : [];
    return NextResponse.json(suggestions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read suggestions' }, { status: 500 });
  }
}
