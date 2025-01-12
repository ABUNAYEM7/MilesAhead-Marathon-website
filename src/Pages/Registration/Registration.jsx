import React, { useContext, useState } from "react";
import Info from "../../components/Shared/Info";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Helmet } from "react-helmet";
import Lottie from "lottie-react";
import registerLottie from "../../../public/registerLottie.json"


const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError] = useState('')
  const {signInWithGoogle,registerUser,updateUserProfile} = useContext(AuthContext)
  const navigate = useNavigate()
  const {state} = useLocation()
  const location = state || '/';

  // submitHandler
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    // user-info-for-updateProfile
    const userInfo ={
      displayName :data?.name,
      photoURL : data?.image,
    }

     // Validation rules
     const hasUppercase = /[A-Z]/.test(data.pass);
     const hasLowercase = /[a-z]/.test(data.pass);
     const isValidLength = /.{6,}/.test(data.pass);
 
     if (!hasUppercase) {
       setError("Password must contain at least one uppercase letter.");
       return;
     }
 
     if (!hasLowercase) {
       setError("Password must contain at least one lowercase letter.");
       return;
     }
 
     if (!isValidLength) {
       setError("Password must be at least 6 characters long.");
       return;
     }
 
     setError(""); // Clear errors if validation passes

    // user-registration
    registerUser(data.email,data.pass)
    .then(res=>{
      if(res.user){
        // update-user-profile
        updateUserProfile(userInfo)
        // toast-navigate
        Swal.fire({
          position: "center",
          icon: "success",
          title: "WelCome To MilesAhead",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(location)
      }
    })
    .catch(err=>{
      const errorMEssage = err.message.split('/')[1].split(')')[0]
      setError( errorMEssage||err.message || err.code)
    })
  };

  // googleHandler
  const googleHandler =()=>{
    signInWithGoogle()
    .then(res=>{
      if(res.user){
        Swal.fire({
          position: "center",
          icon: "success",
          title: "WelCome To MilesAhead",
          showConfirmButton: false,
          timer: 1500
        });
        navigate(location)
      }
    })
    .catch(err=>{
      if (process.env.NODE_ENV === 'development') {
        console.log(err)
      }
    })
  }
  return (
    <div>
      <Helmet>
        <title>MilesAhead||Sign Up</title>
      </Helmet>
      {/* info-container */}
      <div>
        <Info
          title={"Join the MilesAhead Community"}
          subtitle={
            "Sign up now to be part of the ultimate marathon experience and push your limits to new heights!"
          }
        />
      </div>
      <div className="flex flex-col md:flex-row-reverse gap-5 my-6 p-4  bg-registerBg bg-no-repeat bg-cover bg-center">
        {/* form-container */}
        <div 
        className="w-full md:w-1/2 p-4 rounded-xl border-2 shadow-xl">
          {/* social-login-container */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-3xl font-semibold text-center">Register With Social</h3>
            <button 
            onClick={googleHandler}
            className="w-[90%] mx-auto btn bg-pinkShade text-white hover:text-pinkShade">Log In With Google</button>
          </div>
          <form className="card-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Username"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                type="url"
                name="image"
                placeholder="Photo URL"
                className="input input-bordered"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control relative">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="pass"
                  placeholder="Password"
                  className="input input-bordered pr-12"
                  required
                />
                <button
                  type="button"
                  className="absolute right-3 top-14 transform -translate-y-1/2 text-sm text-highlight"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEye size={22}/> : <FaEyeSlash className="text-pinkShade" size={22}/>}
                </button>
              {error && 
              <label className="label">
                <p className="text-base font-bold text-red-600">
                  {error}
                </p>
              </label>}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn bg-highlight border-none text-white hover:text-highlight">
                Register
              </button>
            </div>
          </form>
          <div >
            <h3 className="text-base font-semibold text-pinkShade text-center">Already Have An Account ? 

              <span className="text-black underline mx-2"><Link to={'/LogIn'}>
              LogIn
              </Link>
              </span></h3>
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
        <Lottie animationData={registerLottie} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Registration;
