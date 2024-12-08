import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import CreateBooks from './pages/createBooks'
import EditBook from './pages/editBook'
import ShowBook from './pages/showBook'
import DeleteBook from './pages/deleteBook'

export const App = () => {
  return (
    <Routes>
      <Route path='/' element='{< Home />}' />
      <Route path='/book/create' element='{< CreateBooks />}' />
      <Route path='/book/details/:id' element='{< ShowBook />}' />
      <Route path='/book/edit/:id' element='{< EditBook />}' />
      <Route path='/book/delete/:id' element='{< DeleteBook />}' />
    </Routes>
  )
}

export default App;