import React from 'react';

const Seachresult = ({results}) => {
const filterresult = results.filter((e,index)=> {
    if(index<8){
        return true
    }
})
    return <div className= 'box-boder bg-white rounded-xl mt-10  w-2/5 shadow-md mb-3'>
       {
        filterresult.map((result,id) =>{
            return <div className='mx-10' key={id} >
                <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                ></svg>
                <button>
                {result.name}
                </button>
                </div>
        })
       }
    </div>
};


export default Seachresult