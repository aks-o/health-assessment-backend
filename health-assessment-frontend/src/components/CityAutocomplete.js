import React, { useState, useRef, useEffect } from "react";

// Partial city list for brevity, you can expand as needed
const cities = [
  { name: "Mumbai", country: "India", flag: "🇮🇳" },
  { name: "Delhi", country: "India", flag: "🇮🇳" },
  { name: "Bangalore", country: "India", flag: "🇮🇳" },
  { name: "Hyderabad", country: "India", flag: "🇮🇳" },
  { name: "Chennai", country: "India", flag: "🇮🇳" },
  { name: "Kolkata", country: "India", flag: "🇮🇳" },
  { name: "Pune", country: "India", flag: "🇮🇳" },
  { name: "Ahmedabad", country: "India", flag: "🇮🇳" },
  { name: "Jaipur", country: "India", flag: "🇮🇳" },
  { name: "Surat", country: "India", flag: "🇮🇳" },
  { name: "New York", country: "United States", flag: "🇺🇸" },
  { name: "Los Angeles", country: "United States", flag: "🇺🇸" },
  { name: "Chicago", country: "United States", flag: "🇺🇸" },
  { name: "London", country: "United Kingdom", flag: "🇬🇧" },
  { name: "Toronto", country: "Canada", flag: "🇨🇦" },
  { name: "Sydney", country: "Australia", flag: "🇦🇺" },
  // ... add more as needed
];

export default function CityAutocomplete({ value, onChange, name = "city", placeholder = "Enter city name", required = false }) {
  const [inputValue, setInputValue] = useState(value || "");
  const [filtered, setFiltered] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleInput(e) {
    const val = e.target.value;
    setInputValue(val);
    const filteredCities = val.length > 0
      ? cities.filter(city => city.name.toLowerCase().includes(val.toLowerCase()))
      : cities;
    setFiltered(filteredCities);
    setShowDropdown(true);
    // propagate to parent
    onChange({ target: { name, value: val } });
  }

  function handleFocus() {
    setFiltered(inputValue.length > 0
      ? cities.filter(city => city.name.toLowerCase().includes(inputValue.toLowerCase()))
      : cities);
    setShowDropdown(true);
  }

  function handleSelect(city) {
    setInputValue(city.name);
    setFiltered([]);
    setShowDropdown(false);
    onChange({ target: { name, value: city.name } });
  }

  return (
    <div ref={wrapperRef} style={{ position: "relative", width: "100%" }}>
      <input
        type="text"
        name={name}
        value={inputValue}
        onChange={handleInput}
        onFocus={handleFocus}
        placeholder={placeholder}
        autoComplete="off"
        required={required}
        style={{
          width: "100%",
          padding: "15px",
          border: "2px solid #e0e6ed",
          borderRadius: "10px",
          fontSize: "16px",
          background: "white",
          color: "#2c3e50",
          transition: "all 0.3s ease",
          cursor: "pointer"
        }}
      />
      {showDropdown && filtered.length > 0 && (
        <ul style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "#fff",
          border: "1px solid #e0e6ed",
          borderRadius: "0 0 10px 10px",
          maxHeight: 220,
          overflowY: "auto",
          zIndex: 10,
          margin: 0,
          padding: 0,
          listStyle: "none"
        }}>
          {filtered.map((city, idx) => (
            <li
              key={city.name + city.country}
              onClick={() => handleSelect(city)}
              style={{
                padding: "10px 16px",
                cursor: "pointer",
                borderBottom: idx !== filtered.length - 1 ? "1px solid #eee" : "none",
                display: "flex",
                alignItems: "center"
              }}
            >
              <span style={{ marginRight: 8 }}>{city.flag}</span> {city.name}, <span style={{ color: "#888", fontSize: 13 }}>{city.country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
