import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";
// import { toast } from "react-toastify";

// const URL = "http://localhost:5000/api/auth/login";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const {storeTokenInLSt} = useAuth();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user)
    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const res_data = await response.json();
        console.log("VALID LOGIN", res_data);
        //stored in local storage
        storeTokenInLSt(res_data.token);
        // localStorage.setItem("token", res_data.token);
        
        // console.log('VALID LOGIN');
        setUser({ email: "", password: "" });
        navigate("/");
      } else {
        alert("INVALID CREDENTIALS..!!!");
      }
    } catch (error) {
      console.log(error);
    }
    // try {
    //   const response = await fetch(URL, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(user),
    //   });

    //   console.log("login form", response);

    //   const res_data = await response.json();

    //   if (response.ok) {
    //     // alert("Login Successful");
    //     storeTokenInLS(res_data.token);

    //     setUser({ email: "", password: "" });
    //     toast.success("Login successful");
    //     navigate("/");
    //   } else {
    //     toast.error(
    //       res_data.extraDetails ? res_data.extraDetails : res_data.message
    //     );
    //     console.log("invalid credential");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/login.png"
                  alt=" let's fill the login form "
                  width="500"
                  height="500"
                />
              </div>

              {/* let tackle registration form  */}
              <div className="registration-form">
                <h1 className="main-heading mb-3">login form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="enter your email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="password"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />
                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login;
