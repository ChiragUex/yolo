import { Grid } from "@mui/material";
import notFound from "../assets/images/notfound.png"


const NotFound = ({width,height}) => {
    return(
        <>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        //   spacing={5}
        >
        <Grid item md={12}>
        <img src={notFound} alt="notFound" width={width ? width : ''} height={height ? height : ''}/>
        <h1>Not Record Found.</h1>
        </Grid>
        </Grid>
        </>
    )
}
export default NotFound;