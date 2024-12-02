import './App.css'
import Grid from "@mui/material/Grid2";
import IndicatorWeather from './components/IndicatorWeather';
import TableWeather from './components/TableWeather';
import ControlWeather from './components/ControlWeather';
import LineChartWeather from './components/LineChartWeather';
import { Item } from './interface/Item';
import { useState, useEffect } from 'react';

interface Indicator {
    title?: String;
    subtitle?: String;
    value?: String;
}

function App() {
    const [indicators, setIndicators] = useState<Indicator[]>([])
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        let request = async () => {
            let API_KEY = "63c2cdb7a75b149b75e116d40209cc18"
            let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`)
            let savedTextXML = await response.text();

            const parser = new DOMParser();
            const xml = parser.parseFromString(savedTextXML, "application/xml");

            let dataToIndicators: Indicator[] = new Array<Indicator>();

            let name = xml.getElementsByTagName("name")[0].innerHTML || ""
            dataToIndicators.push({ "title": "Location", "subtitle": "City", "value": name })

            let location = xml.getElementsByTagName("location")[1]

            let latitude = location.getAttribute("latitude") || ""
            dataToIndicators.push({ "title": "Location", "subtitle": "Latitude", "value": latitude })

            let longitude = location.getAttribute("longitude") || ""
            dataToIndicators.push({ "title": "Location", "subtitle": "Longitude", "value": longitude })

            let altitude = location.getAttribute("altitude") || ""
            dataToIndicators.push({ "title": "Location", "subtitle": "Altitude", "value": altitude })

            setIndicators(dataToIndicators);


            const dataToItems: Item[] = [];

            const time = Array.from(xml.getElementsByTagName("time"));
            const validTime = time.splice(0, 6);

            validTime.forEach(time => {
                const from = time.getAttribute("from") || "";
                const to = time.getAttribute("to") || "";

                const precipitation = time.getElementsByTagName("precipitation")[0].getAttribute("probability") || "";
                const humidity = time.getElementsByTagName("humidity")[0].getAttribute("value") || "";
                const clouds = time.getElementsByTagName("clouds")[0].getAttribute("all") || "";

                const item: Item = { dateStart: from, dateEnd: to, precipitation, humidity, clouds };
                dataToItems.push(item);
            });

            setItems(dataToItems);
        }

        request();

    }, []);


    return (
        <Grid container spacing={5}>

            {/* Indicadores */}
            {
                indicators
                    .map(
                        (indicator, idx) => (
                            <Grid key={idx} size={{ xs: 12, xl: 3 }}>
                                <IndicatorWeather
                                    title={indicator["title"]}
                                    subtitle={indicator["subtitle"]}
                                    value={indicator["value"]} />
                            </Grid>
                        )
                    )
            }

            {/* Tabla */}
            <Grid size={{ xs: 12, xl: 8 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, xl: 3 }}>
                        <ControlWeather />
                    </Grid>
                    <Grid size={{ xs: 12, xl: 9 }}>
                        <TableWeather itemsIn={items} />
                    </Grid>
                </Grid>
            </Grid>

            {/* Gráfico */}
            <Grid size={{ xs: 12, xl: 4 }}>
                <LineChartWeather />

            </Grid>

        </Grid>
    )
}

export default App
