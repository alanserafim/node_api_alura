import mongoose from "mongoose";

const livrosSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.ObjectId},
    titulo: { type: String, required: true},
    editora: { type: String },
    preco: { type: Number },
    pagina: { type: Number }
}, { versionKey: false })

const livro = mongoose.model("livros", livrosSchema)

export default livro