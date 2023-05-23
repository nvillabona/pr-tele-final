import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import HomeIcon from '@mui/icons-material/Home';

export const Navbar = () => {
    return (
        <Box sx={{mb: 1, display: 'flex', justifyContent:'space-around', alignItems:'center'}}>
            <Link to={'/'}>
                <HomeIcon />
            </Link>
            <Link to={'/new'}>
                New Book
            </Link>
        </Box>
    )
}
