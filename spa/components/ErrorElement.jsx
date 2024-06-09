import { Link } from 'react-router-dom'

function ErrorElement(){
    return (
        <>
            <div>
                <h1>Something went wrong</h1>
                <Link to={"/login"}>go to login page</Link>
            </div>
        </>
    )
}

export default ErrorElement