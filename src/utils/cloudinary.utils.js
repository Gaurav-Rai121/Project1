import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key:process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});
 const UploadToCloudinary= async(localfilepath)=>{
    try {
        if(!localfilepath) return null;
        const myfilepath =await cloudinary.uploader.upload(localfilepath,
            {resource_type:'auto'})

            console.log("file is uploaded",myfilepath.url);
        return myfilepath
    } catch (error) {
        fs.unlinkSync(myfilepath)
        return null;
    }
 }

 export {UploadToCloudinary}