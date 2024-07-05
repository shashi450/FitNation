import React, { useState } from 'react';
import user from "../../assets/user.png";
import { ImNext, ImPrevious } from 'react-icons/im';
import { AiOutlineDelete, AiOutlinePlusCircle } from 'react-icons/ai';

const Students = () => {
    const students = [
        { photo: user, name: "Gautam", age: "19", gender: "male", weight: "65", height: "180", mobile: "1234567890", email: "gs@gmail.com", task: "" },
        { photo: user, name: "Aman", age: "23", gender: "male", weight: "70", height: "185", mobile: "0123456789", email: "abc@gmail.com", task: "" },
        { photo: user, name: "Alok", age: "21", gender: "male", weight: "72", height: "190", mobile: "1023456789", email: "qwerty@gmail.com", task: "" },
        { photo: user, name: "Khushi", age: "22", gender: "female", weight: "65", height: "175", mobile: "0147258369", email: "xyz@gmail.com", task: "" },
        { photo: user, name: "Jitesh", age: "20", gender: "male", weight: "70", height: "185", mobile: "0147753965", email: "zxcvbn@gmail.com", task: "" },
        { photo: user, name: "Sarthak", age: "25", gender: "male", weight: "70", height: "185", mobile: "0147753965", email: "zxcvbn@gmail.com", task: "" },
    ];

    const [currentStudent, setCurrentStudents] = useState(0);
    const [tasks, setTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [task, setTask] = useState('');

    const nextStudent = () => {
        setCurrentStudents((prevIndex) =>
            prevIndex + 5 < students.length ? prevIndex + 5 : 0
        );
    };

    const prevStudent = () => {
        setCurrentStudents((prevIndex) =>
            prevIndex - 5 >= 0 ? prevIndex - 5 : students.length - 5
        );
    };

    const handleAddTask = () => {
        setShowForm(true);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (selectedStudent && task) {
            setTasks([...tasks, { student: selectedStudent, task }]);
            setShowForm(false);
            setSelectedStudent('');
            setTask('');
        }
    };

    const handleDeleteTask = (index) => {
        setTasks(tasks.filter((_, taskIndex) => taskIndex !== index));
    };

    return (
        <div className='flex flex-col gap-10 text-orange-400'>
            <div className=''>
                <div className='flex flex-row gap-5 justify-between'>
                    <span className='flex flex-row gap-5'>
                        <span className='bg-orange-400 w-6'></span>
                        <h1 className='text-4xl font-bold'>Your students</h1>
                    </span>
                    <span className='flex flex-row gap-5 text-4xl text-orange-400 cursor-pointer px-20'>
                        <ImPrevious onClick={prevStudent} />
                        <ImNext onClick={nextStudent} />
                    </span>
                </div>
                <div className='py-10 flex flex-row items-center justify-left gap-5 '>
                    {students.slice(currentStudent, currentStudent + 5).map((item, index) => (
                        <div key={index} className='flex flex-col items-center w-1/5 bg-[#27272A] border border-orange-400 p-5'>
                            <img src={item.photo} alt="UserPhoto" className='w-48 h-48 shadow-sm shadow-orange-400 p-5' />
                            <h1 className='font-bold text-2xl pt-5'>{item.name}</h1>
                        </div>
                    ))}
                </div>
            </div>

            <hr className='opacity-30' />

            <div className='flex flex-col gap-10'>
                <div className='flex flex-row gap-5 justify-between'>
                    <span className='flex flex-row gap-5'>
                        <span className='bg-orange-400 w-6'></span>
                        <h1 className='text-4xl font-bold'>Tasks</h1>
                    </span>
                    <span className='flex flex-row items-center gap-2 text-xl border border-orange-400 rounded-md px-3 mr-20 cursor-pointer' onClick={handleAddTask}>
                        <AiOutlinePlusCircle />
                        <button> Add </button>
                    </span>
                </div>
                <div className='flex flex-row gap-5 text-2xl font-bold border border-orange-400 p-2'>
                    <h1 className='w-1/2 px-14'>Student</h1>
                    <h1 className='w-1/2 px-14'>Task</h1>
                </div>
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <div key={index} className='flex flex-row gap-5 border border-orange-400 border-opacity-50 p-2'>
                            <span className='flex flex-row items-center gap-5 w-1/2 px-10'>
                                <img src={user} alt="" className='w-8 h-8' />
                                <h1 className='text-xl'>{task.student}</h1>
                            </span>
                            <h1 className='w-1/2 px-10 flex items-center'>- {task.task}</h1>
                            <button onClick={() => handleDeleteTask(index)} className='text-red-600 text-2xl'><AiOutlineDelete /></button>
                        </div>
                    ))
                ) : (
                    <p className='text-2xl p-5'>- No Tasks Assigned</p>
                )}
                {showForm && (
                    <form onSubmit={handleFormSubmit} className='flex flex-col gap-5 p-5 border border-orange-400'>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='student' className='text-xl text-orange-400 font-semibold'>Select Student</label>
                            <select id='student' value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} className='p-2 bg-[#27272A] '>
                                <option value=''>-- Select a student --</option>
                                {students.map((student, index) => (
                                    <option key={index} value={student.name}>{student.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <label htmlFor='task' className='text-xl text-orange-400 font-semibold'>Task</label>
                            <input type='text' id='task' value={task} onChange={(e) => setTask(e.target.value)} className='p-2 bg-[#27272A]' />
                        </div>
                        <button type='submit' className='mt-5 p-2 bg-orange-400 text-[#27272A] font-bold'>Assign Task</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Students;