import mongoose from "mongoose";

const autorschema = new mongoose.Schema({
  id: {type : mongoose.Schema.Types.ObjectId },
  nome: { 
    type: String, 
    required: [true, "O nome do(a) autor(a) é obrigatório"] 

  }, 
  nacionalidade : { type: String }
}, { versionKey: false });

const autor = mongoose.model("autores", autorschema);

export { autor, autorschema };