import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginFormData } from "../../utils/types/auth"
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';
import { useLogin } from '../../hooks/auth';
import { ButtonSpinner } from "../../ui";
import { Link } from "react-router-dom";
import { emailPattern, passwordPattern } from "../../utils/regexPatterns";

function Login() {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<LoginFormData>();

  const { loginUser, isPending } = useLogin()

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    loginUser(data, { onSuccess: () => {
      reset()
    }})
  }

  return (
    <main className="bg-[#F8F9FA] h-[100vh] flex items-center px-4">
      <form className="w-[500px] mx-auto bg-white p-4 pb-6 shadow-md rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center">
          <h1 className="text-[#2B3445] font-bold text-[2rem]">Login</h1>
          <p className="text-[#92969F] text-[1rem]">Please fill all forms to be continued</p>
        </div>
        <div className="flex flex-col py-4">
          <label htmlFor="email" className="text-[#2B3445] font-semibold mb-2">Email</label>
          <input type="email" id="email" placeholder="e.g. johndoe@gmail.com"
            className={`${errors.email ? 
              "border-red-500 focus:border-red-500 focus:outline-none" : "border-[#DAE1E7]"} border w-full py-2 px-4 rounded-md`}
            {...register("email", {
              required: "Please provide your email",
              validate: (value) => {

                if (!emailPattern.test(value)) {
                  return "Please provide a valid email address (e.g. johndoe@gmail.com)";
                }

                const firstPart = value.split("@")[0];
                if (firstPart.length < 5) {
                  return "The name before '@' must be at least 5 characters long";
                }

                return true;
              },
            })}
            disabled={isPending}
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div className="flex flex-col pb-4">
          <label htmlFor="password" className="text-[#2B3445] font-semibold mb-2">Password</label>
          <div className="relative">
            <input type={showPassword ? "text" : "password"} id="password"
              className={`${errors.password ? 
                "border-red-500 focus:border-red-500 focus:outline-none" : "border-[#DAE1E7]"} border w-full py-2 px-4 rounded-md`}
              {...register("password", {
                required: "Please provide your password",
                pattern: {
                  value: passwordPattern,
                  message: "Password must be at least 8 characters, include an uppercase letter, number, and symbol",
                },
              })}
              disabled={isPending}
            />
            <span className="absolute top-3 right-5 cursor-pointer"
              onClick={() => setShowPassword((password) => !password)}
            >
              {showPassword ? <Eye size={20}/> : <EyeOff size={20}/> }
            </span>
          </div>
          {errors.password && <p className="text-red-500 mt-1">{errors.password.message}</p>}
        </div>
        <div className="text-right">
          <Link to="/forgot-password" className="underline">Forgot password?</Link>
        </div>
        <div className="pt-5">
          <button type="submit" className="text-white bg-black px-3 py-3 w-full rounded-md cursor-pointer font-semibold"
            disabled={isPending}
          >
            {isPending ? <ButtonSpinner/> : "Login"}
          </button>
        </div>
        <div className="mt-5">
          <p className="text-center">Don't have an account? {" "}
            <Link to="/register" className="underline cursor-pointer font-bold">Register</Link>
          </p>
        </div>
      </form>
    </main>
  )
}

export default Login