import { NextRequest, NextResponse } from 'next/server';

const LEETCODE_GRAPHQL = 'https://leetcode.com/graphql';

const QUERY = `
  query getUserData($username: String!) {
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
      userCalendar {
        submissionCalendar
      }
    }
  }
`;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Missing username query param' }, { status: 400 });
  }

  try {
    const res = await fetch(LEETCODE_GRAPHQL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
        'Origin': 'https://leetcode.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      body: JSON.stringify({
        query: QUERY,
        variables: { username },
      }),
      // Cache for 1 hour
      next: { revalidate: 3600 },
    } as RequestInit);

    if (!res.ok) {
      return NextResponse.json(
        { error: `LeetCode API responded with ${res.status}` },
        { status: 502 }
      );
    }

    const json = await res.json();

    if (json.errors) {
      return NextResponse.json(
        { error: 'LeetCode GraphQL error', details: json.errors },
        { status: 502 }
      );
    }

    const acSubmissionNum: { difficulty: string; count: number }[] =
      json.data?.matchedUser?.submitStats?.acSubmissionNum ?? [];

    const getCount = (difficulty: string) =>
      acSubmissionNum.find((d) => d.difficulty === difficulty)?.count ?? 0;

    const solved = getCount('All');
    const easy = getCount('Easy');
    const medium = getCount('Medium');
    const hard = getCount('Hard');

    const calendarRaw: string =
      json.data?.matchedUser?.userCalendar?.submissionCalendar ?? '{}';

    let calendar: Record<string, number> = {};
    try {
      calendar = JSON.parse(calendarRaw);
    } catch {
      calendar = {};
    }

    return NextResponse.json({ solved, easy, medium, hard, calendar });
  } catch (err) {
    console.error('[leetcode route] fetch failed:', err);
    return NextResponse.json({ error: 'Failed to fetch LeetCode data' }, { status: 502 });
  }
}
