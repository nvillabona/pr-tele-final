import { Box, Button, Card, CardContent, TextField } from '@mui/material'
import  { useState } from 'react'
import { Navbar } from './Navbar';
import { useNavigate } from 'react-router-dom';

const BookCreateForm = () => {
    const navigate = useNavigate()
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        description: '',
    });
    const handleCreateBook = (e) => {
        e.preventDefault()
        fetch(`http://192.168.60.3:5000/books`, {
            method: "POST",
            redirect: 'follow',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ ...newBook }),
        })
            .then(() => {
                navigate('/')
            })
    }

    return (
        <div>
            <Navbar/>
            <h1>New Book</h1>
            <Card sx={{ my: 1 }}>
                <CardContent>
                    <form onSubmit={handleCreateBook}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                            <TextField
                                id=""
                                label="Title"
                                value={newBook.title}
                                onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                                size='small'
                                required
                                sx={{ mb: 1 }}
                            />
                            <TextField
                                id=""
                                label="Author"
                                value={newBook.author}
                                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                                size='small'
                                required
                                sx={{ mb: 1 }}
                            />
                            <TextField
                                id=""
                                label="Description"
                                value={newBook.description}
                                onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
                                size='small'
                                required
                                sx={{ mb: 1 }}
                            />
                            <Button variant="contained" color="primary" type='submit'>
                                Create
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default BookCreateForm