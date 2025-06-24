import { NextResponse } from "next/server";
import { connectMongoDB } from "@/libs/config/db";
import Room from "@/libs/models/Room";

// GET all rooms
export async function GET() {
  try {
    await connectMongoDB();
    const rooms = await Room.find();
    return NextResponse.json(rooms, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching rooms", error: error.message },
      { status: 500 }
    );
  }
}

// POST new room
export async function POST(req) {
  try {
    const roomData = await req.json();
    await connectMongoDB();
    
    const newRoom = await Room.create({
      name: roomData.name,
      tagline: roomData.tagline,
      description: roomData.description,
      highlight: roomData.highlight,
      image: roomData.image,
      amenities: roomData.amenities,
      price: roomData.price,
      status: true,
      totalNo: roomData.totalNo,
      rating: 0,
    });

    return NextResponse.json(
      { message: "Room Created", room: newRoom }, 
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while creating the room", error: error.message },
      { status: 500 }
    );
  }
}

// PUT: Update a room
export async function PUT(req) {
  try {
    const { id, ...updateData } = await req.json();
    
    if (!id) {
      return NextResponse.json(
        { message: "Room ID is required for update" },
        { status: 400 }
      );
    }
    
    await connectMongoDB();
    
    const updatedRoom = await Room.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedRoom) {
      return NextResponse.json(
        { message: "Room not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Room updated successfully", room: updatedRoom },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating room", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE a room
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await connectMongoDB();
    
    const deletedRoom = await Room.findByIdAndDelete(id);
    
    if (!deletedRoom) {
      return NextResponse.json(
        { message: "Room not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: "Room deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting room", error: error.message },
      { status: 500 }
    );
  }
}