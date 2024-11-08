import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config" 

function PostCard({$id,title,featuredImage}){

    // console.log("Featured image:",featuredImage,Date.now())
    // console.log("Title:",title,Date.now())
    // console.log("ID:",$id,Date.now())

    // console.log(appwriteService.getFilePreview({featuredImage}),Date.now())

    return(
        <Link to={`/post/${$id}`}>
            <div className='hover:scale-95 transition-all duration-200 w-full bg-gray-100 rounded-xl p-4'>

                <div className='w-full h-80 object-cover'>
                    <img src={appwriteService.getFilePreview(featuredImage)} alt={title} className="h-80 w-full rounded-xl"/>
                </div>

                <h2 className="text-xl font-bold">
                    {title}
                </h2>

            </div>
        </Link>
    )
}

export default PostCard