import { getValue } from '@testing-library/user-event/dist/utils'
import React, {useState, useEffect} from 'react'
import '../css/nav.css';
import {AiOutlineSearch} from 'react-icons/ai'

function Search(props) {

    const[val, setVal]=useState('')
    const[res,setRes]=useState([])
    const[store, setStore]=useState([])

    /////

    useEffect(()=>{
        if(val.length>0){
            // console.log('more than 0')
            fetch('https://saveulator-default-rtdb.firebaseio.com/Saves.json')
            .then(
                response => response.json()
                // console.log(response)
            )
        .then(
            responseData=>{
            setStore([]);
            setRes([])
            // console.log(Object.keys(responseData.adam))
            // console.log(Object.values(responseData.adam))
            console.log(responseData)
            let searchQuery = val.toLowerCase();
            let k=0
            let newArr2=[]
            let searchArr=[]
            let downloadURL=''
            let fileName=''
            for(const key in responseData){

                let test = Object.values(responseData[key])

                // console.log(test[0].fileName)
                while(k<test.length){
                    downloadURL=test[k].downloadURL
                    fileName=test[k].fileName
                    // console.log(test[k].fileName, 'k')
                    newArr2.push({downloadURL, fileName})

                    // if(fileName.toLowerCase().slice(0, searchQuery.length).indexOf((searchQuery)) > -1){
                    //     // console.log(fileName.toLowerCase().slice(0, searchQuery.length).indexOf((searchQuery > -1)))
                    //     console.log('entered')
                    //     searchArr.push(fileName)
                    //     // setRes(...res, store[i].fileName)            
                    //     console.log(res)        
                    // }
                    k=k+1    
                }
                
                k=0
                setStore(newArr2)
            }
            let i =0
            let fName=''
            let dlU=''
            while(i<store.length){
                if(store[i].fileName.toLowerCase().slice(0, searchQuery.length).indexOf((searchQuery)) > -1){
                    // console.log(fileName.toLowerCase().slice(0, searchQuery.length).indexOf((searchQuery > -1)))
                    // console.log('entered')
                    fName=store[i].fileName
                    dlU=store[i].downloadURL
                    searchArr.push({dlU, fName})
                    // setRes(...res, store[i].fileName)            
                    // console.log(res)        
                }
                i++
            }
            setRes(searchArr)
        }).catch(error=>{
            console.log(error)
        })
    }else{
        setStore([])
        setRes([])
        // console.log('else')
    }

    },[val])



  return (
    <div className='searchbar'>
        <div className='sb2'>
        <AiOutlineSearch id='search-ico'/>
        <input type='text' 
        placeholder='Search...'
        onChange={(event)=>setVal(event.target.value)}
        value={val}
        />
        </div>
        <div className='search-res'>
            {res.map((res, index)=>(
                <div>

                    <a href={res.dlU}>
                    <p>{res.fName}</p>
                    </a>

                    </div>
            ))}
        </div>
        {/* {console.log(store)} */}
        </div>
  )
}

export default Search