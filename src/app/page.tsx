import ContactForm from "@/components/contact-form";
import CourseCarousel from "@/components/course-carousel";
import Hero from "@/components/hero";
import SectionWithImage from "@/components/section-with-image";

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black">
      <section id="hero" className="w-full">
        <Hero />
      </section>
      <section id="vision" className="scroll-mt-12">
        <SectionWithImage
          miniTitle="Impulsando tu crecimiento"
          title="SOBRE NOSOTROS"
          subtitle="En T-CERT nos especializamos en potenciar tu crecimiento profesional, ofreciéndote herramientas de calidad diseñadas para prepararte con confianza y éxito ante los desafíos del mercado."
          imageSrc={["/instructor_teaching.jpeg", "/bg-form-section.webp"]}
          badges={["Compromiso", "Innovación", "Excelencia"]}
          buttonText="VER MÁS"
          showButton={true}
          right={true}
        />
      </section>
      <section id="courses" className="scroll-mt-12">
        <CourseCarousel />
      </section>
      <section id="contact" className="scroll-mt-12">
        <ContactForm />
      </section>
    </div>
  );
}
