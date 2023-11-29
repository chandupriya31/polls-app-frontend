import { useContext } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../App"
import PollsList from "./PollsList"

function Showpolls(){
    const {id} = useParams()
    const {userState} = useContext(UserContext)
    const poll = userState.myPolls.find((ele)=>{
        return ele._id === id
    })
    console.log(poll)
    return(
        <div>
            <h1>Poll</h1>
            <h3>{poll.question}</h3>
            <h4>Options</h4>
            <PollsList polls = {userState.myPolls}/>
        </div>
    )
}

export default Showpolls