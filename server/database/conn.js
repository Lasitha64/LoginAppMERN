import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

async function connect(){

    const mongod    = await MongoMemoryServer.create();
    const getUri    = mongod.getUri();
    const db        = await mongoose.connect(getUri);

    mongoose.set('strictQuery',true);
    console.log('Database connected');
    return db;
}

export default connect;