import { blue } from "@mui/material/colors";
import Link from "next/link";
import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const socialAccounts = [
  {
    title: 'Facebook',
    link: 'https://www.facebook.com/broadcom.co.ke',
    icon: FaFacebookSquare,
  },
  {
    title: 'Twitter / X',
    link: 'https://twitter.com/Broadband_Kenya',
    icon: FaSquareXTwitter,
  },
]

const Follow = () => {
  return(
    <section className="flex flex-col items-center gap-8 md:px-64 appear">
      <h2 className="text-2xl font-bold">follow us</h2>
      <p className="text-gray-600">Stay connected with us on our social media platforms to get the latest updates and industry insights.</p>

      <div className="flex gap-8">
        {socialAccounts.map((account, index) =>(
          <Link key={index} href={account.link} target="_blank" className="flex flex-col items-center gap-4">
            <account.icon className="text-5xl opacity-50" />
            <span className="text-base text-r-blue">{account.title}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Follow;