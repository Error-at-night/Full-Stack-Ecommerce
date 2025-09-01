import { Search } from "lucide-react"
import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      <div>
        <h1>Logo</h1>
        <ul>
          <Link to="/men"><li>Men Wear</li></Link>
          <Link to="/women"><li>Women Wear</li></Link>
          <Link to="/search"><li>Search</li></Link>
        </ul>
      </div>
      <div>
        <div>
          <search>
            <option value="">NGN</option>
            <option value="">USD</option>
            <option value="">EURO</option>
            <option value="">POUNDS</option>
          </search>
        </div>
        <div>
          <Search size={40}/>
        </div>
      </div>
    </nav>
  )
}

export default Navbar