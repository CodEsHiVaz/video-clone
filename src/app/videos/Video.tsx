"use client";
import React, { useEffect, useState } from "react";
import { videoApi } from "../../../utils/api/api";
import { VideosArray } from "../../../utils/types/type";
import List from "./List";

const Video = () => {
  const [videos, setVideos] = useState<VideosArray>();
  const [page, setPage] = useState<number>(1);

  const HandlepageChange = (operation: string) => {
    if (page < 6) {
      if (operation == "+") {
        setPage(page + 1);
      } else {
        setPage(page - 1);
      }
    }
  };
  const getVideos = () => {
    videoApi
      .get(`/videos?limit=18&page=${page}`)
      .then((response) => {
        console.log(".then  response:", response.data);
        if (response.data.message == "Success") {
          setVideos(response.data.data.posts);
        }
      })
      .catch((error) => {
        console.log("useEffect  error:", error);
      });
  };

  useEffect(() => {
    getVideos();
  }, [page]);
  return (
    <>
      <div className="flex flex-col relative">
        <div className=" columns-1 sm:columns-2 md:columns-3 ">
          {videos &&
            videos.map((elem, ind) => {
              return <List key={elem.postId} post={elem} />;
            })}
        </div>{" "}
        <div className=" flex h-full  my-2 m-auto">
          <nav aria-label="Page navigation ">
            <ul className="inline-flex -space-x-px text-base h-10">
              <li>
                <button
                  onClick={() => HandlepageChange("-")}
                  disabled={page <= 1}
                  className="flex items-center justify-center px-4 h-10 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
              </li>
              <li
                onClick={() => setPage(1)}
                className={
                  page == 1
                    ? "flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
              >
                1
              </li>
              <li
                onClick={() => setPage(2)}
                className={
                  page == 2
                    ? "flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
              >
                2
              </li>
              <li
                onClick={() => setPage(3)}
                className={
                  page == 3
                    ? "flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
              >
                3
              </li>
              <li
                onClick={() => setPage(4)}
                className={
                  page == 4
                    ? "flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
              >
                4
              </li>
              <li
                onClick={() => setPage(5)}
                className={
                  page == 5
                    ? "flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                    : "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                }
              >
                5
              </li>
              <li>
                <button
                  onClick={() => HandlepageChange("+")}
                  className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  disabled={page > 4}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Video;
