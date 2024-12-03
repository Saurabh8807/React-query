import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { addPost, fetchPosts, fetchTags } from "../api/api";

const PostList = () => {
  const [title, setTitle] = useState(""); // Manage form input state
  const queryClient = useQueryClient()
  const { data: postData, isLoading, isError, error } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const {data:tagsData}=useQuery({
    queryKey:["tags"],
    queryFn: fetchTags,
  })
  console.log(tagsData)

  const {mutate,isError:isPostError,isPending,error:postError} = useMutation({
    mutationFn:addPost,
    onSuccess:(data,variable,context)=>{
      queryClient.invalidateQueries({
        queryKey: ["posts"],
        exact:true
      })
    },
    onError:(error,variable,context)=>{},
    onSettled:(data,error,variables,context)=>{}

  })
    // console.log(data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData =  new FormData(e.target)
    formData.append("title", title);
    const title2 = formData.get("title");
    const tags =Array.from(formData.keys()).filter((key)=>formData.get(key)==="on")
    console.log(tags)
    console.log(title2)
    if(!title2 || !tags) return ;
    // const 
    mutate({id:postData.length+1,title:title2,tags});
    // setTitle("");
    e.target.reset()
  };
  return (
    <div className="container mx-auto p-4">
      {isLoading && (
        <p className="text-center text-blue-500 font-semibold">Loading...</p>
      )}

      {isError && (
        <p className="text-center text-red-500 font-semibold">
          Error: {error?.message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2 text-lg font-medium text-gray-700">Post Title</label>
        <input
          type="text"
          placeholder="Enter your post title..."
          className="border border-gray-300 rounded-lg p-2 w-full mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex gap-10 cursor-pointer">
          {tagsData&&tagsData.map((tag) => (
          <div className="" key={tag}>

            <input type="checkbox" name={tag} id={tag} />
            <label htmlFor={tag}>{tag}</label>
          </div>))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          // disabled={isPosting}
        >
          {/* {isPosting ? "Adding Post..." : "Add Post"} */}
            Add post
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {postData?.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">{post.title}</h2>
            <p className="flex flex-wrap gap-2">
              {post?.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-600 px-2 py-1 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
