import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";

function Write() {
  const navigate = useNavigate();
  const state = useLocation().state;

  const [title, setTitle] = useState(state?.title || "");
  const [desc, setDesc] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const upload = async () => {
    if (!file) return "";
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload`, // Using VITE_API_URL
        formData
      );
      return res.data;
    } catch (err) {
      console.error("File upload error:", err);
      return "";
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();
    try {
      const postData = {
        title,
        desc,
        cat,
        img: file ? imgUrl : "",
        ...(state
          ? {}
          : { date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss") }),
      };

      if (state) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/posts/${state.id}`, // Using VITE_API_URL
          postData,
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/posts/`, // Using VITE_API_URL
          postData,
          { withCredentials: true }
        );
      }
      navigate("/");
    } catch (err) {
      console.error("Post submission error:", err);
    }
  };

  return (
    <div className="mt-[20px] flex gap-[20px]">
      <div className="content flex-[5] flex flex-col gap-[20px]">
        <input
          type="text"
          value={title}
          placeholder="Title"
          className="p-[10px] border-[1px]"
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="editor h-[300px] overflow-scroll border-[1px]">
          <ReactQuill
            theme="snow"
            value={desc}
            onChange={setDesc}
            className="h-[100%] border-0 break-words max-w-[700px]"
          />
        </div>
      </div>
      <div className="menu flex-[2] flex flex-col gap-[20px]">
        <div className="item border-[1px] p-[10px] flex-[1] flex flex-col justify-between">
          <h1 className="text-[20px]">Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file" className="underline cursor-pointer">
            Upload Image
          </label>
          <div className="buttons flex flex-row justify-between mt-[15px]">
            <button className="bg-lightGreen p-[6px] rounded-[10px]">
              Save as a draft
            </button>
            <button
              className="bg-lightGreen p-[6px] rounded-[10px]"
              onClick={handleClick}
            >
              Publish
            </button>
          </div>
        </div>
        <div className="item border-[1px] p-[10px] flex-[2] flex flex-col justify-between text-[12px]">
          <h1 className="text-[20px]">Category</h1>
          {["art", "science", "technology", "cinema", "design", "food"].map(
            (category) => (
              <div
                key={category}
                className="cat flex text-center gap-[2px] text-teal-500"
              >
                <input
                  type="radio"
                  checked={cat === category}
                  name="cat"
                  value={category}
                  id={category}
                  onChange={(e) => setCat(e.target.value)}
                />
                <label htmlFor={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Write;
