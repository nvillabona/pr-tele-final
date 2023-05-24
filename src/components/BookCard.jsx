import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent,  Box, Typography, IconButton, TextField, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const BookCard = ({ book, fetchBooks }) => {
    const [isEditing, setisEditing] = useState(false);
    const [editBook, setEditBook] = useState({ ...book });

    const submitEditBook = async (e) => {
        e.preventDefault()
        fetch(`http://192.168.60.3:5000/books/${editBook.id}`, {
            method: "PUT",
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...editBook }),
        })
            .then(() => {

                setisEditing(false)
                fetchBooks()
            })
    }

    const handleDeleteBook = () => {
        const result = window.confirm('Do you want to delete this book?');
        if (result) {
            fetch(`http://192.168.60.3:5000/books/${editBook.id}`, {
                method: "DELETE",
            })
                .then(() => {
                    fetchBooks()
                })
        }
    }

    return (
        <Card sx={{ my: 1, width: '80%' }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton color="primary" onClick={() => setisEditing(!isEditing)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={handleDeleteBook}>
                        <Delete />
                    </IconButton>
                </Box>
                {
                    !isEditing ?
                        <>
                            <Link to={`/${book.id}`}>
                                <Typography variant="h5" gutterBottom>
                                    {book.title}
                                </Typography>
                            </Link>
                            <Typography variant="body1">{book.author}</Typography>
                            <Typography variant="body2">{book.description}</Typography>
                        </>
                        :
                        <form onSubmit={submitEditBook}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                                <TextField
                                    id=""
                                    label="Title"
                                    value={editBook.title}
                                    onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
                                    size='small'
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    id=""
                                    label="Author"
                                    value={editBook.author}
                                    onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
                                    size='small'
                                    sx={{ mb: 1 }}
                                />
                                <TextField
                                    id=""
                                    label="Description"
                                    value={editBook.description}
                                    onChange={(e) => setEditBook({ ...editBook, description: e.target.value })}
                                    size='small'
                                    sx={{ mb: 1 }}
                                />
                                <Button variant="contained" color="primary" type='submit'>
                                    Update
                                </Button>
                            </Box>
                        </form>
                }
            </CardContent>
        </Card>
    );
};

BookCard.propTypes = {
    book: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    fetchBooks: PropTypes.func
};

export default BookCard;
