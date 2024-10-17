import AddButton from "./AddButton"
import Search from "./Search"


const ListTop = ({onCreate}) => {
    return (
        <div className="flex items-center justify-between gap-3 mb-5">
            <Search />
            <AddButton text={"Add Event"} onBtnClick={onCreate} />
        </div>
    )
}

export default ListTop
