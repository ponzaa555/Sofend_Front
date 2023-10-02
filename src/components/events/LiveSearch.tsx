// import React, {FC, useCallback, useEffect, useRef, useState} from 'react';



// interface Props<T> {
//     results?:T[];
//     renderItem(item:T): JSX.Element;
//     onChange?: React.ChangeEventHandler;
//     onSelect?: (item: T) => void;
//     value? : string;
// }

// const LiveSearch = < T extends object>({
//     results = [],
//     onChange,
//     onSelect,
//     value,
// }: Props<T>): JSX.Element => {
    
//     const [focusedIndex,setFocusedIndex] = useState(-1);
//     const resulContainer = useRef<HTMLDivElement>(null);
//     const [showResult, setShowResults] = useState(false);
//     const [defaultValue, setDefualtValue] = useState("");

//     const handleSelection = (selectdIndex: number) => {
//         const selectedItem = results[selectdIndex];
//         if(!selectedItem) return resetSearchComplete();
//         onSelect && onSelect(selectedItem);
//         resetSearchComplete();
//     };

//     const resetSearchComplete = useCallback(() => {
//         setFocusedIndex(-1);
//         setShowResults(false);
//     }, []);

    
//     const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) =>
//     {
//         const { key} = e ;
//         let nextIndexCount = 0;
//         //movedown
//         if (key === "ArrowDown"){
//             nextIndexCount = (focusedIndex + 1) % results.length;
//         }
//         //move up
//         if(key === "ArrowUp"){
//             nextIndexCount = (focusedIndex + results.length-1) % results.length;
//         }
//         // hide search results
//         if(key === "Escape"){
//             resetSearchComplete()
//         }
//         //select the current item
//         if(key === "Enter"){
//             e.preventDefault();
//             handleSelection(focusedIndex);

//         }
//         setFocusedIndex(nextIndexCount)
//     };

//     type changeHandler = React.ChangeEvent<HTMLInputElement>;
//     const handleChange:changeHandler = (e) => {
//         setDefualtValue(e.target.value);
//         onChange && onChange(e);
//     };

//     useEffect(() => {
//         if (!resulContainer.current) return;

//         resulContainer.current.scrollIntoView({
//             block: "center"
//         })
//     },[focusedIndex]);

//     useEffect(() => {
//         if (results.length > 0 && !showResult) setShowResults(true);

//         if (results.length <= 0 ) setShowResults(false);
//     }, [results]);

//     useEffect(() => {
//         if (value) setDefualtValue(value);
//     },[value]);
//     return (
//     <div className=' flex items-center  justify-center '>
//         <div 
//             tabIndex={1} 
//             onBlur={resetSearchComplete}
//             onKeyDown={handleKeyDown} 
//             className=' relative'>
//              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none  ">
//                 <svg
//                 className="w-5 h-5 text-gray-500 dark:text-gray-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//                 xmlns="http://www.w3.org/2000/svg"
//                 >
//                    <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                 ></path>
//                 </svg>
//             </div>
//             <input 
//             value={defaultValue}
//             onChange={handleChange}
//             type="text" 
//             className='w-[600px] px-5 py-3 text-lg  rounded-lg border-2 border-gray-500
//              focus:border-gray-700 outline-none transition  pl-10' 
//              placeholder='  Search your query'
//              />

//             {/* Search Result Container */}
//             {showResult && (
//             <div className='absolute mt-1 w-full p-2  bg-slate-50 shadow-lg 
//             rounded-bl rounded-br
//              max-h-56 overflow-y-auto'>
//                 {results.map((item,index) => {
//                     return(
//                         <div 
//                             key={index}
//                             onMouseDown={() => handleSelection(index)}
//                             ref = {index === focusedIndex ? resulContainer : null}
//                             style={{
//                                 backgroundColor :
//                                     index === focusedIndex ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,0)", 
//                                 }}
//                              className=' cursor-pointer hover: bg-black 
//                              hover: bg-opacity-10 p-2' >
//                                 <a href="/">{item.eventName}</a>
//                         </div>
//                     )
//                 }
//                 )
//             }
//             </div>)}
//         </div>
//     </div>
//     );
// };
// export default LiveSearch