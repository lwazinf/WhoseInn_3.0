// Import dependencies
import React, { useState, useEffect, useRef, FC } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import {
  CacheDataState,
  DepthState,
  FocusState,
  MarkerState,
  MarkerState2,
  MenuState,
  OpenState,
  RollingState,
  UserState,
} from "../atoms/atoms";
import { useRecoilState } from "recoil";
// @ts-ignore
import latlng from "latitude-longitude";
import { Timestamp } from "@firebase/firestore";
import { createLocationData_ } from "@/firebase";
import { v4 as uuidv4 } from "uuid";

// Define the interface for MarkerData.
interface MarkerData {
  coordinates: [number, number];
  title: string;
}

// Loader component for showing loading animation.
const Loader: FC = () => (
  <div className="absolute z-[10000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    {/* Loader SVG content */}
  </div>
);

// Main component definition.
const Map: FC = () => {
  const locations = { lat: -29.0852, lng: 26.1596 };
  const [clickedCoordinates, setClickedCoordinates] = useState<
    [number, number] | null
  >(null);
  const [cacheData, setCacheData] = useRecoilState(CacheDataState);

  // Initialize local state.
  const [markerData, setMarkerData] = useRecoilState(MarkerState);
  const [markerData2, setMarkerData2] = useRecoilState(MarkerState2);
  const [rolling, setRolling] = useRecoilState(RollingState);
  const [loading, setLoading] = useState<boolean>(false);
  const [focus, setFocus] = useRecoilState(FocusState);
  const [menu, setMenu] = useRecoilState(MenuState);
  const [open, setOpen] = useRecoilState(OpenState);
  const [user, setUser] = useRecoilState(UserState);
  const [deep, setDeep] = useRecoilState(DepthState);
  const [submittedQuestion, setSubmittedQuestion] = useState<string | null>(
    null
  );

  const updateRollingList = (newValue: any) => {
    if (rolling.length >= 9) {
      const uuid = uuidv4();
      createLocationData_({
        data: [...rolling, newValue],
        uid: uuid,
        type: "heat",
      });
      // Reset to an empty array when the length reaches 5
      setRolling([]);
    } else {
      // Update the list with the new value
      // @ts-ignore
      setRolling((prevList) => [...prevList, newValue]);
    }
  };

  // Declare useRef to reference map.
  const mapRef = useRef<any | null>(null);

  // ClickHandler component for handling map click events.
  const ClickHandler: FC = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setClickedCoordinates([lat, lng]);

        updateRollingList({
          lat: lat,
          lng: lng,
          timestamp: Timestamp.now(),
          user: user.uid,
        });

        // Update markerData.coordinates when a click event occurs
        setMarkerData((prevMarkerData) => ({
          ...prevMarkerData,
          coordinates: [lat, lng],
        }));
        setMarkerData2((prevMarkerData2) => ({
          ...prevMarkerData2,
          coordinates: [lat, lng],
        }));
        setFocus({});
        !open && setMenu("Providers");

        const kilometres = latlng.getDistance(
          [-29.106992683815335, 26.192525701845852],
          [lat, lng]
        );
        console.log(kilometres);
      },
    });

    return null;
  };

  // ZoomHandler component for handling map zoom events.
  const ZoomHandler: FC = () => {
    const map = useMap();

    const flyToMarker = (coordinates: [number, number], zoom: number) => {
      if (coordinates && typeof coordinates[0] !== "undefined") {
        map.flyTo(coordinates, zoom, {
          animate: true,
          duration: 1.5,
        });
      }
    };

    useMapEvents({
      zoomend: () => {
        setLoading(false);
      },
    });

    useEffect(() => {
      if (
        markerData &&
        markerData.coordinates &&
        typeof markerData.coordinates[0] !== "undefined"
      ) {
        // @ts-ignore
        flyToMarker(markerData.coordinates, 16);
      }
    }, [markerData]);

    return null;
  };

  // Return the JSX for rendering.
  return (
    <>
      {/* Show the loader if loading. */}
      {loading && <Loader />}
      {/* Conditionally render the title overlay. */}
      {markerData && markerData.coordinates && (
        <div className="flex items-center justify-center absolute top-3 right-3 z-[100000]">
          {/* Title overlay content */}
        </div>
      )}
      {/* Add the map container. */}
      <MapContainer
        center={[locations.lat, locations.lng]}
        zoom={15}
        style={{ height: "100vh", width: "100vw" }}
      >
        {/* Set the tile layer for the map. */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* Conditionally render the marker. */}
        {markerData && markerData.coordinates && (
          // @ts-ignore
          <Marker position={markerData.coordinates} />
        )}
        {/* Include the ZoomHandler for zoom events. */}
        <ZoomHandler />
        {!(open || deep.logic) && <ClickHandler />}
      </MapContainer>
    </>
  );
};

// Export the Map component.
export default Map;
