import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/data');
        // Only keep documents that came from Pico devices
        const picoData = res.data.filter(item => item.device_id);
        setSensorData(picoData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>🌱 Grow It! - Sensor Dashboard</h1>
      {sensorData.length === 0 ? (
        <p>No sensor data available.</p>
      ) : (
        sensorData.map((entry, i) => (
          <div key={i} style={{ border: '1px solid #ccc', padding: 15, margin: 10, borderRadius: 10 }}>
            <p><strong>Device ID:</strong> {entry.device_id}</p>
            <p><strong>Temperature:</strong> {entry.temp_c}°C / {entry.temp_f}°F</p>
            <p><strong>Humidity:</strong> {entry.humidity}%</p>
            <p><strong>Light:</strong> {entry.light_condition} ({entry.light_voltage?.toFixed(2)}V)</p>
            <p><strong>Soil:</strong> {entry.soil_condition} ({entry.soil_voltage?.toFixed(2)}V)</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
