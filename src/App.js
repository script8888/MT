import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Login from './pages/Login';
import Settings from "./pages/Settings.js";
import { UserContext } from './hooks/auth/UserContext';
import useFindUser from './hooks/auth/useFindUser';
import PrivateRoute from './pages/PrivateRoute.js';

const style = {
  height: "100%"
};

function App() {
   const { user, setUser, isLoading } = useFindUser();
  

  return <Router>
  <div style={style}>
  <UserContext.Provider value={{ user, setUser, isLoading }}>
  <Switch>
        <PrivateRoute path="/Settings" component={Settings} />

        
        
        <Route path="/" exact component={Login}>
          <Login />
        </Route>
        
        <Route path="/Login">
          <Redirect to="/"/>
        </Route>
  </Switch>
  </UserContext.Provider>
  
  </div>
  </Router>
  
}

export default App;