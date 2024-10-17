import { FaTrash, FaEdit, FaEye } from "react-icons/fa"
import { useNavigate } from "react-router-dom";

const ListBody = ({ data, loading, onEdit, onDelete, listType }) => {

    const navigate = useNavigate()
    const safeData = Array.isArray(data) ? data : [];

    if (loading) {
        return (
            <tbody>
                <tr>
                    <td colSpan="4" className="text-center py-4">
                        Loading...
                    </td>
                </tr>
            </tbody>
        );
    }

    if (safeData.length === 0) { // Check the length of safeData
        return (
            <tbody>
                <tr>
                    <td colSpan="4" className="text-center py-4">
                        No {listType} found.
                    </td>
                </tr>
            </tbody>
        );
    }

    const renderRow = (item) => (
        <tr key={item._id} className="hover:bg-gray-100">
            {listType === "speakers" && (
                <>
                    <td className="border px-4 py-2">
                        <img src={item.profilePic} alt={item.fullName} className="w-14 h-14 object-cover rounded-full" />
                    </td>
                    <td className="border px-4 py-2">{item.fullName}</td>
                    <td className="border px-4 py-2">{item.mobile}</td>
                    <td className="border px-4 py-2">{item.email}</td>
                </>
            )}
            {listType === "attendees" && (
                <>
                    <td className="border px-4 py-2">{item.fullName}</td>
                    <td className="border px-4 py-2">{item.mobile}</td>
                    <td className="border px-4 py-2">{item.email}</td>
                </>
            )}
            {listType === "venues" && (
                <>
                    <td className="border px-4 py-2">{item.buildingNumber}</td>
                    <td className="border px-4 py-2">{item.roomNumber}</td>
                    <td className="border px-4 py-2">{item.roomCapacity}</td>
                </>
            )}
            {listType === "events" && (
                <>
                    <td className="border px-4 py-2">{item.title}</td>
                    <td className="border px-4 py-2">{new Date(item?.date).toLocaleDateString()}</td>
                </>
            )}
            <td className="border px-4 py-2 space-x-2">
                {
                    listType === "events" && (
                        <button onClick={() => navigate(`/public/event/${item._id}`)}
                            className="text-white bg-[var(--secondary)] p-2 rounded-md  transition"
                        >
                            <FaEye />
                        </button>
                    )
                }

                <button
                    onClick={() => onEdit(item)}
                    className="text-white bg-[var(--secondary)] p-2 rounded-md  transition"
                >
                    <FaEdit />
                </button>
                <button
                    onClick={() => onDelete(item._id)}
                    className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-md  transition"
                >
                    <FaTrash />
                </button>
            </td>
        </tr>
    );

    return (
        <tbody>
            {safeData.map(renderRow)}
        </tbody>
    );
};

export default ListBody;
