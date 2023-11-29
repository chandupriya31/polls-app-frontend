import axios from "../config/axios"
import { useContext, useState } from "react"
import { useLocation, useNavigate,Link } from "react-router-dom"
import { UserContext } from "../App"

function Login(){
    const navigate = useNavigate()
    const location = useLocation()
    const message = location.state?.message
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [serverErrors,setServerErrors] = useState([])
    const {userDispatch} = useContext(UserContext)
          
    const handleSubmit = async(e)=>{
        e.preventDefault()

        const formData = {
            email,
            password
        }

        try{
            const response = await axios.post('/api/user/login',formData)
            // console.log(response.data)
            localStorage.setItem('token',response.data.token)
            const accountReponse = await axios.get('/api/user/account',{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })
            const user = accountReponse.data
            userDispatch({type: 'USER_LOGIN',payload: user})
            const pollsResponse = await axios.get('/api/polls/mypolls',{
                headers:{
                  'Authorization': localStorage.getItem('token')
                }
            })
            userDispatch({type:'MY_POLLS',payload:pollsResponse.data})
            const voteResponse = await axios.get('/api/votes/myvotes',{
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            })
            userDispatch({type:'SET_MY_VOTES',payload:voteResponse.data})
            navigate('/dashboard',{state:{message:response.data.message}})
        }catch(e){
            setServerErrors(e.response.data.errors)
        }
    }

    return(
        <div>
            {message && <b>{message}</b>}

            {serverErrors.length>0 && (
                <div>
                    <h4>These errors prohibitted the form from being saved: </h4>
                    {serverErrors.map((ele,i)=>{
                        return <li key = {i}>{ele.msg}</li>
                    })}
                </div>
            )}

            <h1>Login Page</h1>
            <form onSubmit={handleSubmit} >
                <label>Enter registered email<br/>
                    <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </label><br/>
                <label>Enter Password<br/>
                    <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </label><br/>
                <input type="submit" value="LogIn"/>
            </form>
            <b>New user? <Link to="/register">Sign Up for free</Link></b>
        </div>
    )
}

export default Login