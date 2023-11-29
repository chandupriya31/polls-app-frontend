import {BrowserRouter,Routes,Route} from 'react-router-dom'
import axios from './config/axios'
import Home from './component/Home'
import Register from './component/Register'
import Login from './component/Login'
import Dashboard from './component/DashBoard'
import NavBar from './component/NavBar'
import NewPoll from './component/NewPoll'
import { createContext,useReducer,useEffect } from 'react'
import userReducer from './reducers/userReducer'
import MyPolls from './component/MyPolls'
import Showpolls from './component/Showpolls'
import pollsReducer from './reducers/pollsReducer'
import SinglePoll from './component/SinglePoll'
import categoriesReducer from './reducers/categoriesReducer'
import SingleCategory from './component/SingleCategory'

export const UserContext = createContext()
export const PollContext = createContext()
export const CategoryContext = createContext()

function App() {
  const [userState,userDispatch] = useReducer(userReducer,{user:{},myPolls:[],myVotes:[]})
  const [pollState,pollDispatch] = useReducer(pollsReducer,{activePolls:[]})
  const [categoriesState,categoriesDispatch] = useReducer(categoriesReducer,{catData:[],selectedPolls:[]})
  // console.log(pollState)
  console.log(categoriesState)

  // console.log(userState)
  useEffect(()=>{
    if(localStorage.getItem('token')){
      (async()=>{
        try{
          const response = await axios.get('/api/user/account',{
            headers:{
              'Authorization': localStorage.getItem('token')
            }
          })
          userDispatch({type: 'USER_LOGIN',payload:response.data})
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
        }catch(e){
          alert(e.message)
        }
      })()
    }
    (async()=>{
      try{
        const responses = await Promise.all([await axios.get('/api/polls/active'),await axios.get('/api/categories')]) 
        // console.log(response.data);
        const pollData = responses[0].data
        const categoriesData = responses[1].data
        pollDispatch({type:'ALL_POLLS',payload:pollData})
        categoriesDispatch({type:'ALL_CATEGORIES',payload:categoriesData})
      }catch(e){
        console.log(e.message)
      }
    })()

  },[])
  return (
    <BrowserRouter>
      <UserContext.Provider value={{userState,userDispatch}}>
        <PollContext.Provider value={{pollState,pollDispatch}}>
          <CategoryContext.Provider value={{categoriesState,categoriesDispatch}}>
            <div>        
              <h1>Polling-App</h1>
              <h4>All Categories - {categoriesState.catData.length}</h4>
              <NavBar/>          
              <Routes>
                <Route path="/" element = {<Home/>}/>
                <Route path="/register" element = {<Register/>}/>
                <Route path="/login" element = {<Login/>}/>
                <Route path='/dashboard' element = {<Dashboard/>}/>
                <Route path='/create/polls' element= {<NewPoll/>}/>
                <Route path='/polls/my-polls' element={<MyPolls/>}/>
                <Route path='/mypolls/:id' element={<Showpolls/>}/> 
                <Route path='/polls/:id' element={<SinglePoll/>}/>
                <Route path='/polls/category/:name' element={<SingleCategory/>}/>
              </Routes>
            </div>
          </CategoryContext.Provider>
        </PollContext.Provider>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App