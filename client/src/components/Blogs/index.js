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
    <section className="pt-4 pb-36 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <p className="mb-4 text-3xl text-center font-bold font-heading font-heading tracking-px-n leading-tight">
          Latest from Blog
        </p>

        <div className="flex flex-wrap -m-8">
          {/*  */}
          {blogs?.map((blog, index) => (
            <div className="w-full md:w-1/2 p-8" key={index}>
              <div className="flex flex-wrap lg:items-center -m-4">
                <div className="w-auto p-4">
                  <div className="overflow-hidden rounded-xl">
                    <img
                      className="transform hover:scale-105 transition ease-in-out duration-1000 h-40 w-full object-contain cursor-pointer"
                      src={`${axios.defaults.baseURL}/blog/${blog.picture}`}
                      alt={blog.title}
                    />
                  </div>
                </div>
                <div className="flex-1 p-4">
                  <div className="md:max-w-xs">
                    <div className="flex flex-col justify-between h-full">
                      <div className="mb-6">
                        <p className="mb-1.5 text-sm text-gray-500 font-medium uppercase tracking-px">
                          {blog?.title}
                        </p>
                        <a
                          className="inline-block hover:text-gray-800 hover:underline"
                          href="#"
                        >
                          <h3 className="text-xl font-semibold leading-normal">
                            {blog?.shortDesc}
                          </h3>
                        </a>
                      </div>
                      <div className="flex flex-wrap items-center -m-1">
                        <div className="w-auto p-1">
                          <p className="text-sm font-semibold leading-relaxed">
                            - {blog?.createdBy}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm font-bold leading-relaxed">
                        {moment(blog?.createdAt).format("MMM Do YY")}
                      </p>
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
