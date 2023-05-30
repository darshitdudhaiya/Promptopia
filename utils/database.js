import mongoose from "mongoose";
 
let isConnected = false;

export const connectDB = async () =>{
    mongoose.set("strictQuery",true);

    if(isConnected){
        console.log("Database is already connected.")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName : "shared_prompt",  
            useNewUrlParser: true,
            useUnifiedTopology : true,
        })

        isConnected = true;

        console.log("Database is Conneted Sucessfully.....");
    } catch (error) {
        console.log(error+"database error");
    }
}