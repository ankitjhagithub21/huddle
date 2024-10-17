

const ListHeader = ({ columns }) => {
    return (
        <div className={`lg:grid hidden grid-cols-${columns.length} items-center my-5 font-bold`}>
            {columns.map((column, index) => (
                <p key={index} className={index === columns.length - 1 ? 'text-end' : ''}>
                    {column}
                </p>
            ))}
        </div>
    );
};

export default ListHeader;
