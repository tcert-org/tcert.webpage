import ContactForm from "@/components/contact-form";
import CourseCarousel from "@/components/course-carousel";
import Hero from "@/components/hero";
import SectionWithImage from "@/components/section-with-image";

export default function Home() {
  return (
    <>
      <section
        id="hero"
        className="max-h-[90vh] lg:max-h-[105vh] xl:max-h-[105vh] mt-10 lg:mt-16 bg-gradient-to-t from-[#C8D9E7] via-gray-100 to-white "
      >
        <Hero />
      </section>
      <section
        id="vision"
        className="bg-gradient-to-tr from-slate-50 via-blue-50 to-[#C8D9E7] pt-16 scroll-mt-12 "
      >
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
      <section id="courses" className="scroll-mt-12 ">
        <CourseCarousel />
      </section>
      <section id="contact" className="scroll-mt-12 ">
        <ContactForm />
      </section>
    </>
  );
}
