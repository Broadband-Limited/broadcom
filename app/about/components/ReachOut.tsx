import Button from '@/shared/components/ui/Button';
import React from 'react';

export default function ReachOut() {
  return (
    <section className="grid w-full aspect-[16/9] md:aspect-[3/1] !p-0">
      <video
        muted
        autoPlay
        playsInline
        loop
        className="col-start-1 row-start-1 w-full h-full aspect-[16/9] md:aspect-[3/1] object-cover">
        <source src="/videos/ready.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="col-start-1 row-start-1 z-[3] w-full h-full bg-black/50"></div>

      <div className="col-start-1 row-start-1 z-[4] flex flex-col items-center justify-center gap-8 p-4">
        <h1 className="!text-background text-4xl font-bold hidden md:flex">
          Reach out to us
        </h1>

        <p className="!text-background text-center opacity-100">
          Get in touch with us to learn more about how we can transform your
          network.
        </p>

        <Button
          href={'/contact'}
          variant="outline"
          className={'bg-transparent !text-background !border-background'}>
          Contact us
        </Button>
      </div>
    </section>
  );
}
