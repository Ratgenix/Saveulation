import React, {useState, useEffect} from 'react'
//import logo from '../imgs/genericlogo.webp'
import '../css/nav.css';
//import {NavDropdown} from 'react-bootstrap';
//import {FiAlignRight,FiXCircle,FiChevronDown} from "react-icons/fi";
import {AuthProvider, useAuth} from '../context/AuthProvider.js'

var toggle = true;


const Navbar = ({toggle}) => {

    const {testVal, setTestVal}=useAuth();

   // var{navScroll, setNavScroll}=useNav();
   const {signin1, currentUser}=useAuth();
   // const [menuOpen, toggleMenuOpen] = useState(false);
   const [tog, setTog]=useState(false)

   useEffect(() => {
       setTog(!tog)
   }, [toggle]);


    return (

        <div className="navbar">  
        <div className='home'>            
        <h2><a href='/'>Saveulation</a></h2>
        </div> 
        <div className='search'>
            <h2>Search</h2>
        </div>
        <div className='user'>
           {!currentUser && <p><a href='/signup'>user placeholder</a></p> }
            {currentUser && <h2><a href='/upload'>{testVal}</a></h2>}
        </div>




        </div>
    )
}

export default Navbar
