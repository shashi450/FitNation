import React, { useEffect, useState } from "react";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { MdDirectionsWalk, MdFitnessCenter, MdLocalDrink } from "react-icons/md";
import { GiBodyHeight } from "react-icons/gi";
import { IoMdBed } from "react-icons/io";
import { IoFastFood } from "react-icons/io5";
import userImage from "../assets/user.png";
import gymImage from "../assets/image.png";
import Cookies from "js-cookie";

const MyProfile = () => {
  const [activeAchievement, setActiveAchievement] = useState(0);
  const [activeGoal, setActiveGoal] = useState(0);
  const myMail_id = Cookies.get("email_id");
  console.log(myMail_id);

  const [fetchProfile, setFetchProfile] = useState({});
  const [fetchedGoals, setfetchedGoals] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      const response = await fetch('https://fitness-server-u793.onrender.com/userDashboard/getprofileinfo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: myMail_id })
      });
      const responseData = await response.json();
      setFetchProfile(responseData);
    }
    getProfile();
  }, [myMail_id]);

  useEffect(() => {
    const getGoals = async () => {
      const response = await fetch('https://fitness-server-u793.onrender.com/userDashboard/getgoals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: myMail_id })
      });
      const responseData = await response.json();
      setfetchedGoals(responseData);
    }
    getGoals();
  }, [myMail_id]);

  const goals = [
    {
      title: "Weight Goal",
      icon: <MdFitnessCenter className="text-3xl text-orange-900 mb-2" />,
      value: ` ${fetchedGoals.targetWeight} kg`
    },
    {
      title: "Height Goal",
      icon: <GiBodyHeight className="text-3xl text-orange-900 mb-2" />,
      value: `${fetchedGoals.targetHeight} cm`
    },
    {
      title: "Water Goal",
      icon: <MdLocalDrink className="text-3xl text-orange-900 mb-2" />,
      value: `${fetchedGoals.waterIntake} litre`
    },
    {
      title: "Nutritional Goal",
      icon: <IoFastFood className="text-3xl text-orange-900 mb-2" />,
      value: fetchedGoals.nutrition
    },
    {
      title: "Steps Goal",
      icon: <MdDirectionsWalk className="text-3xl text-orange-900 mb-2" />,
      value: fetchedGoals.steps
    },
    {
      title: "Sleep Goal",
      icon: <IoMdBed className="text-3xl text-orange-900 mb-2" />,
      value: `${fetchedGoals.sleep}`
    },
  ];

  return (
    <div className="min-h-auto flex justify-center items-center">
      <div className="flex flex-col md:flex-row items-stretch w-full h-full gap-4">
        <div className="w-full md:w-4/6 bg-zinc-800 text-orange-200 rounded-lg shadow-lg overflow-hidden flex flex-col ">
          <div className="relative h-auto flex-grow">
            <img
              src={gymImage}
              alt="Gym"
              className="w-full h-full object-cover"
            />
            <img
              src={userImage}
              alt="User"
              className="w-14 h-14 md:w-20 md:h-20 rounded-full border-4 absolute -bottom-12 md:-bottom-26 left-56 md:left-auto md:right-4"
            />
          </div>
          <div className="p-8 flex-grow flex flex-col">
            <h1 className="text-3xl font-bold mb-2">{fetchProfile.username}</h1>
            <div className="flex justify-between py-6">
              <div className="flex flex-col">
                <span className="text-sm text-gray-50">Age</span>
                <span className="text-lg font-semibold">{fetchProfile?.data?.age}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-50">Gender</span>
                <span className="text-lg font-semibold">{fetchProfile?.data?.gender}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-50">Weight (kg)</span>
                <span className="text-lg font-semibold">{fetchProfile?.data?.weight}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-50">Height (cm)</span>
                <span className="text-lg font-semibold">{fetchProfile?.data?.height}</span>
              </div>
            </div>
            <div className="flex justify-between p-4">
              <div className="flex flex-row items-center">
                <AiOutlinePhone className="text-2xl text-gray-50 mr-2" />
                <span className="text-lg font-semibold">{fetchProfile?.data?.mobileNumber}</span>
              </div>
              <div className="flex flex-row items-center">
                <AiOutlineMail className="text-2xl text-gray-50 mr-2" />
                <span className="text-lg font-semibold">{fetchProfile?.data?.email}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full px-4 md:w-1/3">
          <div className="w-full flex flex-col">
            <div className="bg-zinc-800 rounded-lg shadow-lg overflow-hidden mb-8 flex-grow">
              <div className="p-6 flex-grow flex flex-col">
                <h1 className="text-xl font-bold mb-4 text-orange-600">Goals</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {goals.map((goal, index) => (
                    <div key={index} className="bg-black text-orange-50 p-4 rounded-md">
                      {goal.icon}
                      <h3 className="text-lg font-semibold">{goal.title}</h3>
                      <p className="text-orange-200">{goal.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;