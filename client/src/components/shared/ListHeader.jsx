

const ListHeader = ({ columns }) => {
    return (
        <thead>
            <tr>
                {columns.map((col, index) => (
                    <th key={index} className="border px-4 py-2 text-left bg-gray-200">
                        {col}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

export default ListHeader;
