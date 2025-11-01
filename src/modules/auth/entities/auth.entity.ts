import { Types } from "mongoose";

export class Customer {
    readonly _id: Types.ObjectId;
    userName: string;
    email: string;
    password?: string; 
    otp: string;
    otpExpiry: Date;
    gender: string;
    isVerified: boolean;
    dob: Date
}
