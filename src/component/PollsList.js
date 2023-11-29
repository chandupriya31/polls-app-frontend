// import PollItem from "./PollItem"
import PollItem from './PollItem'

function PollsList(props){
    const {polls} = props
    return (
        <div>
            <ul>
                {polls.map(ele =>{
                    return <PollItem
                        key = {ele._id}
                        _id = {ele._id}
                        question={ele.question}
                        category={ele.categoryId}
                    />
                })}
            </ul>
        </div>
    )
}

export default PollsList