import UserModel from "../model/User.mode.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import env from '../config.js';

// middleware for verify user
// If the user exists, the middleware function will call the next() function to allow the request to continue to the protected route.
// If the user does not exist, it will return a 404 error response with the message "User not found".

// This middleware function can be used in routes that require authentication,
// such as updating a user profile or accessing sensitive user information.
// By checking the existence of the user before allowing access to the route,
// it helps to prevent unauthorized access to protected resources.

export async function verifyUser(req, res, next) {
    try {
        
        const {username} = req.method == "GET" ? req.query : req.body;

        // check user existence
        let exist = await UserModel.findOne({username});
        if (!exist) return res.status(404).send({error: 'User not found'});
        next();


    } catch (error) {
        return res.status(404).send({error:"Authentication error"})
    }
}


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
          

        
        // provide email and username for the async functions
        Promise.all([existEmail(email), existUser(username)])
            .then(() => {
                if (password) {

                    bcrypt.hash(password, 10)   // hash password
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
    
    // get data from request
    const {username, password} = req.body;

    try {
        
        // find record in db
        UserModel.findOne({username})
            .then((user) =>{

                // compare passwords
                bcrypt.compare(password, user.password)
                    .then((passwordCheck) => {
                        if (!passwordCheck) {
                            return res.status(400).send({error:"Don't have password"})
                        }

                        // create json web token
                        const token = jwt.sign({
                            userId : user._id,
                            username : user.username
                        }, env.JWT_SECRET,{expiresIn : '24h'});

                        return res.status(200).send({
                            msg:"Login successful",
                            username: username,
                            token
                        })
                    })
                    .catch((error) =>{
                        console.log(error);
                        return res.status(400).send({error: "Password doesn't match"})
                    })
            })
            .catch((error) => {
                return res.status(500).send({error : "Username not found"});
            })

    } catch (error) {
        return res.status(500).send({error});
    }
}

// GET: http://localhost:8082/api/user/example123
// this was a call back function but change it to a async await using Chat GPT for better use
export async function getUser(req, res) {
    const {username} = req.params;

    try {
        if(!username) return res.status(400).send({error : "Invalid username"});

        const user = await UserModel.findOne({username});
        if(!user) return res.status(404).send({error : "Couldn't find the user"});

        // remove password from the user
        const {password, ...rest}= Object.assign({}, user.toJSON());

        return res.status(200).send(rest);
    } catch (error) {
        return res.status(500).send({error : "Can't find user data"});
    }
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
    try {
        //const id = req.query.id;
        const {userId} = req.user

        if (!userId) {
            return res.status(401).send({error:"User not found" });
        }

        const body = req.body;
        const result = await UserModel.updateOne({_id:userId}, body);

        // If nModified is equal to zero, 
        // it means that no document was modified by the update operation
        if (result.modifiedCount <= 0) {
            return res.status(401).send({error:"Nothing to update" });
        }

        return res.status(200).send({message:"Record updated" });

    } catch (error) {
        console.error(error);
        return res.status(500).send({error });
    }
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