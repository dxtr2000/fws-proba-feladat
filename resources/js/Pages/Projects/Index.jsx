import React, { useState } from "react";
import Layout from "@/Layouts/Layout";
import StatusFilter from "@/Components/StatusFilter";
import { Link } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { BiSolidTrashAlt, BiSolidPencil } from "react-icons/bi";

export default function Index({ projects, statuses }) {
    const [selectedStatus, setSelectedStatus] = useState(null);

    const handleFilterChange = (status) => {
        setSelectedStatus(status);
        if (status) {
            Inertia.get(
                route("projects.index"),
                { status },
                { preserveState: true }
            );
        } else {
            Inertia.get(route("projects.index"), { preserveState: true });
        }
    };

    return (
        <Layout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-semibold leading-tight">
                                    Projektek
                                </h2>
                                <div className="flex items-center">
                                    <StatusFilter
                                        statuses={statuses}
                                        selectedStatus={selectedStatus}
                                        onFilterChange={handleFilterChange}
                                    />
                                    <Link
                                        href={route("projects.create")}
                                        className="bg-blue-500 px-4 py-2 text-white rounded hover:bg-blue-600 ml-4"
                                    >
                                        Új projekt
                                    </Link>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-center">
                                    <thead>
                                        <tr>
                                            <th>Név</th>
                                            <th>Státusz</th>
                                            <th>Kapcsolattartók</th>
                                            <th>Művelet</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.data.map((project) => (
                                            <tr key={project.id}>
                                                <td>{project.name}</td>
                                                <td>{project.status}</td>
                                                <td>
                                                    {project.contacts.length}
                                                </td>
                                                <td className="flex justify-center">
                                                    <button className="bg-blue-600 px-2 py-2 hover:bg-blue-700">
                                                        <Link
                                                            href={route(
                                                                "projects.edit",
                                                                project.id
                                                            )}
                                                        >
                                                            <BiSolidPencil color="white" />
                                                        </Link>
                                                    </button>
                                                    <form
                                                        onSubmit={(e) => {
                                                            e.preventDefault();
                                                            if (
                                                                confirm(
                                                                    "Biztosan törölni szeretnéd?"
                                                                )
                                                            ) {
                                                                Inertia.delete(
                                                                    route(
                                                                        "projects.destroy",
                                                                        project.id
                                                                    )
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <button
                                                            className="bg-red-600 px-2 py-2 hover:bg-red-700"
                                                            type="submit"
                                                        >
                                                            <BiSolidTrashAlt color="white" />
                                                        </button>
                                                    </form>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="mt-4 flex justify-center space-x-2">
                                {projects.links.map((link, key) => (
                                    <Link
                                        key={key}
                                        href={link.url}
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        {link.label
                                            .replace("&laquo;", "«")
                                            .replace("&raquo;", "»")}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
