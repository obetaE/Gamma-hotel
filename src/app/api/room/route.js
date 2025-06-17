import { NextResponse } from "next/server";
import {connectMongoDB} from "@/libs/config/db"
import Room from "@/libs/models/Room"


export async function POST(req){
    try {
        const roomData = await req.json();
        console.log(roomData)
        await connectMongoDB();
        console.lod("DB Connected")
        await Room.create({
            name : roomData.name,
            tagline: roomData.tagline,
            description: roomData.desc,
            image: roomData.image,
            amenities: roomData.amenities,
            price: roomData.price,
            status: true,
            rating: 0,
        })

        return NextResponse.json({message: "Room Created"}, {status: 201})
        console.log("Room Successfully Created")
    } catch (error) {
     return NextResponse.json({ message: "An Error occured while registering the user" }, { status: 500 });   
    }
}