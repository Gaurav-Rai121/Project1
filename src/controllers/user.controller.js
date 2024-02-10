import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../ApiError.js"
import  {User} from "../models/user.models.js"
import {UploadToCloudinary} from "../utils/cloudinary.utils.js"

const registerUser=asyncHandler(async(req,res)=>{
    
      //get user details from user
      //validation check(not empty)
      //check if user is already exist(by email or username);
      //check for images and avtaar(compulsary)
      //upload them(files) to cloudinary
      // create user object-create entry in db
      //clear the password and refresh token from response
      //check if there is a user creation
      //if true return response
      //else return error
   const {username,fullname,passsword,email}=req.body
   console.log("username",username)

   if([username,fullname,passsword,email].some((field)=>field?.trim()===""))
   {
      throw new ApiError(400,"All fields are requird")
   }

   if(!(String(email).includes("@gmail.com")))
   {
       throw new ApiError(400,"Please add @gmail.com in your email");
   }

   const existedUser=User.findOne(
      {
         $or:[{username},{email}]
      }
   )

   if (existedUser) {
      throw new ApiError(409,"User with username or email already exist")
   }


   const avtaarLocalFile=req.files?.avtaar[0]?.path;
   const coverImageLocalFile=req.files?.avtaar[0]?.path;
 
   if(!avtaarLocalFile)
   {
      throw new ApiError(400,"Avtaar file is required");
   }

   const avtaar=await UploadToCloudinary(avtaarLocalFile);
   const coverImage=await UploadToCloudinary(coverImageLocalFile);
   if(!avtaar)
   {
      throw new ApiError(400,"Avtaar file is required");
   }
  
   const userObject=awaitUser.create(
      {
         username:username.toLowerCase(),
         fullname,
         email,
         passsword,
         avtaar:avtaar.url,
         coverImage:coverImage?.url || ""

      })

      const createdUser=await User.findById(userObject._id).select(
         "-password -refreshtoken"
      )
      if(!createdUser)
      {
         throw new ApiError(500,"Something went wrong while registering the user")
      }


})

export {registerUser}