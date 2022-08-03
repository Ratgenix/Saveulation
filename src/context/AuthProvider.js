import React, {useContext, useState, useEffect} from 'react';
import { auth, db, fstore } from '../components/Firebase.js';
import {collection, getDocs, addDoc} from "firebase/firestore"
import { waitFor } from '@testing-library/react';

const AuthContext = React.createContext()
const usersCollectionRef = collection(fstore, "users")
// const currUsername = JSON.parse(local.Storage.getItem('currUser'))
const testStorage=JSON.parse(localStorage.getItem('testVal') )
export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [users, setUsers] = useState([])
    const[currentUser, setCurrentUser]=useState()
    const[loading, setLoading]=useState(true)
    const[user, setUser] = useState('')
    var[testVal, setTestVal]=useState(testStorage)
    

    //is actually signup
    function login(email,password){
      // return auth.createUserWithEmailAndPassword(email,password)
      findUserS(email, password)
  }
  //
  function signin(email,password){
    // return auth.signInWithEmailAndPassword(email,password)
   // auth.signInWithEmailAndPassword(email,password)
    findUserL(email, password);

}
//just store user in cookies or fuckin whatever idk
  function signupUser(email, password, user){

  //  const usrLen = users.length
  //  var i = 0
  //  while(i<=usrLen){
  //    if (users[i].username == user){
  //     console.log('error')
  //     throw(console.error())
  //    }
  //    else{
  //     console.log(i)
  //     console.log(users[i].username)
  //     if(i==usrLen-1){
  //       console.log("no matching users")
  //     //   addDoc(usersCollectionRef, {username: user, email: email});
  //     // return auth.createUserWithEmailAndPassword(email,password);
  //       break;
       
  //     }
  //     i=i+1;
  //    }

  //   }
  //   console.log("end")
    // auth.createUserWithEmailAndPassword(email,password);
    
    // addDoc(usersCollectionRef, {username: user, email: email});
    findUserS(email, password, user)
  }

  async function findUserL(email, password){

   await auth.signInWithEmailAndPassword(email,password);
   console.log('finished');
    findUser(email)
    }

    async function findUserS(email, password, user){

     await auth.createUserWithEmailAndPassword(email,password)
     await addDoc(usersCollectionRef, {username: user, email: email});
     console.log('finished');
      findUser(email)
      }

  function findUser(email){
    var useName = 'asdasd'
    const usrLen =  users.length
    var i = 0
    // if(currentUser !== "undefined"){
    while(i<=usrLen){
      if (users[i].email == email){
       console.log('found')
        useName = users[i].username
        console.log(useName)
        setTestVal(useName)
        break;
      }
      else{
       i=i+1;
       useName='asdasdas'
      }
 
     }
    setUser(email)
  }

  function logout(){
    setTestVal(null);
    return auth.signOut();
  }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          setCurrentUser(user)
          setLoading(false)

        })

        return unsubscribe
      }, [])

      useEffect(() => {
        const getUsers = async() => {
          const data = await getDocs(usersCollectionRef)
          setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
          // console.log(data)

        };

        getUsers();
       
      }, [])

      useEffect(()=>{
        localStorage.setItem("testVal", JSON.stringify(testVal))

      }, [testVal])

    const value={
        currentUser,
        login,
        signin,
        logout,
        signupUser,
        users,
        user,
        findUser,
        testVal,
        setTestVal
        
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading &&children}
        </AuthContext.Provider>
    )
}