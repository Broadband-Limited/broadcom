import { Email, Phone, Place } from "@mui/icons-material";

const Footer = () => {
  const contactDetails = [
    {
      title: "Phone",
      value: "+254-734026409",
      icon: <Phone />,
    },
    {
      title: "Phone",
      value: "+254-718896167",
      icon: <Phone />,
    },
    {
      title: "Phone",
      value: "+254-724562063",
      icon: <Phone />,
    },
    {
      title: "Phone",
      value: "+254-20-3746897",
      icon: <Phone />,
    },
    {
      title: "Phone",
      value: "+254-20-3746669",
      icon: <Phone />,
    },
    {
      title: "Email",
      value: "info@broadcom.co.ke",
      icon: <Email />, 
    },
    {
      title: "Email",
      value: "sales@broadcom.co.ke",
      icon: <Email />,
    },
    {
      title: "Location",
      value: "Kalson Towers, 2nd Floor, Crescent Lane",
      icon: <Place />, 
    },
  ];

  return (
    <footer id="footer" className="bg-gray-100/50">

      <div className="w-full flex flex-col items-center gap-6 py-10 px-12 md:px-64">

        <ul className="w-full flex flex-col gap-8 whitespace-nowrap">
          {contactDetails.map((contact, index) => (
            <li key={index} className="w-full flex items-center gap-8">
              <div className="w-[5%] md:w-2/5 md:text-right">{contact.icon}</div>
              <p className="w-[95%] md:w-3/5 text-wrap">{contact.value}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="copyright bg-black">
        <p className="container-custom-xs text-gray-400 py-5 px-4 text-center text-sm">
          Copyright © 2023 - Broadband Communications Networks Limited
        </p>
      </div>
    </footer>
  );
};

export default Footer;