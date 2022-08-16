import React, {useState, useRef, useEffect} from 'react'
import {Button} from 'react-bootstrap';
import Search from '../components/Search'
import '../css/default.css'
import {AuthProvider, useAuth} from '../context/AuthProvider.js'
import {store, db} from '../components/Firebase.js'
import { getStorage, ref, deleteObject, getMetadata } from "firebase/storage";


function User() {
  const [dbList, setList] = useState([])
  const [name,changeName] =useState("naruto")
  const ChildRef = useRef();
  var newShape='circle'
  //
  function updateS(){
    changeName("Sasuke")
  }
  var i =0
  function shape(){
    
    
    if(i%2==0){
      newShape='circle'
      console.log('newShape', newShape, i)
      i=i+1
    }
    else{
      newShape='rec'
      console.log('newShape', newShape, i)
      i=i+1
    }
  }

  return (
    <div className='default'>
        {/* User */}
        {/* <Search/> */}
        {/* <Canvas /> */}
        {/* <Button onClick={cons}></Button> */}
        <Button onClick={updateS}>Change Shape</Button>
        </div>
    
  )
}

export default User