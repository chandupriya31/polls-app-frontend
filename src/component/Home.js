import { useContext } from "react"
import { PollContext} from "../App"
import PollsList from "./PollsList"

function Home(){
    const {pollState} = useContext(PollContext)
    return(
        <div>
            <h1>Home Page</h1>
            <h2>All polls - {pollState.activePolls.length}</h2>
            <PollsList polls = {pollState.activePolls}/>
        </div>
    )
}

export default Home