import Paper from '@mui/material/Paper';
import { LineChart } from '@mui/x-charts/LineChart';
import { Item } from "../interface/Item";
import { useState, useEffect } from "react";

export default function LineChartWeather({ itemsIn, selected }: { itemsIn: Item[], selected: any }) {
    const [label, setLabel] = useState<string>("");
    const [data, setData] = useState<number[]>([]);

    useEffect(() => {
        if (selected === 0) {
            setLabel("Probabilidad de Precipitación");
            setData(itemsIn.map(item => parseFloat(item.precipitation)));
        } else if (selected === 1) {
            setLabel("Porcentaje de Humedad");
            setData(itemsIn.map(item => parseInt(item.humidity)));
        } else if (selected == 2) {
            setLabel("Porcentaje de Nubosidad");
            setData(itemsIn.map(item => parseInt(item.clouds)));
        }
    }, [selected]);

    return (
        <Paper
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            {selected !== -1 && (
                <LineChart
                    height={200}
                    series={[
                        { data: data, label: label },
                    ]}
                    xAxis={[{ scaleType: 'point', data: itemsIn.map(item => item.dateStart) }]}
                />
            )}
        </Paper>
    );
}
