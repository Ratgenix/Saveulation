import React, {useState, useEffect} from 'react'
//import logo from '../imgs/genericlogo.webp'
import '../css/nav.css';
//import {NavDropdown} from 'react-bootstrap';
//import {FiAlignRight,FiXCircle,FiChevronDown} from "react-icons/fi";
import {AuthProvider, useAuth} from '../context/AuthProvider.js'
// import {AiOutlineSearch} from 'react-icons/ai'
import savulation from '../imgs/savulation.png'
import Search from './Search';
//

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
        {/* <a href='/'><img src={savulation}></img></a> */}
        </div> 
        <div className='search'>
        {/* <span><AiOutlineSearch id='search-ico'/><input type="text" placeholder='Search...'/></span> */}
        <span>
        <Search/>
        </span>
        </div>
        <div className='user'>
           {!currentUser && <p><a href='/login'>user placeholder</a></p> }
            {currentUser && <h2><a href='/upload'>{testVal}</a></h2>}
        </div>




        </div>
    )
}

export default Navbar
