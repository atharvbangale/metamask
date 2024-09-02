import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const MyLineChart = () => {
    const data = [
        { month: 'Jan', filesUploaded: 50, profileUpdates: 20 },
        { month: 'Feb', filesUploaded: 70, profileUpdates: 25 },
        { month: 'Mar', filesUploaded: 65, profileUpdates: 30 },
        { month: 'Apr', filesUploaded: 80, profileUpdates: 35 },
        { month: 'May', filesUploaded: 90, profileUpdates: 40 },
        { month: 'Jun', filesUploaded: 85, profileUpdates: 45 },
        { month: 'Jul', filesUploaded: 100, profileUpdates: 50 },
        { month: 'Aug', filesUploaded: 110, profileUpdates: 55 },
        { month: 'Sep', filesUploaded: 120, profileUpdates: 60 },
        { month: 'Oct', filesUploaded: 115, profileUpdates: 65 },
        { month: 'Nov', filesUploaded: 130, profileUpdates: 70 },
        { month: 'Dec', filesUploaded: 140, profileUpdates: 75 },
    ];

    return (
      
       
            <LineChart width={700} height={400} data={data}>
                <CartesianGrid stroke="#" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip />
                <Legend />
                <Line type="bump" dataKey="filesUploaded" stroke="#82ca9d" strokeWidth={2} dot={{ fill: '#82ca9d', r: 3 }} />
                <Line type="bump" dataKey="profileUpdates" stroke="#8884d8" strokeWidth={2} dot={{ fill: '#8884d8', r: 3 }} />
            </LineChart>
     
          
    );
}

export default MyLineChart;
