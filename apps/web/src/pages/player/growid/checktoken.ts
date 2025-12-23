import { useDatabase } from "@/lib/database";
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const refreshToken = (await request.formData()).get("refreshToken");

    if (!refreshToken || typeof refreshToken !== 'string') {
      return new Response(
        JSON.stringify({
          success: false,
          error: "refreshToken is required",
        }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const db = await useDatabase();

    // Verify the session token
    const session = await db.auth.api.getSession({
      headers: new Headers({
        'cookie': `better-auth.session_token=${refreshToken}`
      })
    });

    if (!session?.session || !session?.user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid or expired session",
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        status: "success",
        message: "Account Validated.",
        token: refreshToken,
        url: "",
        accountType: "growtopia",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "text/html"
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}