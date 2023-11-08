import { API_ENDPOINT } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

type Inputs = {
  current_password: string;
  new_password: string;
};

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { current_password, new_password } = data;
    const token = localStorage.getItem("authToken");
    try {
      const response = await fetch(`${API_ENDPOINT}/user/password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ current_password, new_password }),
      });

      if (!response.ok) {
        setError("Oops! Please try again");
        console.error("Change Password failed");
      } else {
        setError(null);
        console.log("Change Password successful");
        navigate("/");
      }
    } catch (error) {
      setError("Oops! Please try again");
      console.error("Change Password failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Change Password
        </h1>
        <div className="max-w-md mx-auto p-2 bg-white rounded-md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Current Password:
              </label>
              <input
                type="password"
                id="current_password"
                autoFocus
                {...register("current_password", { required: true })}
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                New Password:
              </label>
              <input
                type="password"
                id="new_password"
                {...register("new_password", { required: true })}
                className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
              />
              {(errors.new_password || errors.current_password) && (
                <span className="text-red-500">This field is required</span>
              )}
            </div>
            {error && <span className="text-red-500">{error}</span>}
            <button
              type="submit"
              className="mt-2 w-full bg-blue-600 hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
