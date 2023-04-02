import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import avatar  from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerFormValidate } from '../helper/validate';
import convertToBase64 from '../helper/convert';


export default function Register() {

  const [file, setFile] = useState();

  //initial formik
  const formik = useFormik({
    initialValues     : {
      email           : '123@gmail.com',
      username        : 'example123',
      password        : 'admin@123',
    },
    validate          : registerFormValidate,
    validateOnBlur    : false,
    validateOnChange  : false,
    onSubmit          : async (values) => {
      values = await Object.assign(values, {profile : file || ''})  // add base64 value to values if it is not empty or null
      console.log(values);
    },
  });

  // formik doesnt support file upload so we need to create this handler
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className="container mx-auto">

    {/* toaster for error messages */}
    <Toaster position='top-center' reverseOrder></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-5">
              Happy to join you!
            </span>
          </div>

          {/* form */}
          <form action="" className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
            <label htmlFor="profile">
              <img src={file || avatar} className={styles.profile_img} alt="avatar" />
            </label>
            <input onChange={onUpload} type="file" name="profile" id="profile" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input type="email" name="" placeholder='Email' id="" className={styles.textbox} {...formik.getFieldProps('email')} />
              <input type="username" name="" placeholder='Username' id="" className={styles.textbox} {...formik.getFieldProps('username')} />
              <input type="password" name="" placeholder='Password' id="" className={styles.textbox} {...formik.getFieldProps('password')} />

              <button type="submit" className={styles.btn}>Sign in</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Already Register!<Link className="text-red-500" to="/">Login Now</Link></span>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}


