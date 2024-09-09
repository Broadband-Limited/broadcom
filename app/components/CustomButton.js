import Link from 'next/link'

const CustomButton = ({ text, href = '/' }) => {
  return (
    <Link
      href={href}
      className="relative group mt-16 w-fit py-3 px-6 bg-black text-white font-semibold before:w-full before:h-full before:scale-x-0 before:transition-transform before:duration-300 before:origin-left before:bg-r-blue hover:gap-4 hover:text-black hover:before:scale-x-100 isolate before:absolute before:top-0 before:left-0 before:z-0"
    >
      <span className="relative z-10 flex items-center gap-2 text-white capitalize w-fit">
        {text}
        <svg
          className="group-hover:translate-x-2 transition-all duration-300"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="white"
          height="16"
          width="16"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
          />
        </svg>
      </span>
    </Link>
  )
}

export default CustomButton
