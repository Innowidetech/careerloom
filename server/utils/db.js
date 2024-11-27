import mongoose from "mongoose";

const connectDB = async () => {
    const localUri= process.env.DATA_URL
    try {
        await mongoose.connect(localUri);
        console.log('mongodb connected successfully');
    } catch (error) {
        console.log(error);
    }
}
export default connectDB;