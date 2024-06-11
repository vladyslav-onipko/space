import { useRef, useEffect, memo } from 'react';

import { styled } from 'styled-components';

const MapBox = styled.div`
  border-radius: 10px;
  height: 100%;
  width: 100%;
`;

interface MapProps {
  markerTitle: string;
  center: google.maps.LatLngLiteral;
  zoom?: number;
}

const Map: React.FC<MapProps> = ({ center, zoom, markerTitle, ...props }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    const addGoogleMap = async () => {
      const { AdvancedMarkerElement } = (await window.google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

      const map = new window.google.maps.Map(mapRef.current!, {
        center,
        zoom: zoom || 16,
        mapId: process.env.REACT_APP_GOOGLE_MAP_ID,
      });

      new AdvancedMarkerElement({ position: center, map, title: markerTitle });
    };

    addGoogleMap();
  }, [center, zoom, markerTitle]);

  return <MapBox ref={mapRef} id="map" {...props}></MapBox>;
};

export default memo(Map);
