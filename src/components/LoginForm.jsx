import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import classes from "./LoginForm.module.css";
const LoginForm = () => {
  //const [email, setEmail] = useState();
  //const [passwrd, setPasswrd] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formErrs, setFrmErrs] = useState({});
  const validateForm = (data) => {
    const errors = {};
    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Email is invalid";
    }

    if (!data.password) {
      errors.password = "Password is required";
    }

    return errors;
  };
  const navigate = useNavigate();
  const onchngHndlr = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const loginHndlr = async (e) => {
    e.preventDefault();
    const newFrmErrs = validateForm(formData);
    setFrmErrs(newFrmErrs);
    if (Object.keys(formErrs).length === 0) {
      try {
        const res = await axios.post("https://reqres.in/api/login", formData);
        localStorage.setItem("access_token", res.data.token);
        navigate("/dashboard");
      } catch (error) {
        alert("something went wrong,check email & password");
      }
    }
  };
  return (
    <div className={`row m-0 ${classes.form_mrow}`}>
      <div className="col-12 p-5">
        <div className="row m-0">
          <div className={`col-12 ${classes.frm_hdcol}`}>
            <span>login</span>
          </div>
          <div className="col-12 pt-4 ">
            <form onSubmit={loginHndlr}>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={onchngHndlr}
                  type="email"
                  className="form-control"
                  id="eml_inpt"
                />
                {formErrs.email && (
                  <span className={classes.err_txt}>{formErrs.email}</span>
                )}
              </div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <input
                  name="password"
                  value={formData.password}
                  onChange={onchngHndlr}
                  type="password"
                  className="form-control"
                  id="psw_inpt"
                />
                {formErrs.password && (
                  <span className={classes.err_txt}>{formErrs.password}</span>
                )}
              </div>

              <div className="offset-8 col-4 ">
                <button type="submit" className="btn btn_cusmain">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
