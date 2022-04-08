import React from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useDispatch } from 'react-redux'
import {submitVoter} from '../../redux/reducers/voterSlice'
import useStyles from './styles'

const VoterRegistration = () => {
    const [warning, setWarning] = React.useState(null)
    const [file, setFile] = React.useState(null)
    const [voterData, setVoterData] = React.useState({
        name:'',
        aadhar:'',
        voter:'',
        dob:''
    })
    const dispatch = useDispatch()
    const styles = useStyles()

    const handleChange = (e) => {
        setVoterData({...voterData, [e.target.name]:e.target.value})
    }

    const handleImage = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = () => {
        if(voterData.name==='' || voterData.aadhar==='' || voterData.voter==='' || voterData.dob===''){
            setWarning('Please fill all the details properly.')
        }
        else if(file === null){
            setWarning('Fingerprint not found')
        }
        else{
            const formData = new FormData()
            formData.append('name', voterData.name)
            formData.append('aadhar', voterData.aadhar)
            formData.append('voter', voterData.voter)
            formData.append('dob', voterData.dob)
            formData.append('fingerprint', file)

            // for (const pair of formData.entries()) {
            //     console.log(pair[0] + ', ' + pair[1])
            // }

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            dispatch(submitVoter({formData, config}))
            // console.log(voterData)
        }
    }

  return (
    <>
    <Grid container >
        <Grid item xs={12} xl={9} className={styles.container}>

            <Paper elevation={3} className={styles.paperStyles}>
                
                <Typography variant='h5' color='primary' textAlign='center'>
                    Register as a Voter
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
                name="name"
                fullWidth
                label="Voter name"
                value={voterData.name}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <TextField
                name="aadhar"
                fullWidth
                label="Aadhar number"
                value={voterData.aadhar}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <TextField
                name="voter"
                fullWidth
                label="Voter ID"
                value={voterData.voter}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <TextField
                name="dob"
                fullWidth
                label="Date of Birth"
                placeholder='dd/mm/yyyy'
                value={voterData.dob}
                onChange={handleChange}
                />
                <br/>
                <br/>
                <input type='file' name='img' accept='image/*' onChange={handleImage} />
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