import mongoose from "mongoose";

const uri = process.env.DB_CONNECTION_STRING

async function conectaNaDatabase(){
    mongoose.connect(uri, { dbName:"livraria"});
    return mongoose.connection;
}

export default conectaNaDatabase;

