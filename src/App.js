import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { Navbar, Home, FilmList, Actors, Customers, About, Contact, Register, Login, Logout, ProSidebar, Dashboard, Film, AddFilm } from './component'
import useToken from './hooks/useToken';
import { ProSidebarProvider } from 'react-pro-sidebar';
import classes from './styles/app.module.css'
import { ProtectRoutes } from './hooks/useProtectRoutes';

function App() {

  const { token, removeToken, setToken } = useToken();

  const renderSidebar = () => {
    if (token && token !== "" && token !== undefined) {
      return <ProSidebar />
    }
  }

  return (
    <div className={classes.mainContainer}>
      <div className={classes.innerContainer}>
          <div className={classes.upperContainer}>
            <Navbar removeToken={removeToken} token={token}/>
          </div>
          <div className={classes.lowerContainer}>
            <ProSidebarProvider>
              {renderSidebar()}
            </ProSidebarProvider>
            <Routes>
              <Route path="/" element={ <Home /> } />
              <Route path="/react-frontend" element={ <Home /> } />
              <Route element={ <ProtectRoutes /> }>
                <Route path="/films" element={ <FilmList /> } />
              </Route>
              <Route path="/actors" element={ <Actors /> }/>
              <Route element={ <ProtectRoutes /> }>
                <Route path="/customers" element={ <Customers /> }/>
              </Route>
              <Route path="/about" element={ <About /> }/>
              <Route path="/contact" element={ <Contact /> }/>
              <Route path="/register" element={ <Register /> }/>
              <Route path="/login" element={ <Login setToken={setToken}/> }/>
              <Route path="/logout" element={ <Logout /> }/>
              <Route element={ <ProtectRoutes /> }>
                <Route path="/dashboard" element={ <Dashboard /> }/>
              </Route>
              <Route element={ <ProtectRoutes /> }>
                <Route path="/film" element={ <Film />}/>
              </Route>
              <Route element={ <ProtectRoutes /> }>
                <Route path="/add_film" element={ <AddFilm />}/>
              </Route>
            </Routes>
          </div>
      </div>
    </div>
  );
}

export default App;