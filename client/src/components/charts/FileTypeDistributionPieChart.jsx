import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';



const FileTypeDistributionPieChart = ({i ,f,v ,m}) => {

    const data = [
        { type: 'Document', count: f },
        { type: 'Image', count: i },
        { type: 'Video', count: v },
        { type: '3dModel', count: m },

        
    ];
    
    const DARK_COLORS = ['#4472CA', '#6CB2EB', '#5B8FF9', '#6986F3', '#9FB3F6', '#769ECB', '#78B1FF', '#A3B9FF'];
    return (
      
                <PieChart width={400} height={400}>
                    <Pie
                        data={data}
                        dataKey="count"
                        nameKey="type"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={70} // Inner radius to create the donut effect
                        label
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={DARK_COLORS[index % DARK_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
      
    );
};

export default FileTypeDistributionPieChart;
