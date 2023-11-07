import { API_ENDPOINT } from "../../config/constants";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  userName: string;
  userEmail: string;
  userPassword: string;
};

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { userName, userEmail, userPassword } = data;

    try {
      const response = await fetch(`${API_ENDPOINT}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          password: userPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Sign-up failed");
      }
      const data = await response.json();
      localStorage.setItem("authToken", data.auth_token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      navigate("/");
      console.log("Sign-up successful");
    } catch (error) {
      console.error("Sign-up failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Name:</label>
        <input
          type="text"
          id="userName"
          autoFocus
          {...register("userName", { required: true })}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Email:</label>
        <input
          type="email"
          id="userEmail"
          autoFocus
          {...register("userEmail", { required: true })}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Password:
        </label>
        <input
          type="password"
          id="userPassword"
          autoFocus
          {...register("userPassword", { required: true })}
          className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue"
        />
        {errors.userPassword && <span>This field is required</span>}
      </div>
      <button
        type="submit"
        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Sign up
      </button>
      <div className="mt-4 text-center">
        <div className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-blue">
          <Link to="/">Browse Without Signing Up</Link>
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
