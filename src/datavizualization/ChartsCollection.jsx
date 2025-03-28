
import React,  { useEffect, useState } from 'react';
import { ThemeProvider, CssBaseline, Box, Grid, Card, Paper, CardMedia, CardContent, Typography } from '@mui/material';

import { createTheme } from '@mui/material/styles';

import HealthChart from '../charts/HealthChart';

export default function ChartsCollection({darkMode}) {

    const [images, setImages] = useState([]);

    useEffect(() => {
        fetch("/api/files?limit=500&fields[]=id&fields[]=modified_on&fields[]=type&fields[]=title&fields[]=type&fields[]=filesize&sort[]=-uploaded_on&page=1&filter[_and][0][type][_nnull]=true&filter[_and][1][folder][_eq]=dda0fedc-5d78-4fa5-a4ff-5885c73bd554")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.data) {
                    setImages(data.data);
                }
            })
            .catch((error) => console.error("Error fetching images:", error));
    }, []);

    const getRandomHealthiness = () => Math.floor(Math.random() * 59) + 40; // 40–98%
    const getRandomNDVI = () => (Math.random() * 0.2 + 0.7).toFixed(2); // 0.70–0.90
    
    return (
        <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: 2,
          padding: 2,
        }}
      >
        {images.map((image) => {
          // Safe parsing logic
          let formattedDate = "Unknown Date";
          let formattedTitle = image.title;
  
          const parts = image.title.split(" ");
          if (parts.length === 4) {
            const rawDate = parts[0];
            const year = `20${rawDate.slice(0, 2)}`;
            const month = rawDate.slice(2, 4);
            const day = rawDate.slice(4, 6);
            formattedDate = `${year}-${month}-${day}`;
            formattedTitle = `${parts[1]}${parts[2]}-${parts[3]}`;
          }

          const healthiness = getRandomHealthiness();
          const ndvi = getRandomNDVI();
  
          return (
            <Card key={image.id} sx={{ maxWidth: 240, borderRadius: 0, boxShadow: 3 }}>
              {/* Metadata */}
              <CardContent>
                <Typography variant="body2" color="gray">
                  {formattedDate}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#fff" }}>
                  {formattedTitle}
                </Typography>
                
                <HealthChart title="Healthiness" value={healthiness} />

                <Typography
                  sx={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 200,
                    fontSize: 14,
                  }}
                >
                  Healthiness: {healthiness}%
                </Typography>
                
              </CardContent>
            </Card>
          );
        })}
      </Box>
    );


}


