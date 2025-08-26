import SectionWithImage from "@/components/section-with-image";

export default function AboutUs() {
  return (
    <div className="mt-28">
      <section>
        <SectionWithImage
          miniTitle="Compromiso con la excelencia"
          title="MISIÓN"
          subtitle="En T-CERT nos dedicamos a certificar profesionales altamente capacitados a enfrentar desafíos de la vida laboral, garantizandocalidad, inmediatez y eficiencia."
          imageSrc={["/imgs/1.webp", "/imgs/2.webp", "/imgs/3.webp"]}
          badges={["Calidad", "Eficiencia", "Confianza"]}
          showButton={false}
          right={true}
        />
      </section>
      <section>
        <SectionWithImage
          miniTitle="Un futuro de oportunidades"
          title="VISIÓN"
          subtitle="Ser líder en certificación profesional altamente capacitadas para enfrentar con éxito los desafíos de la vida laboral, garantizandoexcelencia en cada etapa del proceso."
          imageSrc={["/imgs/9.webp", "/imgs/7.webp", "/imgs/6.webp"]}
          badges={["Liderazgo", "Progreso", "Preparación"]}
          showButton={false}
          right={false}
        />
      </section>
    </div>
  );
}
