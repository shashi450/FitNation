import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoFastFood, IoMedicalOutline } from "react-icons/io5";
import Cookies from "js-cookie";

const initialFormData = {
  dietPreference: "",
  allergies: {
    dairy: false,
    seafood: false,
    nuts: false,
    wheat: false,
    poultry: false,
    egg: false,
    mutton: false,
  },
  preferredCuisine: {
    northIndian: false,
    southIndian: false,
    eastIndian: false,
    westIndian: false,
    chinese: false,
    continental: false,
  },
};

const FoodForm = () => {
  const [formData, setFormData] = useState(initialFormData);

  function changeHandler(event) {
    const { name, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        allergies: {
          ...prevData.allergies,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: event.target.value,
      }));
    }
  }

  function cuisineHandler(event) {
    const { name, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      preferredCuisine: {
        ...prevData.preferredCuisine,
        [name]: checked,
      },
    }));
  }

  function changeHandler(event) {
    const { name, type, checked, value } = event.target;
    if (type === "checkbox") {
      if (name in formData.allergies) {
        setFormData(prevData => ({
          ...prevData,
          allergies: {
            ...prevData.allergies,
            [name]: checked,
          },
        }));
      } else if (name in formData.preferredCuisine) {
        setFormData(prevData => ({
          ...prevData,
          preferredCuisine: {
            ...prevData.preferredCuisine,
            [name]: checked,
          },
        }));
      }
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  }



  function submitHandler(event) {
    const myMail_id = Cookies.get("email_id")
    console.log(myMail_id);
    event.preventDefault();
    // console.log("Food Form Data: ", formData);

    const payload = {
      email: myMail_id,
      data: [formData.dietPreference,
      Object.keys(formData.allergies).filter(allergy => formData.allergies[allergy]),
      Object.keys(formData.preferredCuisine).filter(cuisine => formData.preferredCuisine[cuisine])]
    };
    console.log(payload);

    const apiUrl = "https://fitness-server-u793.onrender.com/userDashboard/editfoodpreference";

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then(data => {
        toast.success("Updated successfully!");
        setFormData(initialFormData);
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error("Update failed!");
      });
  }

  return (
    <>
      <ToastContainer />
      <form onSubmit={submitHandler} className="bg-white rounded-lg p-6">
        <div className="flex flex-col gap-4">
          <label className="w-full">
            <div className="flex flex-row font-bold ml-2">
              <IoFastFood className="text-black mr-2 mt-1" />
              <p className="text-black mb-1 leading-[1.375rem]">
                Diet Preference
              </p>
            </div>
            <select
              name="dietPreference"
              onChange={changeHandler}
              value={formData.dietPreference}
              className="text-black placeholder-gray-500 outline-none rounded-[0.5rem]  w-full p-[12px] bg-transparent border-b border-gray-500 focus:border-orange-500"
            >
              <option value="">Select</option>
              <option value="Non Vegetarian">Non Vegetarian</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Eggetarian">Eggetarian</option>
            </select>
          </label>

          <div>
            <div className="flex flex-row font-bold ml-2 mt-5">
              <IoMedicalOutline className="text-black mr-2 mt-1" />
              <p className="text-black mb-1 leading-[1.375rem]">
                Any Allergies?
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {Object.keys(formData.allergies).map((allergy, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    name={allergy}
                    checked={formData.allergies[allergy]}
                    onChange={changeHandler}
                    className="mr-2 h-6 w-6"
                  />
                  <span className="text-black">{allergy}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-row font-bold ml-2 mt-5">
              <IoFastFood className="text-black mr-2 mt-1" />
              <p className="text-black mb-1 leading-[1.375rem]">
                Preferred Cuisine
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {Object.keys(formData.preferredCuisine).map((cuisine, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    name={cuisine}
                    checked={formData.preferredCuisine[cuisine]}
                    onChange={cuisineHandler}
                    className="mr-2 h-6 w-6"
                  />
                  <span className="text-black">{cuisine}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="bg-[#fb5607] text-gray-50 py-2 px-4 rounded-lg font-medium">
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default FoodForm;