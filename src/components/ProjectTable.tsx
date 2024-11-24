"use client";

import React, { useState } from "react";
import { useGetProjectsQuery } from "@/redux/features/projectApiSlice";

const ProjectTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [sort, setSort] = useState("");

  const { data, isLoading, isError } = useGetProjectsQuery({
    search,
    page,
    limit,
    order,
    sort,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading projects.</p>;

  const projects = data?.data.getProjects.projects || [];
  const meta = data?.data.getProjects.meta || {};

  console.log(projects, meta);

  return (
    <div className="container text-black mx-auto px-4">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 mb-4"
      />
      <table className="min-w-full bg-white border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border p-2">Title</th>
            <th className="border p-2">Floor No</th>
            <th className="border p-2">Bedrooms</th>
            <th className="border p-2">Bathrooms</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project: any) => (
            <tr key={project._id}>
              <td className="border p-2">{project.projectTitle} </td>
              <td className="border p-2"> {project.floorNo}</td>
              <td className="border p-2">{project.bedroomNo} </td>
              <td className="border p-2"> {project.bathroomNo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between  mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="px-4 py-2 border"
        >
          Previous
        </button>
        <p>
          Page {meta.page} of {meta.totalPage}
        </p>
        <button
          disabled={page === meta.totalPage}
          onClick={() => setPage((prev) => prev + 1)}
          className="px-4 py-2 border"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProjectTable;
