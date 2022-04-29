import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useSelector, useDispatch } from 'react-redux'
import {getVoter} from '../../redux/reducers/voterSlice'
import { TextField } from '@mui/material'
import useStyles from './styles'

const VoterPreview = () => {
    const styles = useStyles()
    const [warning, setWarning] = React.useState(false)
    const [values, setValues] = React.useState({
        aadhar:'',
        dob:''
    })
    const voterData = useSelector(state=>state.voterSlice)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = () => {
        if(values.aadhar === '' || values.dob === ''){
            setWarning(true)
        }
        else{
            setWarning(false)
            dispatch(getVoter({...values}))
        }
    }

  return (
    <>
        <Grid container spacing={2} className={styles.container}>
            
            <Grid item xs={12} lg={6}>
                <Paper elevation={3} className={styles.paperStyles}>
                    <Typography variant='h5' color='primary' textAlign='center'>
                        Find a Voter
                    </Typography>
                    <br/>
                    <br/>
                    {warning && (<Typography sx={{color:'red', fontSize:18}}>Please enter all the details.</Typography>)}
                    <br/>
                    <TextField
                        name='aadhar'
                        fullWidth
                        label='Aadhar Number'
                        value={values.aadhar}
                        onChange={handleChange}
                    />
                    <br/>
                    <br/>
                    <TextField
                        name='dob'
                        fullWidth
                        label='Date Of Birth'
                        placeholder='dd/mm/yyyy'
                        value={values.dob}
                        onChange={handleChange}
                    />
                    <br/>
                    <br/>
                    <Button variant='contained' color='primary' onClick={handleSubmit}>
                        Search
                    </Button>
                </Paper>
            </Grid>

            <Grid item xs={12} lg={6}>
                <Paper elevation={3} className={styles.paperStyles}>
                    <Typography variant='h5' color='primary' textAlign='center'>
                        Voter Information
                    </Typography>
                    <br/>
                    <br/>
                    <br/>
                    {
                        voterData === null
                            ?
                            (<Typography variant='h6'>Perform Your search to get voter information</Typography>)
                            :(
                                voterData.confirmation===false?(<Typography variant='h6'>{voterData.msg}</Typography>)
                                :(
                                    <>
                                        <Typography paragraph>
                                            <b>Name : </b>{voterData.voter.name}
                                        </Typography>
                                        <Typography paragraph>
                                            <b>Aadhar Number : </b>{voterData.voter.aadhar}
                                        </Typography>
                                        <Typography paragraph>
                                            <b>Voter ID : </b>{voterData.voter.voter}
                                        </Typography>
                                        <Typography paragraph>
                                            <b>Date Of Birth : </b>{voterData.voter.dob}
                                        </Typography>
                                        <Typography>
                                            <b>Voted :</b> {voterData.voter.votingStatus ? "Yes" : "No" }
                                        </Typography>
                                    </>
                                )
                            )
                    }
                    
                </Paper>
            </Grid>

            {/* <Grid item lg={3} sx={{ display:{sx:'none', lg:'block'} }}/> */}

        </Grid>
    </>
  )
}

export default VoterPreview