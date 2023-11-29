import { useContext} from "react"
import { UserContext } from "../App"
import { useLocation } from "react-router-dom"

function Dashboard(){
    const {userState} = useContext(UserContext)    
    const location = useLocation()
    const message = location.state?.message

    return (
        <div>
            {message && <b>{message}</b>}
            <h2>Dashboard Component</h2>
            <p> Welcome {userState.user.name}!</p>
            <h3>Total Polls- {userState.myPolls.length}</h3>
        </div>
    )
}

export default Dashboard