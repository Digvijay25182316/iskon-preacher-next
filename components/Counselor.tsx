import { useMyContext } from "@/context/Store";
import React, { ChangeEvent, FormEvent, useState } from "react";

interface Counseler {
  _id: string;
  PrabhujiName: string;
  MatajiName: string;
  createdAt: Date;
  updatedAr: Date;
}

function Counselor({ Counseler }: { Counseler: Counseler[] }) {
  return <div>Counselor</div>;
}

export default Counselor;

function UserForm() {
  const { dispatch } = useMyContext();
  const [isLoading, setIsLoading] = useState(false);
  // State for the form fields
  const [formData, setFormData] = useState({
    prabhujiName: "",
    matajiName: "",
    prabhujiPhone: "",
    matajiPhone: "",
  });

  // Handler to update state when input values change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Submit handler
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    // Add form submission logic here
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    console.log("Form submitted:", formData);
    try {
      setIsLoading(true);

      const response = await fetch(`/api/counseler`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const responseData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "SUCCESS", message: responseData.message },
        });
      } else {
        const errorData = await response.json();
        dispatch({
          type: "SHOW_TOAST",
          payload: { type: "ERROR", message: errorData.message },
        });
      }
    } catch (error: any) {
      dispatch({
        type: "SHOW_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
    >
      {/* Prabhuji Section */}
      <fieldset className="mb-6">
        <legend className="text-xl font-semibold mb-2">Prabhuji Details</legend>

        <label htmlFor="prabhujiName" className="block mb-1">
          Prabhuji Name:
        </label>
        <input
          type="text"
          id="prabhujiName"
          name="prabhujiName"
          value={formData.prabhujiName}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter Prabhuji Name"
        />

        <label htmlFor="prabhujiPhone" className="block mb-1">
          Prabhuji Phone:
        </label>
        <input
          type="tel"
          id="prabhujiPhone"
          name="prabhujiPhone"
          value={formData.prabhujiPhone}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter Prabhuji Phone"
        />
      </fieldset>

      {/* Mataji Section */}
      <fieldset className="mb-6">
        <legend className="text-xl font-semibold mb-2">Mataji Details</legend>

        <label htmlFor="matajiName" className="block mb-1">
          Mataji Name:
        </label>
        <input
          type="text"
          id="matajiName"
          name="matajiName"
          value={formData.matajiName}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter Mataji Name"
        />

        <label htmlFor="matajiPhone" className="block mb-1">
          Mataji Phone:
        </label>
        <input
          type="tel"
          id="matajiPhone"
          name="matajiPhone"
          value={formData.matajiPhone}
          onChange={handleChange}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          placeholder="Enter Mataji Phone"
        />
      </fieldset>
      {/* Submit Button */}
      {isLoading ? (
        <p>...loading</p>
      ) : (
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Submit
        </button>
      )}
    </form>
  );
}
