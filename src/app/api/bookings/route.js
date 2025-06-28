import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectMongoDB } from "@/libs/config/db";
import Room from "@/libs/models/Room";
import Customer from "@/libs/models/Customer";
import cron from "node-cron"; // For scheduling

// Initialize scheduler when module loads
cron.schedule("0 0 * * *", async () => { // Runs daily at midnight
  try {
    await connectMongoDB();
    const today = new Date();
    
    // Find completed stays
    const completedCustomers = await Customer.find({
      checkOut: { $lt: today },
      isActive: true
    });

    for (const customer of completedCustomers) {
      const session = await mongoose.startSession();
      session.startTransaction();
      
      try {
        // Update room availability
        await Room.findByIdAndUpdate(
          customer.room,
          { $inc: { totalNo: 1 } },
          { session }
        );
        
        // Mark customer as inactive
        customer.isActive = false;
        await customer.save({ session });
        
        await session.commitTransaction();
      } catch (error) {
        await session.abortTransaction();
        console.error(`Restock failed for customer ${customer._id}:`, error);
      } finally {
        session.endSession();
      }
    }
    console.log(`Restocked ${completedCustomers.length} rooms`);
  } catch (error) {
    console.error("Restock job failed:", error);
  }
});

// POST new customer (updated with isActive flag)
export async function POST(req) {
  try {
    const { name, email, checkIn, checkOut, guests, stayPrice, roomId } =
      await req.json();

    if (!roomId) {
      return NextResponse.json(
        { message: "Room ID is required" },
        { status: 400 }
      );
    }

    await connectMongoDB();
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Create customer with active status
      const newCustomer = await Customer.create(
        [{
          name,
          email,
          checkIn: new Date(checkIn),
          checkOut: new Date(checkOut),
          guests,
          stayPrice,
          room: roomId,
          isActive: true // Add active status flag
        }],
        { session }
      );

      // Update room availability
      const updatedRoom = await Room.findOneAndUpdate(
        { _id: roomId, totalNo: { $gt: 0 } },
        { $inc: { totalNo: -1 } },
        { new: true, session }
      );

      if (!updatedRoom) {
        throw new Error("Room not available or not found");
      }

      await session.commitTransaction();
      return NextResponse.json(
        { message: "Customer Created", customer: newCustomer[0] },
        { status: 201 }
      );
    } catch (innerError) {
      await session.abortTransaction();
      throw innerError;
    } finally {
      session.endSession();
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating customer", error: error.message },
      { status: 500 }
    );
  }
}


// GET all rooms
export async function GET() {
  try {
    await connectMongoDB();
    const customers = await Customer.find();
    return NextResponse.json(customers, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching customers", error: error.message },
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

    const updatedCustomer = await Customer.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCustomer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Customer updated successfully", customer: updatedCustomer },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating customer", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE a room
export async function DELETE(req) {
  try {
    const { id } = await req.json();
    await connectMongoDB();

    const deletedRoom = await Customer.findByIdAndDelete(id);

    if (!deletedRoom) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Customer deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Customer deleting room", error: error.message },
      { status: 500 }
    );
  }
}
