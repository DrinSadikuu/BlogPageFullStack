import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Menu({ cat }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts?cat=${cat}`,
          {
            withCredentials: true,
          }
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <div className="menu">
      <h2>Related Posts</h2>
      {posts.map((post) => (
        <div
          key={post.id}
          className="post border-[1px] mb-[40px] p-[15px]  bg-gray-500 rounded-[20px]"
        >
          <img
            src={`${import.meta.env.VITE_CLIENT_URL}/upload/${post.img}`}
            alt={post.title}
            className="w-[300px] h-[200px] object-cover rounded-[10px] "
          />
          <Link to={`/post/${post.id}`}>
            <h3 className="text-[20px] font-semibold mt-4">{post.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Menu;
