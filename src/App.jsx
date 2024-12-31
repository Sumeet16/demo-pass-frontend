import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [inputColor, setInputColor] = useState("");

  // Fetch current color from the server
  useEffect(() => {
    const fetchColor = async () => {
      try {
        const response = await axios.get("https://demo-pass-backend.vercel.app/api/color");
        if (response.data.color) {
          setSelectedColor(response.data.color);
        }
      } catch (err) {
        console.error("Error fetching color:", err);
      }
    };
    fetchColor();
  }, []);

  // Update color on the server
  const updateColor = async (color) => {
    try {
      const response = await axios.post("https://demo-pass-backend.vercel.app/api/color", { color });
      if (response.data.color) {
        setSelectedColor(response.data.color);
      }
    } catch (err) {
      console.error("Error updating color:", err);
    }
  };

  // Button click handler
  const handleButtonClick = (color) => {
    updateColor(color);
  };

  // Input form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (/^#([0-9A-F]{3}){1,2}$/i.test(inputColor)) {
      updateColor(inputColor);
      setInputColor("");
    } else {
      alert("Please enter a valid hex color code.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>🎨 Color Selector</h1>
      
      <div style={styles.currentColorSection}>
        <h3 style={styles.subtitle}>
          Current Color: <span style={{ color: selectedColor }}>{selectedColor}</span>
        </h3>
        <div style={{ ...styles.colorDisplay, backgroundColor: selectedColor }}></div>
      </div>

      <div style={styles.buttonContainer}>
        {["#009e6a", "#9c46c0", "#d54e00", "#b19200", "#0068c4"].map((color) => (
          <button
            key={color}
            style={{ ...styles.colorButton, backgroundColor: color }}
            onClick={() => handleButtonClick(color)}
          >
            {color}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          value={inputColor}
          placeholder="Enter Hex Code (e.g., #123ABC)"
          onChange={(e) => setInputColor(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
};

export default App;

// Styles
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#333",
  },
  currentColorSection: {
    marginBottom: "30px",
    textAlign: "center",
  },
  subtitle: {
    color: "#000",
    fontSize: "1.2rem",
    marginBottom: "10px",
  },
  colorDisplay: {
    display: "inline-block",
    width: "150px",
    height: "150px",
    border: "2px solid #ddd",
    borderRadius: "10px",
    marginTop: "10px",
  },
  buttonContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))",
    gap: "15px",
    marginBottom: "30px",
    maxWidth: "400px",
  },
  colorButton: {
    padding: "15px",
    fontSize: "1rem",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  input: {
    padding: "10px",
    width: "100%",
    maxWidth: "300px",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  submitButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};
