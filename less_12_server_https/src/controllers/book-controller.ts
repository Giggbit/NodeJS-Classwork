import { Book } from "../models/book-model.js";
import { Request, Response } from "express";

export class BookController {
    static async create(req:Request<{},{},{title: string}>, res:Response):Promise<any> {
        const book = await Book.create({...req.body}); // Insert into DB
        if(book) {
            return res.status(201).json({message: "Book created successfully", data: book.dataValues});
        }
        return res.status(500).json({message: "Database error", data: null});
    }

    static async allBooks(req:Request, res:Response,):Promise<any>{
        const books = await Book.findAll();
        if(books) {
            return res.status(200).json({message: "List of books", data: books});
        }
        return res.status(500).json({message: "Database error", data: null});
    }

    static async findBook(req:Request<{id:string}>, res:Response,):Promise<any>{
        const id = +req.params.id;
        const book = await Book.findByPk(id);
        if(book) {
            return res.status(200).json({message: "Book", data: book});
        }
        return res.status(500).json({message: "Database error", data: null});
    }
}