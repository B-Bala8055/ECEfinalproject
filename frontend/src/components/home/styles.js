import {makeStyles} from '@mui/styles'

const useStyles = makeStyles({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    },
    paperStyles:{
        padding:20,
        marginTop:10
    },
    warningBox:{
        padding:7,
        border:'2px solid #ffba01',
        backgroundColor:'#ffe800'
    }
})

export default useStyles
