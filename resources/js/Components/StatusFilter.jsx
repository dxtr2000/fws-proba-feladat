import React from "react";
import { useForm } from "@inertiajs/inertia-react";

const StatusFilter = ({ statuses, selectedStatus, onFilterChange }) => {
    const { data, setData } = useForm({
        status: selectedStatus,
    });

    const handleChange = (e) => {
        setData("status", e.target.value);
        onFilterChange(e.target.value);
    };

    return (
        <div className="mb-6">
            <label
                htmlFor="status"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                Státusz
            </label>
            <select
                id="status"
                value={data.status}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
                <option value="">Összes</option>
                {statuses.map((status) => (
                    <option key={status} value={status}>
                        {status}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StatusFilter;
