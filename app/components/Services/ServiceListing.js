// ServiceListing.js
'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { CircularProgress } from '@mui/material'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

// Static imports for the required icons
import CellTowerOutlinedIcon from '@mui/icons-material/CellTowerOutlined';
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import NetworkCheckOutlinedIcon from '@mui/icons-material/NetworkCheckOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';
import FiberManualRecordOutlinedIcon from '@mui/icons-material/FiberManualRecordOutlined';
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined';
import PowerOutlinedIcon from '@mui/icons-material/PowerOutlined';
import AcUnitOutlinedIcon from '@mui/icons-material/AcUnitOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';

// Additional icons
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck';
import BuildIcon from '@mui/icons-material/Build';
import ConstructionIcon from '@mui/icons-material/Construction';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import WifiIcon from '@mui/icons-material/Wifi';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import PowerIcon from '@mui/icons-material/Power';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SecurityIcon from '@mui/icons-material/Security';

// Updated iconMap
const iconMap = {
  CellTowerOutlined: CellTowerOutlinedIcon,
  WifiOutlined: WifiOutlinedIcon,
  EngineeringOutlined: EngineeringOutlinedIcon,
  NetworkCheckOutlined: NetworkCheckOutlinedIcon,
  BuildOutlined: BuildOutlinedIcon,
  ConstructionOutlined: ConstructionOutlinedIcon,
  FiberManualRecordOutlined: FiberManualRecordOutlinedIcon,
  BatteryChargingFullOutlined: BatteryChargingFullOutlinedIcon,
  PowerOutlined: PowerOutlinedIcon,
  AcUnitOutlined: AcUnitOutlinedIcon,
  SecurityOutlined: SecurityOutlinedIcon,
  
  // New icons
  NetworkCheck: NetworkCheckIcon,
  Build: BuildIcon,
  Construction: ConstructionIcon,
  FiberManualRecord: FiberManualRecordIcon,
  Wifi: WifiIcon,
  BatteryChargingFull: BatteryChargingFullIcon,
  Power: PowerIcon,
  AcUnit: AcUnitIcon,
  Security: SecurityIcon
};



const ServiceCard = ({ service }) => {
  const IconComponent = iconMap[service.icon] || (() => null)

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 4500,
  };

  return (
    <div className="service-card w-full flex flex-col gap-9 md:gap-12 p-4">
      <div className="flex items-center gap-2">
        <IconComponent className="icon text-4xl text-blue-600" />
        <h3 className='text-2xl gelasio'>{service.title}</h3>
      </div>
      <p className="text-gray-600">{service.description}</p>
      <div className="image w-full aspect-[4/3] md:aspect-[21/9] relative overflow-hidden">
        <Image
          src={`/${service.image}`}
          alt={service.title}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className="w-full">

        {/*  Mobile view: Carousel */}
        <div className="md:hidden">
          <Slider {...settings}>
            {service.domains.map((domain, index) => (
              <DomainCard key={index} domain={domain} />
            ))}
          </Slider>
        </div>

        {/* Desktop view: Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {service.domains.map((domain, index) => (
            <DomainCard key={index} domain={domain} />
          ))}
        </div>

      </div>
    </div>
  )
}

const DomainCard = ({ domain }) => {
  const DomainIcon = iconMap[domain.icon] || (() => null)
  
  return (
    <div className="domain w-full flex flex-col gap-4 md:border-2 border-x-blue-500 border-opacity-20 hover:border-opacity-100 md:p-4">
      <div className="flex items-center gap-2">
        <DomainIcon className="icon" />
        <h4 className="font-semibold">{domain.title}</h4>
      </div>
      <p className="text-gray-700 text-sm">{domain.description}</p>
    </div>
  )
}
const ServiceListing = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/services.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this effect runs only once

  if (loading) return <CircularProgress />;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="h-fit flex flex-col items-center gap-32 md:px-64">
      {data.map((service, index) => (
        <ServiceCard key={index} service={service} />
      ))}
    </section>
  )
}

export default ServiceListing