import ListHeader from './ListHeader';
import ListBody from './ListBody';

const ListTable = ({ columns, data, loading, onEdit, onDelete, listType}) => {
    return (
        <table className="table-auto w-full border-collapse border border-gray-300 mt-5">
            <ListHeader columns={columns} />
            <ListBody 
                data={data} 
                loading={loading} 
                onEdit={onEdit} 
                onDelete={onDelete} 
                listType={listType}
                
            />
        </table>
    );
};

export default ListTable;
