import React, { useState, useEffect } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { useMutation } from "@apollo/react-hooks";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import '../styles/signup.css';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  // declared the addUser with the useMutation
  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    // use addUser function
    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <>
      <div className="signup-container">
      {/* This is needed for the validation functionality above */}
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="form-main">
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="username" className="form-element">Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type="invalid" className="form-element">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email" className="form-element">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid" className="form-element">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password" className="form-element">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid" className="form-element">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button 
          disabled={
            !(
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
      </div>
    </>
  );
};

export default SignupForm;
