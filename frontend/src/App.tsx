import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { NewBlog } from './pages/NewBlog'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/signin" element={<Signin/>} />
        <Route path="/blog/:id" element={<Blog/>} />
        <Route path="/blogs" element={<Blogs/>} />
        <Route path="/publish" element={<NewBlog/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
