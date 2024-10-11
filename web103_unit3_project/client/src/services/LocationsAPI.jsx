// LocationsAPI.jsx
import axios from "axios";

const API_URL = "/api/locations"; // Base URL for the locations API

// Function to get all locations
export const getAllLocations = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching locations:", error);
    throw error;
  }
};

// Function to get a location by ID
export const getLocationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching location with ID ${id}:`, error);
    throw error;
  }
};

// Function to create a new location
export const createLocation = async (locationData) => {
  try {
    const response = await axios.post(API_URL, locationData);
    return response.data;
  } catch (error) {
    console.error("Error creating location:", error);
    throw error;
  }
};
