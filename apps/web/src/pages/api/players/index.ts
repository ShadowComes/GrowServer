import { useDatabase } from "@/lib/database";
import type { APIRoute } from "astro";

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const db = await useDatabase();

    // Using the player handler
    const players = await db.models.User.find();

    return new Response(
      JSON.stringify({
        success: true,
        data: players,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
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
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const db = await useDatabase();
    const body = await request.json();

    // Example: Use the database models directly
    const newPlayer = await db.models.Player.create(body);

    return new Response(
      JSON.stringify({
        success: true,
        data: newPlayer,
      }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
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
};
