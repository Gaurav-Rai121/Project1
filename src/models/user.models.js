import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const watchHistory=new Schema(
    {
        
           type:mongoose.SchemaTypes.ObjectId,
            ref:"Video"

     
    });
const userSchema= new mongoose.Schema(
    {
      username:{
                 type:String,
                 unique:[true,"Username already exist"],
                 required:[true,"Please enter your username"],
                 lowercase:["true","Please enter your username in lowercase "],
                 trim:true,
                 index:true
               },

        email:{
                type:String,
                unique:[true,"email already exist"],
                lowercase:["true","Please enter your email in lowercase "],
                trim:true,
              },

        fullName:{
                type:String,
                required:[true,"Please enter your full name"],
                trim:true,
                index:true
              },

        avtaar:{
                type:String,
                required:true
              },

        coverImage:{
                type:String,
                required:true
              },

        password:{
                type:String,
                required:[true,"Please enter your password"],
                unique:[true,"Password already exist"],
              },

       refreshtoken:{
                      type:String
                    },

       watchedVideos:[watchHistory],
    },{timestamps:true});

    
//encrypting tyhe password
    userSchema.pre("save",async function(next) {  
                        if(this.isModified("password"))
                        {
                          this.password=bcrypt.hash("this.password",10);
                          next()
                        }
    })

//checking the encrypted password and user typed password is same
userSchema.methods.isPasswordCorrect= async function(){
       return await bcrypt.compare(password,this.password);
}

//creating the access tokens
userSchema.methods.creatingAccesstoken= function() {
    jwt.sign(
      {
        _id:this._id,
        username:this.username,
        email:this.email,
        fullName:this.fullName
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn:ACCESS_TOKEN_EXPIRY
      }
    )
}

userSchema.methods.creatingRefreshtoken= function() {
  jwt.sign(
    {
      _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn:REFRESH_TOKEN_EXPIRY
    }
  )
}



export const User=mongoose.model("User",userSchema);