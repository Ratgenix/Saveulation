import React, {useContext, useState, useEffect} from 'react';
import { auth, db, fstore } from '../components/Firebase.js';
import {collection, getDocs, addDoc} from "firebase/firestore"
import { waitFor } from '@testing-library/react';
import { Alert } from 'react-bootstrap';

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
    var [dbList, setList] = useState([])
    var [emailList, setEmail] = useState([])
    

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
  function passwordReset(email){
    auth.sendPasswordResetEmail(email)
    .then(()=>{
    console.log('Password reset email sent !!')
  })
  .catch(error => {
    console.error(error);
  })
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

    let res = await checkUser(user)
      if(res){
        await auth.createUserWithEmailAndPassword(email,password)
      await toDB(user, email)
      setTestVal(user)
      // findUser(email)
      }
      else{
        console.log('Error occurred, username already exists')
      }
      }


      async function checkUser(user){
        let res = await findUserDB()

        const usrLen = dbList.length
        var i = 0
        while(i<=usrLen){
          if (dbList[i]== user){
            console.log('error')
            alert("Username already exists, please try again.")
            return false
            // throw(console.error())
            
          }
          else{
            console.log(i)
            console.log(dbList[i])
            if(i==usrLen-1){
              console.log("no matching users")
              break;
            
            }
            i=i+1;
          }

          }
          return true
      }


  async function findUser(email){
    let res = await findUserDB()
    var useName = 'asdasd'
    const usrLen =  emailList.length
    var i = 0
    // if(currentUser !== "undefined"){
    while(i<=usrLen){
      if (emailList[i] == email){
       console.log('found')
        useName = dbList[i]
        console.log(useName)
        setTestVal(useName)
        break;
      }
      else{
       i=i+1;
       useName='null'
      }
 
     }
    setUser(email)
  }

  function logout(){
    setTestVal(null);
    return auth.signOut();
  }

  function findUserDB(){

    const dbRef = db.ref(`Users`);
  dbRef.on('value', (snapshot)=>{
    const dbField = snapshot.val()
    const dbList1=[];
    let emailList1=[];
    for (let id in dbField){
      // dbList1.push(id, dbField[id]);
      // console.log(dbField[id])
      dbList1.push(id)
      emailList1.push(dbField[id])
    }
    setList(dbList1);
    setEmail(emailList1)
    console.log(dbList1)
    console.log(emailList1)
  })
  
  return true
}

function toDB(props, email){
  let newVar = props
  let userE = email
  console.log(newVar)
  console.log(userE)
   const dbRef = db.ref('Users');

   const dbPayload = {
     [newVar]: userE,
   };
   dbRef.update(dbPayload)
   console.log(newVar, 'has been added to DB')
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
          // const data = await getDocs(usersCollectionRef)
          // setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
          // console.log(data)

        };
        if(dbList.length<1){
          findUserDB()
        }
        // getUsers();
       
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
        passwordReset,
        users,
        user,
        findUser,
        findUserDB,
        dbList,
        testVal,
        setTestVal
        
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading &&children}
        </AuthContext.Provider>
    )
}