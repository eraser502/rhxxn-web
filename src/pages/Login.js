import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getData, setData } from "../services/doc.services";
 
import {
  googleSignUpWithPopup,
  googleSignUpWithRedirect,
  handleGoogleRedirectResult,
} from "../services/login.services";
import { isMobile } from "react-device-detect";

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    try {
      if (isMobile) {
        await googleSignUpWithRedirect();
      } else {
        await googleSignUpWithPopup();
      }
      setLoading(false);
      navigate("/main");
    } catch (err) {
      setLoading(false);
      alert("회원가입 실패\n err :" + err);
    }
  };
  useEffect(() => {
    setLoading(true); 
    (async () => {
            await handleGoogleRedirectResult().then(() => {
                setLoading(false)
            }).catch((err) => {
                setLoading(false)
                alert('로그인 실패\n err : ' + err)
            })
        })()
}, [])
  // const createDB = () => {
  //   if (getData("tdlDB") === null) {
  //     setData("tdlDB", []);
  //   }
  // };
  //createDB();
  return (
    <div>
      {loading ? (
        <div className="load"></div>
      ) : (
        <div className="loginContainer">
          <button
            className="loginButton"
            onClick={() => {
              handleGoogle();
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};
