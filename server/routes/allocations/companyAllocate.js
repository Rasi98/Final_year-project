import express from "express";
import {allocateCompany,getAllocate,setStatus,deletecompany} from "../../controllers/allocatecompany.js";
const companyAllocate=express.Router();

//companyAllocate.get("/",getAllAllocation);
companyAllocate.post("/add",allocateCompany);
companyAllocate.get("/:studentid",getAllocate)
companyAllocate.post("/status",setStatus);
companyAllocate.post("/deletecompany",deletecompany);

export  default companyAllocate;