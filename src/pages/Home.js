import React from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const responseMessage = useGoogleLogin({
    onSuccess: async ({ code }) => {
      axios
        .post("/api/craete-tokens", { code })
        .then((response) => {
          console.log(response.data);
          navigate("/add-event");
        })
        .catch((error) => console.log(error));
    },
    flow: "auth-code",
    scope: "openid email profile https://www.googleapis.com/auth/calendar",
  });
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <div className="main_home_div">
      <h1>Welcome to the Event Calendar</h1>
      <p>
        TO add an event or see all events in google calendar please click on
        button
      </p>
      
      <button onClick={responseMessage}>
      Connect with Google Calendar
      </button>
      
    </div>
  );
}
