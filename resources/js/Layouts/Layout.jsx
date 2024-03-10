import React from "react";
import { Link } from "@inertiajs/inertia-react";

export default function Layout({ children }) {
    return (
        <div className="min-h-screen bg-gray-200">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                    <div className="relative flex items-center justify-between h-16">
                        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="hidden sm:block sm:ml-6">
                                <div className="flex space-x-4">
                                    <Link
                                        href="/projects"
                                        className="text-gray-500 hover:text-gray-900"
                                    >
                                        Projektek
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main>{children}</main>
        </div>
    );
}
