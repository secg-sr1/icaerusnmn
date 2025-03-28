import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Counter = ({ endValue }) => {
    const [count, setCount] = useState(0);
    
    
    useEffect(() => {
        let start = 0;
        const duration = 500; // 1 second
        const increment = endValue / (duration / 16);
        
        const interval = setInterval(() => {
            start += increment;
            if (start >= endValue) {
                setCount(endValue);
                clearInterval(interval);
            } else {
                setCount(Math.ceil(start));
            }
        }, 16);
        
        return () => clearInterval(interval);
    }, [endValue]);
    
    return <>{count}</>;
};



export default function RightBar() {


    return <>

        <Box sx={{ width:'130px', height:'500px'}}>


            <Card sx={{ boxShadow:5, borderRadius:0}}>

                <CardContent sx={{justifyContent:'center'}}>
                    <Typography sx={{ fontFamily: 'Manrope, sans-serif', fontWeight: 400, fontSize:35, ml:'28px', justifyContent:'center'}}>
                        <Counter endValue={76} />
                    </Typography>
                    <Typography sx={{ fontSize:14, fontFamily: 'Manrope, sans-serif', fontWeight: 200}}>
                        healthiness %
                    </Typography>


                    <Typography sx={{ fontFamily: 'Manrope, sans-serif', fontWeight: 400, fontSize:30, ml:'28px', justifyContent:'center'}}>
                        <Counter endValue={34} />
                    </Typography>
                    <Typography sx={{ fontSize:14, fontFamily: 'Manrope, sans-serif', fontWeight: 200}}>
                        risk desease %
                    </Typography>

                    <Typography sx={{ fontFamily: 'Manrope, sans-serif', fontWeight: 400, fontSize:30, ml:'28px', justifyContent:'center'}}>
                        <Counter endValue={19} />
                    </Typography>
                    <Typography sx={{ fontFamily: 'Manrope, sans-serif', fontWeight: 200, fontSize:14, ml:'10px'}}>
                        diseases #
                    </Typography>

                </CardContent>

            </Card>
        </Box>

        
    
    </>

}