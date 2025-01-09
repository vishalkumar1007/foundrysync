import "./UserAuth.css";
import { useEffect, useState } from "react";
// import githubLogo from "../../assets/GitHub_Logo_White.png";
import githubIcon from "../../assets/github-mark-white.png";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";
const CLINT_ID = "Iv23lieF5HvovKY6yuIm";

const UserAuth = () => {
  const navigate = useNavigate();

  // manual  login
  const [openLoginSection, setOpenLoginSection] = useState(false);
  const [userInputEmailId, setUserInputEmailId] = useState("");
  const [userInputEmailVerifyError, setUserInputEmailVerifyError] =
    useState(false);
  const [userInputPassword, setUserInputPassword] = useState("");
  const [userInputPasswordError, setUserInputPasswordError] = useState(false);

  // manual signup
  const [useFirstNameSignup, setUseFirstNameSignup] = useState("");
  const [userLastNameSignup, setUserLastNameSignup] = useState("");
  const [userInputEmailIdSignup, setUserInputEmailIdSignup] = useState("");
  const [userPasswordSignup, setUserPasswordSignup] = useState("");
  const [userConformPasswordSignup, setUserConformPasswordSignup] = useState("");

  const [isUseFirstNameSignupError, setIsUseFirstNameSignupError] = useState(false);
  const [isUserLastNameSignupError, setIsUserLastNameSignupError] = useState(false);
  const [isUserInputEmailIdSignupError, setIsUserInputEmailIdSignupError] = useState(false);
  const [isUserPasswordSignupError, setIsUserPasswordSignupError] = useState(false);
  const [ isUserConformPasswordSignupError,setIsUserConformPasswordSignupError] = useState(false);

  const [UseFirstNameSignupErrorMsg, setUseFirstNameSignupErrorMsg] = useState("invalid input");
  const [UserLastNameSignupErrorMsg, setUserLastNameSignupErrorMsg] = useState("invalid input");
  const [UserInputEmailIdSignupErrorMsg, setUserInputEmailIdSignupErrorMsg] = useState("invalid input");
  const [UserPasswordSignupErrorMsg, setUserPasswordSignupErrorMsg] = useState("invalid input");
  const [UserConformPasswordSignupErrorMsg,setUserConformPasswordSignupErrorMsg] = useState("invalid input");
  const [isLogin, setIsLogin] = useState(true);

  // github signup / login
  const [reRender, setReRender] = useState(false);

  // Sign up with github logic
  const loginWithGithub = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLINT_ID}`
    );
  };

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    if (codeParam && localStorage.getItem("accessToken") === null) {
      async function getAccessToken() {
        await fetch(
          `http://localhost:8080/api/user/authGithub?code=${codeParam}`,
          {
            method: "GET",
          }
        )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);

            if (data.access_token) {
              localStorage.setItem("accessToken", data.access_token);
              setReRender(!reRender);
            }
          });
      }
      getAccessToken();
    } else if (localStorage.getItem("accessToken") !== null) {
      getUserDataAfterSignupWithGithub();
    }
  }, [reRender]);

  const getUserDataAfterSignupWithGithub = async () => {
    await fetch("http://localhost:8080/api/user/authUserDataGithub", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  };

  // Sign up with manual logic

  useEffect(()=>{
    if(useFirstNameSignup){
      if(useFirstNameSignup.length<=4 || useFirstNameSignup.length>=12){
        setUseFirstNameSignupErrorMsg('character must be more than 4 and less than 12');
        setIsUseFirstNameSignupError(true)
      }else if(/[0-9]/.test(useFirstNameSignup)){
        setUseFirstNameSignupErrorMsg('numbers are not allowed');
        setIsUseFirstNameSignupError(true)
      }else if(/[@!#%&*()`\-=+{}]/.test(useFirstNameSignup)){
        setUseFirstNameSignupErrorMsg('spacial character {@!#%&*()`-=+} not allow');
        setIsUseFirstNameSignupError(true)
      }else{
        setIsUseFirstNameSignupError(false)
      }
    }else{
      setIsUseFirstNameSignupError(false)
    }
  },[useFirstNameSignup])
  
  useEffect(()=>{
    if(userLastNameSignup){
      if(userLastNameSignup.length<=1 || userLastNameSignup.length>=10){
        setUserLastNameSignupErrorMsg('character must be more than 1 and less than 10');
        setIsUserLastNameSignupError(true)
      }else if(/[0-9]/.test(userLastNameSignup)){
        setUserLastNameSignupErrorMsg('numbers are not allowed');
        setIsUserLastNameSignupError(true)
      }else if(/[@!#%&*()`\-=+{}]/.test(userLastNameSignup)){
        setUserLastNameSignupErrorMsg('spacial character {@!#%&*()`-=+} not allow');
        setIsUserLastNameSignupError(true)
      }else{
        setIsUserLastNameSignupError(false)
      }
    }else{
      setIsUserLastNameSignupError(false)
    }
  },[userLastNameSignup])

  useEffect(()=>{
    if(userInputEmailIdSignup){
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailPattern.test(userInputEmailIdSignup)){
        setUserInputEmailIdSignupErrorMsg('invalid input email');
        setIsUserInputEmailIdSignupError(true);
      }else{
        setIsUserInputEmailIdSignupError(false);
      }
    }else{
      setIsUserInputEmailIdSignupError(false);
    }
  },[userInputEmailIdSignup])

  useEffect(()=>{
    if (userPasswordSignup) {
      if (userPasswordSignup.length < 4 || userPasswordSignup.length > 20) {
        setUserPasswordSignupErrorMsg(
          "Password character must be more than 4 and less then 20"
        );
        setIsUserPasswordSignupError(true)
      } else if (
        ["$", "!", "%", "^", "*", "(", ")", "|"].some((operator) =>
          userPasswordSignup.includes(operator)
        )
      ) {
        setUserPasswordSignupErrorMsg(
          'Not allow to use these character $ ! % ^ | ( )'
        );
        setIsUserPasswordSignupError(true)
      } else if (!/\d/.test(userPasswordSignup)) {
        setUserPasswordSignupErrorMsg("Password must be contain number");
        setIsUserPasswordSignupError(true)
      } else if (
        !["@", "#", "-", ".", "/"].some((operator) =>
          userPasswordSignup.includes(operator)
        )
      ) {
        setUserPasswordSignupErrorMsg("Password must be contain special character");
        setIsUserPasswordSignupError(true)
      } else if (!/[A-Z]/.test(userPasswordSignup)) {
        setUserPasswordSignupErrorMsg(
          "Password must contain at least one capital letter"
        );
        setIsUserPasswordSignupError(true)
      } else {
        setUserPasswordSignupErrorMsg("Seems Like All Set For Update Password");
        setIsUserPasswordSignupError(false)
      }
    } else if (userPasswordSignup === "") {
        setUserPasswordSignupErrorMsg("");
        setIsUserPasswordSignupError(false);
    }
  },[userPasswordSignup])

  useEffect(()=>{
    if (userConformPasswordSignup) {
      if (
        !(userConformPasswordSignup.length > 4 || userConformPasswordSignup.length < 20)
      ) {
        setUserConformPasswordSignupErrorMsg(
          "Password character must be more than 4 and less then 20"
        );
        setIsUserConformPasswordSignupError(true)
      } else if (
        ["$", "!", "%", "^", "*", "(", ")", "|"].some((operator) =>
          userConformPasswordSignup.includes(operator)
        )
      ) {
        setUserConformPasswordSignupErrorMsg(
          '"Not allow to use these character $ ! % ^ | ( ) '
        );
        setIsUserConformPasswordSignupError(true)
      } else if (!/\d/.test(userConformPasswordSignup)) {
        setUserConformPasswordSignupErrorMsg("Password must be contain number");
        setIsUserConformPasswordSignupError(true)
      } else if (
        !["@", "#", "-", ".", "/"].some((operator) =>
          userConformPasswordSignup.includes(operator)
        )
      ) {
        setUserConformPasswordSignupErrorMsg("Password must be contain special character");
        setIsUserConformPasswordSignupError(true)
      } else if (!/[A-Z]/.test(userConformPasswordSignup)) {
        setUserConformPasswordSignupErrorMsg(
          "Password must contain at least one capital letter"
        );
        setIsUserConformPasswordSignupError(true)
      } else if(userPasswordSignup!==userConformPasswordSignup){
          setUserConformPasswordSignupErrorMsg("Password not same");
          setIsUserConformPasswordSignupError(true)
      }else {
        setUserConformPasswordSignupErrorMsg("Seems Like All Set For Update Password");
        setIsUserConformPasswordSignupError(false)
      }
    } else if (userConformPasswordSignup === "") {
        setUserConformPasswordSignupErrorMsg("");
        setIsUserConformPasswordSignupError(false);
    }
  },[userConformPasswordSignup, userPasswordSignup])

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  useEffect(() => {
    // console.log(userInputEmail);
    if (userInputEmailId) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setUserInputEmailVerifyError(!emailPattern.test(userInputEmailId));
    } else {
      setUserInputEmailVerifyError(false);
    }
  }, [userInputEmailId]);

  useEffect(() => {
    if (userInputPassword.length > 0) {
      setUserInputPasswordError(false);
    }
  }, [userInputPassword]);
  
  const verifyUserInputForLogin = () =>{
    if (userInputEmailVerifyError) {
      toast.error("Invalid email id", {
        style: {
          color: "#d92525e1",
        },
      });
      return false;
    } else if (userInputEmailId.length === 0) {
      setUserInputEmailVerifyError(true);
      toast.error("Please enter email id", {
        style: {
          color: "#d92525e1",
        },
      });
      return false;
    } else if (userInputPassword.length === 0) {
      setUserInputPasswordError(true);
      toast.error("Please enter password", {
        style: {
          color: "#d92525e1",
        },
      });
      return false;
    }else{
      return true;
    }
  }

  const handelToLoginUser = () => {
     if(verifyUserInputForLogin()){
      toast.success("Login successfully", {
        style: {
          color: "#19b030d0",
        },
      });
    }
  };

  const verifyUserInputForSignUP = () =>{
    if(useFirstNameSignup.length===0 || isUseFirstNameSignupError){
      toast.error("Error in First Name", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsUseFirstNameSignupError(true)
      return false
    }else if(userLastNameSignup.length===0 || isUserLastNameSignupError){
      toast.error("Error in Last Name", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsUserLastNameSignupError(true)
      return false
    }else if(userInputEmailIdSignup.length===0 || isUserInputEmailIdSignupError){
      toast.error("Error in email", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsUserInputEmailIdSignupError(true)
      return false
    }else if(userPasswordSignup.length===0 || isUserPasswordSignupError){
      toast.error("Error in password", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsUserPasswordSignupError(true)
      return false
    }else if(userConformPasswordSignup.length===0 || isUserConformPasswordSignupError){
      toast.error("Error in conform password", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsUserConformPasswordSignupError(true)
      return false
    }else{
      return true
    }
  }

  const handelToSIgnUpUser = ()=>{
    if(verifyUserInputForSignUP()){
      toast.success("SignUp successfully", {
        style: {
          color: "#19b030d0",
        },
      });
    }
  }
  
  return (
    <div className="UserAuth_main">
      <div className="auth-container">
        <div className="form-wrapper">
          {openLoginSection ? (
            <>
              <h2>{isLogin ? "Login" : "Sign Up"}</h2>
              {isLogin ? (
                <div className="UserAuth_main_login_section">
                  <input
                    className="userAuth_input"
                    type="email"
                    placeholder="Email Address"
                    required
                    id={
                      userInputEmailVerifyError ? "userAuth_input_error" : null
                    }
                    onChange={(e) => setUserInputEmailId(e.target.value)}
                    value={userInputEmailId}
                    // id="forgot_password_email_verify_error"
                  />
                  <input
                    className="userAuth_input"
                    type="password"
                    placeholder="Password"
                    required
                    id={userInputPasswordError ? "userAuth_input_error" : null}
                    onChange={(e) => setUserInputPassword(e.target.value)}
                    value={userInputPassword}
                  />

                  <button
                    type="submit"
                    className="btn"
                    onClick={handelToLoginUser}
                  >
                    Login
                  </button>
                </div>
              ) : (
                <div className="UserAuth_main_signup_section">
                  <div className="UserAuth_main_signup_section_input_div">
                    <input
                      className="userAuth_input"
                      type="text"
                      placeholder="First Name"
                      required
                      id={
                        isUseFirstNameSignupError
                          ? "forgot_password_email_verify_error"
                          : null
                      }
                      onChange={(e)=>setUseFirstNameSignup(e.target.value)} 
                      value={useFirstNameSignup}                     
                    />
                    <p className="signup_error_msg_show">{isUseFirstNameSignupError?`${UseFirstNameSignupErrorMsg}`:null}</p>
                  </div>
                  <div className="UserAuth_main_signup_section_input_div">
                    <input
                      className="userAuth_input"
                      type="text"
                      placeholder="Last Name"
                      required
                      id={
                        isUserLastNameSignupError
                          ? "forgot_password_email_verify_error"   
                          : null
                      }
                      onChange={(e)=>setUserLastNameSignup(e.target.value)}
                      value={userLastNameSignup}
                    />
                    <p className="signup_error_msg_show">{isUserLastNameSignupError?`${UserLastNameSignupErrorMsg}`:null}</p>
                  </div>
                  <div className="UserAuth_main_signup_section_input_div">
                    <input
                      className="userAuth_input"
                      type="email"
                      placeholder="Email Address"
                      required
                      id={
                        isUserInputEmailIdSignupError
                          ? "forgot_password_email_verify_error"
                          : null
                      }
                      onChange={(e)=>setUserInputEmailIdSignup(e.target.value)}
                      value={userInputEmailIdSignup}
                      // id="forgot_password_email_verify_error"
                    />
                    <p className="signup_error_msg_show">{isUserInputEmailIdSignupError?`${UserInputEmailIdSignupErrorMsg}`:null}</p>
                  </div>
                  <div className="UserAuth_main_signup_section_input_div">
                    <input
                      className="userAuth_input"
                      type="password"
                      placeholder="Password"
                      required
                      id={
                        isUserPasswordSignupError
                          ? "forgot_password_email_verify_error"
                          : null
                      }
                      onChange={(e)=>setUserPasswordSignup(e.target.value)}
                      value={userPasswordSignup}
                    />
                    <p className="signup_error_msg_show">{isUserPasswordSignupError?`${UserPasswordSignupErrorMsg}`:null}</p>
                  </div>
                  <div className="UserAuth_main_signup_section_input_div">
                    <input
                      className="userAuth_input"
                      type="password"
                      placeholder="Confirm Password"
                      required
                      id={
                        isUserConformPasswordSignupError
                          ? "forgot_password_email_verify_error"
                          : null
                      }
                      onChange={(e)=>setUserConformPasswordSignup(e.target.value)}
                      value={userConformPasswordSignup}
                    />
                    <p className="signup_error_msg_show">{isUserConformPasswordSignupError?`${UserConformPasswordSignupErrorMsg}`:null}</p>
                  </div>

                  <button type="submit" className="btn" onClick={()=>handelToSIgnUpUser()}>
                    Sign Up
                  </button>
                </div>
              )}

              <p className="toggle-text">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <span onClick={toggleForm}>
                  {isLogin ? "Sign Up " : "Login "}
                </span>
                ||
                <span onClick={() => navigate("/auth/forgot-password")}>
                  {" "}
                  ForgotPassword
                </span>
              </p>
              <p id="goto_chose_section">
                <button
                  id="goto_chose_section_btn"
                  onClick={() => setOpenLoginSection(!openLoginSection)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="m14 16-4-4 4-4" />
                  </svg>
                </button>
              </p>
            </>
          ) : (
            <>
              <div className="type_heading">
                <p>Continue With</p>
              </div>
              <div className="userAuthOption">
                <button
                  type="submit"
                  className="continueWithGithubBtn"
                  onClick={loginWithGithub}
                >
                  {/* <img src={githubLogo} alt="" /> */}
                  <img src={githubIcon} alt="" />
                </button>
                <button
                  type="submit"
                  className="continueWithSignUp"
                  onClick={() => setOpenLoginSection(!openLoginSection)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
