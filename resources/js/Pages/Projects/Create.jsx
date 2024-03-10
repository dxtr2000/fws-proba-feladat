import React, { useState } from "react";
import Layout from "@/Layouts/Layout";
import { InertiaLink, usePage } from "@inertiajs/inertia-react";
import { router } from "@inertiajs/react";
import { Inertia } from "@inertiajs/inertia";

export default function Create() {
    const { errors } = usePage().props;
    const [contacts, setContacts] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post(route("projects.store"), {
            name: e.target.project_name.value,
            description: e.target.description.value,
            status: e.target.status.value,
            contacts: contacts,
        });
        console.log(contacts);
    };

    const handleAddContact = () => {
        setContacts([...contacts, { name: "", email: "" }]);
    };

    const handleRemoveContact = (index) => {
        const newContacts = [...contacts];
        newContacts.splice(index, 1);
        setContacts(newContacts);
    };

    const handleContactChange = (e, index) => {
        const { name, value } = e.target;
        const newContacts = [...contacts];
        newContacts[index][name] = value;
        setContacts(newContacts);
    };

    const handleNameChange = (e, index) => {
        const { value } = e.target;
        const newContacts = [...contacts];
        newContacts[index].name = value;
        setContacts(newContacts);
    };

    const handleEmailChange = (e, index) => {
        const { value } = e.target;
        const newContacts = [...contacts];
        newContacts[index].email = value;
        setContacts(newContacts);
    };

    return (
        <Layout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <h2 className="text-2xl font-semibold leading-tight mb-6">
                                Új projekt
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="w-full mb-3">
                                    <label className="">
                                        <span className="">Név</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="project_name"
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.name}
                                        </p>
                                    )}
                                </div>
                                <div className="w-full mb-3">
                                    <label className="">
                                        <span className="">
                                            Leírás
                                        </span>
                                    </label>
                                    <textarea
                                        name="description"
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>
                                <div className="w-full mb-3">
                                    <label className="">
                                        <span className="">
                                            Státusz
                                        </span>
                                    </label>
                                    <select
                                        name="status"
                                        className="w-full border border-gray-300 p-2 rounded-md"
                                    >
                                        <option value="Fejlesztésre vár">
                                            Fejlesztésre vár
                                        </option>
                                        <option value="Folyamatban">
                                            Folyamatban
                                        </option>
                                        <option value="Kész">Kész</option>
                                    </select>
                                    {errors.status && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.status}
                                        </p>
                                    )}
                                </div>
                                <div className="w-full">
                                    <label className="">
                                        <span className="">
                                            Kapcsolattartók
                                        </span>
                                    </label>
                                    {contacts.map((contact, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center mb-4"
                                        >
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Név"
                                                className="w-full mr-4 border border-gray-300 p-2 rounded-md"
                                                value={contact.name}
                                                onChange={(e) =>
                                                    handleNameChange(e, index)
                                                }
                                            />
                                            <input
                                                type="text"
                                                name="email"
                                                placeholder="E-mail"
                                                className="w-full border border-gray-300 p-2 rounded-md"
                                                value={contact.email}
                                                onChange={(e) =>
                                                    handleEmailChange(e, index)
                                                }
                                            />
                                            {index !== 0 && (
                                                <button
                                                    className="btn-error btn-sm ml-4"
                                                    onClick={() =>
                                                        handleRemoveContact(
                                                            index
                                                        )
                                                    }
                                                >
                                                    Törlés
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                    <button
                                        className="mt-4 bg-blue-600 px-2 py-2 hover:bg-blue-700 text-white rounded-md"
                                        onClick={handleAddContact}
                                        type="button"
                                    >
                                        Új kapcsolattartó
                                    </button>
                                </div>
                                <div className="mt-6 flex justify-center">
                                    <button
                                        className="bg-green-600 px-4 py-2 hover:bg-green-700 text-white rounded-md"
                                        type="submit"
                                    >
                                        Létrehozás
                                    </button>
                                    <InertiaLink
                                        href={route("projects.index")}
                                        className="bg-red-600 px-4 py-2.5 hover:bg-red-700 text-white rounded-md ml-4"
                                    >
                                        Mégsem
                                    </InertiaLink>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
