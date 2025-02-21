import React, { useState } from 'react'
import { AiFillFileWord } from "react-icons/ai";
import axios from 'axios';

function Home() {
  const [selectedfile,setselectedfile] = useState(null);
  
  const [convert, setconvert] = useState("");
  const [downloaderror,setdownloaderror] = useState("");
  const handlefilechange=(e)=>{
    // console.log(e.target.files[0]);
    setselectedfile(e.target.files[0]);
  }
  const handlesubmit = async (e)=>{
    e.preventDefault();
    if (!selectedfile) {
      setconvert('Please select a file.');
      return;
  }
  const formData = new FormData();
  formData.append('file', selectedfile);
  try {
    const response = await axios.post(`http://localhost:3000/convert`,formData,{
      responseType:"blob",
    });
    // console.log(response.data);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    // console.log(url);
    const link= document.createElement("a");
    // console.log(link);
    link.href = url;
    link.setAttribute("download",selectedfile.name.replace(/\.[/.]+$/,"")+".pdf");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link)
    setselectedfile(null);
    setdownloaderror('')
    setconvert('File converted Successfully')
  } catch (error) {
    console.error(error);
  }
}
  return (
    <div className='max-w-screen-2xl mx-auto container px-6 py-5 md:px-40  '>
      <div className=' border-2 w-[78%] mx-auto border-dotted border-blue-950 p-5 mt-10 flex flex-col justify-center items-center rounded-lg'>
        <h1 className='text-4xl font-semibold'>Convert Word to PDF Online</h1>
        <p className='text-xl mt-8'>Easily Convert Word Documents to PDF Online, without having to install any software.</p>
        <div className='flex flex-col space-y-4 w-[80%]'>
          <input type="file" 
          name="file" 
          accept='.doc,.docx'
           className='hidden'
          id="file" 
          onChange={handlefilechange}/>
          
          <label htmlFor="file" className=' flex justify-center items-center px-4 py-4 bg-gray-300 rounded-md hover:cursor-pointer hover:bg-blue-700 hover:text-white gap-3'> <AiFillFileWord /> {selectedfile? selectedfile.name :"ChooseFile"}</label>
        </div>
        <div className='flex justify-center items-center'>
          <button disabled={!selectedfile} className='bg-blue-800 hover:scale-110 duration-300 ease-in-out hover:bg-slate-600 text-white rounded-md p-2 mt-5 text-center disabled:bg-slate-600 disabled:pointer-events-none' onClick={handlesubmit}>Convert File</button>
          </div>
          {convert && (<div className='text-green-600 text-center text-lg'>{convert}</div>)}
          {downloaderror && (<div className='text-red-600 text-center text-lg'>{downloaderror}</div>)}
      </div>
    </div>
  )
}

export default Home;