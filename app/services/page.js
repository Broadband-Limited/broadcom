import React from "react";
import Landing from "../components/Services/Landing";
import ServiceListing from "../components/Services/ServiceListing";

const Services = () => {
  return (
    <section className="h-fit flex flex-col items-center gap-12">
      <Landing />
      <ServiceListing />
    </section>
  );
}

export default Services