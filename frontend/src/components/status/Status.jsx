import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import useStyles from './styles'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'

const Status = () => {
    const styles = useStyles()
    const status = useSelector(state=>state.statusSlice)
    return (
        <Grid className={styles.container}>
            <Paper className={styles.paperStyles}>
                <Typography variant='h4' color='primary' className={styles.message}>
                    { status == null ? 'Error, Contact Admin':status.msg}
                </Typography>
                <Typography variant='h5' className={styles.message}>
                    Click here to return <Link to='/'>home</Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Status