import mongoose from "mongoose";
import { autorschema } from "./Autor.js";

const livrosSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.ObjectId},
  titulo: { type: String, required: [true, "O título do livro é obrigatório"]},
  editora: { type: String, required: [true, "A editora é obrigatória"]},
  preco: { type: Number },
  pagina: { type: Number },
  autor: autorschema
}, { versionKey: false });

const livro = mongoose.model("livros", livrosSchema);

export default livro;