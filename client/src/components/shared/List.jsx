import { FaTrash, FaEdit } from "react-icons/fa";
import { GoSearch } from "react-icons/go";
import { useState, useEffect } from "react";
import Pagination from "../Pagination";
import AddButton from "./AddButton";
import EyeButton from "./EyeButton";



const List = ({ data, loading, onEdit, onDelete, listType, onCreate,isLoading }) => {
   
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const pageSize = 8;

    const safeData = Array.isArray(data) ? data : [];

    // Filter the data based on the search query
    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const result = safeData.filter(item =>
            Object.values(item).join(" ").toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredData(result);
        setCurrentPage(1); // Reset to page 1 after filtering
    }, [searchQuery, safeData]);

    // Paginate the filtered data
    const paginatedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );


    const renderRow = (item) => (
        <tr key={item._id} className="hover:bg-gray-100">
            {listType === "speaker" && (
                <>
                    <td className="border px-4 py-2">
                        <img src={item.profilePic} alt={item.fullName} className="w-14 h-14 object-cover rounded-full" />
                    </td>
                    <td className="border px-4 py-2">{item.fullName}</td>
                    <td className="border px-4 py-2">{item.mobile}</td>
                    <td className="border px-4 py-2">{item.email}</td>
                </>
            )}
            {listType === "attendee" && (
                <>
                    <td className="border px-4 py-2">{item.fullName}</td>
                    <td className="border px-4 py-2">{item.mobile}</td>
                    <td className="border px-4 py-2">{item.email}</td>
                </>
            )}
            {listType === "venue" && (
                <>
                    <td className="border px-4 py-2">{item.buildingNumber}</td>
                    <td className="border px-4 py-2">{item.roomNumber}</td>
                    <td className="border px-4 py-2">{item.roomCapacity}</td>
                </>
            )}
            {listType === "event" && (
                <>
                    <td className="border px-4 py-2">{item.title}</td>
                    <td className="border px-4 py-2">{new Date(item?.date).toLocaleDateString()}</td>
                </>
            )}
            <td className="border px-4 py-2 space-x-2">
                {listType === "event" && (
                    <EyeButton id={item._id} isPublic={item.isPublic} />
                )}

                <button
                   disabled={isLoading}
                    onClick={() => onEdit(item)}
                    className="text-white bg-[var(--secondary)] p-2 rounded-md transition"
                >
                    <FaEdit />
                </button>
                <button
                disabled={isLoading}
                    onClick={() => onDelete(item._id)}
                    className={`text-white ${isLoading ? 'bg-red-300' :'bg-red-500 hover:bg-red-600'} p-2 rounded-md transition`}
                >
                    <FaTrash />
                </button>
                {listType === "event" && item.isPublic && (
                    <a href={`/publish/event/${item._id}`} target="_blank" className="underline tex-sm text-green-600">View</a>
                )}
            </td>
        </tr>
    );

    return (
        <>
            <div className="flex items-center justify-between w-full gap-3">
                {/* Search Input */}
                <div className="border border-orange-500 p-2 w-full rounded-md flex items-center my-5 max-w-md">
                    <input
                        type="text"
                        placeholder={`Search ${listType}`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full outline-none bg-transparent pr-1"
                    />
                    <GoSearch size={20} className="text-gray-800"/>
                </div>
                <AddButton text={`Add ${listType}`} onBtnClick={onCreate} />
            </div>

            <table className="table-auto text-left  w-full border-collapse border border-gray-200">
                <thead className="bg-gray-200">
                    <tr>
                        {listType === "speaker" && (
                            <>
                                <th className="border px-4 py-2">Profile</th>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Mobile</th>
                                <th className="border px-4 py-2">Email</th>
                            </>
                        )}
                        {listType === "attendee" && (
                            <>
                                <th className="border px-4 py-2">Name</th>
                                <th className="border px-4 py-2">Mobile</th>
                                <th className="border px-4 py-2">Email</th>
                            </>
                        )}
                        {listType === "venue" && (
                            <>
                                <th className="border px-4 py-2">Building Number</th>
                                <th className="border px-4 py-2">Room Number</th>
                                <th className="border px-4 py-2">Room Capacity</th>
                            </>
                        )}
                        {listType === "event" && (
                            <>
                                <th className="border px-4 py-2">Title</th>
                                <th className="border px-4 py-2">Date</th>
                            </>
                        )}
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                                Loading...
                            </td>
                        </tr>
                    ) : filteredData.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4">
                                No {listType} found.
                            </td>
                        </tr>
                    ) : (
                        paginatedData.map(renderRow)
                    )}
                </tbody>
            </table>

            {/* Pagination Component */}
            {filteredData.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalCount={filteredData.length}
                    pageSize={pageSize}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            )}
        </>
    );
};

export default List;
