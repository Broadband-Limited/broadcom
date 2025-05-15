import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

import 'mapbox-gl/dist/mapbox-gl.css';
import Map, { MapRef, Marker, ViewState } from 'react-map-gl/mapbox';

type OfficeLocation = {
  country: string;
  address: string;
  coordinates: { lat: number; lng: number };
};

const officeLocations: OfficeLocation[] = [
  {
    country: 'Kenya',
    address: 'Kalson Towers, 2nd Floor, Crescent Lane',
    coordinates: { lat: -1.2921, lng: 36.8219 },
  },
  {
    country: 'Ethiopia',
    address:
      '1st Floor, Lideya Plaza, Wollo Sefer, Ethio-China Road, Off Bole Road',
    coordinates: { lat: 9.0054, lng: 38.7636 },
  },
  {
    country: 'Tanzania',
    address: 'Salasala, Dar es Salaam. P.O BOX 34624',
    coordinates: { lat: -6.7924, lng: 39.2083 },
  },
];

const Accordion = ({
  country,
  address,
  isOpen,
  onClick,
}: {
  country: string;
  address: string;
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`border ${
        isOpen ? 'border-indigo-500' : 'border-gray-300'
      } mb-2 overflow-hidden`}>
      <button
        onClick={onClick}
        className="w-full px-4 py-3 flex justify-between items-center hover:bg-slate-100 transition-colors">
        <span className="text-lg font-semibold text-gray-800">{country}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform text-gray-600 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`px-4 text-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-24 py-3' : 'max-h-0 py-0'
        }`}>
        {address}
      </div>
    </div>
  );
};

const MapComponent = ({
  selectedOffice,
}: {
  selectedOffice: OfficeLocation;
}) => {
  const mapRef = useRef<MapRef | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [viewState, setViewState] = useState({
    longitude: selectedOffice.coordinates.lng,
    latitude: selectedOffice.coordinates.lat,
    zoom: 14,
  });

  useEffect(() => {
    if (selectedOffice) {
      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [
            selectedOffice.coordinates.lng,
            selectedOffice.coordinates.lat,
          ],
          zoom: 14,
          duration: 1500,
        });
      }
    }
  }, [selectedOffice]);

  if (!process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN) {
    console.error('Mapbox Access Token is not configured!');
    return (
      <div>
        Map requires an access token. Please check your environment variables.
      </div>
    );
  }

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      // Use initialViewState for the first render
      onMove={(evt: { viewState: ViewState }) => setViewState(evt.viewState)} // Update viewState on user interaction
      style={{ width: '100%', height: '100%' }}
      mapStyle="mapbox://styles/mapbox/streets-v12">
      <Marker
        longitude={selectedOffice.coordinates.lng}
        latitude={selectedOffice.coordinates.lat}
        anchor="bottom">
        <div style={{ color: 'red', fontSize: '24px' }}>📍</div>
      </Marker>
    </Map>
  );
};

const Offices = () => {
  const [selectedOffice, setSelectedOffice] = useState(officeLocations[0]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openAccordion, setOpenAccordion] = useState<string | null>(
    officeLocations[0].country
  );

  const handleSelectOffice = (office: OfficeLocation) => {
    setSelectedOffice(office);
    // For desktop, also ensure the accordion is open for the selected office
    if (window.innerWidth >= 768) {
      // md breakpoint
      setOpenAccordion(office.country);
    }
  };

  const handlePrevSlide = () => {
    const newIndex =
      currentSlide === 0 ? officeLocations.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
    handleSelectOffice(officeLocations[newIndex]);
  };

  const handleNextSlide = () => {
    const newIndex =
      currentSlide === officeLocations.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newIndex);
    handleSelectOffice(officeLocations[newIndex]);
  };

  const handleAccordionClick = (office: OfficeLocation) => {
    setOpenAccordion(openAccordion === office.country ? null : office.country);
    // Only change selected office if opening a new accordion or it's different
    if (
      openAccordion !== office.country ||
      selectedOffice.country !== office.country
    ) {
      handleSelectOffice(office);
    }
  };

  useEffect(() => {
    handleSelectOffice(officeLocations[currentSlide]);
  }, [currentSlide]);

  return (
    <div className="w-full max-w-6xl mx-auto py-8 px-4">
      {/* Desktop View */}
      <div className="hidden md:flex gap-8">
        <div className="w-1/3 space-y-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Offices</h2>
          <div>
            {officeLocations.map((office) => (
              <Accordion
                key={office.country}
                country={office.country}
                address={office.address}
                isOpen={openAccordion === office.country}
                onClick={() => handleAccordionClick(office)}
              />
            ))}
          </div>
        </div>

        <div className="w-2/3 aspect-square relative border border-indigo-300 shadow-2xl overflow-hidden">
          {/* No LoadScript needed for react-map-gl */}
          <MapComponent selectedOffice={selectedOffice} />
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden relative">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Our Offices
        </h2>
        <div className="relative aspect-[3/4] overflow-hidden border border-pink-300 border-opacity-75 shadow-2xl">
          {/* No LoadScript needed for react-map-gl */}
          <MapComponent selectedOffice={selectedOffice} />
          {/* Mobile Carousel */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white bg-opacity-95 w-[90%] p-4 shadow-2xl border border-gray-200">
            <div className="relative">
              <button
                onClick={handlePrevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border border-indigo-400 hover:bg-indigo-50 transition-colors">
                <ChevronLeft className="w-5 h-5 text-indigo-600" />
              </button>

              <div className="px-10 text-center">
                <h3 className="font-bold text-lg mb-1 text-gray-800">
                  {officeLocations[currentSlide].country}
                </h3>
                <p className="!text-xs text-gray-600 leading-tight">
                  {officeLocations[currentSlide].address}
                </p>
              </div>

              <button
                onClick={handleNextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border border-indigo-400 hover:bg-indigo-50 transition-colors">
                <ChevronRight className="w-5 h-5 text-indigo-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offices;
