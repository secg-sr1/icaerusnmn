import React, { useEffect, useState, useMemo } from 'react';
import { BufferAttribute } from 'three';
import { Canvas } from '@react-three/fiber';
import { Points, OrbitControls } from '@react-three/drei';
import { useStore } from '../store/useStore';

import DronePath from '../components/DronePath';
import LeavesPosition from '../components/LeavesPosition';
import SensorsPosition from '../components/SensorsPosition';

export default function Scene() {
    const [points, setPoints] = useState([]);
    const [colors, setColors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dateChange = useStore((state) => state.dateChange);
    const selectedType = useStore((state) => state.value); // RGB, NDVI, NIR
    const showTrace = useStore((state) => state.showTrace);
    const showLabels = useStore((state) => state.showLabels);
    

    useEffect(() => {
        const fetchPointCloudData = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch flight data based on selected date
                const responseFlight = await fetch(`/api/items/icaerus_flights?filter[date_flight][_eq]=${dateChange}`);
                if (!responseFlight.ok) throw new Error('Failed to fetch flight data');
    
                const flightData = await responseFlight.json();
                const flight = flightData.data[0];
    
                // Check and log flight data to verify correct fields
                console.log("Fetched flight data:", flight);
    
                // Properly match field names exactly from the response
                let assetId;
                if (selectedType === 'NDVI') {
                    assetId = flight.pointcloud_ndvi;
                } else if (selectedType === 'NIR') {
                    assetId = flight.pointcloud_nir;
                } else { // Default to RGB
                    assetId = flight.pointcloud_rgb;
                }
    
                console.log("Selected asset ID:", assetId);
    
                // Ensure assetId is present before fetching
                if (!assetId) {
                    throw new Error(`No ${selectedType} point cloud available for this date.`);
                }
    
                // Fetch asset URL from Directus Files endpoint to handle redirects properly
                const assetUrl = `/api/assets/${assetId}`;
                const responseAsset = await fetch(assetUrl, { redirect: 'follow' });
                if (!responseAsset.ok) throw new Error('Failed to fetch point cloud asset');
    
                const reader = responseAsset.body.getReader();
                const decoder = new TextDecoder('utf-8');
    
                let textBuffer = '';
                let pointCloudData = [];
                let colorData = [];
    
                const processChunk = async ({ done, value }) => {
                    if (done) {
                        setPoints(pointCloudData);
                        setColors(colorData);
                        setLoading(false);
                        return;
                    }
    
                    textBuffer += decoder.decode(value, { stream: true });
    
                    let lines = textBuffer.split('\n');
                    textBuffer = lines.pop();
    
                    for (let line of lines) {
                        const values = line.trim().split(',');
                        if (values.length >= 6) {
                            const [x, y, z, r, g, b] = values.slice(0, 6).map(parseFloat);
                            pointCloudData.push(x, z, y);
                            colorData.push(r / 255, g / 255, b / 255);
                        }
                    }
    
                    return reader.read().then(processChunk);
                };
    
                reader.read().then(processChunk);
            } catch (error) {
                console.error('Error fetching point cloud data:', error);
                setError(error.message);
                setLoading(false);
            }
        };
    
        if (dateChange && selectedType) {
            fetchPointCloudData();
        }
    }, [dateChange, selectedType]);
    
    const flatPoints = useMemo(() => new Float32Array(points), [points]);
    const flatColors = useMemo(() => new Float32Array(colors), [colors]);

    if (loading) return <p>Loading point cloud...</p>;
    if (error) return <p>Error loading point cloud: {error}</p>;
    if (!points.length) return <p>No point cloud data available.</p>;

    return (
        <Canvas camera={{ position: [50, 30, -50], fov: 75 }}>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <points>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        array={flatPoints}
                        itemSize={3}
                        count={flatPoints.length / 3}
                    />
                    <bufferAttribute
                        attach="attributes-color"
                        array={flatColors}
                        itemSize={3}
                        count={flatColors.length / 3}
                    />
                </bufferGeometry>
                <pointsMaterial size={0.02} vertexColors sizeAttenuation />
            </points>
            
            {
                showTrace &&
                <DronePath />
            }


            {
                showLabels && 
                <LeavesPosition />
            }


            {
                showLabels &&
                <SensorsPosition />
            }
            


        </Canvas>
    );
}
