import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

enum ProService {
  YES = 1,
  NO = 0,
}
interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}
const serviceList: ServiceProps[] = [
  
  {
    title: "Chatbot Básico",
    description: "Prueba un bot simple para WhatsApp o Instagram y descubre el poder de la automatización.",
    pro: 0,
  },
  {
    title: "Consultoría en IA",
    description: "Identificamos oportunidades de automatización y diseñamos una estrategia de IA para tu negocio.",
    pro: 1,
  },
  {
    title: "Agentes de IA Personalizados",
    description: "Agentes a medida capaces de analizar de datos, automatizar procesos, atender clientes e integrarse con tus sistemas.",
    pro: 1,
  },
  {
    title: "Automatización de Procesos a Medida",
    description: "Desarrollamos flujos de trabajo inteligentes y herramientas personalizadas para optimizar tu negocio.",
    pro: 1,
  }
];

export const ServicesSection = () => {
  return (
    <section id="services" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Servicios
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        El Futuro de tu Empresa
      </h2>
      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
      Desde agentes inteligentes hasta automatización avanzada, desarrollamos soluciones personalizadas para optimizar cada área de tu empresa.
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
        {serviceList.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/60 dark:bg-card h-full relative"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <Badge
              data-pro={ProService.YES === pro}
              variant="secondary"
              className="absolute -top-2 -right-3 data-[pro=false]:hidden"
            >
              PRO
            </Badge>
          </Card>
        ))}
      </div>
    </section>
  );
};
