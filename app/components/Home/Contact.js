import CustomButton from '../CustomButton'

const Contact = () => {
  return (
    <section className="min-h-[40vh] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-serif">Let’s talk business.</h2>

      <CustomButton text="Contact Us" href='/contact' />
    </section>
  )
}

export default Contact
