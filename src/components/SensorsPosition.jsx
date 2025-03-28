import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import { Box, Html } from '@react-three/drei';

export default function SensorsPosition(){
  const [leavesPoints, setLeavesPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/assets/6ecdf35a-22bf-40ec-a502-6a1a892c3eb5.json');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log(data, 'DATA')

        const leavesPointsData = data.map(point => [point.X, point.Y, point.Z, point.name]);
        console.log(leavesPointsData, 'leaves points data')


        setLeavesPoints(leavesPointsData);  // Adjust based on actual JSON structure
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
    


    console.log(leavesPoints.length, 'leaves points')

  return (
    <>
      {leavesPoints.map((pos, index) => (
        <Box key={index} position={[pos[0], pos[1], pos[2]]} args={[0.5, 0.5, 0.5]}>
          <meshStandardMaterial color='grey' />
          <Html
            center
            distanceFactor={10}
        >
            <Typography variant='h6' fontSize="100px" fontFamily="manrope" color="blue" sx={{ml:8, mb:20}}>
                        {pos[3]}
            </Typography>
            </Html>
        </Box>
      ))}
      {/* <Box scale={[1, 1, 1]}>
        <meshStandardMaterial color='blue' />
      </Box> */}
        {/* {
            leavesPoints.length > 0 && leavesPoints.map((pos, index) => (
                <Box
                    key={index}
                    position={[pos[0], pos[1], pos[2]]}
                    args={[0.5, 0.5, 0.5]}
                >
                    <meshStandardMaterial color='red' />
                    
                    <Html
                        center
                        distanceFactor={10}
                    >
                        <Typography variant='h6' fontSize="100px" fontFamily="manrope" color="red" sx={{ml:8, mb:20}}>
                                    {pos[3]}
                        </Typography>
                    </Html>
                    
                </Box>
            ))
        } */}


    </>
  );
}
