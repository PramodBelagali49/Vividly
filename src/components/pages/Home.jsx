import React, { useEffect, useState } from 'react'
import appwriteService from "../../appwrite/config"
import Container from '../container/Container'
import PostCard from '../PostCard'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'

import backgroundImage from "./blog_bg_image.jpg"


function Home() {
    const [posts,setPosts]=useState([])
    const navigate=useNavigate()

    useEffect(()=>{
        appwriteService.getPosts([])
        .then((posts)=>{
            if(posts){
                setPosts(posts.documents)
            }
        })
    },[])

    if(posts.length===0){
        return(
            <div
                className="h-screen bg-cover bg-center"
                style={{ backgroundImage: `url(${backgroundImage})` }} 
                >
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">

                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login/Signup to read posts
                            </h1>

                            {/* <Button
                                className="text-xl font-bold bg-blue-700 rounded-md mt-4 mb-3 text-white"
                                onClick={()=> navigate("/signup") }
                            >
                                Sign Up
                            </Button>

                            <br />

                            <Button
                                className="text-xl font-bold bg-blue-700 rounded-md mt-3 mb-5 text-white"
                                onClick={()=> navigate("/login") }
                            >
                                Login
                            </Button>    */}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }else{
        return (
            <div
                className='w-full py-8 h-screen bg-cover bg-center'
                style={{ backgroundImage: `url(${backgroundImage})` }} 
                >
                <Container>
                    <div className='flex flex-wrap'>

                            <h1 className="text-3xl font-bold hover:text-gray-500 text-green-800 pl-10 mb-2">
                                Welcome to yourBlog App
                            </h1>


                        {
                            posts.map((post)=>{
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard {...post} />                            
                                </div>
                            })
                        }
                    </div>
                </Container>
        
            </div>
          )
    }
}

export default Home