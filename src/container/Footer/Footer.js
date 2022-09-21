import React, { useEffect, useState, useRef } from "react";
import emailjs from "emailjs-com";
import { images } from "../../constants";
import { AppWrap, MotionWrap } from "../../wrapper";
import { client } from "../../client";
import "./Footer.scss";

const Footer = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState({});
  const { username, email, message } = formData;
  const form = useRef();
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    if (Object.keys(formError).length === 0 && isFormSubmitted) {
      console.log(formData);
    }
  }, [formError]);
  const validate = (values) => {
    const error = {};
    if (!values.username) {
      error.username = "Username is required!";
    }
    if (!values.email) {
      error.email = "Email is required!";
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)
    ) {
      error.email = "this is not valid email format!";
    }
    //email

    return error;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFormError(validate(formData));

    if (Object.keys(formError).length === 0) {
      // const contact = {
      //   _type: "contact",
      //   name: formData.username,
      //   email: formData.email,
      //   message: formData.message,
      // };

      emailjs
        .sendForm(
          "service_yn5va2l",
          "template_md6wjqb",
          form.current,
          "OhmtoQHt1ZTDVmufl"
        )
        .then(
          (result) => {
            console.log(result.text);
            setLoading(false);
            setIsFormSubmitted(true);
            // client
            // .create(contact)
            // .then(() => {
            //   setLoading(false);
            //   setIsFormSubmitted(true);
            // })
            // .catch((err) => console.log(err));
            alert("SUCCESS!");
          },
          (error) => {
            console.log(error.text);
            alert("FAILED...", error);
          }
        );
      e.target.reset();
    }
  };

  return (
    <>
      <h2 className="head-text">Contact Me</h2>

      <div className="app__footer-cards">
        <div className="app__footer-card ">
          <img src={images.email} alt="email" />
          <a href="mailto:wajid90273@gmail.com" className="p-text">
            wajid90273@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="phone" />
          <a href="9027311101" className="p-text">
            9027311101
          </a>
        </div>
      </div>
      {!isFormSubmitted ? (
        <div className="app__footer-form app__flex">
          <form ref={form} onSubmit={handleSubmit} className="app__footer-form">
            <div className="app__flex">
              <input
                className="p-text"
                type="text"
                placeholder="Your Name"
                name="username"
                value={username}
                onChange={handleChangeInput}
              />
            </div>
            <span>{formError.username}</span>
            <div className="app__flex">
              <input
                className="p-text"
                type="email"
                placeholder="Your Email"
                name="email"
                value={email}
                onChange={handleChangeInput}
              />
            </div>
            <span>{formError.email}</span>
            <div>
              <textarea
                className="p-text"
                placeholder="Your Message"
                value={message}
                name="message"
                onChange={handleChangeInput}
              />
            </div>
            <p>{formError.message}</p>
            <button type="submit" className="p-text">
              {!loading ? "Send Message" : "Sending..."}
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h6 className="head-text">Thank you for getting in touch!</h6>
        </div>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Footer, "app__footer"),
  "contact",
  "app__whitebg"
);
