const fetchPosts = async () => {
    const response = await fetch(
      `http://localhost:3000/posts?_sort=-id`
    );
    console.log("hello")
    // console.log(response)
  
    // if (!response.ok) {
    //   throw new Error(`Failed to fetch posts. Status: ${response.status}`);
    // }
  
    const postData = await response.json();
    // console.log(postData)
    return postData;
  };
  
  const fetchTags = async () => {
    const response = await fetch("http://localhost:3000/tags");
    const tagsData = await response.json();
    return tagsData;
  };
  
  const addPost = async (post) => {
    const response = await fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  
    return response.json();
  };
  
  export {fetchPosts, fetchTags, addPost};