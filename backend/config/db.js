import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MONGODB connected ${conn.connection.host}`);
  } catch (error) {
    console.log(`error ${error.message}`);
    process.exit(1); // process code 1 code means exit with failure, 0 means success
  }
};
//on top in the try, it will use a mongoose package to connect to our DB
