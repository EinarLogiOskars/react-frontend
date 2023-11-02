import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar'
import classes from "../styles/prosidebar.module.css"
import { NavLink, useNavigate } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import ContactPageIcon from '@mui/icons-material/ContactPage';


const ProSidebar = (props) => {

    const navigator = useNavigate();

    const Nav = (url) => {
        navigator(url)
    }
    const style1 = {textDecoration: 'none', color: 'black'};
    const style2 = ({ isActive }) => ({color: isActive ? '#000000' : '#545e6f'})
    const style3 = ({ selected }) => ({backgroundColor: selected ? '#7600dc' : '#f0f0f0'})

    return (
        <Sidebar style={{ height: "100vh"}}>
            <Menu>
            <MenuItem
                component={<NavLink to="/dashboard" />}
                icon={<DashboardIcon />}>Dashboard</MenuItem>
                <SubMenu label="Films" icon={<LocalMoviesIcon />}>
                    <MenuItem
                        component={<NavLink to="/films" />}>Film list</MenuItem>
                    <MenuItem>Add film</MenuItem>
                </SubMenu>
                <SubMenu label="Customers" icon={<ContactPageIcon />}>
                    <MenuItem 
                        component={<NavLink to="/customers" />}>Customer List</MenuItem>
                    <MenuItem>Create customer</MenuItem>
                </SubMenu>
            </Menu>
        </Sidebar>
    )

}

export default ProSidebar