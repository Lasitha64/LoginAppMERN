import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import avatar  from "../assets/profile.png";
import {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidate } from '../helper/validate';
import convertToBase64 from '../helper/convert';

import styles from "../styles/Username.module.css";
import extend from "../styles/Profile.module.css";


export default function Profile() {

  const [file, setFile] = useState();

  //initial formik
  const formik = useFormik({
    initialValues     : {
      firstName       : 'First Name',
      lastName        : 'Last Name',
      email           : '123@gmail.com',
      username        : 'example123',
      password        : 'admin@123',
    },
    validate          : profileValidate,
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
        <div className={`${styles.glass} ${extend.glass}` }>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-5">
              You can update details
            </span>
          </div>

          {/* form */}
          <form action="" className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
            <label htmlFor="profile">
              <img src={file || avatar} className={`${styles.profile_img} ${extend.profile_img}` } alt="avatar" />
            </label>
            <input onChange={onUpload} type="file" name="profile" id="profile" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name w-3/4 flex gap-10">
                <input type="text" name="" placeholder='first name' id="" className={`${styles.textbox} ${extend.textbox}` } {...formik.getFieldProps('firstName')} />
                <input type="text" name="" placeholder='last name' id="" className={`${styles.textbox} ${extend.textbox}` } {...formik.getFieldProps('lastName')} />
              </div>

              <div className="name w-3/4 flex gap-10">
                <input type="tel" name="" placeholder='Mobile No' id="" className={`${styles.textbox} ${extend.textbox}` } {...formik.getFieldProps('mobile')} />
                <input type="text" name="" placeholder='Email' id="" className={`${styles.textbox} ${extend.textbox}` } {...formik.getFieldProps('email')} />
              </div>

              
                <input type="text" name="" placeholder='Address ' id="" className={`${styles.textbox} ${extend.textbox}` } {...formik.getFieldProps('address')} />
                <button type="submit" className={styles.btn}>Register</button>
              
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>comeback later<Link className="text-red-500" to="/">Login Out</Link></span>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}



