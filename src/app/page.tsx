import ContactForm from "@/components/contact-form";
import CourseCarousel from "@/components/course-carousel";
import Hero from "@/components/hero";
import PartnersSection from "@/components/partners-section";
import SectionWithImage from "@/components/section-with-image";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";

export default function Home() {
  return (
    <div>
      <section id="hero" className="w-full">
        <Hero />
      </section>
      <section id="vision" className="scroll-mt-12">
        <SectionWithImage
          miniTitle="Impulsando tu crecimiento"
          title="SOBRE NOSOTROS"
          subtitle="En T-CERT nos especializamos en impulsar tu crecimiento profesional a través de certificaciones de alta calidad. Te brindamos las herramientas necesarias para afrontar conconfianza y éxito los desafíos del mercado actual."
          imageSrc={["/instructor_teaching.jpeg", "/bg-form-section.webp"]}
          badges={["Agilidad", "Innovación", "Calidad"]}
          buttonText="VER MÁS"
          showButton={true}
          right={true}
        />
      </section>
      <section id="partners" className="scroll-mt-12">
        <PartnersSection />
      </section>
      <section id="courses" className="scroll-mt-12">
        <CourseCarousel />
      </section>
      <section className="py-16 max-w-6xl mx-auto px-4 md:px-6 scroll-mt-12">
        <TestimonialsCarousel />
      </section>
      <section id="contact" className="scroll-mt-12">
        <ContactForm />
      </section>
    </div>
  );
}
