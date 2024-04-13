"use client";
import { useMyContext } from "@/context/Store";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

interface Counseler {
  PrabhujiName: string;
  MatajiName: string;
  PrabhujiPhone: number;
  MatajiPhone: number;
}

function Seva({ data }: { data: Counseler[] }) {
  const [isLoading, setIsLoading] = useState(false);
  const [SelectedCounselor, setSelectedCounselor] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    location: "NVCC_TEMPLE",
  });

  const { state, dispatch } = useMyContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const header = new Headers();
    header.append("Content-Type", "application/json");
    setIsLoading(true);
    try {
      const response = await fetch(`/api/counseler`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        setSuccessMessage(responseData.message);
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
      } else {
        const errorData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: {
            type: "ERROR",
            message: errorData.message || errorData.title,
          },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: {
          type: "ERROR",
          message: error.message || "Unexpected error happend",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {successMessage.length > 0 && (
        <div
          className={`mb-2 py-5 px-5 fixed top-0 right-0 left-0 bottom-0 z-[2500] flex items-center justify-center text-3xl font-bold ${
            state.theme.theme === "light"
              ? "bg-green-100 text-green-600"
              : "bg-green-950 text-green-600"
          }`}
        >
          {successMessage}
        </div>
      )}
      <div className="flex justify-center py-5 w-full px-3">
        <div className="lg:flex h-screen items-center hidden">
          <Image
            src={require("../assets/Meditation.png")}
            height={300}
            alt="meditaion "
            className="fixed object-cover w-[380px] h-[350px]"
          />
        </div>
        <div className="lg:ml-[42vw]">
          <form
            className={`mt-5 px-5 border rounded-3xl drop-shadow-lg ${
              state.theme.theme === "light"
                ? "bg-white border-gray-300"
                : "border-stone-700 bg-stone-900"
            }`}
            onSubmit={handleSubmit}
          >
            <div>
              <h1 className="font-bold text-xl pt-8 px-4">
                Morning Program Attendance
              </h1>
              <p className="px-4 text-gray-500 ">
                Select one values each as we are tracking the family Details
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full mt-5">
              <div className="flex flex-col gap-2 w-full">
                <label className="font-semibold ">Select Name</label>
                <MenuIconAndDropDownDevotees
                  DataArr={data}
                  setSelected={(value) => {
                    setSelectedCounselor(value);
                    setFormData((prev) => {
                      const updatedFormData: any = { ...prev }; // Make a copy of previous form data
                      if (value) {
                        updatedFormData.prabhujiName = value.PrabhujiName;
                        updatedFormData.prabhujiPhone = value.PrabhujiPhone;
                        updatedFormData.matajiName = value.MatajiName;
                        updatedFormData.matajiPhone = value.MatajiPhone;
                      }
                      return updatedFormData;
                    });
                  }}
                />
              </div>
              <div className="flex flex-col gap-2 w-full mt-5">
                <label className="font-semibold ">Select Location</label>
                <MenuIconAndDropDown
                  position={"up"}
                  DataArr={[
                    { name: "NVCC_TEMPLE" },
                    { name: "HINJEWADI_CENTER" },
                    { name: "MAYAPUR_TEMPLE" },
                    { name: "CAMP_TEMPLE" },
                  ]}
                  defaultVal={"NVCC_TEMPLE"}
                  setSelected={(value: any) => {
                    setFormData((prev) => ({
                      ...prev,
                      location: value.name,
                    }));
                  }}
                />
              </div>
            </div>
            <div className="font-bold text-2xl text-center py-10">
              morning program attendance
            </div>
            <div className="flex justify-center w-full ">
              {isLoading ? (
                <p
                  className={`text-center px-4 py-1.5 text-lg rounded-xl border my-5 max-w-[300px] md:w-[350px] w-[250px] ${
                    state.theme.theme === "light"
                      ? `${
                          Object.keys(SelectedCounselor).length === 0
                            ? " bg-gray-300 text-white"
                            : " bg-black text-white"
                        }`
                      : `${
                          Object.keys(SelectedCounselor).length === 0
                            ? "bg-stone-600 text-black"
                            : "bg-white text-black"
                        }`
                  } `}
                >
                  ---loading
                </p>
              ) : (
                <button
                  disabled={Object.keys(SelectedCounselor).length === 0}
                  className={`px-4 py-1.5 text-lg rounded-xl border my-5 max-w-[300px] md:w-[350px] w-[250px] ${
                    state.theme.theme === "light"
                      ? `${
                          Object.keys(SelectedCounselor).length === 0
                            ? " bg-gray-300 text-white"
                            : " bg-black text-white"
                        }`
                      : `${
                          Object.keys(SelectedCounselor).length === 0
                            ? "bg-stone-600 text-black"
                            : "bg-white text-black"
                        }`
                  } `}
                  type="submit"
                >
                  Submit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Seva;

type PropsMenu = {
  setSelected: (value: any) => void;
  DataArr: any[];
  defaultVal?: string;
  position?: string;
};

function MenuIconAndDropDown({
  setSelected,
  DataArr,
  defaultVal,
  position,
}: PropsMenu) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state } = useMyContext();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
  useEffect(() => {
    if (defaultVal) {
      setSelectedOption(defaultVal);
    }
  }, [defaultVal]);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isSelectionOpen) {
      // Open modal animation
      setTimeout(() => {
        setModalStyle({
          transform: "scale(1)",
          opacity: 1,
        });
      }, 50); // Delay the transition slightly for better visual effect
    } else {
      // Close modal animation
      setModalStyle({
        transform: "scale(0.95)",
        opacity: 0,
      });
      setTimeout(() => {
        setIsClosing(false);
      }, 3000); // Adjust this duration according to your transition duration
    }
  }, [isSelectionOpen]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    toggleSelection(false);
  }, [toggleSelection]);

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSelection, closeModal]);
  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        className={`flex items-center justify-between border px-2 py-2 rounded-xl gap-5 w-full ${
          state.theme.theme === "light"
            ? "border-gray-300"
            : "border-stone-700 bg-stone-900"
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
      >
        {selectedOption === "" ? "Select" : selectedOption}
        <MdKeyboardArrowDown />
      </button>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full rounded-lg shadow-lg z-[1000] ${
            state.theme.theme === "light"
              ? "bg-white border-gray-300"
              : "bg-stone-900 border border-stone-700"
          } ring-1 ring-black ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {DataArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10 ? "md:h-[60vh] h-[80vh]" : "h-full"
              }`}
              role="none"
            >
              {DataArr?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(item.name);
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item.name === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "light"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  {`${item.name}`}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              <p>No data to show</p>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
function MenuIconAndDropDownDevotees({
  setSelected,
  DataArr,
  defaultVal,
  position,
}: PropsMenu) {
  const [isSelectionOpen, toggleSelection] = useState(false);
  const { state } = useMyContext();
  const menuRef: any = useRef();
  const [selectedOption, setSelectedOption] = useState("");
  const [modalStyle, setModalStyle] = useState({
    transform: "scale(0.95)",
    opacity: 0,
  });
  useEffect(() => {
    if (defaultVal) {
      setSelectedOption(defaultVal);
    }
  }, [defaultVal]);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isSelectionOpen) {
      // Open modal animation
      setTimeout(() => {
        setModalStyle({
          transform: "scale(1)",
          opacity: 1,
        });
      }, 50); // Delay the transition slightly for better visual effect
    } else {
      // Close modal animation
      setModalStyle({
        transform: "scale(0.95)",
        opacity: 0,
      });
      setTimeout(() => {
        setIsClosing(false);
      }, 3000); // Adjust this duration according to your transition duration
    }
  }, [isSelectionOpen]);

  const closeModal = useCallback(() => {
    setIsClosing(true);
    toggleSelection(false);
  }, [toggleSelection]);

  // Attach click outside listener
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeModal();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleSelection, closeModal]);
  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        type="button"
        className={`flex items-center justify-between border px-2 py-2 rounded-xl gap-5 w-full ${
          state.theme.theme === "light"
            ? "border-gray-300"
            : "border-stone-700 bg-stone-900"
        }`}
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
        onClick={() => toggleSelection(!isSelectionOpen)}
      >
        {selectedOption === "" ? "Select" : selectedOption}
        <MdKeyboardArrowDown />
      </button>
      {isSelectionOpen && (
        <div
          className={`origin-top-left absolute ${
            position === "up" ? "bottom-0 mb-12" : "mt-2 right-0"
          } w-full rounded-lg shadow-lg z-[1000] ${
            state.theme.theme === "light"
              ? "bg-white border-gray-300"
              : "bg-stone-900 border border-stone-700"
          } ring-1 ring-black ring-opacity-5 focus:outline-none py-1 px-1`}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
          style={{
            ...modalStyle,
            transition: "transform 0.2s ease-out, opacity 0.2s ease-out",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {DataArr?.length > 0 ? (
            <ul
              className={`flex flex-col gap-3 overflow-y-auto ${
                DataArr.length > 10 ? "md:h-[60vh] h-[80vh]" : "h-full"
              }`}
              role="none"
            >
              {DataArr?.map((item, index) => (
                <li
                  key={index}
                  onClick={() => {
                    setSelectedOption(
                      `${item.PrabhujiName} & ${item.MatajiName}`
                    );
                    setSelected(item);
                    toggleSelection(false);
                  }}
                  className={`px-2 py-1.5 rounded-lg ${
                    item.name === selectedOption && "bg-blue-300"
                  } ${
                    state.theme.theme === "light"
                      ? "hover:bg-gray-100 "
                      : "hover:bg-stone-700"
                  }`}
                >
                  {`${item.PrabhujiName} & ${item.MatajiName}`}
                </li>
              ))}
            </ul>
          ) : (
            <ul>
              <p>No data to show</p>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
