import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { getAllBlogs } from "../../Feature/Action/userAction";

const Blog = () => {
  const auth = localStorage.getItem("token");

  const { blogs, loader } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs());
  }, []);

  return (
    <section class="pt-4 pb-36 bg-white overflow-hidden">
      <div class="container px-4 mx-auto">
        <p class="mb-4 text-3xl text-center font-bold font-heading font-heading tracking-px-n leading-tight">
          Latest from Blog
        </p>

        <div class="flex flex-wrap -m-8">
          {/*  */}
          {blogs?.map((blog, index) => (
            <div class="w-full md:w-1/2 p-8" key={index}>
              <div class="flex flex-wrap lg:items-center -m-4">
                <div class="w-auto p-4">
                  <div class="overflow-hidden rounded-xl">
                    <img
                      class="transform hover:scale-105 transition ease-in-out duration-1000"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv85bGgBVHECXS9UL8hhyjzIInP23uFTRzFyo4zeTNYA&s"
                      alt=""
                    />
                  </div>
                </div>
                <div class="flex-1 p-4">
                  <div class="md:max-w-xs">
                    <div class="flex flex-col justify-between h-full">
                      <div class="mb-6">
                        <p class="mb-1.5 text-sm text-gray-500 font-medium uppercase tracking-px">
                          {blog?.title}
                        </p>
                        <a
                          class="inline-block hover:text-gray-800 hover:underline"
                          href="#"
                        >
                          <h3 class="text-xl font-semibold leading-normal">
                            {blog?.shortDesc}
                          </h3>
                        </a>
                      </div>
                      <div class="flex flex-wrap items-center -m-1">
                        <div class="w-auto p-1">
                          <p class="text-sm font-semibold leading-relaxed">
                            - {blog?.createdBy}
                          </p>
                        </div>
                        <p class="text-sm font-semibold leading-relaxed">
                          - {moment(blog?.createdAt).format("MMM Do YY")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!auth && (
        <div className="ml-3 inline-flex rounded-md shadow mt-6">
          <Link
            to="/admin/signin"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
          >
            Login/Register as Admin
          </Link>
        </div>
      )}
    </section>
  );
};

export default Blog;
