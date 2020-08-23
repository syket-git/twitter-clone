import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Feed from './Feed';
import Widgets from './Widgets';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from './NotFound';
import Welcome from './Welcome';
import Signup from './Signup';
import Login from './Login';
import {
  AuthContextProvider,
  PrivateRoute,
  AuthenticatedRoute,
} from './useAuth';
import Logout from './Logout';

function App() {
  return (
    <div className="app">
      <AuthContextProvider>
        <Router>
          <Switch>
            <AuthenticatedRoute exact path="/">
              <Welcome />
            </AuthenticatedRoute>
            <Route path="/signup">
              <Signup />
            </Route>
            <AuthenticatedRoute path="/login">
              <Login />
            </AuthenticatedRoute>
            <PrivateRoute path="/home">
              <Sidebar />
              <Feed />
              <Widgets />
            </PrivateRoute>
            <Route path="/logout">
              <Logout />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
