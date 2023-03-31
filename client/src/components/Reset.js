import React from 'react';
import {Link} from 'react-router-dom';
import avatar  from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { resetPasswordValidate } from '../helper/validate';

export default function Password() {

  //initial formik
  const formik = useFormik({
    initialValues       : {
      password          : "",
      confirm_password  : "",
    },
    validate            : resetPasswordValidate,
    validateOnBlur      : false,
    validateOnChange    : false,
    onSubmit            : async (values) => {
      console.log(values);
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
              Enter new password
            </span>
          </div>

          {/* form */}
          <form action="" className="py-20" onSubmit={formik.handleSubmit}>

            <div className="textbox flex flex-col items-center">
              <input type="password" name="" placeholder='New Password' id="" className={styles.textbox} {...formik.getFieldProps('password')} />
              <input type="password" name="" placeholder='Retype Password' id="" className={styles.textbox} {...formik.getFieldProps('confirm_password')} />
              <button type="submit" className={styles.btn}>Reset</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

