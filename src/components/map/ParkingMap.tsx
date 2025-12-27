import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Key, ExternalLink } from 'lucide-react';

interface ParkingSpot {
  id: number;
  name: string;
  address: string;
  price: string;
  rating: number;
  available: number;
  lat: number;
  lng: number;
}

interface ParkingMapProps {
  spots: ParkingSpot[];
  onSpotSelect?: (spotId: number) => void;
  selectedSpotId?: number | null;
  center?: [number, number];
  zoom?: number;
}

const ParkingMap: React.FC<ParkingMapProps> = ({
  spots,
  onSpotSelect,
  selectedSpotId,
  center = [77.6146, 12.9344], // Default: Koramangala, Bangalore
  zoom = 14,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  
  const [mapboxToken, setMapboxToken] = useState<string>(() => {
    return localStorage.getItem('mapbox_token') || '';
  });
  const [tokenInput, setTokenInput] = useState('');
  const [isMapReady, setIsMapReady] = useState(!!mapboxToken);

  const saveToken = () => {
    if (tokenInput.trim()) {
      localStorage.setItem('mapbox_token', tokenInput.trim());
      setMapboxToken(tokenInput.trim());
      setIsMapReady(true);
    }
  };

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: center,
        zoom: zoom,
        pitch: 45,
        bearing: -17.6,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: true,
        }),
        'top-right'
      );

      // Add geolocate control
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        }),
        'top-right'
      );

      map.current.on('load', () => {
        // Add 3D buildings
        const layers = map.current?.getStyle()?.layers;
        if (layers) {
          const labelLayerId = layers.find(
            (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
          )?.id;

          map.current?.addLayer(
            {
              id: '3d-buildings',
              source: 'composite',
              'source-layer': 'building',
              filter: ['==', 'extrude', 'true'],
              type: 'fill-extrusion',
              minzoom: 12,
              paint: {
                'fill-extrusion-color': '#1a1a2e',
                'fill-extrusion-height': ['get', 'height'],
                'fill-extrusion-base': ['get', 'min_height'],
                'fill-extrusion-opacity': 0.6,
              },
            },
            labelLayerId
          );
        }
      });

      // Cleanup
      return () => {
        markersRef.current.forEach(marker => marker.remove());
        map.current?.remove();
      };
    } catch (error) {
      console.error('Error initializing map:', error);
      setIsMapReady(false);
      setMapboxToken('');
      localStorage.removeItem('mapbox_token');
    }
  }, [mapboxToken, center, zoom]);

  // Add/update markers when spots change
  useEffect(() => {
    if (!map.current || !mapboxToken) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    spots.forEach((spot) => {
      // Create custom marker element
      const el = document.createElement('div');
      el.className = 'parking-marker';
      el.innerHTML = `
        <div class="relative cursor-pointer transition-transform hover:scale-110 ${
          selectedSpotId === spot.id ? 'scale-125' : ''
        }">
          <div class="w-10 h-10 rounded-full ${
            selectedSpotId === spot.id 
              ? 'bg-primary shadow-lg shadow-primary/50' 
              : 'bg-card border-2 border-primary'
          } flex items-center justify-center">
            <span class="text-xs font-bold ${
              selectedSpotId === spot.id ? 'text-primary-foreground' : 'text-primary'
            }">${spot.available}</span>
          </div>
          <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 ${
            selectedSpotId === spot.id ? 'bg-primary' : 'bg-primary'
          } rotate-45"></div>
        </div>
      `;

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        className: 'parking-popup',
      }).setHTML(`
        <div class="bg-card p-3 rounded-lg border border-border min-w-[200px]">
          <h3 class="font-semibold text-foreground text-sm mb-1">${spot.name}</h3>
          <p class="text-muted-foreground text-xs mb-2">${spot.address}</p>
          <div class="flex items-center justify-between">
            <span class="text-primary font-bold">${spot.price}</span>
            <span class="text-green-500 text-xs">${spot.available} available</span>
          </div>
        </div>
      `);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([spot.lng, spot.lat])
        .setPopup(popup)
        .addTo(map.current!);

      el.addEventListener('click', () => {
        onSpotSelect?.(spot.id);
      });

      markersRef.current.push(marker);
    });
  }, [spots, selectedSpotId, mapboxToken, onSpotSelect]);

  // Fly to selected spot
  useEffect(() => {
    if (!map.current || !selectedSpotId) return;
    
    const selectedSpot = spots.find(s => s.id === selectedSpotId);
    if (selectedSpot) {
      map.current.flyTo({
        center: [selectedSpot.lng, selectedSpot.lat],
        zoom: 16,
        pitch: 60,
        duration: 1500,
      });
    }
  }, [selectedSpotId, spots]);

  if (!isMapReady) {
    return (
      <div className="relative w-full h-full bg-card rounded-xl border border-border flex items-center justify-center">
        <div className="max-w-md p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-primary" />
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            Enable Map View
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Enter your Mapbox public token to see parking locations on the map.
          </p>
          <div className="space-y-3">
            <div className="relative">
              <Key className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="pk.eyJ1..."
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={saveToken} className="w-full" disabled={!tokenInput.trim()}>
              Enable Map
            </Button>
            <a
              href="https://account.mapbox.com/access-tokens/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
            >
              Get a free Mapbox token
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-xl overflow-hidden" />
      
      {/* Map overlay gradient */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/80 to-transparent pointer-events-none rounded-b-xl" />
      
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 border border-border">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-6 h-6 rounded-full bg-card border-2 border-primary flex items-center justify-center">
            <span className="text-[10px] font-bold text-primary">5</span>
          </div>
          <span className="text-muted-foreground">Available spots</span>
        </div>
      </div>

      {/* Reset token button */}
      <button
        onClick={() => {
          localStorage.removeItem('mapbox_token');
          setMapboxToken('');
          setIsMapReady(false);
        }}
        className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-border text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        Reset Token
      </button>
    </div>
  );
};

export default ParkingMap;
