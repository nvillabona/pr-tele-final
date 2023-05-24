import  { useEffect, useState } from 'react'
import { Navbar } from './Navbar';
import { useParams } from 'react-router-dom';

const BookById = () => {
    const { id } = useParams()
    const [book, setBook] = useState([]);
    const fetchBooks = async () => {
        const response = await fetch(`http://192.168.60.3:5000/books/${id}`);
        const data = await response.json();
        setBook(data.book);
    };


    useEffect(() => {
        fetchBooks();
    }, [id]);
    return (
        <div>
            <Navbar />
            <h1>{book.title}</h1>
            <h2>{book.author}</h2>
            <h4>{book.description}</h4>
        </div>
    )
}

export default BookById