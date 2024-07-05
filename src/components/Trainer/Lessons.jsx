import React, { useState } from 'react';
import { ImNext, ImPrevious } from 'react-icons/im';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const Lessons = () => {
    const initialLessons = [];

    const [lessons, setLessons] = useState(initialLessons);
    const [currentLesson, setCurrentLessons] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [newLesson, setNewLesson] = useState({ thumbnail: '', video: '', title: '', description: '' });
    const [playingVideo, setPlayingVideo] = useState(null);

    const nextLesson = () => {
        setCurrentLessons((prevIndex) =>
            prevIndex + 3 < lessons.length ? prevIndex + 3 : 0
        );
    };

    const prevLesson = () => {
        setCurrentLessons((prevIndex) =>
            prevIndex - 3 >= 0 ? prevIndex - 3 : lessons.length - 3
        );
    };

    const handleAddLesson = () => {
        setShowForm(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (newLesson.thumbnail && newLesson.video && newLesson.title && newLesson.description) {
            setLessons([...lessons, newLesson]);
            setShowForm(false);
            setNewLesson({ thumbnail: '', video: '', title: '', description: '' });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLesson({ ...newLesson, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const { name } = e.target;
        if (file) {
            setNewLesson({ ...newLesson, [name]: URL.createObjectURL(file) });
        }
    };

    const handleThumbnailClick = (video) => {
        setPlayingVideo(video);
    };

    return (
        <div className='flex flex-col gap-10 text-orange-400'>
            <div className=''>
                <div className='flex flex-row gap-5 justify-between'>
                    <span className='flex flex-row gap-5'>
                        <span className='bg-orange-400 w-6'></span>
                        <h1 className='text-4xl font-bold'>Your Lessons</h1>
                        <span>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/51VupvTTSno?si=Mjg7eUWvCUU0uoEV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/ZqBPWsAZwMA?si=bKyqU0kRq2flnAuT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                            <iframe width="560" height="315" src="https://www.youtube.com/embed/fs9ql3cWoVM?si=GX9V3jWhyZQgCgRL" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </span>

                    </span>
                    <span className='flex flex-row gap-5 text-4xl text-orange-400 cursor-pointer px-20'>
                        <ImPrevious onClick={prevLesson} />
                        <ImNext onClick={nextLesson} />
                    </span>
                </div>
                <div className='py-10 flex flex-row items-center justify-center gap-10'>
                    {lessons.length > 0 ? (
                        lessons.slice(currentLesson, currentLesson + 3).map((item, index) => (
                            <div key={index} className='w-96 shadow-sm shadow-orange-400'>
                                <img
                                    src={item.thumbnail}
                                    alt="Lesson Thumbnail"
                                    className='border-4 border-[#27272A] w-full h-44 cursor-pointer'
                                    onClick={() => handleThumbnailClick(item.video)}
                                />
                                <div className='bg-[#27272A] w-full p-5'>
                                    <h1 className='text-orange-400 font-bold text-2xl'>{item.title}</h1>
                                    <hr className='mt-2 p-2 opacity-60' />
                                    <p className='text-orange-400 text-sm'>{item.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-2xl'>No lessons uploaded</p>
                    )}
                </div>
            </div>


        </div>
    );
};

export default Lessons;