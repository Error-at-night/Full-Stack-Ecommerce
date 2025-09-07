import { useForm, type SubmitHandler } from "react-hook-form";
import type { ResendVerificationCodeFormData } from "../../utils/types/auth";
import { ButtonSpinner } from "../../ui";
import { useResendVerificationCode } from "../../hooks/auth";
import { emailPattern } from "../../utils/regexPatterns";

function ResendVerificationCode() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ResendVerificationCodeFormData>();
  
  const { resendVerificationCode, isPending } = useResendVerificationCode()
  
  const onSubmit: SubmitHandler<ResendVerificationCodeFormData> = (data) => {
    resendVerificationCode(data, { onSuccess: () => {
      reset()
    }})
  }

  return (
    <main className="bg-[#F8F9FA] h-[100vh] flex items-center px-4">
      <form className="w-[500px] mx-auto bg-white p-4 pb-6 shadow-md rounded-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="text-center">
          <h1 className="text-[#2B3445] font-bold text-[2rem]">Resend Verification Code</h1>
          <p className="text-[#92969F] text-[1rem]">Enter the email address you used when creating your account</p>
        </div>
        <div className="flex flex-col pt-4">
          <label htmlFor="email" className="text-[#2B3445] font-semibold mb-2">Email</label>
          <input type="email" id="email" placeholder="e.g. johndoe@gmail.com"
            className={`${errors.email ? 
              "border-red-500 focus:border-red-500 focus:outline-none" : "border-[#DAE1E7]"} border w-full py-2 px-4 rounded-md`}
            {...register("email", {
              required: "Please provide your email",
              validate: (value) => {

                if (!emailPattern.test(value)) {
                  return "Please provide a valid email address (For example: johndoe@gmail.com)"
                }

                const firstPart = value.split("@")[0];
                if (firstPart.length < 5) {
                  return "The name before '@' must be at least 5 characters long"
                }

                return true
              },
            })}
            disabled={isPending}
          />
          {errors.email && <p className="text-red-500 mt-1">{errors.email.message}</p>}
        </div>
        <div className="pt-5">
          <button type="submit" className="text-white bg-black px-3 py-3 w-full rounded-md cursor-pointer font-semibold"
            disabled={isPending}
          >
            {isPending ? <ButtonSpinner/> : "Resend Verification Code"}
          </button>
        </div>
      </form>
    </main>
  )
}

export default ResendVerificationCode