import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';




const MovieDetails = () => {
    const details = useSelector(store => store.details)
    const history = useHistory();
    const dispatch = useDispatch();
    
    console.log("details", details)

    const handleClick = () => {
        history.push('/')
    }

    if (Object?.keys(details)?.length >0) {
        return (
            
            <section data-testid='movieDetails'>
                <div>

                </div>
                <h3>Movie details</h3>
                <img src={details?.poster}/>
                <p>{details?.title}</p>
                <p>{details?.genres.map(element => { return element.name }).join(', ')}</p>
                <p>{details?.description}</p>
            
            </section>
        )
    } else{

    // useEffect(() => {
    //     console.log("fetching details for movie id:", movieId)
    //     dispatch({ type: 'FETCH_DETAILS', payload: movieId })
    // }, [dispatch, movieId])





    return (
        <>
        <p>Movie Details</p>
        <button
        data-testid="toList"
        onClick={handleClick}>
        Back to Movie List Page
    </button>
    </>

    )
}}

export default MovieDetails;