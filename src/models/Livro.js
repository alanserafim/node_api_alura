import mongoose from "mongoose";
import { autorschema } from "./Autor.js";

const livrosSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.ObjectId},
  titulo: { type: String, required: [true, "O título do livro é obrigatório"]},
  editora: { 
    type: String, 
    required: [true, "A editora é obrigatória"],
    enum:{ 
      values: ["Classicos", "Alura"],
      message: "A Editora {VALUE} não é um valor permitido"
    }
  },
  preco: { type: Number },
  paginas: { 
    type: Number,
    //min: [10, "O número de página deve estar entre 10 e 5000. Valor fornecido: {VALUE}"],
    //max: [5000, "O número de página deve estar entre 10 e 5000. Valor fornecido: {VALUE}"]
    validate: {
      validator: (valor) => {
        return valor >= 10 && valor <= 5000;
      },
      message: "O número de página deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
    
    }
  },
  autor: autorschema
}, { versionKey: false });

const livro = mongoose.model("livros", livrosSchema);

export default livro;