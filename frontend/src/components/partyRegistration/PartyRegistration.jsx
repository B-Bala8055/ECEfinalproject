import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { submitParty } from '../../redux/reducers/partySlice'
import useStyles from './styles'

const VoterRegistration = () => {
    const [warning, setWarning] = React.useState(null)
    const [partyData, setpartyData] = React.useState({
        party:'',
        leader:''
    })
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const styles = useStyles()

    const handleChange = (e) => {
        setpartyData({...partyData, [e.target.name]:e.target.value})
    }

    const handleSubmit = () => {
        if(partyData.party==='' || partyData.leader===''){
            setWarning('Please fill all the details properly.')
        }
        else{
            console.log(partyData)
            dispatch(submitParty({partyData, navigate}))
        }
    }

  return (
    <>
    <Grid container >
        <Grid item xs={12} xl={9} className={styles.container}>

            <Paper elevation={3} className={styles.paperStyles}>
                
                <Typography variant='h5' color='primary' textAlign='center'>
                    Political Party Registration
                </Typography>
                <br/>
                {warning && (
                    <>
                    <br/>
                        <Paper elevation={0} sx={{backgroundColor:'#ffe800'}} className={styles.warningBox}>
                            <Typography paragraph sx={{fontWeight:'bold'}}>
                                {warning}
                            </Typography>
                        </Paper>
                    <br/>
                    </>
                )}
                <TextField
                name="party"
                fullWidth
                label="Party name"
                value={partyData.party}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <TextField
                name="leader"
                fullWidth
                label="Leader"
                value={partyData.leader}
                onChange={handleChange}
                />
                <br/>
                <br/>

                <Button variant='contained' onClick={handleSubmit}>
                    Register
                </Button>
            </Paper>
        </Grid>
    </Grid>
    </>
  )
}

export default VoterRegistration