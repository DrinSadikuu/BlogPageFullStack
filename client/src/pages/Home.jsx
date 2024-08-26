import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const cat = useLocation().search;


  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(import.meta.env.VITE_API_URL);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts${cat}`,
          {
            withCredentials: true,
          }
        );
        setPosts(res.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, [cat]);

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="home">
      <div className="posts mt-[50px] flex flex-col gap-[150px]">
        {posts.map((post, index) => (
          <div
            key={post.id}
            className={`post flex gap-[200px] ${
              index % 2 === 0 ? "" : "flex-row-reverse"
            }`}
          >
            <div className="flex-2 w-[700px] relative">
              <img
                src={`${import.meta.env.VITE_CLIENT_URL}/upload/${post.img}`}
                alt={post.title}
                className="w-100% h-[400px] object-cover rounded-[40px] bg-center bg-cover bg-repeat-0"
              />
              <div className="w-[100%] h-[100%] bg-lightGreen absolute top-[25px] left-[-25px] z-[-1] rounded-[30px]"></div>
            </div>
            <div className="container max-w-[400px] max-h-[350px] relative">
              <div className="flex flex-col justify-between max-h-[350px] overflow-hidden max-w-[400px]">
                <Link className="link" to={`/post/${post.id}`}>
                  <h1 className="text-[48px] font-semibold mb-4 break-words">
                    {post.title}
                  </h1>
                </Link>
                <p className="text-gray-700 mb-4 break-words text-[18px]">
                  {getText(post.desc)}
                </p>
                <Link className="link" to={`/post/${post.id}`}>
                  <button className="absolute bottom-[-23%] left-[0] bg-white text-teal-600 p-[15px] border-[1px] rounded-[20px] border-teal-700 hover:border-[1px] transition-all duration-800 ease-in hover:bg-lightGreen">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
