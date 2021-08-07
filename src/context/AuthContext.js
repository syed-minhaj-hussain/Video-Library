import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();
const usersDB = {
  data: [
    {
      userName: "Minhaj",
      password: "Hussain",
    },
    {
      userName: "Syed",
      password: "Minhaj",
    },
    {
      userName: "Neog",
      password: "Camp",
    },
    {
      userName: "Test",
      password: "Success",
    },
  ],
};

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [users, setUsers] = useState(usersDB);
  const navigate = useNavigate();

  useEffect(() => {
    setUsers(JSON.parse(localStorage.getItem("updatedUsers")) || usersDB);
  }, []);
  useEffect(() => {
    localStorage.setItem("updatedUsers", JSON.stringify(users));
  }, [users]);

  const findUserByUserName = (userName) =>
    users?.data?.find((user) => user.userName === userName);

  const fakeFetch = (userName, password) => {
    return new Promise((resolve, reject) => {
      const user = findUserByUserName(userName);
      setTimeout(() => {
        if (user && user.password === password) {
          resolve({ success: true, msg: "Auth Success" });
        }
        reject({ success: false, msg: "wrong username / password" });
      }, 3000);
    });
  };

  const login = async (username, password, route) => {
    try {
      const { success } = await fakeFetch(username, password);

      console.log({ success });
      if (success === true) {
        setIsUserLoggedIn((prev) => !prev);
        localStorage.setItem(
          "loginStatus",
          JSON.stringify({ status: true, path: route })
        );
        navigate(route);
      }
      return { success, path: route };
    } catch (err) {
      // console.log({ err });
      return { err };
    }
  };

  const logout = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem("loginStatus");
  };

  const fetchRegister = (userName) => {
    return new Promise((resolve, reject) => {
      const user = findUserByUserName(userName);
      if (user) {
        reject({ success: false, message: "username already exists!" });
      }
      resolve({ success: true, message: "user added successfully!" });
    });
  };

  const register = async (userName, password) => {
    if (userName === "" || password === "") {
      return { success: false, message: "Input Fields are enpty!" };
    }
    try {
      const response = await fetchRegister(userName);
      if (response?.success && userName !== "" && password !== "") {
        setUsers({ ...users, data: [...users.data, { userName, password }] });
        console.log({ response });
        return response;
      }
    } catch (err) {
      console.log({ err });
      return err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isUserLoggedIn, setIsUserLoggedIn, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
