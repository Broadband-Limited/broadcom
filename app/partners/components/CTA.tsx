import Button from "@/shared/components/ui/Button";
import React from "react";

const CTA = () =>{
  return(
    <section className="!py-12 md:!py-24 flex flex-col items-center gap-6">
      <h3 className="text-foreground text-center">Interested in Partnering with Us?</h3>
      <Button href={'/contact'}>Become a Partner</Button>
    </section>
  )
}

export default CTA