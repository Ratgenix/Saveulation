import React, {useState, useRef, useEffect} from 'react'
import '../css/default.css'
import {Button} from 'react-bootstrap';
import {AuthProvider, useAuth} from '../context/AuthProvider.js'
import {store, db} from '../components/Firebase.js'
import { getStorage, ref, deleteObject, getMetadata } from "firebase/storage";
// import {NameConversion, DisplayAll} from './Upload.js'
// import Search from '../components/Search';

function Index() {
  const {currentUser, testVal, users, user, findUser}=useAuth();
  const [imgUp, setImg]=useState(null);
  const [files, setFiles] = useState();
  const [paths, setPaths] =useState([]);
  const [promises, setPromises] =useState([]);
  var[test, setTest]=useState([]);
  const [name, setName] = useState();
  var [loading, setLoad]=useState(false);
  const [dbList, setList] = useState()
  const[userUp, setUserUp] = useState()
  const[allFiles, setAllFiles] = useState([])
  var [finalLoad, setFinal] =useState(false)

  var urls2=''
  var newArr=[]
  var newT= false;
  ////

  useEffect(() => {
    
    if(!userUp){
      // console.log('waiting for user List...')
      // newAwait()
      loadImages()
    }
    if(!dbList){
      // console.log('waiting for database list')
      loadSaves()
    }
    else{
      // console.log("resolving")
      resolve()
    }


}, [loading, userUp, dbList]);

////////

function loadImages(){
  // const urls = await fetchImages();
  // urls2=urls
  setFiles(urls2);
  const dbRef = db.ref(`Saves`);
dbRef.on('value', (snapshot)=>{
  const dbField = snapshot.val()
  // console.log(dbField)
  const dbList1=[];
  // const dbList2=[];
  for (let name in dbField){
    
      // console.log(name, dbField.hasChild)
    // dbList1.push({id, ...dbField[id]});
    dbList1.push((name));
    // dbList2.push({name, ...dbField[name]})
  }
  setUserUp(dbList1);
  // setList(dbList2)

})
  
  
  return userUp
};

async function loadSaves(){
  let res = await loadImages()
  setFiles(urls2);
  var dbRef
  let i=0
  var dbList2=[];
  while (i<userUp.length){
  dbRef = db.ref(`Saves/${userUp[i]}`);
dbRef.on('value', (snapshot)=>{
  const dbField = snapshot.val()
  // console.log(dbField)
  const dbList1=[];

  for (let id in dbField){

    dbList1.push({id, ...dbField[id]});
    // console.log(dbField)
  }
  // console.log(dbList1)
  // setList(dbList1, ...dbList1)
  // setList(dbList, ...dbList1)
  dbList2.push(dbList1)
  // console.log(dbList2, 'list 2')
})
// console.log(i)
  i=i+1
}
  setList(dbList2)
  return dbList
};


///


    function updateF(){

      loadSaves()

    }

    function resolve(){
      // console.log(dbList)
      let newArr2 = []
      let descriptions=''
      let dlURLs =''
      let fileNames=''
      let userN = ''
      let i =0
      let k= 0
      while (i<dbList.length){
        // console.log(dbList[i])
        // k=dbList[i].length
        while(k<dbList[i].length){
          // console.log(dbList[i][k].description)
          dlURLs=dbList[i][k].downloadURL
          fileNames = dbList[i][k].fileName
          userN = dbList[i][k].user
          // console.log(k)
          k=k+1
          newArr2.push({dlURLs, fileNames, userN})
        }
        // console.log(i,k)
        i=i+1
        k=0
      }
      // console.log(newArr2)
      setAllFiles(newArr2)
      // console.log(allFiles)
      setFinal(true)
      // console.log(finalLoad)
    }

    function Finish(){
      var allImgs='blah';
      // console.log(finalLoad)
      if(true){
        // console.log(allFiles)
          allImgs=
      allFiles.map((file, index)=>
            <li key={index} >
              <a href={file.dlURLs}>
            {file.fileNames} - {file.userN}
        </a>
      {/* {console.log(file.fileNames, file.dlURLs, file.userN)} */}
    </li>
    );
      }
      else{
        allImgs='bleh'
      }
    return(
      <p>{allImgs} </p>
    )
    }

  return (
    <div className='default'>
        <h1>Top rated saves:</h1>
        <div className='best'>
      {finalLoad && <Finish/>} 
      </div>
      {/* <Search/> */}
        </div>

  )
}

export default Index