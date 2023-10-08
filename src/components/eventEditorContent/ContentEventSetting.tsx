import React, { useState } from 'react'
import Image from 'next/image';

// type Props = {}

const ContentEventSetting = () => {
  const [imageSrc, setImageSrc] = useState<string>("/images/blank_poster.png");
  const [uploadData, setUploadData] = useState<string | undefined>();

  // handleOnChange : Triggers when the file input changes (when a file is selected)

  const handleOnChange: React.FormEventHandler<HTMLFormElement> = (e) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      if (onLoadEvent.target === null || onLoadEvent.target.result === null) {
        setImageSrc("/images/blank_poster.png");
        return;
      }
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

    if (e.target.files === null || e.target.files.length === 0) {
      setImageSrc("/images/blank_poster.png");
      return;
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  // handleOnSubmit : Triggers when the form is submitted

  const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'img-file');
    
    const formData = new FormData();

    for (const file of fileInput.files) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'eventbud')

    const data = await fetch('https://api.cloudinary.com/v1_1/deyk9edom/image/upload', {
      method: 'POST',
      body: formData
    }).then((response) => response.json());

    setImageSrc(data.secure_url)
    setUploadData(data.original_filename + '.' + data.format)

    console.log('data', data)

  }
  

  return (
    <div className='font-montserrat'>

      {/* Event Details */}

      <h2 className='font-bold text-3xl mb-4'>Event Details</h2>
      <form action="" method='post' onChange={handleOnChange} onSubmit={handleOnSubmit} className='absolute w-1/5 mt-2'>
        {/* <button className='upload-photo bg-slate-100 rounded w-1/3 border border-gray-400 flex flex-col justify-center items-center mt-3 h-2/3'>
          <p className='text-center font-bold'><span className='text-5xl'>+</span><br/>Upload Your Poster</p>
        </button> */}
        <Image src={imageSrc} alt="poster-img" width={300} height={300} className='h-72 w-full bg-gray-200 rounded object-cover'/>
        <p className='mt-3'>
          <input type="file" name="img-file" id="img-file" className='w-full'/>
        </p>
        {
          imageSrc && !uploadData && (
            <p>
              <button className='text-white font-bold text-base w-full h-8 bg-black rounded mt-3'>Upload file</button>
            </p>
          )
        }
        {
          uploadData && (
            <p className='mt-3'>{JSON.stringify(uploadData, null, 2)} is successfully uploaded</p>
          )
        }
      </form>
      <form action="">
        <div className='flex flex-row gap-10'>
          <div className='w-2/3 flex flex-row gap-9'>
            <div className='w-1/3 h-2/3'></div>
            <div className='flex flex-col justify-start w-2/3'>
              <label htmlFor="es-event-name" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Event Name</label>
              <input type="text" id='es-event-name' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
              <label htmlFor="es-category" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Category</label>
              <input type="text" id='es-category' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
              <label htmlFor="es-event-type" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Event Type</label>
              <select name="es-event-type" id="es-event-type" className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required>
                <option value="one-price">One price</option>
                <option value="zone-classed">Zone</option>
                <option value="seat">Seat</option>
              </select>
              <label htmlFor="es-description" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Description</label>
              <textarea id='es-description' className='border border-gray-500 rounded h-1/2 mb-3 font-montserrat p-2' required/>
            </div>
          </div>
          <div className='flex flex-col w-1/3 justify-start'>
            <div>
              <h3 className='font-bold text-lg mb-2'>Optimize Your Event Name</h3>
              <p className='mb-4'>Adding short description to your event name will help people learn more about your event by just looking at its title.</p>
              <h3 className='font-bold text-lg mb-2'>Make Use of Category</h3>
              <p className='mb-4'>Category can help people discover your event easier.</p>
              <h3 className='font-bold text-lg mb-2'>Event Description</h3>
              <p>This section is to let you input all the details of your event so don’t forget to provide the essential information of your event that attendees needs to know. Such as: what’s your event for, where’s your event, what’s worth attending, availability of food & drink, etc. Make it informative enough to answer frequent questions.</p>
            </div>
          </div>
        </div>

        {/* Sales Period */}

        <h2 className='font-bold text-3xl mb-4 mt-16'>Date and Time</h2>
        <div className='flex flex-row gap-10'>
          <div className='flex flex-col justify-start w-2/3'>
            <div className='flex flex-row justify-start gap-7'>
              <div className='flex flex-col justify-start w-7/12'>
                <label htmlFor="es-start-date" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Start at date</label>
                <input type="date" id='es-start-date' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
              </div>
              <div className='flex flex-col justify-start w-5/12'>
                <label htmlFor="es-start-time" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Start time</label>
                <input type="time" id='es-start-time' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
              </div>
            </div>
            <div className='flex flex-row justify-start gap-7'>
              <div className='flex flex-col justify-start w-7/12'>
                <label htmlFor="es-end-date" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">End at Date</label>
                <input type="date" id='es-end-date' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
              </div>
              <div className='flex flex-col justify-start w-5/12'>
                <label htmlFor="es-end-time" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">End Time</label>
                <input type="time" id='es-end-time' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-1/3 justify-start'>
            <div>
              <h3 className='font-bold text-lg mb-2'>Sales Period</h3>
              <p>Providing accurate date and time of sales period is crucial.12:00 PM - Midday12:00 AM - Midnight</p>
            </div>
          </div>
        </div>

        {/* Date and Time */}

        <h2 className='font-bold text-3xl mb-4 mt-16'>Date and Time</h2>
        <div className='flex flex-row gap-10'>
          <div className='flex flex-col justify-start w-2/3'>
            <div className='flex flex-row justify-start gap-7'>
              <div className='flex flex-col justify-start w-7/12'>
                <label htmlFor="es-start-date" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Start at date</label>
                <input type="date" id='es-start-date' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
              </div>
              <div className='flex flex-col justify-start w-5/12'>
                <label htmlFor="es-start-time" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Start time</label>
                <input type="time" id='es-start-time' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
              </div>
            </div>
            <div className='flex flex-row justify-start gap-7'>
              <div className='flex flex-col justify-start w-7/12'>
                <label htmlFor="es-end-date" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">End at Date</label>
                <input type="date" id='es-end-date' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
              </div>
              <div className='flex flex-col justify-start w-5/12'>
                <label htmlFor="es-end-time" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">End Time</label>
                <input type="time" id='es-end-time' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
              </div>
            </div>
          </div>
          <div className='flex flex-col w-1/3 justify-start'>
            <div>
              <h3 className='font-bold text-lg mb-2'>Date and Time</h3>
              <p>Providing accurate date and time of the event will benefit your ticket buyers.12:00 PM - Midday / 12:00 AM - Midnight</p>
            </div>
          </div>
        </div>

        {/* Location */}

        <h2 className='font-bold text-3xl mb-4 mt-16'>Location</h2>
        <div className='flex flex-row gap-10'>
          <div className='flex flex-col justify-start w-2/3'>
            <label htmlFor="es-event-name" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Event Location (Name of Venue)</label>
            <input type="text" id='es-event-name' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
            <label htmlFor="es-category" className="text-xl mb-1">Room/Floor/Hall/etc.</label>
            <input type="text" id='es-category' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2'/>
          </div>
          <div className='flex flex-col w-1/3 justify-start'>
            <div>
              <h3 className='font-bold text-lg mb-2'>Location</h3>
              <p>The location section is a crucial component when adding a new event to a ticket sales website. It provides essential information about where the event will take place, helping potential attendees easily identify the venue and plan their attendance.</p>
            </div>
          </div>
        </div>
        <div className='flex flew-row justify-between w-2/3 mt-16'>
          <button className='text-red-600 font-bold text-left text-lg m-0 leading-none' onClick={() => alert("Delete This Event ?")}>Delete This Event<br/><span className='text-sm font-normal m-0'>(This action cannot be undone)</span></button>
          <button type='submit' className='text-white font-bold text-lg w-52 h-10 bg-black rounded mr-7'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default ContentEventSetting