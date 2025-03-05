import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

enum PopularPlan {
  NO = 0,
  YES = 1,
}
enum MonthlyPlan{
  NO = 0,
  YES = 1,
}

interface PlanProps {
  title: string;
  popular: PopularPlan;
  month: Boolean;
  price: number|string;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const plans: PlanProps[] = [
  {
    title: "Básico",
    popular: 0,
    month: true,
    price: 1,
    description:
      "Prueba un chatbot simple y descubre el poder de la automatización.",
    buttonText: "Lo quiero",
    benefitList: [
      "Chatbot básico para WhatsApp o Instagram",
      "Respuestas automáticas",
      "Guía para configuración e integración",
      "Asistencia por IA",
      "Modelo básico"
    ],
  },
  {
    title: "Consultoría en IA",
    popular: 1,
    month: false,
    price: 500,
    description:
      "Auditoría completa para descubrir cómo la IA puede optimizar tu negocio.",
    buttonText: "Solicitar Consultoría",
    benefitList: [
      "Evaluación de procesos internos de hasta 3 áreas",
      "Diseño de soluciones con IA y roadmap de implementación",
      "Identificación de oportunidades de automatización",
      "Validación de estrategias y ajuste del plan según necesidades",
      "Informe detallado con plan de acción",
      "Descuento del 100% si desarrollas con nosotros",
    ],
  },
  {
    title: "IA y Automatización a Medida",
    popular: 0,
    month: false,
    price: "Contáctanos",
    description:
      "Desarrollo de soluciones de IA personalizadas que transforman tu negocio.",
    buttonText: "Agendar Reunión",
    benefitList: [
      "Desarrollo de agentes de IA, aplicaciones y automatización a la medida",
      "Integraciones con todos tus sistemas",
      "Soporte y mantenimiento continuo",
      "Automatización de procesos internos y externos"
    ],
  },
];

export const PricingSection = () => {
  return (
    <section className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Nuestros Planes
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Planes de IA y Automatización para Cada Necesidad
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground pb-14">
        Desde pruebas básicas hasta soluciones empresariales avanzadas, elige el plan que mejor se adapte a tu negocio.
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-4">
        {plans.map(
          ({ title, popular, month, price, description, buttonText, benefitList }) => (
            <Card
              key={title}
              className={
                popular === PopularPlan?.YES
                  ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10 border-[1.5px] border-primary lg:scale-[1.1]"
                  : ""
              }
            >
              <CardHeader>
                <CardTitle className="pb-2">{title}</CardTitle>

                <CardDescription className="pb-4">
                  {description}
                </CardDescription>

                <div>
                  <span className="text-3xl font-bold">{price}</span>
                  {month && <span className="text-muted-foreground"> /mes</span>}
                </div>
              </CardHeader>

              <CardContent className="flex">
                <div className="space-y-4">
                  {benefitList.map((benefit) => (
                    <span key={benefit} className="flex">
                      <Check className="text-primary mr-2" />
                      <h3>{benefit}</h3>
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  variant={
                    popular === PopularPlan?.YES ? "default" : "secondary"
                  }
                  className="w-full"
                >
                  {buttonText}
                </Button>
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
