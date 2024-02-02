const Book = require('../models/Book');

exports.getBooksController = async (req, res) => {
    try {
        const books = await Book.find();
        res.json({ books: books });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBookByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await Book.findOne({ id });
        if (!book)
            return res.status(404).json({ message: `book with id: ${id} was not found` });
        res.json(book);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

exports.addBookController = async (req, res) => {
    const { id, title, author, genre, price } = req.body;
    const book = new Book({ id, title, author, genre, price });
    try {
        const newBook = await book.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateBookController = async (req, res) => {
    const { id } = req.params;
    const { title, author, genre, price } = req.body;

    try {
        const book = await Book.findOne({ id });

        if (!book)
            return res.status(404).json({ message: `book with id: ${id} was not found` });

        // If the field is not empty, update the field
        if (title) book.title = title;
        if (author) book.author = author;
        if (genre) book.genre = genre;
        if (price) book.price = price;

        const updatedBook = await book.save();
        res.json(updatedBook);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

