import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [activePage, setActivePage] = useState('home');
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/data');
        const picoData = res.data.filter(item => item.device_id);
        setSensorData(picoData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const renderContent = () => {
    switch (activePage) {
      case 'home':
        return <Home sensorData={sensorData} />;
      case 'plantDatabase':
        return <PlantDatabase />;
      case 'settings':
        return <Settings />;
      default:
        return <Home sensorData={sensorData} />;
    }
  };

  return (
    <div className="layout">
      {/* Sidebar */}
      <div className="sidebar">
        <h1>Grow It 🌱</h1>

        <SidebarButton label="Home" onClick={() => setActivePage('home')} active={activePage === 'home'} />
        <SidebarButton label="Plant Database" onClick={() => setActivePage('plantDatabase')} active={activePage === 'plantDatabase'} />
        <SidebarButton label="Settings" onClick={() => setActivePage('settings')} active={activePage === 'settings'} />

        <ul>
          <strong>My Picos:</strong>
          {sensorData.map((entry, index) => (
            <li key={index}>{entry.device_id}</li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">{renderContent()}</div>
    </div>
  );
}

function SidebarButton({ label, onClick, active }) {
  return (
    <button
      className="sidebar-button"
      style={{
        backgroundColor: active ? '#ffffff' : '',
        fontWeight: active ? '600' : '',
      }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
function Home({ sensorData }) {
  const [plants, setPlants] = useState([]);
  const [sensorList, setSensorList] = useState(sensorData);
  const [selectedPico, setSelectedPico] = useState(null); 
  const [editPlant, setEditPlant] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/plants');
        setPlants(res.data);
      } catch (err) {
        console.error('Error fetching plants:', err);
      }
    };

    fetchPlants();
  }, []);

  const handleCardClick = (pico) => {
    setSelectedPico(pico);
    setEditPlant(pico.assignedPlant || '');
    setEditMode(false);
  };

  const handleSavePlant = async () => {
    if (!selectedPico || !editPlant) return;

    try {
      await axios.put(`http://localhost:5001/api/sensors/assign-plant/${selectedPico.device_id}`, {
        plantname: editPlant,
      });

      setSensorList((prev) =>
        prev.map((p) =>
          p.device_id === selectedPico.device_id
            ? { ...p, assignedPlant: editPlant }
            : p
        )
      );

      setSelectedPico((prev) => ({ ...prev, assignedPlant: editPlant }));
      setEditMode(false);
    } catch (err) {
      console.error('Error saving plant:', err);
    }
  };

  const getConditionAlerts = (entry, assignedPlant) => {
    const alerts = [];

    if (assignedPlant?.temperaturerange) {
      const [minT, maxT] = assignedPlant.temperaturerange;
      if (entry.temp_f < minT || entry.temp_f > maxT) {
        alerts.push(`🌡 Temperature (${entry.temp_f}°F) is out of range!`);
      }
    }

    if (assignedPlant?.humidityrange) {
      const [minH, maxH] = assignedPlant.humidityrange;
      if (entry.humidity < minH || entry.humidity > maxH) {
        alerts.push(`💧 Humidity (${entry.humidity}%) is out of range!`);
      }
    }

    if (assignedPlant?.moisturerange && entry.soil_condition) {
      const expected = assignedPlant.moisturerange.toLowerCase();
      const actual = entry.soil_condition.toLowerCase();
      if (!actual.includes(expected)) {
        alerts.push(`🌱 Soil condition is not ideal (${entry.soil_condition}).`);
      }
    }

    if (assignedPlant?.lightrange && typeof entry.light_voltage === 'number') {
      const lightHours = (entry.light_voltage / 3.3) * 10;
      const [minL, maxL] = assignedPlant.lightrange;
      if (lightHours < minL || lightHours > maxL) {
        alerts.push(`🔆 Light exposure is out of range (${lightHours.toFixed(1)} hrs est).`);
      }
    }

    return alerts;
  };

  return (
    <div className="pico-grid">
      {sensorList.map((entry, i) => {
        const assignedPlant =
          plants.find((p) => p.plantname === entry.assignedPlant) ||
          plants.find((p) => p.plantname === 'Test Plant');
        const alerts = getConditionAlerts(entry, assignedPlant);

        return (
          <div
            key={i}
            className="pico-card"
            onClick={() => handleCardClick(entry)}
            style={{ cursor: 'pointer' }}
          >
            {assignedPlant?.image_url && (
              <img
                src={assignedPlant.image_url.trim()}
                alt={assignedPlant.plantname}
                style={{
                  width: '100%',
                  height: '140px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '10px',
                }}
              />
            )}

            <p><strong>🖥 Device ID:</strong> {entry.device_id}</p>
            <p><strong>🪴 Plant:</strong> {assignedPlant?.plantname || 'None'}</p> {/* 👈 Add this line */}

            <div style={{ marginTop: '8px' }}>
              {alerts.length > 0 ? (
                alerts.map((msg, idx) => (
                  <p key={idx} style={{ color: 'red', fontSize: '0.9em' }}>⚠️ {msg}</p>
                ))
              ) : (
                <p style={{ color: 'green', fontSize: '0.9em' }}>✅ All vitals OK</p>
              )}
            </div>
          </div>

        );
      })}

      {/* Modal */}
      {selectedPico && (
        <div className="modal-backdrop" onClick={() => setSelectedPico(null)}>
          <div
            className="plant-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              padding: '24px',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
          >
            {/* Image */}
            {plants.find(p => p.plantname === selectedPico.assignedPlant)?.image_url && (
              <img
                src={plants.find(p => p.plantname === selectedPico.assignedPlant)?.image_url}
                alt="Plant"
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '12px',
                }}
              />
            )}

            {/* Sensor Info */}
            <h3>🖥 Device ID: {selectedPico.device_id}</h3>
            <p><strong>🌡 Temp:</strong> {selectedPico.temp_c}°C / {selectedPico.temp_f}°F</p>
            <p><strong>💧 Humidity:</strong> {selectedPico.humidity}%</p>
            <p><strong>🔆 Light:</strong> {selectedPico.light_condition} ({selectedPico.light_voltage?.toFixed(2)}V)</p>
            <p><strong>🌱 Soil:</strong> {selectedPico.soil_condition} ({selectedPico.soil_voltage?.toFixed(2)}V)</p>

            {/* Warnings */}
            <div style={{ marginTop: '10px' }}>
              <h4>Condition Check:</h4>
              {getConditionAlerts(selectedPico, plants.find(p => p.plantname === selectedPico.assignedPlant)).length > 0
                ? getConditionAlerts(selectedPico, plants.find(p => p.plantname === selectedPico.assignedPlant)).map((msg, idx) => (
                  <p key={idx} style={{ color: 'red' }}>⚠️ {msg}</p>
                ))
                : <p style={{ color: 'green' }}>✅ All vitals are within range.</p>
              }
            </div>

            {/* Edit Plant Assignment */}
            <div style={{ marginTop: '16px' }}>
              <h4>🪴 Assigned Plant: {selectedPico.assignedPlant || 'None'}</h4>

              {editMode ? (
                <>
                  <select
                    value={editPlant}
                    onChange={(e) => setEditPlant(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px',
                      borderRadius: '8px',
                      border: '1px solid #ccc',
                      marginBottom: '10px',
                    }}
                  >
                    <option value="">-- Select a Plant --</option>
                    {plants.map((plant, idx) => (
                      <option key={idx} value={plant.plantname}>
                        {plant.plantname}
                      </option>
                    ))}
                  </select>
                  <button onClick={handleSavePlant} style={{ marginRight: '8px' }}>💾 Save</button>
                  <button onClick={() => setEditMode(false)}>❌ Cancel</button>
                </>
              ) : (
                <button onClick={() => setEditMode(true)}>✏️ Edit Plant</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PlantDatabase() {
  const [plants, setPlants] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/plants');
        console.log('🌱 Plants from backend:', res.data);
        setPlants(res.data);
      } catch (err) {
        console.error('Error fetching plants:', err);
      }
    };

    fetchPlants();
  }, []);

  return (
    <div>
      <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '20px' }}>🌿 Plant Database</h3>
      {plants.length === 0 ? (
        <p>No plants found.</p>
      ) : (
        <div className="plant-grid">
          {plants.map((plant, i) => (
            <div
              key={i}
              className="plant-card"
              onClick={() => setSelectedPlant(plant)}
              style={{ cursor: 'pointer' }}
            >
              {plant.image_url && (
                <img
                  src={plant.image_url.trim()}
                  alt={plant.plantname}
                  className="plant-image"
                />
              )}
              <h4>{plant.plantname}</h4>
              <p><em>{plant.plantgenus}</em></p>
              {plant.light && <p>☀️ <strong>Light:</strong> {plant.light}</p>}
              {plant.water && <p>💧 <strong>Water:</strong> {plant.water}</p>}
              {plant.description && (
                <p style={{ color: '#666', marginTop: '6px' }}>{plant.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal with expanded plant info */}
      {selectedPlant && (
        <div className="plant-modal-overlay" onClick={() => setSelectedPlant(null)}>
          <div className="plant-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setSelectedPlant(null)}>×</button>
            <h2>{selectedPlant.plantname}</h2>

            {selectedPlant.image_url && (
              <img
                src={selectedPlant.image_url.trim()}
                alt={selectedPlant.plantname}
                className="plant-modal-image"
              />
            )}

            <p><strong>Genus:</strong> {selectedPlant.plantgenus}</p>

            {Array.isArray(selectedPlant.temperaturerange) && (
              <p><strong>🌡 Temperature Range:</strong> {selectedPlant.temperaturerange.join(' - ')}</p>
            )}
            {Array.isArray(selectedPlant.humidityrange) && (
              <p><strong>💧 Humidity Range:</strong> {selectedPlant.humidityrange.join(' - ')}</p>
            )}
            {Array.isArray(selectedPlant.lightrange) && (
              <p><strong>🔆 Light Range:</strong> {selectedPlant.lightrange.join(' - ')}</p>
            )}
            {Array.isArray(selectedPlant.phrange) && (
              <p><strong>🧪 pH Range:</strong> {selectedPlant.phrange.join(' - ')}</p>
            )}
            {selectedPlant.moisturerange && (
              <p><strong>🌱 Moisture Preference:</strong> {selectedPlant.moisturerange}</p>
            )}
            {selectedPlant.description && (
              <p style={{ marginTop: '10px' }}>{selectedPlant.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Settings() {
  return (
    <div className="pico-card">
      <h3>⚙️ Settings</h3>
      <p>Configure your preferences.</p>
    </div>
  );
}

export default App;
