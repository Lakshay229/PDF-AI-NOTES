import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users:defineTable({
        username:v.string(),
        email:v.string(),
        imgUrl:v.string(),
    }),
    pdfFiles:defineTable({
        fileId:v.string(),
        storageId:v.string(),
        fileName:v.string(),
        fileUrl:v.string(),
        createdBy:v.string()
    })
})