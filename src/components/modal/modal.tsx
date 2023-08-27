import React , {useState} from 'react';
import Mymodal from './mymodal';

export default function Modal({}) {

    const [modal,setmodal] = useState(false);

    const togglemodal = () => {
        setmodal(!modal);
    }

    return (
    <>
        <button className="bg-black hover:bg-black hover:text-white border-2 border-black duration-300 text-white font-bold py-2 rounded mt-2 mb-2 box-content h-6 w-32 mr-5" onClick={togglemodal}>Contact</button>
        
        <Mymodal onClose={togglemodal} visible={modal}/>
    </>
    );
}