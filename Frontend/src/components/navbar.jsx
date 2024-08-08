import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate()
    
    // get a selector 
    const cart = useSelector(state=> state.cart)
    console.log(`inside navbar =>`,cart)



    const onLogout = ()=>{
      sessionStorage.removeItem('token')
      navigate('/')
    }

    return <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark" data-bs-theme="dark">
    <div className="container-fluid">
      <a className="navbar-brand" href="#">
        JOB PORTAL 
        </a>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link
                 to='/home' 
                 className='nav-link' 
                 aria-current='page'
                 href="#">
                Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
                 to='/jobs' 
                 className='nav-link' 
                 aria-current='page'
                 href="#">
                All Jobs
            </Link>
          </li>
          <li className="nav-item">
            <Link
                 to='/cart' 
                 className='nav-link' 
                 aria-current='page'
                 href="#">
                Cart ({cart.jobs.length})
            </Link>
          </li>
          <li className="nav-item">
            <Link
                 to='/applied-jobs ' 
                 className='nav-link' 
                 aria-current='page'
                 href="#">
                Applied Jobs
            </Link>
          </li>
          <li className="nav-item">
            <button
                 onClick={onLogout} 
                 className='nav-link' 
                 aria-current='page'
                 href="#">
                Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>;
}

export default Navbar;