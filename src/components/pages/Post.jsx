import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import Container from "../container/Container";
import Button from "../Button";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/all-posts");
            }
        });
    };

    return post ? (
        <div className="min-h-screen w-full py-8"> {/* Ensuring full height for each post */}
            <Container>
                <div className="w-full max-w-3xl mx-auto mb-2"> {/* Set max width to ensure consistent layout */}
                    <div className="relative border rounded-xl p-4 shadow-md bg-gray-200">
                        {/* Image Section */}
                        <div className="h-96 w-100 flex justify-center items-center mb-2">
                            <img
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="max-h-full max-w-full object-cover rounded-xl"
                            />
                        </div>

                        {/* Edit/Delete Buttons */}
                        {(
                            <div className="absolute right-6 top-6">
                                <Link to={`/Editpost/${post.$id}`} className="mr-3">
                                    <Button bgColor="bg-green-500" className="mr-3">
                                        {/* {console.log(post.$id)} */}
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}

                        {/* Title and Content */}
                        <div className="text-center mb-4">
                            <h1 className="text-3xl font-bold">{post.title}</h1>
                        </div>

                        <div className="prose max-w-none"> {/* Styled for consistent content layout */}
                            {parse(post.content)}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}
