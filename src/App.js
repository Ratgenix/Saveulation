//imports
import React, {useState} from 'react'
import './App.css';
import { Route, Routes} from 'react-router-dom'


//pages
import Home from './pages/Index.js'
import Oops from './pages/Oops.js'
import Login from './pages/Login.js'
import Signup from './pages/Signup.js'
import Upload from './pages/Upload.js'
import Reset from './pages/Reset.js'
import User from './pages/User.js'
//components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
/*
import Sidebar from './components/Sidebar'
*/

function App() {

  const[isOpen, setIsOpen] = useState(false)

  const toggle=()=>{
      setIsOpen(!isOpen)
  }

  return (
    
    <div className="site-wrapper" >
    <div className="head-comp">
    <Navbar toggle={toggle}/>
    </div>
      <div className="page-container">

    
     <Routes>

     <Route path="/" element={<Home />} />
     <Route path="/*" element={<Oops />} />
     <Route path="/login" element={<Login />} />
     <Route path="/signup" element={<Signup />} />
     <Route path="/upload" element={<Upload />} />
     <Route path="/reset" element={<Reset />} />
     <Route path="/user" element={<User />} />

    </Routes>
 
      </div>
      <Footer/>
    </div>

    
);
}
export default App;
