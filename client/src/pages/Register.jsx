import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();

  //handling the input val
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;
    setUser({
      ...user,
      [name]: value, //dynamically setting user data
    });
  };

  const { storeTokenInLSt } = useAuth();

  //handling the form submission :
  const handleSubmit = async (e) => {
    e.preventDefault(); //so that app doesn't refresh
    console.log("USER", user);

    try {
      const response = await fetch(`http://localhost:5001/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();
      console.log("Res from the server: ", res_data.msg);
      if (response.ok) {
        console.log("VALID LOGIN", res_data);
        //stored in local storage
        storeTokenInLSt(res_data.token);
        // localStorage.setItem("token", res_data.token);
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/login");
      } else {
        alert(res_data.msg);
      }

      console.log("RES: ", response);
    } catch (error) {
      console.log("REGISTRATION ERROR", error);
    }
  };

  return (
    <section>
      <main>
        <div className="section-registration">
          <div className="container grid grid-two-cols">
            <div className="registration-image">
              <img
                src="/images/register.png"
                alt="a girl is trying to do registration"
                width="500"
                height="500"
              />
            </div>

            {/* let tackle registration form  */}
            <div className="registration-form">
              <h1 className="main-heading mb-3">registration form</h1>
              <br />

              <form onSubmit={handleSubmit}>
                {/* <form> */}
                <div>
                  <label htmlFor="username">username</label>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    id="username"
                    required
                    autoComplete="off"
                    value={user.username}
                    onChange={handleInput}
                  />
                </div>

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
                  <label htmlFor="phone">phone</label>
                  <input
                    type="number"
                    name="phone"
                    placeholder="phone"
                    id="phone"
                    required
                    autoComplete="off"
                    value={user.phone}
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
  );
};

export default Register;
