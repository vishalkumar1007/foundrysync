import { useEffect, useState } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isEmailVerifyError, setIsEmailVerifyError] = useState(false);
  const [isOtpSentSuccessfully, setIsOtpSentSuccessfully] = useState(false);
  const [forgotUiState, setForgotUiState] = useState("verifyOtp");
  //   password error msg
  const [isUpdatePasswordErrorInput1, setIsUpdatePasswordErrorInput1] = useState(false);
  const [isUpdatePasswordErrorInput2, setIsUpdatePasswordErrorInput2] = useState(false);
  const [updatePassErrorMsgInput1, setUpdatePassErrorMsgInput1] =
    useState("password not valid");
  const [updatePassErrorMsgInput2, setUpdatePassErrorMsgInput2] =
    useState("password not valid");


  const [userInputEmail, setUserInputEmail] = useState("");
  const [userInputOTP, setUserInputOTP] = useState("");
  const [userInputNewPassword, setUserInputNewPassword] = useState("");
  const [userInputConformPassword, setUserInputConformPassword] = useState("");

  useEffect(() => {
    if (userInputNewPassword) {
      if (userInputNewPassword.length < 4 || userInputNewPassword.length > 20) {
        setUpdatePassErrorMsgInput1(
          "Password character must be more than 4 and less then 20"
        );
        setIsUpdatePasswordErrorInput1(true)
      } else if (
        ["$", "!", "%", "^", "*", "(", ")", "|"].some((operator) =>
          userInputNewPassword.includes(operator)
        )
      ) {
        setUpdatePassErrorMsgInput1(
          'Not allow to use these character $ ! % ^ | ( )'
        );
        setIsUpdatePasswordErrorInput1(true)
      } else if (!/\d/.test(userInputNewPassword)) {
        setUpdatePassErrorMsgInput1("Password must be contain number");
        setIsUpdatePasswordErrorInput1(true)
      } else if (
        !["@", "#", "-", ".", "/"].some((operator) =>
          userInputNewPassword.includes(operator)
        )
      ) {
        setUpdatePassErrorMsgInput1("Password must be contain special character");
        setIsUpdatePasswordErrorInput1(true)
      } else if (!/[A-Z]/.test(userInputNewPassword)) {
        setUpdatePassErrorMsgInput1(
          "Password must contain at least one capital letter"
        );
        setIsUpdatePasswordErrorInput1(true)
      } else {
        setUpdatePassErrorMsgInput1("Seems Like All Set For Update Password");
        setIsUpdatePasswordErrorInput1(false)
      }
    } else if (userInputNewPassword === "") {
        setUpdatePassErrorMsgInput1("");
        setIsUpdatePasswordErrorInput1(false);
    }
  }, [userInputNewPassword]);

  useEffect(() => {
    if (userInputConformPassword) {
      if (
        !(userInputConformPassword.length > 4 || userInputConformPassword.length < 20)
      ) {
        setUpdatePassErrorMsgInput2(
          "Password character must be more than 4 and less then 20"
        );
        setIsUpdatePasswordErrorInput2(true)
      } else if (
        ["$", "!", "%", "^", "*", "(", ")", "|"].some((operator) =>
          userInputConformPassword.includes(operator)
        )
      ) {
        setUpdatePassErrorMsgInput2(
          '"Not allow to use these character $ ! % ^ | ( ) '
        );
        setIsUpdatePasswordErrorInput2(true)
      } else if (!/\d/.test(userInputConformPassword)) {
        setUpdatePassErrorMsgInput2("Password must be contain number");
        setIsUpdatePasswordErrorInput2(true)
      } else if (
        !["@", "#", "-", ".", "/"].some((operator) =>
          userInputConformPassword.includes(operator)
        )
      ) {
        setUpdatePassErrorMsgInput2("Password must be contain special character");
        setIsUpdatePasswordErrorInput2(true)
      } else if (!/[A-Z]/.test(userInputConformPassword)) {
        setUpdatePassErrorMsgInput2(
          "Password must contain at least one capital letter"
        );
        setIsUpdatePasswordErrorInput2(true)
      } else if(userInputNewPassword!==userInputConformPassword){
          setUpdatePassErrorMsgInput2("Password not same");
          setIsUpdatePasswordErrorInput2(true)
      }else {
        setUpdatePassErrorMsgInput2("Seems Like All Set For Update Password");
        setIsUpdatePasswordErrorInput2(false)
      }
    } else if (userInputConformPassword === "") {
        setUpdatePassErrorMsgInput2("");
        setIsUpdatePasswordErrorInput2(false);
    }
  }, [userInputConformPassword, userInputNewPassword]);


  useEffect(() => {
    // console.log(userInputEmail);
    if (userInputEmail) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setIsEmailVerifyError(!emailPattern.test(userInputEmail));
    } else {
      setIsEmailVerifyError(false);
    }
  }, [userInputEmail]);

  const sendOtpToUserEmailId = () => {
    if (userInputEmail.length === 0 || isEmailVerifyError) {
      toast.error("Input email not valid", {
        style: {
          color: "#d92525e1",
        },
      });
      setIsEmailVerifyError(true);
    } else {
      toast.success("check your email", {
        style: {
          color: "#19b030d0",
        },
      });
      setIsOtpSentSuccessfully(true);
    }
  };

  const verifyUserInputOtp = () => {
    if (userInputOTP.length === 0 || userInputOTP.length > 4) {
      toast.error("Incorrect OTP", {
        style: {
          color: "#d92525e1",
        },
      });
    } else {
      toast.success("update your password", {
        style: {
          color: "#19b030d0",
        },
      });
      setForgotUiState("updatePassword");
    }
  };

  const handelToUpdateUserPassword = () => {
    console.log(isUpdatePasswordErrorInput1);
    console.log(isUpdatePasswordErrorInput2);

    if(((userInputNewPassword.length>0||userInputConformPassword.length>0)&& isUpdatePasswordErrorInput1===false && isUpdatePasswordErrorInput2===false && (userInputNewPassword !== userInputConformPassword))){
        toast.error("please satisfied password condition ", {
            style: {
              color: "#d92525e1",
            },
        });
        if(userInputNewPassword.length===0){
            setIsUpdatePasswordErrorInput1(true);
            setUpdatePassErrorMsgInput1('please enter password');
        }else if(userInputConformPassword.length===0){
            setIsUpdatePasswordErrorInput2(true);
            setUpdatePassErrorMsgInput2('please enter conform password');
        }
    }else if(userInputNewPassword.length===0 || userInputConformPassword.length===0){
        toast.error("Please enter new password", {
            style: {
              color: "#d92525e1",
            },
        });
    }else if (isUpdatePasswordErrorInput1===true || isUpdatePasswordErrorInput2===true){
        toast.error("Invalid Password", {
            style: {
              color: "#d92525e1",
            },
        });
    }else{
        toast.success("password update successfully", {
            style: {
              color: "#19b030d0",
            },
        });
        navigate('/')
    }
  };

  return (
    <div className="ForgotPassword_main">
      <div className="ForgotPassword_main_arrange_width">
        {forgotUiState === "verifyOtp" ? (
          <>
            {/* verify email section  */}
            {isOtpSentSuccessfully ? (
              <div className="ForgotPassword_main_verify_email">
                <div className="ForgotPassword_main_verify_email_top">
                  <input
                    // id={
                    //   isEmailVerifyError
                    //     ? "forgot_password_email_verify_error"
                    //     : null
                    // }
                    className="forgot_password_input"
                    type="number"
                    placeholder="Enter OTP"
                    value={userInputOTP}
                    onChange={(e) => setUserInputOTP(e.target.value)}
                    required
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        verifyUserInputOtp(); // Call your OTP verification function
                      }
                    }}
                  />
                  <p className="ForgotPassword_main_email_verify_error">
                    {/* {isEmailVerifyError ? "email is not valid" : null} */}
                  </p>
                </div>
                <div className="ForgotPassword_main_verify_email_bottom">
                  <button
                    type="submit"
                    className="forgot_pass_btn"
                    onClick={() => verifyUserInputOtp()}
                  >
                    Verify OTP
                  </button>
                </div>
                <p id="goto_chose_section">
                  <button
                    id="goto_chose_section_btn"
                    onClick={() => setIsOtpSentSuccessfully(false)}
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
              </div>
            ) : (
              <div className="ForgotPassword_main_verify_email">
                <div className="ForgotPassword_main_verify_email_top">
                  <input
                    id={
                      isEmailVerifyError
                        ? "forgot_password_email_verify_error"
                        : null
                    }
                    className="forgot_password_input"
                    type="email"
                    placeholder="Enter Your Email id"
                    value={userInputEmail}
                    onChange={(e) => setUserInputEmail(e.target.value)}
                    required
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendOtpToUserEmailId();
                      }
                    }}
                  />
                  <p className="ForgotPassword_main_email_verify_error">
                    {isEmailVerifyError ? "email is not valid" : null}
                  </p>
                </div>
                <div className="ForgotPassword_main_verify_email_bottom">
                  <button
                    type="submit"
                    className="forgot_pass_btn"
                    onClick={() => sendOtpToUserEmailId()}
                  >
                    Send OTP
                  </button>
                </div>
                <p id="goto_chose_section">
                  <button
                    id="goto_chose_section_btn"
                    onClick={() => navigate("/auth")}
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
              </div>
            )}
          </>
        ) : (
          <>
            {/* update password  */}
            {
              <div className="ForgotPassword_main_update_password">
                <div className="ForgotPassword_main_update_password_top">
                  <input
                    id={
                      isUpdatePasswordErrorInput1
                        ? "forgot_password_email_verify_error"
                        : null
                    }
                    className="forgot_password_input"
                    type="text"
                    placeholder="New Password"
                    value={userInputNewPassword}
                    required
                    onChange={(e) => setUserInputNewPassword(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handelToUpdateUserPassword();
                      }
                    }}
                  />
                  <p className="ForgotPassword_main_update_pass_error">
                    {isUpdatePasswordErrorInput1 ? `${updatePassErrorMsgInput1}` : null}
                  </p>
                  <input
                    id={
                      isUpdatePasswordErrorInput2
                        ? "forgot_password_email_verify_error"
                        : null
                    }
                    className="forgot_password_input"
                    type="text"
                    placeholder="Conform Password"
                    value={userInputConformPassword}
                    onChange={(e) =>
                      setUserInputConformPassword(e.target.value)
                    }
                    required
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handelToUpdateUserPassword();
                      }
                    }}
                  />
                  <p className="ForgotPassword_main_update_pass_error">
                    {isUpdatePasswordErrorInput2 ? `${updatePassErrorMsgInput2}` : null}
                  </p>
                </div>
                <div className="ForgotPassword_main_update_password_bottom">
                  {/* <button type="submit" className="forgot_pass_btn" onClick={()=>setForgotUiState('verifyOtp')}> */}
                  <button
                    type="submit"
                    className="forgot_pass_btn"
                    onClick={() => handelToUpdateUserPassword()}
                  >
                    Update Password
                  </button>
                </div>
                <button
                  id="goto_chose_section_btn"
                  className="forgot_pass_go_back"
                  onClick={() => setForgotUiState("verifyOtp")}
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
              </div>
            }
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
