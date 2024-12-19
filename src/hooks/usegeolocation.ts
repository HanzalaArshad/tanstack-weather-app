import { useEffect, useState } from "react";   
import { Coordinates } from "../api/types";

interface GeoLocationState {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}

export function UseGeoLocation() {
  const [locationData, setLocationData] = useState<GeoLocationState>({
    coordinates: null,
    error: null,
    isLoading: true,
  });

  const getLocation = () => {
    // Set loading state and reset error
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    // Check if Geolocation is supported
    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by your browser",
        isLoading: false,
      });
      return;
    }

    // Fetch location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location is denied. Please enable location access.";
            break;

          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;

          case error.TIMEOUT:
            errorMessage = "Location request timeout.";
            break;

          default:
            errorMessage = "An unknown error occurred.";
        }

        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  // Automatically fetch location on mount
  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}
