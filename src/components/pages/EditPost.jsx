import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appwriteService from "../../appwrite/config";
import Button from "../Button";

function EditPost() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((data) => {
                if (data) {
                    setPost(data);
                } else {
                    navigate("/");
                }
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const handleChange = (e) => {
        setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updated = await appwriteService.updatePost(post.$id, {
            title: post.title,
            content: post.content,
        });
        if (updated) navigate(`/post/${post.$id}`);
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-2xl p-6 bg-gray-100 shadow-md rounded-xl"
            >
                <h2 className="text-2xl font-bold mb-4">Edit Post</h2>

                {/* Title Input */}
                <label className="block mb-2 font-medium">Title:</label>
                <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md mb-4"
                />

                {/* Content Input */}
                <label className="block mb-2 font-medium">Content:</label>
                <textarea
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    rows="6"
                    className="w-full p-2 border rounded-md"
                />

                {/* Save Changes Button */}
                <div className="mt-4">
                    <Button bgColor="bg-blue-500" type="submit">
                        Save Changes
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditPost;
