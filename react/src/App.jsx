import React, { useState, useEffect } from "react";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/post");
      const data = await res.json();
      setPosts(data);
    };
    fetchData();
  }, []);

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });

  const createPost = async () => {
    const res = await fetch("/api/post", {
      method: "post",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(newPost), // Convert the data to a JSON string
    });

    const data = await res.json();

    setPosts((pre) => {
      return [...pre, data];
    });

    setNewPost({
      title: "",
      content: "",
    });
  };

  const deleteHandler = async (title) => {
    const bodyData = { title };
    const res = await fetch("/api/post", {
      method: "delete",
      headers: {
        "Content-Type": "application/json", // Specify the content type as JSON
      },
      body: JSON.stringify(bodyData), // Convert the data to a JSON string
    });

    const data = await res.json();

    setPosts((pre) => {
      return pre.filter((post) => {
        return post.title !== title;
      });
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewPost((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  return (
    <>
      <div>
        <input
          type="text"
          name="title"
          placeholder="title"
          onChange={handleChange}
          value={newPost.title}
        />
        <input
          type="text"
          name="content"
          placeholder="title"
          onChange={handleChange}
          value={newPost.content}
        />

        <button onClick={createPost}>create new post</button>
      </div>
      {posts.map((post, i) => {
        return (
          <div key={i}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <button onClick={() => deleteHandler(post.title)}>delete</button>
          </div>
        );
      })}
    </>
  );
};

export default App;
