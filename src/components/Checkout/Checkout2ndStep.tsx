import React from "react";
import Image from "next/image";
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

const Component2 = () => {
    return (
        <div className=''>
            <div className='mx-56 pt-5 pb-8'>
                <Image className='' src="/images/events/Timeline2nd.png" width={500} height={500} style={{ width: '100%', height: '100%' }} alt="Timeline1stStep"/>
            </div>
            <div className='font-montserrat mx-auto lg:max-w-7xl md:items-center md:flex-col md:px-8 mb-10'>
                <div className='text-2xl font-bold'>
                    <h1>Payment</h1>
                </div>
                <div className='flex flex-row-2 justify-between mt-6 '>
                    <div className='w-8/12 rounded-md bg-black'>
                        <div className='text-white font-kanit font-bold text-xl mb-3'>1</div>
                    </div>
                    <div className='flex flex-col justify-evenly pl-8 w-4/12 pt-14'>
                        <div className='text-black font-montserrat text-xl mb-3'>To protect your interests, please ensure the information is correct before proceeding with the payment.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Component2