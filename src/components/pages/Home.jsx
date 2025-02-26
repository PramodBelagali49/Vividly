import React, { useEffect, useState } from 'react';
import appwriteService from "../../appwrite/config";
import Container from '../container/Container';
import PostCard from '../PostCard';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

function Home() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        appwriteService.getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
    }, []);

    const navigateTo = (path) => {
        navigate(path);
    };

    if (posts.length === 0) {
        return (
            <div className="h-screen grid items-center justify-center text-center bg-gradient-to-br from-blue-500 to-purple-600">
                <Container>
                    <div className="bg-white p-10 rounded-lg shadow-xl max-w-lg">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Login/Signup to read posts</h1>
                        <div className="flex justify-center space-x-4">
                            <Button
                                className="text-xl font-bold bg-blue-700 hover:bg-blue-600 rounded-md px-6 py-2 text-white transition duration-300"
                                onClick={() => navigateTo("/signup")}
                            >
                                Sign Up
                            </Button>
                            <Button
                                className="text-xl font-bold bg-green-700 hover:bg-green-600 rounded-md px-6 py-2 text-white transition duration-300"
                                onClick={() => navigateTo("/login")}
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </Container>
            </div>
        );
    } else {
        return (
            <div className="w-full py-12 min-h-screen bg-gray-100 flex flex-col items-center">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-8 shadow-md py-3 px-6 bg-white rounded-lg">
                    Welcome to yourBlog App
                </h1>
                <Container>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {posts.map((post) => (
                            <div key={post.$id} className="p-4 bg-white rounded-lg shadow-lg hover:shadow-2xl transition duration-300">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        );
    }
}

export default Home;
