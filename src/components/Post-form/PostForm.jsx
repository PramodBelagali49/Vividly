import React, { useEffect } from "react";
import { useCallback } from "react";
import { set, useForm } from "react-hook-form";
import {Button,Select,Input,RTE} from "../index"
import appwriteService from "../../appwrite/config"
import { useNavigate,useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({post}){

    const {register,handleSubmit,setValue,getValues,watch,control}=useForm({
        defaultValues:{
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    });


    // changed to below code as there was an error related to 'slug' 

    // const {register, handleSubmit, watch, setValue, control, getValues} = useForm()

    // const params = useParams()
    // useEffect(() => {
    //     if (post) {
    //         setValue('title', post?.title || '');
    //         setValue('slug', post?.slug || params.slug || '');
    //         setValue('content', post?.content || '');
    //         setValue('status', post?.status || 'active');
    //     }
    // }, [post, setValue, params])



    const userData=useSelector((state)=>(state.auth.userData));
    const navigate=useNavigate();


    const submit = async(data) => {
        if(post){
            // changed image -> featuredImage
            const file=data.featuredImage[0] ? await appwriteService.uploadFile(data.featuredImage[0]) : null 

            if(file){
                // added await below
                await appwriteService.deleteFile(post.featuredImage);
            }

            const renewPost=await appwriteService.updatePost(post.$id,{
                ...data,
                featuredImage: file ? file.$id : undefined 
            })

            if(renewPost){
                navigate(`/post/${renewPost.$id}`)
            }
        }else{
            const file=data.featuredImage[0] ? await appwriteService.uploadFile(data.featuredImage[0]) : null

            if(file){
                const fileId=file.$id;
                data.featuredImage=fileId;

                const newPost=await appwriteService.createPost({
                    ...data,
                    userId:userData.userData.$id
                    // userId:useId(),
                })

                if(newPost){
                    navigate(`/post/${newPost.$id}`)
                }
            }
        }
    }

    const slugTransform=useCallback((value)=>{
        if(value && typeof value === "string"){
            // const newSlug=value.toLowerCase().replace(/ /g,'-')
            // setValue("slug",newSlug)
            // return newSlug

            return value
            .trim()
            .toLowerCase()
            // .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
        }

        return ""

    },[]);

    useEffect(()=>{
        const subscription=watch((value,{name})=>{
            if(name==="title"){
                setValue("slug",slugTransform(value.title),{shouldValidate:true})
            }
        })

        return ()=> {
            subscription.unsubscribe()
        }

    },[watch,slugTransform,setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }}
                />
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("featuredImage", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}