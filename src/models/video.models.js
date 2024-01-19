import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema= new Schema(
    {
        videoFile:{
                    type:String,
                    required:true
                  },

        thumbnail:{
                    type:String,
                    required:true
                  },

            title:{
                    type:String,
                    required:true
                  },

      description:{
                    type:String,
                    required:true
                  },
                  
         duration:{
                    type:Number,
                    required:true
                  },

           views:{
                    type:number,
                    default:0,
                    required:true
                  },

     ispublished:{
                    type:Boolean,
                    default:true,
                    required:true
                  },

        owner:{
             type:mongoose.SchemaTypes.ObjectId,
             ref:"User",
             required:true
        }
    },{
        timestamps:true
    });

 videoSchema.plugin(mongooseAggregatePaginate);

export const Video= mongoose.model("Video",videoSchema)