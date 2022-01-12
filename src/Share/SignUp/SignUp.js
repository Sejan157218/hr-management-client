import Button from "@restart/ui/esm/Button";
import React, { useState } from "react";
import { Col, Nav, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hook/useAuth";

const SignUp = () => {
  const [errorSignup, setErrorSignup] = useState("");
  const { handlerToGoogleLogin, handlerRegisterToEmailPass } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();
  const location = useLocation();

  // form submit
  const onSubmit = ({ name, email, password, rePassword }) => {
    const regName = /^[a-z ,.'-]+$/i;
    const regEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (password === rePassword) {
      if (!regName.test(name)) {
        setErrorSignup("Invalid  Name.");
      } else if (!regEmail.test(email)) {
        setErrorSignup("Invalid  Email.");
      } else {
        setErrorSignup("");
        handlerRegisterToEmailPass(email, password, name, navigate);
      }
    } else {
      setErrorSignup("password not match...try again");
    }
  };
  // google login
  const handlerGoogleLogin = () => {
    handlerToGoogleLogin(navigate, location);
  };

  return (
    <div className="login-div " style={{ height: "100vh" }}>
      <div className="text-center login-container py-5 shadow p-3 mb-5 rounded">
        <h1 className="pb-3">Sign Up</h1>
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="input-icons">
            <input
              className="input-field w-100 h-50 mb-2"
              type="text"
              placeholder="Full Name"
              {...register("name")}
            />
            <br />

            <input
              className="input-field w-100 h-50 mb-2"
              type="text"
              placeholder="Enter Email"
              {...register("email")}
            />
            <br />

            <input
              className="input-field w-100 h-50"
              type="password"
              placeholder="Enter Password"
              {...register("password", { required: true })}
            />
            <br />

            <input
              className="input-field w-100 h-50"
              type="password"
              placeholder="Re-Enter Password"
              {...register("rePassword", { required: true })}
            />
            {errors.exampleRequired && <span>This field is required</span>}
            {errorSignup && <span>{errorSignup}</span>}
            <input className="w-100 button-login" type="submit" />
          </form>
          <p className="pt-3">Or Login With</p>
          <Row>
            <Col xs={12}>
              <Button
                className="w-100 button-login"
                onClick={handlerGoogleLogin}
              >
                {" "}
                <i className="fab fa-google me-2"></i>Google
              </Button>
            </Col>
          </Row>
          <p className="pt-3">
            Already have account ?{" "}
            <Nav.Link
              as={Link}
              to={"/signin"}
              className="Services-nav ps-0"
              style={{ display: "inline" }}
            >
              Login
            </Nav.Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
