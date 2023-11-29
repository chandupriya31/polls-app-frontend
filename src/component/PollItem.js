import { Link } from 'react-router-dom'
function PollItem(props) {
    const { question, category, _id} = props 
    return <li>
        <Link to={`/polls/${_id}`}>{question}</Link> - <Link to={`/polls/category/${category.category}`}>{category.category}</Link>
    </li>
}

export default PollItem