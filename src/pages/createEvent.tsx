import Head from 'next/head'
import NavbarEO from '~/components/navbarEO';
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react"
import { useRouter } from 'next/router'
import type { TicketClass } from '~/components/events/eventitem';
import { Toaster, toast } from 'react-hot-toast';
import { c } from 'msw/lib/glossary-de6278a9';
import { set } from 'zod';

type EventDetail = {
    eventID: string;
    eventName: string;
    startDateTime: string;
    endDateTime: string;
    onSaleDateTime: string;
    endSaleDateTime: string;
    location: string;
    info: string;
    featured: boolean;
    eventStatus: string;
    tagName: string[];
    posterImage: string;
    seatImage: string;
    staff: string[];
    ticket: string[];
    ticketType: string;
    ticketClass: TicketClass[];
    organizerName: string;
}

const posterMaxWidth: React.CSSProperties = {
    maxWidth: 256,
};

const CreateEvent = () => {

    const [imageSrc, setImageSrc] = useState<string>("/images/blank_poster.png");
    const [uploadData, setUploadData] = useState<string>("");
    const [seatImageSrc, setSeatImageSrc] = useState<string>(" ");
    const { data: session } = useSession()
    const eoId = session?.user?.userID as string
    const router = useRouter()
    let currentPosterImg = ""
    const [eventDetail, setEventDetail] = useState<EventDetail>({
        eventID: "",
        eventName: "",
        startDateTime: "",
        endDateTime: "",
        onSaleDateTime: "",
        endSaleDateTime: "",
        location: "",
        info: "",
        featured: false,
        eventStatus: "",
        tagName: [],
        posterImage: "",
        seatImage: "",
        staff: [],
        ticket: [],
        ticketType: "",
        ticketClass: [],
        organizerName: "",
    })


    const handleOnChange: React.FormEventHandler<HTMLFormElement> = (e) => {
        setEventDetail({
            ...eventDetail,
            eventName: (e.currentTarget.elements[0] as HTMLTextAreaElement).value,
            tagName: [(e.currentTarget.elements[1] as HTMLInputElement).value],
            ticketType: (e.currentTarget.elements[2] as HTMLSelectElement).value,
            info: (e.currentTarget.elements[3] as HTMLTextAreaElement).value,
            seatImage: seatImageSrc,
            onSaleDateTime: (e.currentTarget.elements[5] as HTMLInputElement).value + 'T' + (e.currentTarget.elements[6] as HTMLInputElement).value,
            endSaleDateTime: (e.currentTarget.elements[7] as HTMLInputElement).value + 'T' + (e.currentTarget.elements[8] as HTMLInputElement).value,
            startDateTime: (e.currentTarget.elements[9] as HTMLInputElement).value + 'T' + (e.currentTarget.elements[10] as HTMLInputElement).value,
            endDateTime: (e.currentTarget.elements[11] as HTMLInputElement).value + 'T' + (e.currentTarget.elements[12] as HTMLInputElement).value,
            location: (document.getElementById("es-room") as HTMLInputElement)?.value !== "" ? (e.currentTarget.elements[13] as HTMLInputElement).value + ", " + (document.getElementById("es-room") as HTMLInputElement)?.value : (e.currentTarget.elements[13] as HTMLInputElement).value,
            posterImage: imageSrc,
        })
    }

    const [disabledSave, setDisabledSave] = useState<boolean>(false)
    const handleOnSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        toast.remove()
        toast.loading("Saving...")
        setDisabledSave(true)
        e.preventDefault();
        const changedData = {
            eventName: (e.currentTarget.elements[0] as HTMLTextAreaElement).value,
            tagName: [(e.currentTarget.elements[1] as HTMLInputElement).value],
            ticketType: (e.currentTarget.elements[2] as HTMLSelectElement).value,
            info: (e.currentTarget.elements[3] as HTMLTextAreaElement).value,
            seatImage: seatImageSrc,
            onSaleDateTime: (e.currentTarget.elements[5] as HTMLInputElement).value + 'T' + (e.currentTarget.elements[6] as HTMLInputElement).value,
            endSaleDateTime: (e.currentTarget.elements[7] as HTMLInputElement).value + 'T' + (e.currentTarget.elements[8] as HTMLInputElement).value,
            startDateTime: (e.currentTarget.elements[9] as HTMLInputElement).value + 'T' + (e.currentTarget.elements[10] as HTMLInputElement).value,
            endDateTime: (e.currentTarget.elements[11] as HTMLInputElement).value + 'T' + (e.currentTarget.elements[12] as HTMLInputElement).value,
            location: (document.getElementById("es-room") as HTMLInputElement)?.value !== "" ? (e.currentTarget.elements[13] as HTMLInputElement).value + ", " + (document.getElementById("es-room") as HTMLInputElement)?.value : (e.currentTarget.elements[13] as HTMLInputElement).value,
            posterImage: imageSrc,
        }
        if (uploadData === "" ) {
            toast.remove()
            toast.error("Please upload poster image")
            setDisabledSave(false)
            return
        }
        // console.log(changedData)
        if (eoId) {
            // get eventId
            const POST_URL = `https://eventbud-jujiu2awda-uc.a.run.app/eo_create_event/${eoId}`
            const response = await fetch(POST_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            // POST event setting
            if (response.ok) {
                const eventId = await response.json();
                console.log(eventId)
                const saveUrl = `https://eventbud-jujiu2awda-uc.a.run.app/eo_event_setting/${eoId}/${eventId}`;
                fetch(saveUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(changedData),
                })
                    .then((response) => {
                        if (response.ok) {
                            toast.remove()
                            toast.success("Save success")
                            router.push(`/eventeditor/${eventId}`)
                        }
                        else {
                            // delete eventID
                            const deleteUrl = `https://eventbud-jujiu2awda-uc.a.run.app/eo_delete_event/${eoId}/${eventId}`;
                            fetch(deleteUrl, {
                                method: 'DELETE'
                            })
                                .then((response) => {
                                    if (response.ok) {
                                        console.log("delete success")
                                    }
                                    else {
                                        console.log("delete failed")
                                    }
                                })
                            let errorText = ""
                            response.json()
                                .then((data) => {
                                    errorText = data.detail
                                })
                                .then(() => {
                                    toast.remove()
                                    toast.error(`Save failed (${errorText})`)
                                    setDisabledSave(false)
                                })
                        }
                    })
            }
        }
        setDisabledSave(false)
    }

    // handleOnChangeUploadImg : Triggers when the file input changes (when a file is selected)

    const handleOnChangeUploadImg: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const reader = new FileReader();

        reader.onload = function (onLoadEvent) {
            if (onLoadEvent.target === null || onLoadEvent.target.result === null) {
                if (currentPosterImg !== "") {
                    setImageSrc(currentPosterImg);
                }
                else {
                    setImageSrc("/images/blank_poster.png");
                }
                return;
            }
            setImageSrc(onLoadEvent.target.result.toString());
        };

        if (e.target.files === null || e.target.files.length === 0) {
            if (currentPosterImg !== "") {
                setImageSrc(currentPosterImg);
            }
            else {
                setImageSrc("/images/blank_poster.png");
            }
            return;
        }
        reader.readAsDataURL(e.target.files[0]);
        const fileInput = e.currentTarget;

        if (fileInput.files === null || fileInput.files.length === 0) {
            return;
        }

        const formData = new FormData();

        for (const file of fileInput.files) {
            formData.append('file', file);
        }

        formData.append('upload_preset', 'eventbud')

        const uploadImage = async () => {
            let data;
            await fetch('https://api.cloudinary.com/v1_1/deyk9edom/image/upload', {
                method: 'POST',
                body: formData
            })
                .then((response) => response.json())
                .then((result) => {
                    data = result
                    setImageSrc(data.secure_url)
                    setUploadData(data.original_filename + '.' + data.format)
                })
                .catch((error) => {
                    console.error('Error fetching events:', error);
                });
        }

        toast.promise(uploadImage(), {
            loading: 'Uploading...',
            success: 'Upload success',
            error: 'Upload failed',
        })
    }

    const handleOnChangeUploadSeatImg: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const fileInput = e.currentTarget;

        if (fileInput.files === null || fileInput.files.length === 0) {
            return;
        }

        const formData = new FormData();

        for (const file of fileInput.files) {
            formData.append('file', file);
        }

        formData.append('upload_preset', 'eventbud')

        const uploadImage = async () => {
            let data;
            await fetch('https://api.cloudinary.com/v1_1/deyk9edom/image/upload', {
                method: 'POST',
                body: formData
            })
                .then((response) => response.json())
                .then((result) => {
                    data = result
                    setSeatImageSrc(data.secure_url)
                })
                .catch((error) => {
                    console.error('Error fetching events:', error);
                });
        }

        toast.promise(uploadImage(), {
            loading: 'Uploading...',
            success: 'Upload success',
            error: 'Upload failed',
        })
    }

    return (
        <div>
            <Head>
                {/* import font to page */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='anonymous' />
                <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500;700&family=Montserrat:wght@400;500;700&display=swap" rel="stylesheet" />
            </Head>
            <NavbarEO />
            <div className='mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10 font-montserrat'>
                <div className='font-montserrat'>
                    <Toaster />

                    {/* Event Details */}

                    <h2 className='font-bold text-3xl mb-4'>Event Details</h2>
                    <div className='absolute w-1/5 mt-2' style={posterMaxWidth}>
                        <img src={imageSrc} alt="poster-img" className='h-90 w-full bg-gray-200 rounded object-cover' />
                        <p className='mt-3'>
                            <input type="file" name="img-file" id="img-file" className='w-full' onChange={handleOnChangeUploadImg} accept='.png, .jpg, .jpeg' />
                        </p>
                    </div>
                    <form action="" onChange={handleOnChange} onSubmit={handleOnSubmit}>
                        <div className='flex flex-row gap-10'>
                            <div className='w-2/3 flex flex-row gap-9'>
                                <div className='w-1/3 h-2/3'></div>
                                <div className='flex flex-col justify-start w-2/3'>
                                    <label htmlFor="es-event-name" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Event Name</label>
                                    <textarea id='es-event-name' className='border border-gray-500 rounded h-9 mb-3 font-kanit px-2' value={eventDetail?.eventName} required />
                                    <label htmlFor="es-category" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Category</label>
                                    <input type="text" id='es-category' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' value={eventDetail?.tagName} required />
                                    <label htmlFor="es-event-type" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Event Type</label>
                                    <select name="es-event-type" id="es-event-type" className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' required>
                                        <option value="OnePrice">One price</option>
                                        <option value="Classed">Zone (Classed)</option>
                                        <option value="Seat">Seat</option>
                                    </select>
                                    <label htmlFor="es-description" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Description</label>
                                    <textarea id='es-description' className='border border-gray-500 rounded h-1/2 mb-3 font-kanit p-2' value={eventDetail?.info} required />
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

                        {/* Event Map */}

                        <h2 className='font-bold text-3xl mb-4 mt-16'>Event Map</h2>
                        <div className='flex flex-row gap-10'>
                            <div className='w-2/3'>
                                {seatImageSrc !== " " && <img src={seatImageSrc} alt="seat-img" className='w-full bg-gray-100 rounded object-contain' />}
                                <p className='mt-3'>
                                    <input type="file" name="seatImg-file" id="img-file" className='w-full' onChange={handleOnChangeUploadSeatImg} accept='.png, .jpg, .jpeg' />
                                </p>
                            </div>

                            <div className='flex flex-col w-1/3 justify-start'>
                                <div>
                                    <h3 className='font-bold text-lg mb-2'>Event Map</h3>
                                    <p>Providing image of zone and and location of important facilities (eg. gate, toilets, etc.) this section can be null.</p>
                                </div>
                            </div>
                        </div>

                        {/* Sales Period */}

                        <h2 className='font-bold text-3xl mb-4 mt-16'>Sales Period</h2>
                        <div className='flex flex-row gap-10'>
                            <div className='flex flex-col justify-start w-2/3'>
                                <div className='flex flex-row justify-start gap-7'>
                                    <div className='flex flex-col justify-start w-7/12'>
                                        <label htmlFor="es-on-sale-date" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Start at date</label>
                                        <input type="date" id='es-on-sale-date' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' value={eventDetail?.onSaleDateTime.split("T")[0]} required />
                                    </div>
                                    <div className='flex flex-col justify-start w-5/12'>
                                        <label htmlFor="es-on-sale-time" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Start time</label>
                                        <input type="time" id='es-on-sale-time' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' value={eventDetail?.onSaleDateTime.split('T')[1]?.split(".")[0]} required />
                                    </div>
                                </div>
                                <div className='flex flex-row justify-start gap-7'>
                                    <div className='flex flex-col justify-start w-7/12'>
                                        <label htmlFor="es-end-sale-date" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">End at Date</label>
                                        <input type="date" id='es-end-sale-date' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' value={eventDetail?.endSaleDateTime.split("T")[0]} required />
                                    </div>
                                    <div className='flex flex-col justify-start w-5/12'>
                                        <label htmlFor="es-end-sale-time" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">End Time</label>
                                        <input type="time" id='es-end-sale-time' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' value={eventDetail?.endSaleDateTime.split("T")[1]?.split(".")[0]} required />
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
                                        <input type="date" id='es-start-date' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' value={eventDetail?.startDateTime.split("T")[0]} required />
                                    </div>
                                    <div className='flex flex-col justify-start w-5/12'>
                                        <label htmlFor="es-start-time" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Start time</label>
                                        <input type="time" id='es-start-time' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' value={eventDetail?.startDateTime.split("T")[1]?.split(".")[0]} required />
                                    </div>
                                </div>
                                <div className='flex flex-row justify-start gap-7'>
                                    <div className='flex flex-col justify-start w-7/12'>
                                        <label htmlFor="es-end-date" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">End at Date</label>
                                        <input type="date" id='es-end-date' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' value={eventDetail?.endDateTime.split("T")[0]} required />
                                    </div>
                                    <div className='flex flex-col justify-start w-5/12'>
                                        <label htmlFor="es-end-time" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">End Time</label>
                                        <input type="time" id='es-end-time' className='border border-gray-500 rounded h-9 mb-3 font-montserrat px-2' value={eventDetail?.endDateTime.split("T")[1]?.split(".")[0]} required />
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
                                <label htmlFor="es-location" className="text-xl mb-1 after:content-['*'] after:ml-0.5 after:text-red-500">Event Location (Name of Venue)</label>
                                <input type="text" id='es-location' className='border border-gray-500 rounded h-9 mb-3 font-kanit font-regular px-2' value={eventDetail?.location} required />
                                <label htmlFor="es-room" className="text-xl mb-1">Room/Floor/Hall/etc.</label>
                                <input type="text" id='es-room' className='border border-gray-500 rounded h-9 mb-3 font-kanit px-2' />
                            </div>
                            <div className='flex flex-col w-1/3 justify-start'>
                                <div>
                                    <h3 className='font-bold text-lg mb-2'>Location</h3>
                                    <p>The location section is a crucial component when adding a new event to a ticket sales website. It provides essential information about where the event will take place, helping potential attendees easily identify the venue and plan their attendance.</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end w-2/3 mt-16'>
                            <button type='submit' className='text-white font-bold text-lg w-52 h-10 bg-black rounded mr-7' disabled={disabledSave}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateEvent