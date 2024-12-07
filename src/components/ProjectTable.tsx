"use client";

import React, { useState } from "react";
import { useGetProjectsQuery } from "@/redux/features/projectApiSlice";
import Pagination from "./Pagination";
import Loading from "./Loading";

const ProjectTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [sort, setSort] = useState("projectTitle");

  const { data, isLoading, isError } = useGetProjectsQuery({
    search,
    page,
    limit,
    order,
    sort,
  });

  const projects = data?.data.getProjects.projects || [];
  const meta = data?.data.getProjects.meta || { page: 1, limit: 10, total: 0 };

  const handleSort = (field: string) => {
    setSort(field);
    setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isLoading) return <Loading />;
  if (isError) return <p>Error loading projects.</p>;

  return (
    <section className="bg-gray-50 min-h-screen p-5">
      <div className="mx-auto max-w-screen-xl">
        <div className="bg-white  shadow-lg border border-purple-300 rounded-lg">
          <div className="flex flex-wrap justify-between items-center p-4">
            <form className="flex items-center w-full md:w-1/2 mb-3 md:mb-0">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <input
                type="text"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Title ..."
                className="bg-gray-50 border border-gray-300 text-sm rounded-lg outline-none block w-full p-2.5  placeholder-gray-400 mb-5 "
              />
            </form>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 ">
              <thead className="text-xs text-gray-700 uppercase bg-purple-100 ">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-3 cursor-pointer"
                    onClick={() => handleSort("projectTitle")}
                  >
                    Title Name{" "}
                    {sort === "projectTitle" && (order === "asc" ? "↑" : "↓")}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 cursor-pointer"
                    onClick={() => handleSort("floorNo")}
                  >
                    Floor No.{" "}
                    {sort === "floorNo" && (order === "asc" ? "↑" : "↓")}
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Location
                  </th>
                  <th
                    scope="col"
                    className="px-4 py-3 cursor-pointer"
                    onClick={() => handleSort("projectStatus")}
                  >
                    Status{" "}
                    {sort === "projectStatus" && (order === "asc" ? "↑" : "↓")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project: any) => (
                  <tr
                    key={project._id}
                    className="border-b border-gray-300 hover:border-purple-400 hover:cursor-pointer transition-all duration-300"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap ">
                      {project.projectTitle}
                    </td>
                    <td className="px-4 py-3">
                      {project?.category?.categoryName}
                    </td>
                    <td className="px-4 py-3">{project.floorNo}</td>
                    <td className="px-4 py-3">
                      {project.projectLocation.address}
                    </td>
                    <td className="px-4 py-3">{project.projectStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav className="flex flex-col md:flex-row justify-between items-center p-4">
            <span className="text-sm text-gray-500 ">
              Showing {meta.page} of {Math.ceil(meta.total / meta.limit)} pages
            </span>
            <div className="inline-flex items-center space-x-2">
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(meta.total / meta.limit)}
                onPageChange={handlePageChange}
              />
            </div>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ProjectTable;
