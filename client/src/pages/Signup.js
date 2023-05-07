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
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  useEffect(() => {
    if (error) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  }, [error]);

  const [notificationText, setNotificationText] = useState('');
  const onBlurHandler = (e) => {
    if (e.target.value === ''){
      if (e.target.id === 'name'){
        setNotificationText('Name is required..')
      } else if (e.target.id === 'email'){
        setNotificationText('Email is requred..')
      } else if (e.target.id === 'message'){
        setNotificationText('Message is requred..')
      }
    }};


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

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
      <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="form-main">
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group>
          <Form.Label htmlFor="username" id="name" className="form-element">Username:</Form.Label>
          <Form.Control
            className="form-control"
            type="text"
            placeholder="Your username"
            name="username"
            onChange={handleInputChange}
            value={userFormData.username}
            required
            onBlur={onBlurHandler}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="email" id="email" className="form-element">Email:</Form.Label>
          <Form.Control
            className="form-control"
            type="email"
            placeholder="Your email address"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
            onBlur={onBlurHandler}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label htmlFor="password" id="password" className="form-element">Password:</Form.Label>
          <Form.Control
            className="form-control"
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
            onBlur={onBlurHandler}
          />
        </Form.Group>
        <Button 
          className="form-control"
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
      <div id="onblur-text">{notificationText}</div>
      </div>
    </>
  );
};

export default SignupForm;
