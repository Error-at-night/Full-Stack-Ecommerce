import { Link } from "react-router-dom"
import { ShoppingCart } from 'lucide-react';

function Navbar() {
  return (
    <nav className="bg-white px-12 py-10">
      <div className="flex justify-between items-center">
        <div className="flex">
          <h1 className="pe-16">Logo</h1>
          <ul className="flex">
            <li>Men</li>
            <li className="px-14">Women</li>
            <li></li>
          </ul>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <select name="" id="">
              <option value="">NGN</option>
              <option value="">USD</option>
              <option value="">EURO</option>
              <option value="">POUNDS</option>
            </select>
          </div>
          <div className="px-14">
            <Link to="/login">Sign in</Link>
          </div>
          <div className="relative">
            <ShoppingCart size={28}/>
            {/* <p className="absolute -top-3 left-3 w-[23px] h-[25px] rounded-full bg-black text-white text-center">1</p> */}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar