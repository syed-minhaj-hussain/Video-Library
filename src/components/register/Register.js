import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../context/AuthContext";
import regStyle from "./register.module.css";

export const Register = () => {
  const { isUserLoggedIn, register } = useAuthContext();
  const [text, setText] = useState("");
  const [password, setPassword] = useState("");
  const [{ status, msg, backgroundColor, color }, setAlert] = useState({
    status: null,
    message: null,
    backgroundColor: "#fff",
    color: "#fff",
  });
  const navigate = useNavigate();
  console.log({ isUserLoggedIn });
  return (
    <>
      <div className={regStyle.container}>
        <section>
          <div className={regStyle.card}>
            <h3 style={{ marginBottom: "1rem" }}>
              Enter Your Username & Password{" "}
            </h3>
            {status === true && (
              <p
                style={{
                  backgroundColor,
                  padding: "1rem",
                  margin: "0.5rem",
                  color,
                }}
              >
                {msg} & You Will Be Redirected To Login
              </p>
            )}
            {status === false && (
              <p
                style={{
                  backgroundColor,
                  padding: "1rem",
                  margin: "0.5rem",
                  color,
                }}
              >
                {msg}
              </p>
            )}
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await register(text, password);
                console.log(response);
                if (response?.success) {
                  console.log(response.success);
                  setAlert({
                    status: response.success,
                    msg: response?.message,
                    backgroundColor: "green",
                    color: "#fff",
                  });
                  setTimeout(() => setAlert(false), 1000);
                  setTimeout(() => navigate("/login"), 2000);
                }
                if (!response?.success) {
                  setAlert({
                    status: response.success,
                    msg: response.message,
                    backgroundColor: "red",
                    color: "#fff",
                  });
                  setTimeout(() => setAlert(false), 1000);
                }
              }}
            >
              <div className={regStyle.inputs}>
                <label htmlFor="name">Username :</label>
                <input
                  type="text"
                  name=""
                  id="name"
                  placeholder="Enter Username..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div className={regStyle.inputs}>
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  name=""
                  id="password"
                  placeholder="Enter Password..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input type="submit" value="Register" className={regStyle.btn} />
            </form>
          </div>
        </section>
      </div>
    </>
  );
};
