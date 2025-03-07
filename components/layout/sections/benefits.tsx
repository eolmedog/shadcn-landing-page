import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import { Button } from "@/components/ui/button";
import FixedLinkButton from "@/components/ui/fixed-link-button";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "Workflow",
    title: "Automatiza Flujos de Trabajo Internos",
    description:
      "Los agentes de IA gestionan tareas administrativas, procesamiento de documentos, aprobaciones y actualización de sistemas, liberando a tu equipo del trabajo repetitivo.",
  },
  {
    icon: "MessagesSquare",
    title: "Impulsa Ventas y Servicio al Cliente 24/7",
    description:
      "Atiende clientes de manera instantánea en WhatsApp, Instagram o tu sitio web. Responde preguntas, capta leads y cierra ventas con o sin intervención humana.",
  },
  {
    icon: "BrainCircuit",
    title: "Toman Decisiones Como un Humano",
    description:
      "Analizan datos, detectan patrones y ejecutan acciones inteligentes, ya sea para asignar tareas, priorizar solicitudes o recomendar próximos pasos.",
  },
  {
    icon: "Network",
    title: "Se Integran Perfectamente con Tu Negocio",
    description:
      "Conéctalos a tu CRM, ERP, software interno y canales de comunicación para lograr una automatización total de tus operaciones.",
  },
  {
    icon: "HandHelping",
    title: "Te Acompañamos en Todo el Proceso",
    description: "No necesitas ser un experto en IA o tecnología. Desde la planificación hasta la implementación, te guiamos y hacemos recomendaciones en cada paso para que aproveches al máximo la automatización sin complicaciones."
  },
  {
    icon: "Code",
    title: "Tecnología y Soluciones a Medida",
    description: "Desarrollamos Automatizaciones personalizadas, plataformas web y herramientas que optimizan cualquier aspecto de tu negocio. Si tienes un proceso manual, podemos digitalizarlo y hacerlo más eficiente con tecnología a medida."
  }
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Beneficios</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Agentes de IA Que Trabajan Como Tu Mejor Colaborador
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Desde la automatización de procesos internos hasta la gestión de interacciones con clientes, los agentes de IA piensan, analizan y actúan para mantener tu negocio en marcha de manera eficiente.</p>
            <div className="flex justify-center">
              <FixedLinkButton className="w-5/6 md:w-1/4 font-bold group/arrow">
                Agendar Ahora
              </FixedLinkButton>
            </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
