import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ReactComponent as Hamburger } from '../assets/hamburger.svg'
import { ReactComponent as Brand } from '../assets/logoipsum-297.svg'
import classes from '../styles/navbar.module.css'


const Navbar = (props) => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  }

  const renderLink = () => {
    if (!props.token && props.token !== "" && props.token !== undefined) {
      return <NavLink to="/login">Login</NavLink>
    } else {
      return <NavLink onClick={props.removeToken} to="/logout">Logout</NavLink>
    }
  }

  return (
    <nav className={classes.navbar}>
      <div className={classes.container}>
        <div className={classes.logo}>
          <NavLink to="/">
            <Brand />
          </NavLink>
        </div>
        <div className={classes.menuicon} onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`${classes.navelements} ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              {renderLink()}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar