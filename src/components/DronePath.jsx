import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box, Html } from '@react-three/drei';

export default function DronePath() {
  const [leavesPoints, setLeavesPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/assets/2b760a2b-7d0e-408b-b0e2-588cf5d4884d.json');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const leavesPointsData = data.map(point => [point.X, point.Y, point.Z, point.name]);

        setLeavesPoints(leavesPointsData);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <Box scale={[1, 1, 1]}>
        <meshStandardMaterial color='red' />
      </Box>
    );


    if (loading) return <Box scale={[1,1,1]}><meshStandardMaterial color='red' /></Box>
    if (error) return <Box scale={[1,1,1]}><meshStandardMaterial color='yellow' /></Box>    
    if (!leavesPoints.length) return <Box scale={[1,1,1]}><meshStandardMaterial color='blue' /></Box>
    

  return (
    <>
        {
            leavesPoints.length > 0 && leavesPoints.map((pos, index) => (
                <Box
                    key={index}
                    position={[pos[0], pos[1], pos[2]]}
                    args={[0.1, 0.1, 0.1]}
                >
                    <meshStandardMaterial color='grey' />
                    
                    <Html
                        center
                        distanceFactor={10}
                        style={{width: '200px'}}
                    >       
                        <Typography variant='h6' fontSize="40px" fontFamily="manrope" sx={{ml:4, mb:4}}>
                                    {pos[3]}
                        </Typography>
                    </Html>
                    
                </Box>
            ))
        }


    </>
  );
}
