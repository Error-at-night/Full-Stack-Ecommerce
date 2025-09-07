import { useLogout } from "../../hooks/auth"
import { ButtonSpinner } from "../../ui"
import { Header } from "./components"

function Home() {
    const { logout, isPending } = useLogout()
  return(
    <>
      <Header/>
      <h1 className="text-center text-[2rem] mt-[100px] text-blue-800">Welcome</h1>
      <div className="mx-auto w-[500px] mt-[100px]">
        <button onClick={() => logout()} type="button" className="text-white bg-black px-3 py-3 w-[500px] rounded-md cursor-pointer font-semibold"
          disabled={isPending}
        >
          {isPending ? <ButtonSpinner/> : "Logout"}
        </button>
      </div>
    </>
  )
}

export default Home