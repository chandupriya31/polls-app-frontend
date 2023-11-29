import { useContext,useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PollContext,UserContext} from "../App";
import _ from 'lodash'
import axios from "../config/axios";

function SinglePoll(props){
    const {id} = useParams()
    const {pollState} = useContext(PollContext)
    const {userState,userDispatch} = useContext(UserContext)

    const poll = pollState.activePolls.find(ele=>{
        return ele._id === id
    })

    const hasVoted = userState.myVotes.find(ele=>{
        return ele.poll === id
    })
    const [selectedOption,setSelectedOption] = useState(hasVoted ? hasVoted.option:'')
    const [serverErrors,setServerErrors] = useState([]) 

    const handleVote = async()=>{
        try {
            const voteResponse = await axios.post(`/api/vote/${id}`,{
                option:selectedOption
            },{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            console.log(voteResponse.data)
            alert('Thankyou for casting your vote')
            userDispatch({type:'ADD_MY_VOTE',payload:voteResponse.data})
        }catch(e){
            setServerErrors(e.response.data.errors)
        }
    }

    const displayButtons = ()=>{
        if(_.isEmpty(userState.user)){
            return <Link to="/login"><button>Login to Vote</button></Link>
        } else{
            if(hasVoted){
                return 'Your vote is already recorded'
            }
            else{
                return <button onClick={handleVote}>Vote</button>
            }
        }
    }

    return (
        <div>            
            {poll && (
                <div>
                    <h2>{poll.question} <small>{poll.categoryId.category}</small></h2>
                    {serverErrors.length>0 && (
                        <div>
                            <h4>These errors prohibitted the form from being saved: </h4>
                            {serverErrors.map((ele,i)=>{
                                return <li key = {i}>{ele.msg}</li>
                            })}
                        </div>
                    )}
                    <h3>Options</h3>
                    <ul>
                        {poll.options.map(ele =>{
                            return <li key={ele._id}>
                                <input 
                                    type="radio" 
                                    disabled = {_.isEmpty(userState.user)}
                                    name = "poll" 
                                    value={ele._id}
                                    id = {ele._id}
                                    onChange={(e) => setSelectedOption(e.target.value)}
                                    checked={ele._id === selectedOption}
                                />
                                <label htmlFor={ele._id}>{ele.optionText}</label>
                            </li>
                        })}
                    </ul>
                    {displayButtons()}
                    <p>Created By <strong>{poll.creator.name}</strong> expiring on {new Date(poll.endDate).toDateString()}</p>
                </div>
            )}
        </div>
    )
}

export default SinglePoll