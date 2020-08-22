import React, { useState, useEffect, createContext, useContext } from 'react';
import { firebaseApp } from './firebase';
import * as firebase from 'firebase/app';
import { Route, Redirect } from 'react-router-dom';

const AuthContext = createContext();
export const AuthContextProvider = (props) => {
  const auth = Auth();
  return (
    <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


export function AuthenticatedRoute({ children, ...rest }) {
    const auth = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: location }
              }}
            />
          ) : (
            children
          )
        }
      />
    );
  }

export function PrivateRoute({ children, ...rest }) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}





const Auth = () => {
  const [user, setUser] = useState(null);
  console.log(user);
  const signup = (name, email, password, url) => {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebaseApp
          .auth()
          .currentUser.updateProfile({
            displayName: name,
            photoURL: url,
          })
          .then(() => {
            setUser(res.user);
            alert('Sign up successfully completed!');
            window.location.replace('/login');
          });
      })
      .catch((error) => alert(error.message));
  };

  const login = (email, password) => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        setUser(res.user);
        alert("Login Successful!");
        window.location.replace("/home");
      })
      .catch((error) => alert(error.message));
  };

  const logout = () => {
      firebaseApp.auth().signOut()
      .then(res => {
          setUser(null)
          window.location.replace("/")
      })
      .catch(error => alert(error.message))
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (usr) {
      if (usr) {
          console.log("state changed", usr)
        setUser(usr);
      } else {
        // No user is signed in.
      }
    });
  }, []);

  return {
    signup,
    user,
    login,
    logout
  };
};
export default Auth;


