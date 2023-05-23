import  { useEffect, useState } from "react";
import { Box, CircularProgress,  } from "@mui/material";
import BookCard from "./BookCard";

import { Navbar } from "./Navbar";

const Books = () => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchBooks = async () => {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/books");
        const data = await response.json();
        setBooks(data.books);
        setIsLoading(false);
    };


    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <>
            <Navbar/>
            <h1>Books</h1>
            {
                isLoading ?
                    <CircularProgress />
                    :
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {books.map((book) => (
                            <BookCard key={book.id} book={book} fetchBooks={fetchBooks} />
                        ))}
                    </Box>
            }
        </>
    );
};

export default Books;
