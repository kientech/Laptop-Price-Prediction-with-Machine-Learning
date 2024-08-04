import React, { useState } from "react";
import axios from "axios";

const LaptopPredictor = () => {
  const [brand, setBrand] = useState("");
  const [type, setType] = useState("");
  const [ram, setRam] = useState(8);
  const [weight, setWeight] = useState(1.5);
  const [touchscreen, setTouchscreen] = useState("No");
  const [ips, setIps] = useState("No");
  const [screenSize, setScreenSize] = useState(15.6);
  const [resolution, setResolution] = useState("1920x1080");
  const [cpu, setCpu] = useState("");
  const [hdd, setHdd] = useState(0);
  const [ssd, setSsd] = useState(256);
  const [gpu, setGpu] = useState("");
  const [os, setOs] = useState("");
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    const requestData = {
      Ram: parseInt(ram), // Capitalize the key to match backend expectations
      Ips: ips,           // Capitalize the key
      company: brand,
      laptop_type: type,
      weight: parseFloat(weight), // Ensure this is a float
      touchscreen,
      screen_size: parseFloat(screenSize), // Ensure this is a float
      resolution,
      cpu,
      hdd: parseInt(hdd), // Ensure this is an integer
      ssd: parseInt(ssd), // Ensure this is an integer
      gpu,
      os,
    };

    console.log("Request data:", requestData); // Log the request data

    try {
      const response = await axios.post("http://127.0.0.1:8000/predict", requestData);
      console.log("🚀 ~ handlePredict ~ response:", response);
      setPredictedPrice(response?.data);
      setError(null);
    } catch (error) {
      setError("An error occurred while predicting the price.");
      setPredictedPrice(null);
      console.error("Error details:", error.response?.data || error.message);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1>Laptop Price Predictor</h1>
      <div>
        <label>Brand:</label>
        <select value={brand} onChange={(e) => setBrand(e.target.value)}>
          <option value="">Select Brand</option>
          <option value="Dell">Dell</option>
          <option value="Apple">Apple</option>
          <option value="HP">HP</option>
          {/* Add other brands as needed */}
        </select>
      </div>
      <div>
        <label>Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          <option value="Ultrabook">Ultrabook</option>
          <option value="Notebook">Notebook</option>
          {/* Add other types as needed */}
        </select>
      </div>
      <div>
        <label>RAM (in GB):</label>
        <select value={ram} onChange={(e) => setRam(parseInt(e.target.value))}>
          {[2, 4, 6, 8, 12, 16, 24, 32, 64].map((ramSize) => (
            <option key={ramSize} value={ramSize}>
              {ramSize}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Weight (in kg):</label>
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(parseFloat(e.target.value))}
          step="0.1"
        />
      </div>
      <div>
        <label>Touchscreen:</label>
        <select value={touchscreen} onChange={(e) => setTouchscreen(e.target.value)}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div>
        <label>IPS:</label>
        <select value={ips} onChange={(e) => setIps(e.target.value)}>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </div>
      <div>
        <label>Screen Size (in inches):</label>
        <input
          type="number"
          value={screenSize}
          onChange={(e) => setScreenSize(parseFloat(e.target.value))}
          step="0.1"
        />
      </div>
      <div>
        <label>Resolution:</label>
        <select value={resolution} onChange={(e) => setResolution(e.target.value)}>
          <option value="1920x1080">1920x1080</option>
          <option value="1366x768">1366x768</option>
          <option value="1600x900">1600x900</option>
          <option value="3840x2160">3840x2160</option>
          <option value="3200x1800">3200x1800</option>
          <option value="2880x1800">2880x1800</option>
          <option value="2560x1600">2560x1600</option>
          <option value="2560x1440">2560x1440</option>
          <option value="2304x1440">2304x1440</option>
        </select>
      </div>
      <div>
        <label>CPU:</label>
        <select value={cpu} onChange={(e) => setCpu(e.target.value)}>
          <option value="">Select CPU</option>
          <option value="Intel Core i5">Intel Core i5</option>
          <option value="AMD">AMD</option>
          {/* Add other CPUs as needed */}
        </select>
      </div>
      <div>
        <label>HDD (in GB):</label>
        <select value={hdd} onChange={(e) => setHdd(parseInt(e.target.value))}>
          {[0, 128, 256, 512, 1024, 2048].map((hddSize) => (
            <option key={hddSize} value={hddSize}>
              {hddSize}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>SSD (in GB):</label>
        <select value={ssd} onChange={(e) => setSsd(parseInt(e.target.value))}>
          {[0, 8, 128, 256, 512, 1024].map((ssdSize) => (
            <option key={ssdSize} value={ssdSize}>
              {ssdSize}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>GPU:</label>
        <select value={gpu} onChange={(e) => setGpu(e.target.value)}>
          <option value="">Select GPU</option>
          <option value="Nvidia">Nvidia</option>
          <option value="AMD">AMD</option>
          {/* Add other GPUs as needed */}
        </select>
      </div>
      <div>
        <label>OS:</label>
        <select value={os} onChange={(e) => setOs(e.target.value)}>
          <option value="">Select OS</option>
          <option value="Windows">Windows</option>
          <option value="Mac">Mac</option>
          <option value="Linux">Linux</option>
          {/* Add other OS as needed */}
        </select>
      </div>
      <button onClick={handlePredict}>Predict Price</button>
      {predictedPrice && <div>Predicted Price: {predictedPrice}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default LaptopPredictor;
