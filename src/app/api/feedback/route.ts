import { NextResponse } from "next/server";

// TypeScript interfaces for the feedback data
interface Feedback {
  id: number;
  certification_id: number;
  name: string;
  comment: string;
  rating: number;
  profession: string;
}

interface OverallStats {
  total_reviews: number;
  average_rating: number;
  five_stars: number;
  four_stars: number;
  three_stars: number;
  two_stars: number;
  one_star: number;
}

interface CertificationStats {
  certification_id: number;
  total_reviews: number;
  average_rating: number;
}

interface FeedbackApiResponse {
  success: boolean;
  data: Feedback[];
  count: number;
  overall_stats: OverallStats;
  certification_stats: CertificationStats[];
}

export async function GET() {
  try {
    const response = await fetch("https://app.t-cert.us/api/feedback", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: FeedbackApiResponse = await response.json();

    // Return only the feedback data (comments) as requested
    return NextResponse.json(
      {
        success: data.success,
        data: data.data, // All feedback comments
        count: data.count,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch feedback data",
        data: [],
        count: 0,
      },
      {
        status: 500,
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
  }
}
