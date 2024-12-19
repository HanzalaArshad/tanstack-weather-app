import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
import { WeatherData } from "../api/types";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails = ({ data }: WeatherDetailsProps) => {
  const { wind, main, sys } = data || {};

  if (!wind || !main || !sys) {
    return <div>Invalid data</div>;
  }

  const formatTime = (timeStamp: number) => {
    return format(new Date(timeStamp * 1000), "h:mm a");
  };

  const getWindDirection = (degree: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(((degree % 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys.sunset),
      icon: Sunset,
      color: "text-orange-500",
    },
    {
      title: "Wind",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-purple-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
  ];

  return (
    <div className="">
      <Card> 
        <CardHeader>
          <CardTitle>Weather Details</CardTitle>
        </CardHeader>
        <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="flex items-center gap-3 rounded-lg border p-4"
            >
              <detail.icon className={`h-5 w-5 ${detail.color}`} />
              <div>
                <p className="text-sm font-medium leading-none">
                  {detail.title}
                </p>
                <p className="text-sm text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      </Card>
    </div>
  );
};

export default WeatherDetails;
