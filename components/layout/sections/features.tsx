import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import { Button } from "@/components/ui/button";
interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}
import FixedLinkButton from "@/components/ui/fixed-link-button";

const featureList: FeaturesProps[] = [
  {
    icon: "Lightbulb",
    title: "Tecnología que Entiende tu Negocio",
    description: "No aplicamos IA por aplicarla. Analizamos tus necesidades y desarrollamos soluciones que realmente optimizan tus procesos."
  },
  {
    icon: "Brain",
    title: "Más que Chatbots, Inteligencia Accionable",
    description: "Creamos agentes de IA que no solo responden, sino que ejecutan tareas, procesan datos y toman decisiones."
  },
  {
    icon: "PlugZap",
    title: "Automatización sin Fricción y Simple",
    description: "Nos aseguramos de que la integración con tus herramientas actuales sea fluida y sin interrupciones."
  },
  {
    icon: "TrendingUp",
    title: "Personalización Real",
    description: "Cada solución es adaptada a las necesidades de tu empresa, sin configuraciones genéricas o limitadas."
  },
  {
    icon: "TrendingUp",
    title: "Éxito a Largo Plazo",
    description: "No solo te vendemos una solución, te acompañamos con soporte, mejoras y evolución constante."
  },
  {
    icon: "Smile",
    title: "Compromiso con la Simplicidad",
    description: "Hacemos que la IA sea accesible, sin tecnicismos innecesarios. Cualquiera puede usarla y beneficiarse de ella."
  }
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Nuestro Valor
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Nuestra Diferencia: IA con Propósito y Resultados
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        No solo creamos tecnología, desarrollamos soluciones inteligentes que realmente generan impacto en tu negocio.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle className="text-center">{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}

      </div>
      <div className="flex justify-center mt-5">
              <FixedLinkButton className="w-5/6 md:w-1/4 font-bold group/arrow">
                Agendar Ahora
              </FixedLinkButton>
        </div>
    </section>
  );
};
