

import React from 'react';
import user from "../../assets/user.png";
import thumbnail from "../../assets/Banner2.jpg";
import { AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import Cookies from "js-cookie";
import { useState, useEffect } from 'react';

const TrainerProfile = () => {
    const myMail_id = Cookies.get("email_id")
    console.log(myMail_id);

    const [fetchProfile, setFetchProfile] = useState({});

    const lessons = [
        { thumbnail: thumbnail, video: '', title: "Title of Lesson 1", description: "Description of Lesson 1" },
        { thumbnail: thumbnail, video: '', title: "Title of Lesson 2", description: "Description of Lesson 2" },
    ];

    const students = [
        { photo: user, name: "Gautam", age: "19", gender: "male", weight: "65", height: "180", mobile: "1234567890", email: "gs@gmail.com", task: "" },
        { photo: user, name: "Gautam", age: "19", gender: "male", weight: "65", height: "180", mobile: "1234567890", email: "gs@gmail.com", task: "" },
    ];

    useEffect(() => {
        const getProfile = async () => {
            const mail = { email: myMail_id };
            const response = await fetch('https://fitness-server-u793.onrender.com/mentorDashboard/getProfileInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(mail)
            });
            if (response.ok) {
                const responseData = await response.json();
                setFetchProfile(responseData);
                console.log(responseData);
            } else {
                console.error('Failed to fetch profile data');
            }
        };
        getProfile();
    }, []);

    return (
        <>
            <h1 className='flex justify-center text-3xl font-bold text-orange-200'> Welcome to Fitnation User Name</h1>
            <div className='flex flex-row gap-5 p-5 w-full'>
                <div className='flex flex-col w-1/2 shadow-sm shadow-orange-400 rounded-md bg-[#27272A] text-orange-200 p-5'>
                    <h1 className='flex justify-center shadow-sm shadow-orange-400 text-orange-400 text-2xl font-bold'>Your Profile</h1>
                    <span className='flex justify-center py-10 '>
                        <img src={user} alt="user" className='w-32 h-32 p-2 border-4 border-orange-400 rounded-full' />
                    </span>
                    <h1 className='flex justify-center text-4xl font-bold'>
                        {fetchProfile.username}
                    </h1>
                    <div className="p-8 flex-grow flex flex-col">
                        <div className="flex justify-between py-2">
                            <div className="flex flex-col">
                                <span className="text-sm text-orange-400">Age</span>
                                <span className="text-lg font-semibold">
                                    {fetchProfile?.data?.age}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-orange-400">Gender</span>
                                <span className="text-lg font-semibold">
                                    {fetchProfile?.data?.gender}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-orange-400">Weight (kg)</span>
                                <span className="text-lg font-semibold">
                                    {fetchProfile?.data?.weight}
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm text-orange-400">Height (cm)</span>
                                <span className="text-lg font-semibold">
                                    {fetchProfile?.data?.height}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-between pt-4">
                            <div className="flex flex-row items-center">
                                <AiOutlinePhone className="text-2xl text-orange-400 mr-2" />
                                <span className="text-lg font-semibold">
                                    {fetchProfile?.data?.mobileNumber}
                                </span>
                            </div>
                            <div className="flex flex-row items-center">
                                <AiOutlineMail className="text-2xl text-orange-400 mr-2" />
                                <span className="text-lg font-semibold">
                                    {fetchProfile?.data?.email}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-5 w-1/2'>
                    <div className='flex flex-col shadow-sm shadow-orange-400 rounded-md bg-[#27272A] text-orange-400 p-5'>
                        <span className='flex flex-row justify-between shadow-sm shadow-orange-400 '>
                            <h1 className='text-xl font-bold p-1 px-3 '>Your Lessons</h1>
                            <p className='text-md font-semibold p-1 px-3'>( Go to Lessons to See All )</p>
                        </span>
                        {lessons.slice(0, 2).map((lesson, index) => (
                            <div key={index}>
                                <div className='flex flex-row gap-5 py-5 px-3'>
                                    <img src={lesson.thumbnail} alt="lesson" className='h-16' />
                                    <span>
                                        <h1 className='text-xl font-bold'>{lesson.title}</h1>
                                        <p className='font-light text-orange-200'>{lesson.description}</p>
                                    </span>
                                </div>
                                {index < lessons.length - 1 && <hr className='opacity-50' />}
                            </div>
                        ))}
                    </div>


                    <div className='flex flex-col gap-5 shadow-sm shadow-orange-400 rounded-md bg-[#27272A] text-orange-200 p-5'>
                        <span className='flex flex-row justify-between shadow-sm shadow-orange-400 text-orange-400  '>
                            <h1 className='text-xl font-bold p-1 px-3 '>Your Students</h1>
                            <p className='text-md font-semibold p-1 px-3'>( Go to Students to See All )</p>
                        </span>
                        {students.slice(0, 2).map((student, index) => (
                            <div key={index}>
                                <div className='flex flex-row gap-5 py-2 px-3'>
                                    <img src={user} alt="student" className='h-8 w-8' />
                                    <h1 className='text-xl font-semibold'>{student.name}</h1>
                                </div>
                                {index < students.length - 1 && <hr className='opacity-50 -mb-4' />}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </>
    )
}

export default TrainerProfile;


