import { Grid } from "@mui/material"

const Privacy = () => {
    return (
        <>
            <div className="layout">
                <div className="heroSection">
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        textAlign="center"
                    >
                        <Grid item md={12}>
                            <h1>Privacy Policy</h1>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}

export default Privacy;