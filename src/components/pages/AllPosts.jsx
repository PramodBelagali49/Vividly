import React,{useState,useEffect} from "react";
import Container from "../container/Container";
import PostCard from "../PostCard";
import appWriteService from "../../appwrite/config"

export default function AllPosts(){
    const [posts,setPosts]=useState([])

    useEffect(()=>{
        appWriteService.getPosts([])
        .then((posts)=>{
            if(posts){
                // console.log("Featured image:",posts.featuredImage,Date.now())
                // console.log("Title:",posts.title,Date.now())
                // console.log("ID:",posts.$id,Date.now())
                // console.log(posts.documents)
                setPosts(posts.documents)
            }
        })
        .catch((error) => console.log("Failed to get all posts from appwrite", error))
    },[])

    if (posts.length == 0) {
        return (
            <div className='h-[70vh] flex justify-center items-center'>
                <h2 className="text-3xl text-black">Add posts to see them here</h2>
            </div>
        )
    }
    else{
        return(
            <div>
                <Container>
                    <div className="flex flex-wrap justify-between w-full py-8">
                        {posts.map((post)=>(
                            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 ">
                                <PostCard 
                                    $id={post.$id}  // Pass the post ID
                                    title={post.title}  // Pass the title
                                    featuredImage={post.featuredImage}
                                    // post={post}
                                />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
}