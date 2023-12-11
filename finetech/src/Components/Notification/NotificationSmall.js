import  Box  from "@mui/material/Box"
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';

const NotificationSmallCard = ({size , user, action , index ,date}) => {

    const span1Style ={
        fontSize : '1.2rem',
        fontWeight: 600 ,
        display : 'flex',
        justifyContent: 'space-between' ,
        paddingRight: '2rem'
    }

    
    return(  
        <Box 
            sx={{
                width: size === 'small' ? '25rem' : '90%',
                bgcolor: '#212936',
                border : size === 'small' ? '' : 'solid 1px #2D99EF',
                borderRadius: size === 'small' ? '' : '20px' ,
                height: '6rem' ,
                borderBottom: size === 'small' ? 'solid 1px #BABABA' : '',
                borderTop : index === 0 && size === 'small' ? 'solid 1px #BABABA' : '',
                }}>
                <Grid container md={12} 
                sx={{
                    height:'6rem' ,
                    '& .MuiGrid2-grid-md-2':{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    } ,'& .MuiGrid2-grid-md-10':{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingLeft: '5px',
                        justifyContent: size === 'small' ?'center' : 'space-evenly'
                    } , '& .MuiGrid2-grid-md-1':{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    } ,'& .MuiGrid2-grid-md-11':{
                        display: 'flex',
                        flexDirection: 'column',
                        paddingLeft: '5px',
                        justifyContent: size === 'small' ?'center' : 'space-evenly'
                    }
                }}>
                    <Grid md={size === 'small' ? 2 : 1}>
                    <Avatar
                        alt="User"
                        src=""
                        sx={{ width: size === "small" ? '2.5rem' : '3rem',
                         height: size === "small" ? '2.5rem' : '3rem' 
                        }}
                    />
                    </Grid>
                    <Grid md={size === 'small' ? 10 : 11}>
                        <span style={span1Style}>
                            <span style={{fontWeight: 'bold'}}>
                            {user}
                            </span>
                            <span style={{
                                color: '#2D99EF',
                                fontSize : size === 'small' ? '0.9rem' :'1rem' 
                            }}>
                            {date}
                            </span>
                        </span>
                        <span>
                            {action}
                        </span>
                    </Grid>
                </Grid>
        </Box>
    )
}
export default NotificationSmallCard