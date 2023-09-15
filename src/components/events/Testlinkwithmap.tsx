import { error } from "console";
import React,{useState,useEffect}from "react";
import { date } from "zod";
import { getAllEvent } from "~/service/api";

interface Product{
    eventName:string,
    eventID: string,
}
const Testlinkwithmap = () =>{
    const[product,Setproduce] = useState([])
    const[results,setResults] = useState([])
    const[showResult,setShowResults] = useState(false)
   
    useEffect(() =>{
        getAllEvent()
            .then(date =>{
                Setproduce(date)
            })
            .catch(error =>{
                console.error('Error',error)
            })
    })
    const handleChange = (e) => {
        const filterData = product.filter((d) => 
        d.eventName.toLocaleLowerCase().match(e.target.value.toLocaleLowerCase()))
        setResults(filterData)
        let lengthinput = e.target.value.length
        console.log("e",lengthinput)
        if(lengthinput === 0 ) setResults([])
        
    }
    useEffect(() =>{
        if (results.length > 0 && !showResult) setShowResults(true);
    },[results]);
    return(
        <div className="">
            <div className="  w-[600px]   m-auto  bg-white justify-center rounded-lg shadow-xl pl-5 py-2 border-2 border-gray-500
             focus:border-gray-700">
                <input type="text" placeholder="Type Here ...." 
                className=" w-full h-10 rounded-lg outline-none text-lg relative pl-7
                bg-white"
                onChange={handleChange}/>
                {(setShowResults &&
                    <div className=" overflow-y-scroll max-h-60">
                    {results.map(product =>{
                    return(
                        <a href= {"/eventdetail/"+product.eventID}>
                            <div className=" pl-2 py-3 hover:bg-slate-200 relative "  >
                                <a href={"/eventdetail/"+product.eventID} className=" pl-5 " >{product.eventName}</a>
                                <svg
                                    className="w-6 h-6 text-gray-500 dark:text-gray-400 absolute left-0 inset-3  "
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    ></path>
                                    </svg>
                            </div>
                        </a>
                            
                    )
                    })}
                </div>
                )}
                
                <div className=" absolute inset-y-5 px-0">
                    <svg
                    className="w-6 h-6 text-gray-500 dark:text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                    </svg>
                </div>
                
            </div>
        </div>
        
    )
}
export default Testlinkwithmap