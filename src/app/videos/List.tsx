import { Videos } from "../../../utils/types/type";
import { randomInt } from "../../../utils/utils";
import { useState, useRef } from "react";

type props = {
  post: Videos;
};
const List = ({ post }: props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [likes, setLikes] = useState<{ [postId: number]: number }>({});

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused || videoRef.current.ended) {
        videoRef.current.play().then(() => {
          setIsPlaying(true);
        });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };
  const handlelikeCount = () => {};
  const handleLike = (postId: any) => {
    // Increment like count in local storage.
    const currentLikes = likes[postId] || 0;
    const newLikes = currentLikes + 1;
    localStorage.setItem(`like_${postId}`, newLikes.toString());

    // Update the likes state to reflect the new like count.
    setLikes((prevLikes) => ({
      ...prevLikes,
      [postId]: newLikes,
    }));
  };
  return (
    <>
      <div className="max-w-sm  rounded-lg overflow-hidden shadow-lg mb-4 flex flex-col  gap-3">
        <div
          className="w-full cursor-pointer "
          style={{
            maxHeight: "550px ",
            height: " 550px",
            objectFit: "cover",
          }}
          onClick={handleVideoClick}
        >
          <img
            className="w-full cursor-pointer"
            style={{ display: !isPlaying ? "block" : "none" }}
            src={post.submission.thumbnail}
            alt="Sunset in the mountains"
          ></img>
          <video
            ref={videoRef}
            id="videoPlayer"
            src={post.submission.mediaUrl}
            controls={false}
            style={{ display: isPlaying ? "block" : "none" }}
          />
        </div>
        <div className="h-40  dark:bg-gray-800 dark:divide-gray-600">
          <div className="px-6 py-4  m relative">
            <div className="flex content-center justify-center items-center h-12 w-12 rounded-full absolute colourFullBorder  -top-6  right-3">
              <img
                className=" h-11 w-11 rounded-full m-auto"
                height={"100%"}
                width={"100%"}
                src={post.creator.pic}
                alt={post.creator.name}
              />
            </div>
            <span className="text-sm text-gray-500  dark:text-gray-400  text">
              {post.creator.name}
            </span>{" "}
            <span
              className={
                randomInt(1, 2) == 1 ? "text-red-600" : "text-green-600"
              }
            >
              ●
            </span>
            <div className="font-bold text-xl text-gray-900 rounded-lg dark:text-white   mb-2 cursor-pointer">
              {post.submission.title}
            </div>
            <p className="text-gray-500  dark:text-gray-400  text-base overflow-hidden text-ellipsis whitespace-nowrap">
              {post.submission.description}
            </p>
          </div>
          <div className="px-6 pt-1 pb-2 flex justify-between">
            <span className="bg-gray-100 cursor-pointer text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
              <svg
                className="w-2.5 h-2.5 mr-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              {randomInt(1, 9)} days ago
            </span>
            <div className="flex gap-2">
              <span
                onClick={() => handleLike(post.postId)}
                className="bg-gray-100 cursor-pointer text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500"
              >
                <i className="fa-solid fa-heart pr-2"></i> &#32;{" "}
                {localStorage.getItem(`like_${post.postId}`)} </span>

              <span className="bg-gray-100 cursor-pointer text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full mr-2 dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                <i className="fa-solid fa-comment pr-2"></i> &#32;{" "}
                {post.comment.count}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
