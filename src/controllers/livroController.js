import { livro } from "../models/index.js";
import { autor } from "../models/index.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

class LivroController {

  static async listarLivros (req, res, next) {
    try {
      const listaLivros = await livro.find({});
      res.status(200).json(listaLivros);
    } catch (error) {
      next(error);
    }
  }

  static async listarLivrosPorId (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findById(id);
      if(livroEncontrado != null){
        res.status(200).json(livroEncontrado);
      } else {
        next(new NaoEncontrado("Id do Livro não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarLivro (req, res, next) {
    const novoLivro = req.body;

    try {
      const autorEncontrado =  await autor.findById(novoLivro.autor);
      const livroCompleto = {
        ...novoLivro, 
        autor: { ...autorEncontrado._doc }
      };
      const livroCriado = await livro.create(livroCompleto);
      res.status(201).json({ message: "criado com sucesso", livro: livroCriado});
    } catch (error){
      next(error);
    }   
  }

  static async atualizarLivro (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndUpdate(id, req.body);
      if(livroEncontrado != null){
        res.status(200).json({ message: "livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Livro não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deletarLivro (req, res, next) {
    try {
      const id = req.params.id;
      const livroEncontrado = await livro.findByIdAndDelete(id);
      if(livroEncontrado != null){
        res.status(200).json({ message: "livro excluído com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Livro não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async listarLivrosPorFiltro(req, res, next) {
    try {
      const busca = await processaBusca(req.query);
      if (busca !== null){
        const livrosResultado = await livro.find(busca);
        res.status(200).json(livrosResultado);
      } else {
        res.status(200).json([]);
      }
    } catch (error) {
      next(error);
    }
  }

}

async function processaBusca(parametros){

  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;
  let busca = {};

  if(editora) busca.editora = editora;
  //const regex = new RegExp(titulo, "i");
  if(titulo) busca.titulo = {$regex: titulo, $options: "i"};

  if (minPaginas || maxPaginas) busca.paginas = {};
  // gte = greater than or equal: maior ou igual a
  if(minPaginas) busca.paginas = { $gte : minPaginas };
  // lte = less than or equal: menor ou igual a
  if(maxPaginas) busca.paginas = { ...busca.paginas, $lte:  maxPaginas };

  if(nomeAutor){
    const autorBuscado = await autor.findOne({ nome: nomeAutor});
    //console.log("autor buscado: ", autorBuscado);
    if(autorBuscado !== null){
      busca.autor = autorBuscado;
    } else {
      busca = null;
    }
  }
  
  return busca;
}

export default LivroController;