import { useContext, useEffect } from "react"
import { CategoryContext } from "../App"
import { useParams } from "react-router-dom"
import axios from "../config/axios"
import PollsList from "./PollsList"

function SingleCategory(){
    const {name} = useParams()
    const {categoriesState,categoriesDispatch} = useContext(CategoryContext)

    useEffect(()=>{
        (async()=>{
            try{
                const response = await axios.get(`/api/polls/category/${name}`)
                categoriesDispatch({type:'SET_SELECTED_POLLS',payload:response.data})
            }catch(e){
                console.log(e)
            }
        })()
    },[])

    useEffect(()=>{
        return ()=>{
            categoriesDispatch({type:'SET_SELECTED_POLLS',payload:[]})
        }
    },[])

    return( 
        <div>
            <h2>Selcted Category -{name}</h2>
            <h5>Total Polls - {categoriesState.selectedPolls.length}</h5>
            <PollsList polls={categoriesState.selectedPolls}/>
        </div>
    )
}

export default SingleCategory