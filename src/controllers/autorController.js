import NaoEncontrado from "../errors/NaoEncontrado.js";
import { autor } from "../models/index.js";

class AutorController {

  static async listarAutores (req, res, next) {
    try {
      const autoresResultado = autor.find({});
      req.resultado = autoresResultado;
      next();
    } catch (error) {
      next(error);
    }
  }

  static async listarAutorPorId (req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findById(id);
      if(autorEncontrado != null){
        res.status(200).json(autorEncontrado);
      } else {
        next(new NaoEncontrado("Id do Autor não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async cadastrarAutor (req, res, next) {
    try {
      const novoAutor = await autor.create(req.body);
      res.status(201).json({ message: "criado com sucesso", autor: novoAutor});
    } catch (error){
      next(error);
    } 
  }

  static async atualizarAutor (req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndUpdate(id, req.body);
      if(autorEncontrado != null){
        res.status(200).json({ message: "autor atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }

  static async deletarAutor (req, res, next) {
    try {
      const id = req.params.id;
      const autorEncontrado = await autor.findByIdAndDelete(id);
      if(autorEncontrado != null){
        res.status(200).json({ message: "autor excluído com sucesso"});
      } else {
        next(new NaoEncontrado("Id do Autor não encontrado"));
      }
    } catch (error) {
      next(error);
    }
  }
}

export default AutorController;