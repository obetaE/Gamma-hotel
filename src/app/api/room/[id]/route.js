import { NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/config/db";
import Room from "@/libs/models/Room";

export async function GET(request, context) {
  const { id } = await context.params;

  try {
    await connectMongoDB();

    const room = await Room.findById(id);

    if (!room) {
      return NextResponse.json({ message: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching room", error: error.message },
      { status: 500 }
    );
  }
}
