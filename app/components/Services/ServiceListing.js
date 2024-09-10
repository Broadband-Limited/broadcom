// ServiceListing.js
'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { CircularProgress } from '@mui/material'
import { Carousel } from 'flowbite-react'

// Static imports for the required icons
import CellTowerOutlinedIcon from '@mui/icons-material/CellTowerOutlined'
import NetworkCheckOutlinedIcon from '@mui/icons-material/NetworkCheckOutlined'
import CableOutlinedIcon from '@mui/icons-material/CableOutlined'
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import StorageOutlinedIcon from '@mui/icons-material/StorageOutlined'
import MonitorOutlinedIcon from '@mui/icons-material/MonitorOutlined'
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined'
import EnergySavingsLeafOutlinedIcon from '@mui/icons-material/EnergySavingsLeafOutlined'
import SolarPowerOutlinedIcon from '@mui/icons-material/SolarPowerOutlined'
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined'
import BatteryChargingFullOutlinedIcon from '@mui/icons-material/BatteryChargingFullOutlined'

const iconMap = {
  CellTowerOutlined: CellTowerOutlinedIcon,
  NetworkCheckOutlined: NetworkCheckOutlinedIcon,
  CableOutlined: CableOutlinedIcon,
  WifiOutlined: WifiOutlinedIcon,
  SettingsOutlined: SettingsOutlinedIcon,
  StorageOutlined: StorageOutlinedIcon,
  MonitorOutlined: MonitorOutlinedIcon,
  CloudOutlined: CloudOutlinedIcon,
  EnergySavingsLeafOutlined: EnergySavingsLeafOutlinedIcon,
  SolarPowerOutlined: SolarPowerOutlinedIcon,
  FactCheckOutlined: FactCheckOutlinedIcon,
  BatteryChargingFullOutlined: BatteryChargingFullOutlinedIcon,
}

const ServiceCard = ({ service }) => {
  const IconComponent = iconMap[service.icon] || (() => null)

  return (
    <div className="service-card w-full flex flex-col gap-6">
      <IconComponent className="icon" />
      <h3 className='text-2xl gelasio'>{service.title}</h3>
      <p>{service.description}</p>
      <div className="image w-full aspect-[21/9]">
        <Image
          src={`/${service.image}`}
          alt={service.title}
          width={400}
          height={300}
        />
      </div>
      <div className="domains">
        {service.domains.map((domain, index) => {
          const DomainIcon = iconMap[domain.icon] || (() => null)
          return (
            <div key={index} className="domain">
              <DomainIcon className="icon" />
              <h4>{domain.title}</h4>
              <p>{domain.description}</p>
            </div>
          )
        })}
      </div>
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
    <>
      {data.map((service, index) => (
        <ServiceCard key={index} service={service} />
      ))}
    </>
  )
}

export default ServiceListing