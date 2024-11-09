import db from "@repo/db/client";
import express from "express"
const app = express();

app.post("/hdfc-bank-server",async(req : any,res : any)=>{
    const paymentResponse = {
        amount : req.body.amount,
        userId : req.body.userId ,
        token : req.body.token
    }
    try {
        await db.$transaction([
            db.balance.update({
                where : {
                    userId : paymentResponse.userId
                },
                data : {
                    amount : {
                        increment : paymentResponse.amount
                    }
                }
            }) ,
            db.onRampTransaction.update({
                where : {
                    token : paymentResponse.token
                },
                data : {
                    status : "Success"
                }
            })
        ])
        return res.status(200).json({
            message : "Captured"
        })
    } catch (error) {
        return res.status(500).json({
            success : false ,
            message : "Internal Server Error"
        })
    }
})