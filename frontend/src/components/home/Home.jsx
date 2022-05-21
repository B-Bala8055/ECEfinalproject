import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import useStyles from './styles'

const Home = () => {
  const styles = useStyles()
  return (
    <Paper className={styles.paperStyles}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" color="primary">
            Biometric voting system project.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography paragraph>
            This project is a centralized voting system which uses nosql database to store all the voter details 
            and uses an embedded machine connected to the server to cast vote.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='h5' color='primary'>Created By</Typography>
          <Typography variant='h6'>Malavika</Typography>
          <Typography variant='h6'>Praghati</Typography>
          <Typography variant='h6'>Manjupasini</Typography>
          <Typography variant='h6'>Balaji B</Typography>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Home