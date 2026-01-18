import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { code } = await request.json();

    const response = await fetch(process.env.N8N_REVIEW_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    console.log(response)

    if (!response.ok) {
      throw new Error('AI service temporarily unavailable.');
    }

    const result = await response.json();

    if (result.isValidCode === false) {
      return NextResponse.json({
        isValidCode: false,
        errorMessage: result.errorMessage || "This doesn't appear to be valid code",
        detectedLanguage: 'plain-text',
        overallScore: 0,
        issues: [], strengths: [], recommendations: []
      });
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error('Review API error:', error);
    return NextResponse.json(
      { error: error.message || 'Server connection error' },
      { status: 500 }
    );
  }
}