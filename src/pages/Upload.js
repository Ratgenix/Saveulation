import React, {useState, useRef, useEffect} from 'react'
import {Button} from 'react-bootstrap';
import '../css/files.css'
import {AuthProvider, useAuth} from '../context/AuthProvider.js'
import {store, db} from '../components/Firebase.js'
import { getStorage, ref, deleteObject, getMetadata } from "firebase/storage";


function Upload() {
  const {currentUser, testVal, users, user, findUser}=useAuth();
  
  const [imgUp, setImg]=useState(null);
  const [files, setFiles] = useState();
  let [name, setname] = useState('');
  var [loading, setLoad]=useState(false);
  const[fileFlag, setFFlag]=useState(false);
  const[progress,setProg]=useState(0);
  const [pop, setPop]=useState(false)
  const [pop2, setPop2]=useState(false)
  var [clicked, SetClicked]=useState(0)
  const [urls, setURL] = useState('');
  const [dbList, setList] = useState()
  const [fetched, setFetched] = useState(0)
  const [desc, setDesc] = useState('')
  // const[display, setDisplay]=useState('')

  var urls2=''

  ///////

  useEffect(() => {
    const fetchImages = async () => {
      let result = await store.ref().child(`saves/${testVal}`).listAll();
      let urlPromises = result.items.map((imageRef) =>
        imageRef.getDownloadURL()
       
      );
     
      return Promise.all(urlPromises);
    };

    const loadImages = async () => {
      const urls = await fetchImages();
     urls2=urls

      setFiles(urls);

      const dbRef = db.ref(`Saves/${testVal}`);
    dbRef.on('value', (snapshot)=>{
      const dbField = snapshot.val()
      const dbList1=[];
      for (let id in dbField){
        dbList1.push({id, ...dbField[id]});
      }
      setList(dbList1);
    })

      setLoad(true)
      // console.log(dbList)
      // console.log(loading)


    };
    loadImages();
// }, [loading, dbList]);
}, [loading]);

////

  const handleChange = (event) => {
    //var test1=event.target.value.reverse().split('\\')[0].reverse()
    setname(event.target.files[0].name);
    setImg(event.target.files[0]);
    let filetype = event.target.files[0].name.split('.')[1]
    console.log(filetype)
    if(filetype != 'sav'){
      alert('wrong file type')
      setFFlag(false)
      return false;
    }
    else{
      setFFlag(true)
      console.log(testVal, 'is trying to uploading', event.target.files[0].name)

    }

  }
  ////

  async function toDB(props){
   // let res = await upload()
    const dbRef = db.ref('Saves');
    const dlUrl = props;

    
    // console.log(urls)
    var key = name;
    if(key.indexOf('[')>-1){
      key=key.split('[')[0];
    }
    const dlName = name;
    const fetchVar = await fetchDB(dlName)
    console.log(fetchVar, 'fetch')
    console.log(dlName, 'hi')
    const dbPayload = {
      fileName: dlName,
      rating : 0,
      description: desc,
      user: testVal,
      downloadURL: dlUrl,
    };
    // dbRef.push(dbPayload)
    // dbRef.child(testVal).child(key).update(dbPayload)
    if(fetchVar==false){
      console.log('updating')
      dbRef.child(testVal).child(dbList[fetched].id).update(dbPayload)
    }
    else{
      console.log('new save')
      dbRef.child(testVal).push(dbPayload)
    }
    // dbRef.child(testVal).push(dbPayload)
    }

  function fetchDB(newUrl){
    const fetchedUrl = newUrl
    console.log(fetchedUrl)

    var i=0;
    // console.log(dbList.length)
    if(dbList.length==0){
      return true
    }
    else{
      // console.log('entered')
    while(i<dbList.length){
      // console.log(i)
    if(dbList[i].fileName != fetchedUrl){
     
      setFetched(i)
      console.log(dbList[i].fileName, fetchedUrl)
      console.log('not false')
      console.log(i)
      i=i+1
    }
    else{
      console.log('found')
      // console.log(dbList[i].fileName, 'false')
      return false
    }
  }
}
    // console.log(dbList)
    // console.log(urls)
    return true
  }
  

  function upload(){
    if(fileFlag){
    console.log('uploading...')
    // const fileRef = store.ref()
    const uploadTask=store.ref(`saves/${testVal}/${name}`).put(imgUp);
    // console.log(name)
    uploadTask.on(
        "state_changed",
        snapshot=>{
            const progress=Math.round(
                (snapshot.bytesTransferred/snapshot.totalBytes)*100
            )
            setProg(progress);
        },
        error=>{
            console.log(error)
        },
        ()=>{
            store
            .ref("saves")
            .child(testVal)
            .child(name)
            .getDownloadURL()
            .then((url)=>{
                  // console.log(url, "url")
                  console.log('then triggered')
                   console.log(url)
                  setURL(url)
                   toDB(url)
                  // console.log(urls, "urls")
              
            },setLoad(false) );
        }
    )
    }
    else{
      // console.log('please upload the correct file format')
      alert('Please upload the correct file format!!')
      return false;
    }
}
function Hi(props){
  //console.log(props2, "prop2")
  let newVal=props.fName
  let ind=props.ind
  newVal=newVal.split('saves')[1].split('%2F')[2].split('.sav')[0];
  let NameArr = newVal
  var testName = '';
  if(newVal.indexOf('%20')>-1){
    // console.log("found")
    NameArr = NameArr.split('%20')
    testName = NameArr.join(' ')
    if(testName.indexOf('%5B')){
     NameArr=testName.split('%5B')
     testName=NameArr.join('[')
     NameArr=testName.split('%5D');
     testName=NameArr.join(']');
      // console.log(testName)
      // testName=NameArr
    }
  }
  newVal=testName;
  // console.log(clicked)
  // console.log(newVal, "index")
 return(props.trigger && clicked ===ind)?(
  <div className='delete-back' >
      <div className='delete-box'>
         
      <p>Are you sure you want to delete {newVal}?</p>
     <span> <Button onClick={()=>delItem(newVal + '.sav')}>Yes</Button> <Button className='butt2' onClick={()=>setPop(!pop)}>No</Button> </span>
      <p></p>
      </div>
      </div>
 ):"";
}

function delItem(imageName){
  let newName="saves/"+testVal+'/'+imageName
  console.log(newName)
  console.log(imageName)
  deleteObject(ref(store, newName)).then(() => {
    setLoad(false)
    // setPop(false)
    setFiles(urls2)
  
    console.log("Deleted successfully!")
  }).catch((error) => {
    // Uh-oh, an error occurred!
    console.log("oops!", error)
  });
  const dbRef = db.ref('Saves');
  dbRef.child(testVal).child(dbList[fetched].id).remove()
  
  }

function NameConversion(props){
  let newName=props.name
  // console.log(newName)
  let uploader = newName.split('saves')[1].split('%2F')[1]
  // console.log(uploader)
  newName=newName.split('saves')[1].split('%2F')[2].split('.sav')[0];
  let NameArr = newName
  var testName = '';
  if(newName.indexOf('%20')>-1){
    // console.log("found")
    NameArr = NameArr.split('%20')
    testName = NameArr.join(' ')
    if(testName.indexOf('%5B')){
      NameArr=testName.split('%5B')[0]
      // console.log(NameArr)
      testName=NameArr
    }
  }

return(
<p title={testName}>{testName} - {uploader}</p>
)
}


function test1(idTag){
  SetClicked(idTag)
  console.log(idTag)
  setPop(!pop)
}

///
function DisplayAll(){
  var allImgs='';
  if(loading){
    allImgs=
  files.map((file, index)=>

<li key={index} >
 <div className='files'><a href={file}>
    <NameConversion name={file}/>
    </a>
    <p title='delete?' className='del' 
  onClick={()=>test1(index)}>X</p>
  <Hi ind={index} trigger={pop} fName={file}/>
  </div>
  {/* <hr/> */}
  </li>
  );
  }
  else{
    allImgs=''
  }
  return(
    <p>{allImgs}</p>
  )
  }

function getAll(){

console.log(dbList[0])
}



////

  return (
    <div className='upload'>
        <h1>Upload a .sav file!</h1>
        {name && <Button onClick={upload}>Upload</Button>}
        <br/>
        <input type="file" accept=".sav, .sav1" onChange={handleChange} />
        <br/>
        <progress value={progress} max="100"/>
        <h4>Signed in as : {testVal}</h4>
        <hr/>
        <h5>Recent uploads :</h5>
        <div className='imgs-div'>{loading && <DisplayAll/>}</div>
        </div>
  )
}

export default Upload
