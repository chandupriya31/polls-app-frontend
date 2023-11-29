import { Link } from "react-router-dom"
import { UserContext } from "../App"
import { useContext } from "react"

function MyPolls(){
    const {userState} = useContext(UserContext)
    return(
        <div>
            <h1>My Polls</h1>
            <h3>Total Polls- {userState.myPolls.length}</h3>
            {userState.myPolls.map((ele)=>{
                return <li key={ele._id}><Link to={`/mypolls/${ele._id}`}>{ele.question}</Link></li>
            })}   
        </div>
    )
}

export default MyPolls