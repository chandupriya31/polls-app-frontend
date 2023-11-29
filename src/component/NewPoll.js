import { UserContext } from "../App"
import axios from "../config/axios"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function NewPoll(){
    const navigate = useNavigate()
    const {userDispatch} = useContext(UserContext)
    const [question,setQuestion] = useState('')
    const [categoryId,setCategoryId] = useState('')
    const [categories,setCategories] = useState([])
    const [categoryName,setCategoryName] = useState('')
    const [endDate,setEndDate] = useState('')
    const [options,setOptions] = useState([])

    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get('/api/categories')
                setCategories(response.data)
            }catch(e){
                console.log(e)
            }
        })()
    },[])

    const handleAdd = async()=>{
        if(categoryName){
            const formData = {
                category:categoryName
            }
            try{
                const response = await axios.post('/api/categories',formData,{
                    headers:{
                        'Authorization' : localStorage.getItem('token')
                    }
                })
                const category = response.data
                setCategories([...categories,category])
                setCategoryId(category._id)
                setCategoryName('')
                // navigate('/polls/my-polls')
            }catch(e){
                console.log(e.message)
            }
        }
    }

    const handleOptionText = (index,value)=>{
        const newArr = options.map((ele, i) => {
            if(i === index) {
                return {...ele, optionText: value }
            } else {
                return {...ele} 
            }
        })
        setOptions(newArr)
    }

    const handleAddOption =()=> {
        const option = {
            optionText:''
        }
        setOptions([...options,option])
    }

    const handleRemove = (index)=>{
        const newArr = options.filter((ele,i)=>{
            return i !== index
        })
        setOptions(newArr)
    }

    const handleSubmit = async()=>{
        const today = new Date()
        const formData = {
            question,
            options,
            endDate,
            createdDate: `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`,
            categoryId
        }

        try{
            const response = await axios.post('/api/polls',formData,{
                headers:{
                    'Authorization': localStorage.getItem('token')
                }
            })

            const polls = response.data
            console.log(polls)

            userDispatch({type:'ADD_POLL',payload:polls})

            setQuestion('')
            setOptions([])
            setEndDate('')
            setCategoryId('')
            
            navigate(`/mypolls/${polls._id}`)
        }catch(e){
            console.log(e.message)
        }
    }

    return(
    <div>
        <h1>Create Poll</h1>
        <label htmlFor="question">Enter question</label><br/>
        <input type="text" id = "question" value={question} onChange={e=>{setQuestion(e.target.value)}}/><br/>
        <label htmlFor="categoryId">Select Category</label><br/>
        <select id="categoryId" value={categoryId} onChange={e=>setCategoryId(e.target.value)}>
            <option value="">Select</option>
            {categories.map((ele)=>{
                return <option
                    key={ele._id}
                    value={ele._id}
                >{ele.category}</option>
            })} 
        </select>
            or  
            <label htmlFor="categoryName">Add Category</label>
            <input type="text" 
                value={categoryName} 
                onChange={e=>setCategoryName(e.target.value)}
            /> 
        <button onClick={handleAdd}>Add Category</button><br/>
        <label htmlFor="endDate">EndDate</label><br/>
        <input
            type="date"
            value={endDate}
            onChange={(e)=>setEndDate(e.target.value)}
        /><br/>
        <label htmlFor="options">Add Options</label><br/>
        {options.map((ele,i)=>{
            return <div >
                <input type="text"
                    id="options" 
                    value={ele.optionText}
                    onChange={(e)=>{
                        handleOptionText(i,e.target.value)
                    }}
                /><button onClick={()=>handleRemove(i)}>Remove</button>
            </div>
        })}<br/>
        <button onClick={handleAddOption}>Add Options</button><br/>
        <button onClick={handleSubmit}>Submit</button>
    </div>
    )
}

export default NewPoll
