import { useState} from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
function Register(){

    const navigate = useNavigate()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [serverErrors,setServerErrors] = useState([])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const formData = {
            name,
            email,
            password
        }

        try{
            const response = await axios.post('http://localhost:3177/api/user/register',formData)
            navigate('/login',{state:{message:response.data.message}})
        }catch(e){
            setServerErrors(e.response.data.errors)
        }
    }

    return(
        <div>
            <h1>Register Page</h1>
            {
                serverErrors.length>0 && (
                    <div>
                        <h3>These errors prohibitted the form from being saved: </h3>
                        <ul>
                            {serverErrors.map((ele,i) =>{
                                return <li key = {i}>{ele.msg}</li>
                            })}
                        </ul>
                    </div>
                )
            }

            <form onSubmit={handleSubmit}>
                <label> Enter Username <br/>
                    <input type ="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                </label><br/>
                <label> Enter Email <br/>
                    <input type ="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                </label><br/>
                <label> Enter Password<br/>
                    <input type ="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </label><br/>
                <input type="submit" value="Register"/>
            </form>
        </div>
    )
}

export default Register