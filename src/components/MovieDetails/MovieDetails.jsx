import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Album from '../album/Album';
import Button from '@mui/material/Button';
import { Box, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';




const MovieDetails = () => {
    const details = useSelector(store => store.details)
    const history = useHistory();


    console.log("details", details)

    const handleClick = () => {
        history.push('/')
    }

    if (Object?.keys(details)?.length > 0) {
        return (
            <>



                <section data-testid='movieDetails'>
                    <div>
                        <Button variant="contained"
                            data-testid="toList"
                            onClick={handleClick}>
                            Back to Movie List Page
                        </Button>
                    </div>

                </section>

                <section>
                    <h3>Movie details</h3>

                    <img src={details?.poster} />
                    <h2>{details?.title}</h2>
                    <h4>Genre:</h4>
                    <CardContent sx={{ flexGrow: 3 }}>
                        
                            {details?.genres.map(element => { return element.name }).join(', ')}
                        <Typography>
                            {details?.description}
                        </Typography>
                    </CardContent>
                </section>


            </>

        )
    } else {

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
    }
}

export default MovieDetails;