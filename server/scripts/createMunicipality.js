import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../models/User.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

try {

  const existing = await User.findOne({
    email: "pmc@sahayata.com",
  });

  if (existing) {

    console.log("Municipality already exists.");

    process.exit();

  }

  const municipality = await User.create({

    fullName: "Patna Municipal Corporation",

    email: "pmc@sahayata.com",

    password: "12345678",

    phone: "06122500000",

    role: "Municipality",

    isVerified: true,

  });

  console.log("Municipality Created Successfully");

  console.log(municipality);

  process.exit();

} catch (err) {

  console.log(err);

  process.exit();

}