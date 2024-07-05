import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineUser, AiOutlineSetting, AiOutlineMenu, AiOutlineHome } from "react-icons/ai";
import logo from "../assets/logo.png";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { BiTask } from "react-icons/bi";
import { PiStudentBold } from "react-icons/pi";
import TrainerProfile from "./Trainer/TrainerProfile";
import Lessons from "./Trainer/Lessons";
import Students from "./Trainer/Students";
import TrainerSetting from "./Trainer/TrainerSetting";
import ChatBot from "./Trainer/ChatBot";
import { SiChatbot } from "react-icons/si";

const TrainerDashboard = () => {
    const [activeTab, setActiveTab] = useState("profile");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const renderContent = () => {
        switch (activeTab) {
            case "trainerprofile":
                return <TrainerProfile />;
            case "lessons":
                return <Lessons />;
            case "students":
                return <Students />;
            case "chatbot":
                return <ChatBot />;
            case "trainersettings":
                return <TrainerSetting />;
            default:
                return <TrainerProfile />;
        }
    };

    return (
        <div className="flex">
            <aside className={`bg-zinc-800  w-1/6 h-screen flex flex-col text-orange-600 items-center py-6 sticky top-0 left-0 z-10 ${isSidebarOpen ? "" : "hidden"}`}>
                <Link to="/" className="mb-6">
                    <img src={logo} alt="Logo" className="w-24 h-12 mb-8" />
                </Link>
                <nav className="flex flex-col items-center space-y-4">
                    <SidebarOption
                        icon={<AiOutlineUser />}
                        text="My Profile"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        name="trainerprofile"
                    />
                    <SidebarOption
                        icon={<MdOutlineVideoLibrary />}
                        text="Lessons"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        name="lessons"
                    />
                    <SidebarOption
                        icon={<PiStudentBold />}
                        text="Students"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        name="students"
                    />
                    <SidebarOption
                        icon={<SiChatbot />}
                        text="chatbot"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        name="chatbot"
                    />
                    <SidebarOption
                        icon={<AiOutlineSetting />}
                        text="Settings"
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        name="trainersettings"
                    />
                </nav>
            </aside>
            <div className="flex-grow bg-black  w-5/6">
                <div className="bg-zinc-800 p-2 flex justify-between items-center shadow-md sticky top-0 z-20">
                    <div className="flex items-center ml-2">
                        <button
                            onClick={toggleSidebar}
                            className="mr-4 transition duration-300 transform hover:scale-125"
                        >
                            <AiOutlineMenu className=" text-2xl font-bold text-white" />
                        </button>
                    </div>
                    <div className="flex items-center mr-10">
                        <Link to="/">
                            <div className="flex items-center text-orange-600 transition duration-300 transform hover:scale-110  mr-8">
                                <AiOutlineHome className="text-2xl font-bold mr-2" />
                                <h1 className="text-xl font-bold text-orange-600">Home</h1>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="p-8 ">{renderContent()}</div>
            </div>
        </div>
    );
};

const SidebarOption = ({ icon, text, activeTab, setActiveTab, name }) => {
    return (
        <div
            className={` flex items-center cursor-pointer px-8 py-2 w-52 hover:bg-orange-400 hover:rounded-md ${activeTab === name ? "text-black-500 font-bold " : "text-orange-600"
                }`}
            onClick={() => setActiveTab(name)}
        >
            <div className={`mr-2 text-lg ${activeTab === name ? "font-bold" : ""}`}>{icon}</div>
            <div className={`transition duration-300 ${activeTab === name ? "text-black-500" : "text-gray-50 "} ${activeTab === name ? "transform scale-110" : ""}`}>{text}</div>
        </div>
    );
};

export default TrainerDashboard;