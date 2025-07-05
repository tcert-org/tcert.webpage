import SectionWithImage from "@/components/section-with-image";

export default function AboutUs() {
  return (
    <div className="mt-28">
      <h1 className="ms-[5%] mb-8 font-base tracking-tighter text-4xl flex flex-nowrap text-gray-800">
        Nuestra misión y visión TCERT
      </h1>
      <section className="bg-gradient-to-b from-white via-blue-50 to-[#C8D9E7]">
        <SectionWithImage
          miniTitle="Compromiso con la excelencia"
          title="MISIÓN"
          subtitle="En T-CERT nos dedicamos a certificar profesionales altamente capacitados para afrontar con éxito los desafíos del mundo laboral, garantizando calidad, inmediatez y eficiencia en cada certificación."
          imageSrc={["/imgs/1.webp", "/imgs/2.webp", "/imgs/3.webp"]}
          badges={["Calidad", "Eficiencia", "Confianza"]}
          showButton={false}
          right={true}
        />
      </section>
      <section className="bg-gradient-to-t from-slate-50 via-blue-50 to-[#C8D9E7] mb-10">
        <SectionWithImage
          miniTitle="Un futuro de oportunidades"
          title="VISIÓN"
          subtitle="Ser líderes en certificación profesional, formando expertos altamente capacitados para enfrentar con éxito los desafíos de la vida laboral, garantizando excelencia en cada etapa del proceso."
          imageSrc={["/imgs/9.webp", "/imgs/7.webp", "/imgs/6.webp"]}
          badges={["Liderazgo", "Progreso", "Preparación"]}
          showButton={false}
          right={false}
        />
      </section>
    </div>
  );
}
