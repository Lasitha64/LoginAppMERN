import UserModel from "../model/User.mode.js";
import bcrypt from 'bcrypt';

// POST: http://localhost:8082/api/register
// @param :{
//     username
//     password
//     email
//     firstName
//     lastName
//     mobile
//     address
//     profile
// }
export async function register(req, res) {
    try {
        const {username, password, profile, email} = req.body;

        // error occurred : Model.findOne() no longer accepts a callback
        // so changed existUser and existEmail functions to async await

        // check the existing user
        async function existUser(username) {
            try {
              const user = await UserModel.findOne({ username });
              if (user) {
                throw { error: "Please use unique username" };
              }
            } catch (err) {
              throw new Error(err);
            }
          }
          

        // check for existing email
        async function existEmail(email) {
            try {
              const emailFound = await UserModel.findOne({ email });
              if (emailFound) {
                throw { error: "Please use unique username" };
              }
            } catch (err) {
              throw new Error(err);
            }
          }
          

        
        // provide email and username for the functions
        Promise.all([existEmail(email), existUser(username)])
            .then(() => {
                if (password) {

                    bcrypt.hash(password, 10)
                    .then(hashPassword => {

                        const user = new UserModel({
                            username,
                            password: hashPassword,
                            profile: profile || '',
                            email
                        });

                        // save the result
                        user.save()
                            .then((result) => res.status(201).send({msg: 'User saved successfully'}))
                            .catch((err) => res.status(500).send({err})) 

                    }).catch((error) =>{
                        return res.status(500).send({
                            error : "Unable to hashed password"
                        })
                    })
                }
            }).catch((error) =>{
                return res.status(500).send({ error })
            })

    } catch (error) {
        return res.status(500).send(error);
    }
}

// POST: http://localhost:8082/api/login
// @param :{
//     username
//     password
// }
export async function login(req, res) {
    res.json('login route')
}

// GET: http://localhost:8082/api/user/example123
export async function getUser(req, res) {
    res.json('getUser route')
}

// PUT: http://localhost:8082/api/user/updateuse
// @param{
//     "id": "example123"
// }
// "body": {
//     "firstName": "John",
//     "address": "",
//     "profile":""
// }
export async function updateUser(req, res) {
    res.json('updateUser route')
}

// GET: http://localhost:8082/api/generateOTP
export async function generateOTP(req, res) {
    res.json('generateOTP route')
}

// GET: http://localhost:8082/api/verifyOTP
export async function verifyOTP(req, res) {
    res.json('verifyOTP route')
}

//successfully redirect user when OTP is valid
// GET: http://localhost:8082/api/createResetSession
export async function createResetSession(req, res) {
    res.json('createResetSession route')
}

//update the password when we have a valid session
// PUT: http://localhost:8082/api/resetPassword
export async function resetPassword(req, res) {
    res.json('resetPassword route')
}