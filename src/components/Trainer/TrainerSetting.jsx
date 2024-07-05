import React, { useState } from "react";
import { RiCalendar2Line, RiUserLine } from "react-icons/ri";
import { IoMdMan, IoMdWoman, IoMdMail, IoMdCall } from "react-icons/io";
import { GiBodyHeight, GiWeight } from "react-icons/gi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const initialFormData = {
    profilePhoto: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    height: "",
    weight: "",
    mobileNumber: "",
    email: "",
};

const TrainerSetting = () => {
    const [formData, setFormData] = useState(initialFormData);

    function changeHandler(event) {
        setFormData((prevData) => ({
            ...prevData,
            [event.target.name]: event.target.value,
        }));
    }



    const submitHandler = (event) => {
        event.preventDefault();
        console.log("Profile Form Data: ", formData);
        const myMail_id = Cookies.get("email_id");
        console.log("Logged-in User's Email ID: ", myMail_id);

        const payload = {
            email: myMail_id,
            data: formData
        };

        const apiUrl = "https://fitness-server-u793.onrender.com/mentorDashboard/editProfileInfo";

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                toast.success("Profile updated successfully!");
                console.log("Updated successfully!");
                setFormData(initialFormData);
            })
            .catch((error) => {
                console.error('Error:', error);
                toast.error("Failed to update profile. Please try again!");
            });
    };


    return (
        <>
            <ToastContainer />
            <form onSubmit={submitHandler} className="bg-[#27272A] rounded-lg p-6 text-orange-400">
                <div className="p-6 flex-grow flex flex-col">
                    <h1 className="text-xl font-bold mb-4">Profile Photo</h1>
                    <div className="bg-orange-200 rounded-lg p-4 mb-4">
                        <input
                            type="file"
                            name="profilePhoto"
                            onChange={changeHandler}
                            className="text-white::placeholder placeholder-orange-500 text-black outline-none rounded-[0.5rem]  w-full p-[12px] bg-transparent border-b border-gray-500 focus:border-orange-500"
                        />
                    </div>
                </div>

                <div className="flex gap-x-4 mt-[20px] ">
                    <label className="w-full">
                        <div className="flex flex-row font-bold ml-2">
                            <RiUserLine className="text-orange-400 mr-2 mt-1" />
                            <p className="text-orange-400 mb-1 leading-[1.375rem]">First Name</p>
                        </div>
                        <input
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            className="text-white::placeholder placeholder-orange-200 text-orange-200 outline-none rounded-[0.5rem]  w-full p-[12px] bg-transparent border-b border-gray-500 focus:border-orange-500"
                        />
                    </label>

                    <label className="w-full">
                        <div className="flex flex-row font-bold ml-2">
                            <RiUserLine className="text-orange-400 mr-2 mt-1" />
                            <p className="text-orange-400 mb-1 leading-[1.375rem]">Last Name</p>
                        </div>
                        <input
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            className="placeholder-orange-200 text-orange-200 outline-none rounded-[0.5rem]  w-full p-[12px] bg-transparent border-b border-gray-500 focus:border-orange-500"
                        />
                    </label>
                </div>

                <div className="flex gap-x-4 mt-[20px]">
                    <label className="w-full">
                        <div className="flex flex-row font-bold ml-2">
                            <RiCalendar2Line className="text-orange-400 mr-2 mt-1" />
                            <p className="text-orange-400 mb-1 leading-[1.375rem]">Age</p>
                        </div>
                        <input
                            type="number"
                            name="age"
                            onChange={changeHandler}
                            placeholder="Enter Age"
                            value={formData.age}
                            className="text-white::placeholder placeholder-orange-200 text-orange-200 outline-none rounded-[0.5rem]  w-full p-[12px] bg-transparent border-b border-gray-500 focus:border-orange-500"
                        />
                    </label>

                    <label className="w-full">
                        <div className="flex flex-row font-bold ml-2">
                            <IoMdMan className="text-orange-400 mr-2 mt-1" />
                            <p className="text-orange-400 mb-1 leading-[1.375rem]">Gender</p>
                        </div>
                        <select
                            name="gender"
                            onChange={changeHandler}
                            value={formData.gender}
                            className="placeholder-orange-200 text-orange-400 outline-none rounded-[0.5rem]  w-full p-[12px] bg-transparent border-b border-gray-500 focus:border-orange-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                </div>

                <div className="flex gap-x-4 mt-[20px]">
                    <label className="w-full">
                        <div className="flex flex-row font-bold ml-2">
                            <GiBodyHeight className="text-orange-400 mr-2 mt-1" />
                            <p className="text-orange-400 mb-1 leading-[1.375rem]">
                                Height (cm)
                            </p>
                        </div>
                        <input
                            type="number"
                            name="height"
                            onChange={changeHandler}
                            placeholder="Enter Height"
                            value={formData.height}
                            className="text-white::placeholder placeholder-orange-200 text-orange-200 outline-none rounded-[0.5rem]  w-full p-[12px] bg-transparent border-b border-gray-500 focus:border-orange-500"
                        />
                    </label>

                    <label className="w-full">
                        <div className="flex flex-row font-bold ml-2">
                            <GiWeight className="text-orange-400 mr-2 mt-1" />
                            <p className="text-orange-400 mb-1 leading-[1.375rem]">
                                Weight (Kg)
                            </p>
                        </div>
                        <input
                            type="number"
                            name="weight"
                            onChange={changeHandler}
                            placeholder="Enter Weight"
                            value={formData.weight}
                            className="text-white::placeholder placeholder-orange-200 text-orange-200 outline-none rounded-[0.5rem]  w-full p-[12px] bg-transparent border-b border-gray-500 focus:border-orange-500"
                        />
                    </label>
                </div>

                <div className="flex gap-x-4 mt-[20px]">
                    <label className="w-full">
                        <div className="flex flex-row font-bold ml-2">
                            <IoMdCall className="text-orange-400 mr-2 mt-1" />
                            <p className="text-orange-400 mb-1 leading-[1.375rem]">
                                Mobile Number
                            </p>
                        </div>
                        <input
                            type="tel"
                            name="mobileNumber"
                            minLength={10}
                            maxLength={10}
                            onChange={changeHandler}
                            placeholder="Enter Mobile Number"
                            value={formData.mobileNumber}
                            className="text-white::placeholder placeholder-orange-200 text-orange-200 outline-none rounded-[0.5rem]  w-full p-[12px] bg-transparent border-b border-gray-500 focus:border-orange-500"
                        />
                    </label>

                    <label className="w-full">
                        <div className="flex flex-row font-bold ml-2">
                            <IoMdMail className="text-orange-400 mr-2 mt-1" />
                            <p className="text-orange-400 mb-1 leading-[1.375rem]">
                                Email Address
                            </p>
                            <sup className="text-red-500 mt-4 ml-1">*</sup>
                        </div>
                        <input
                            required
                            type="email"
                            name="email"
                            onChange={changeHandler}
                            placeholder="Enter Email Address "
                            value={formData.email}
                            className="rounded-[0.5rem] placeholder-orange-200 text-orange-200 outline-none w-full p-[12px] bg-transparent border-b border-gray-500 focus:border-orange-500"
                        />
                    </label>
                </div>

                <button className="w-full bg-[#fb5607] rounded-[8px] font-medium text-gray-50 px-[12px] py-[8px] mt-6 hover:bg-orange-600">
                    Save Changes
                </button>
            </form>
        </>
    );
};

export default TrainerSetting;