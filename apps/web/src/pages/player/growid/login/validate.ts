import { useDatabase } from "@/lib/database";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    const db = await useDatabase();

    // Get session from cookies (better-auth sets this automatically on login)
    const session = await db.auth.api.getSession({
      headers: request.headers
    });

    console.log({ session });

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
        token: session.session.token,
        url: "",
        accountType: "growtopia",
      }),
      {
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
