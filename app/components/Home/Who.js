import CustomButton from "../CustomButton"

const Who = () => {
  return (
    <section className="container-custom-xs min-h-screen grid gap-14 place-content-center md:px-64">
      <h3 className="text-xl md:text-3xl tracking-wide leading-relaxed">
        We&apos;re a communication technologies
        solution provider, utilizing advanced technologies to serve large
        business organizations in Africa.
      </h3>
      <p className="leading-relaxed text-gray-600">
        We offer solutions for Civil and Military Air Traffic Control, Public
        Transport, Public Safety, Maritime and Aeronautical Information/Data
        Management. - With entities in several countries, we have three main
        business units: Implementation, Managed Services, and Solutions
        Divisions.
      </p>
      <CustomButton text={"who we are"} href="/about" />
    </section>
  )
}

export default Who
