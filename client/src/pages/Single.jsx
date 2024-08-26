import React, { useContext, useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.jpg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu.jsx";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";

function Single() {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  // Fetch post data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts/${postId}`,
          {
            withCredentials: true,
          }
        );
        setPost(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  // Handle delete post
  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <div className="single flex gap-[50px] mt-[20px] justify-between">
      <div className="content flex-[5] gap-[500px]">
        <img
          className="w-[100%] h-[350px] object-cover center"
          src={`${import.meta.env.VITE_CLIENT_URL}/upload/${post?.img}`}
          alt="Post"
        />
        <div className="user flex align-center gap-[10px] text-[14px] mt-[30px] mb-[30px]">
          {post.userImg && (
            <img
              className="w-[50px] h-[50px] rounded-[50%] object-cover"
              src={post.userImg}
              alt="User"
            />
          )}
          <div className="info">
            <span className="font-bold">{post.username || "Unknown User"}</span>
            <p>Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser && currentUser.username === post.username && (
            <div className="edit flex gap-[5px] mt-[20px]">
              <Link to={`/write?edit=${post.id}`} state={post}>
                <img
                  className="w-[20px] h-[20px] cursor-pointer"
                  src={Edit}
                  alt="Edit"
                />
              </Link>
              <img
                className="w-[20px] h-[20px] cursor-pointer"
                onClick={handleDelete}
                src={Delete}
                alt="Delete"
              />
            </div>
          )}
        </div>
        <h1 className="text-[#333] text-[35px] font-bold mb-[30px]">
          {post.title}
        </h1>
        <p>{getText(post.desc)}</p>
      </div>
      <Menu cat={post.cat} />
    </div>
  );
}

export default Single;
