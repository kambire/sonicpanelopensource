
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";

// GeoJSON map data
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

// Sample listener data for different countries
const listenerData = [
  { country: "United States", listeners: 450, coordinates: [-95.7129, 37.0902], id: "usa" },
  { country: "Mexico", listeners: 230, coordinates: [-102.5528, 23.6345], id: "mx" },
  { country: "Brazil", listeners: 320, coordinates: [-47.9292, -15.7801], id: "br" },
  { country: "Spain", listeners: 180, coordinates: [-3.7492, 40.4637], id: "es" },
  { country: "United Kingdom", listeners: 210, coordinates: [-0.1278, 51.5074], id: "uk" },
  { country: "Germany", listeners: 190, coordinates: [10.4515, 51.1657], id: "de" },
  { country: "Argentina", listeners: 160, coordinates: [-63.6167, -38.4161], id: "ar" },
  { country: "Colombia", listeners: 140, coordinates: [-74.2973, 4.5709], id: "co" },
  { country: "Italy", listeners: 130, coordinates: [12.5674, 41.8719], id: "it" },
  { country: "France", listeners: 120, coordinates: [2.2137, 46.2276], id: "fr" },
  { country: "Japan", listeners: 95, coordinates: [138.2529, 36.2048], id: "jp" },
  { country: "Australia", listeners: 85, coordinates: [133.7751, -25.2744], id: "au" },
  { country: "Chile", listeners: 75, coordinates: [-71.5430, -35.6751], id: "cl" },
  { country: "Peru", listeners: 65, coordinates: [-75.0152, -9.1900], id: "pe" },
  { country: "South Africa", listeners: 55, coordinates: [22.9375, -30.5595], id: "za" },
];

// Function to determine color intensity based on listener count
const getColorIntensity = (listeners: number) => {
  const maxListeners = 500; // Adjust based on your expected maximum
  const minOpacity = 0.2;
  const opacity = Math.min(0.2 + (listeners / maxListeners) * 0.8, 1);
  return `rgba(59, 130, 246, ${opacity})`; // Blue with variable opacity
};

// Function to determine marker size based on listener count
const getMarkerSize = (listeners: number) => {
  const min = 5;
  const max = 20;
  return min + (listeners / 500) * (max - min);
};

const ListenersWorldMap = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Distribución Global de Oyentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] w-full">
          <ComposableMap
            projection="geoMercator"
            projectionConfig={{
              scale: 120,
            }}
          >
            <ZoomableGroup center={[0, 20]} zoom={1}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isHovered = geo.id === hoveredCountry;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={isHovered ? "#64b5f6" : "#e4e6ef"}
                        stroke="#FFFFFF"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: "none" },
                          hover: { outline: "none", fill: "#3b82f6" },
                          pressed: { outline: "none" },
                        }}
                        onMouseEnter={() => {
                          setHoveredCountry(geo.id);
                        }}
                        onMouseLeave={() => {
                          setHoveredCountry(null);
                        }}
                      />
                    );
                  })
                }
              </Geographies>
              {listenerData.map(({ country, listeners, coordinates, id }) => (
                <Marker 
                  key={id}
                  coordinates={coordinates}
                  data-tooltip-id="listener-tooltip"
                  data-tooltip-content={`${country}: ${listeners} oyentes`}
                  onMouseEnter={() => setTooltipContent(`${country}: ${listeners} oyentes`)}
                >
                  <circle 
                    r={getMarkerSize(listeners)}
                    fill={getColorIntensity(listeners)}
                    stroke="#FFFFFF"
                    strokeWidth={1.5}
                  />
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
          <Tooltip id="listener-tooltip" />
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <div>Total de Países: <span className="font-medium text-foreground">{listenerData.length}</span></div>
          <div className="text-right">Total de Oyentes: <span className="font-medium text-foreground">
            {listenerData.reduce((sum, item) => sum + item.listeners, 0)}
          </span></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ListenersWorldMap;
