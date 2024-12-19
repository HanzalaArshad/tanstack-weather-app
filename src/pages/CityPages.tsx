import { createSearchParams, useParams, useSearchParams } from "react-router-dom"
import { useForecastQuery, useWeatherQuery } from "../hooks/useWeather";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "../components/ui/button";
import LoadingSkeleton from "../components/LoadingSkeleton";
import CurrentWeather from "../components/CurrentWeather";
import HourlyTemp from "../components/HourlyTemp";
import WeatherDetails from "../components/Weatherdetails";
import WeatherForecast from "../components/WeatherForecast";

const CityPages = () => {

  const [searchParams]=useSearchParams()
  const params=useParams();

const lat=parseFloat(searchParams.get("lat") || "0");
const lon=parseFloat(searchParams.get("lon")|| "0");

const coordinates={lat,lon};
  const weatherquery = useWeatherQuery(coordinates);
  const forecastquery = useForecastQuery(coordinates);

  if (weatherquery.error || forecastquery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch weather data. Please try again.</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (!weatherquery.data || !forecastquery.data || !params.cityName) {
    return <LoadingSkeleton />;



  }



  console.log(weatherquery.data);
  



  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">{params.cityName}</h1>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* current weathee */}
          <CurrentWeather
            data={weatherquery.data}
          />

          {/* hourly */}



          <HourlyTemp data={forecastquery.data} />
        </div>
        <div>
          {/* details */}

          <div className="gird gap-6  md:grid-cols-2 items-start">
          <WeatherDetails data={weatherquery.data} />

          {/* forecast */}
          <WeatherForecast data={forecastquery.data}/>
          
          </div>
        </div>
      </div>
    </div>
  );

}

export default CityPages