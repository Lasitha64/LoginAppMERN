import React from 'react';
import {Link} from 'react-router-dom';
import avatar  from "../assets/profile.png";
import styles from "../styles/Username.module.css";
import {Toaster} from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/validate';
import {userAuthStore} from '../store/store'
import useFetch from '../hooks/fetch.hook';

export default function Password() {


  const username = userAuthStore(state => state.auth);
  const [{isLoading, apiData, serverError}] = useFetch(`/users/${username}`)

  //initial formik
  const formik = useFormik({
    initialValues     : {
      password        : "",
    },
    validate          : passwordValidate,
    validateOnBlur    : false,
    validateOnChange  : false,
    onSubmit          : async (values) => {
      console.log(values);
    },
  });

  if(isLoading) return <h1 className='text-2xl font-bold'>Loading...</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1> 

  return (
    <div className="container mx-auto">

    {/* toaster for error messages */}
    <Toaster position='top-center' reverseOrder></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello {apiData?.firstName || apiData?.username}!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-5">
              Explore more by connecting with us.
            </span>
          </div>

          {/* form */}
          <form action="" className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={apiData?.profile || avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center">
              <input type="password" name="" placeholder='Password' id="" className={styles.textbox} {...formik.getFieldProps('password')} />
              <button type="submit" className={styles.btn}>Sign in</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Forgot Password<Link className="text-red-500" to="/recovery">Recover Now</Link></span>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}

