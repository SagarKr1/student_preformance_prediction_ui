import axios from "axios";

import {
  NextRequest,
  NextResponse
} from "next/server";

export async function POST(
  req: NextRequest
) {

  try {

    // BODY
    const body = await req.json();

    // TOKEN
    const authHeader =
      req.headers.get(
        "authorization"
      );

    // ROLE
    const role =
      req.headers.get(
        "x-user-role"
      );

    console.log(
      "AUTH HEADER:",
      authHeader
    );

    console.log(
      "ROLE:",
      role
    );

    // VALIDATION
    if (!authHeader) {

      return NextResponse.json(
        {
          success: false,
          message:
            "Token Missing",
        },
        {
          status: 401,
        }
      );
    }

    // ENDPOINT
    const endpoint =
      role === "admin"

        ? "/admin/student/predict/manual"

        : "/teacher/student/predict/manual";

    // BACKEND CALL
    const response =
      await axios.post(

        `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,

        body,

        {
          headers: {
            Authorization:
              authHeader,
          },
        }
      );

    return NextResponse.json(
      response.data
    );

  } catch (e: any) {

    console.log(
      "ROUTE ERROR:",
      e.response?.data || e.message
    );

    return NextResponse.json(
      {
        success: false,

        message:
          e.response?.data?.message ||
          "Prediction Failed",
      },
      {
        status:
          e.response?.status || 500,
      }
    );
  }
}