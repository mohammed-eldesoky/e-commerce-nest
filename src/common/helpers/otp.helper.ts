
export const generateOtp= ()=>{
// Generate a 6-digit OTP
const otp = Math.floor(100000 + Math.random() * 900000).toString();
return otp;
}   