import React , {useEffect, useState} from 'react'
import Slideshow from './slideshow';
import { Dropdown } from 'react-bootstrap';
import Eventcard from  "../data/MOCK_DATA.json"
const searchbar =({setResults})=>{
    const [input,setInput] = useState("") 
    const fetchData = (value) => {
        const result = Eventcard.filter((user) => {
            return (
                value &&
                user && 
                user.name && 
                user.name.toLocaleLowerCase().includes(value) ) 
        })
        setResults(result)
    }
    const handlechange = (value) =>{
        setInput(value)
        fetchData(value) 
    }
    return(
    <div className="max-w-2xl mx-auto p-4 relative">
            <div className="absolute inset-x-0 -bottom-5">
            <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 drop-shadow-lg"
                placeholder="Search by event's name"
                required
                value={input}
                onChange={(e) => handlechange(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
export default searchbar