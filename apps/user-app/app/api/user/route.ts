import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server";

export const GET =async()=>{
    const session = await getServerSession(authOptions);
    if(session && session.user){
        return NextResponse.json({
            user : session.user
        })
    }
    return NextResponse.json({
        message : "Not Logged In"
    })
} 