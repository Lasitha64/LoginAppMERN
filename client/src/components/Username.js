import React, { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import avatar  from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';

export default function Username() {

  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);

  //initial formik
  const formik = useFormik({
    initialValues     : {
      username        : "",
    },
    validate          : usernameValidate,
    validateOnBlur    : false,
    validateOnChange  : false,
    onSubmit          : async values => {
      setUsername(values.username);
      navigate('/password')
    },
  });

  return (
    <div className="container mx-auto">

    {/* toaster for error messages */}
    <Toaster position='top-center' reverseOrder></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-5">
              Explore more by connecting with us.
            </span>
          </div>

          {/* form */}
          <form action="" className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center">
              <input type="text" name="" placeholder='Username' id="" className={styles.textbox} {...formik.getFieldProps('username')} />
              <button type="submit" className={styles.btn}>Let's Go</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Not a member <Link className="text-red-500" to="/register">Register Now</Link></span>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}
