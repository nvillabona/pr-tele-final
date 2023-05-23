import './App.css'
import Books from './components/Books'
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import BookById from './components/BookById'
import BookCreateForm from './components/BookCreateForm'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/:id" element={<BookById />} />
          <Route path='/new' element={<BookCreateForm />} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
