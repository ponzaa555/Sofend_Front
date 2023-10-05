import React, { useState } from 'react'
import Image from 'next/image';

// type Props = {}

const ContentEventSetting = () => {
  const [imageSrc, setImageSrc] = useState<string>();
  const [uploadData, setUploadData] = useState<string | undefined>();

  // handleOnChange : Triggers when the file input changes (when a file is selected)

  const handleOnChange: React.FormEventHandler<HTMLFormElement> = (e) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    };

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
      <form action="" method='post' onChange={handleOnChange} onSubmit={handleOnSubmit}>
        {/* <button className='upload-photo bg-slate-100 rounded w-1/3 border border-gray-400 flex flex-col justify-center items-center mt-3 h-2/3'>
          <p className='text-center font-bold'><span className='text-5xl'>+</span><br/>Upload Your Poster</p>
        </button> */}
        <p>
          <input type="file" name="img-file" id="img-file" />
        </p>
        <Image src={imageSrc} alt="text-uploading" width={100} height={100}/>
        {
          imageSrc && !uploadData && (
            <p>
              <button>Upload files</button>
            </p>
          )
        }
        {
          uploadData && (
            <code><pre>{JSON.stringify(uploadData, null, 2)}</pre></code>
          )
        }
      </form>
      <form action="">
        <div className='flex flex-row gap-10'>
          <div className='w-2/3 flex flex-row gap-9'>
            <div className='flex flex-col justify-start w-2/3'>
              <label htmlFor="es-event-name" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Event Name</label>
              <input type="text" id='es-event-name' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
              <label htmlFor="es-category" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Category</label>
              <input type="text" id='es-category' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required/>
              <label htmlFor="es-description" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Description</label>
              <input type="text" id='es-description' className='border border-gray-500 rounded h-1/2 mb-3 font-montserrat px-2' required/>
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

        {/* Date and Time */}

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
        <div className='flex flew-row justify-end w-2/3 mt-16'>
          <button type='submit' className='text-white font-bold text-lg w-52 h-10 bg-black rounded mr-7'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default ContentEventSetting