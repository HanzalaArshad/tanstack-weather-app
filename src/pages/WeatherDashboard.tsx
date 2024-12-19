import { Button } from "../components/ui/button";
import { AlertTriangle, MapPin, RefreshCcw } from "lucide-react";
import { UseGeoLocation } from "../hooks/usegeolocation";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import {
  useForecastQuery,
  useReverseGeocodeQuery,
  useWeatherQuery,
} from "../hooks/useWeather";
import CurrentWeather from "../components/CurrentWeather";
import HourlyTemp from "../components/HourlyTemp";
import Weatherdetails from "../components/Weatherdetails";
import WeatherForecast from "../components/WeatherForecast";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    isLoading: locationLoading,
    getLocation,
  } = UseGeoLocation();

  const locationquery = useReverseGeocodeQuery(coordinates);

  const weatherquery = useWeatherQuery(coordinates);
  const forecastquery = useForecastQuery(coordinates);

  console.log(locationquery);
  console.log(weatherquery.data);

  const handleRefresh = () => {
    getLocation();

    if (coordinates) {
      weatherquery.refetch();
      forecastquery.refetch();
      weatherquery.refetch();
    }
  };

  if (locationLoading) {
    return <LoadingSkeleton />;
  }

  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>

          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert>
        <MapPin className="h-4 w-4" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather.</p>
          <Button variant="outline" onClick={getLocation} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const LocationName = locationquery.data?.[0];

  if (weatherquery.error || forecastquery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>

          <Button variant="outline" onClick={handleRefresh} className="w-fit">
            <RefreshCcw className="mr-2 h-4 w-4" />
            retry
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherquery.data || !forecastquery.data) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My location</h1>
        <Button
          variant="outline"
          size="icon"
          onClick={handleRefresh}
          disabled={weatherquery.isFetching || forecastquery.isFetching}
        >
          <RefreshCcw
            className={`h-4 w-4 ${
              weatherquery.isFetching ? "animate-spin" : " "
            }`}
          />
        </Button>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* current weathee */}
          <CurrentWeather
            data={weatherquery.data}
            LocationName={LocationName}
          />

          {/* hourly */}



          <HourlyTemp data={forecastquery.data} />
        </div>
        <div>
          {/* details */}

          <div className="gird gap-6  md:grid-cols-2 items-start">
          <Weatherdetails data={weatherquery.data} />

          {/* forecast */}
          <WeatherForecast data={forecastquery.data}/>
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
