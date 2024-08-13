import React, { useEffect, useState } from "react";
import axios from "axios";
import { ImSpinner9 } from "react-icons/im";
import { MdDelete, MdOutlineEdit } from "react-icons/md";
import { message } from "antd";

function AllBlog({ onEdit }) {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllBlog = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/api/blog/blogs`);
        if (data) {
          setIsLoading(false);
          setBlogs(data);
        }
      } catch (error) {
        if (error.response) {
          setIsLoading(false);
          console.error("Error Response:", error.response.data);
        }
      }
    };

    getAllBlog();
  }, []);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`/api/blog/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      message.success("blog deleted successfully");
    } catch (error) {
      if (error.response) {
        console.error("Error Deleting Blog:", error.response.data);
      }
    }
  };

  const editHandler = (id) => {
    onEdit("addBlog", id);
  };

  return (
    <>
      {isLoading ? (
        <div className="w-full flex justify-center items-center h-[80vh]">
          <ImSpinner9 className="text-4xl animate-spin" />
        </div>
      ) : (
        <>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h1 className="mb-4 text-2xl font-semibold">All Blogs</h1>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b-2 border-gray-200 text-start">
                      Cover Image
                    </th>
                    <th className="px-4 py-2 border-b-2 border-gray-200 text-start">
                      Title
                    </th>
                    <th className="px-4 py-2 border-b-2 border-gray-200 text-start">
                      Content
                    </th>

                    <th className="px-4 py-2 border-b-2 border-gray-200 text-start">
                      Created At
                    </th>

                    <th className="px-4 py-2 border-b-2 border-gray-200 text-start">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentBlogs.map((blog) => (
                    <tr key={blog._id}>
                      <td className="px-4 py-2 border-b border-gray-200">
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                          className="rounded-full"
                        />
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200">
                        {blog.title}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200">
                        {blog.content.length > 50
                          ? `${blog.content.substring(0, 50)}...`
                          : blog.content}
                      </td>

                      <td className="px-4 py-2 border-b border-gray-200">
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-2 border-b border-gray-200">
                        <div className="flex items-center gap-3 text-xl">
                          <MdOutlineEdit
                            onClick={(e) => editHandler(blog._id)}
                          />
                          <MdDelete onClick={(e) => deleteHandler(blog._id)} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <ul className="flex">
                {Array.from(
                  { length: Math.ceil(blogs.length / blogsPerPage) },
                  (_, i) => (
                    <li key={i}>
                      <button
                        onClick={() => paginate(i + 1)}
                        className={`px-4 py-2 border ${
                          currentPage === i + 1
                            ? "bg-purple-600 text-white"
                            : "bg-white text-purple-600"
                        }`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default AllBlog;
