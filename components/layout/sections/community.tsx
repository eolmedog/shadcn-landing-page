import DiscordIcon from "@/components/icons/discord-icon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import FixedLinkButton from "@/components/ui/fixed-link-button";
export const CommunitySection = () => {
  return (
    <section id="community" className="py-12 ">
      <hr className="border-secondary" />
      <div className="container py-20 sm:py-20">
        <div className="lg:w-[60%] mx-auto">
          <Card className="bg-background border-none shadow-none text-center flex flex-col items-center justify-center">
            <CardHeader>
              <CardTitle className="text-4xl md:text-5xl font-bold flex flex-col items-center">
                <Image src="/logo.png" className="mb-5 rounded-full" width={100} height={100} alt="Logo" />
                <div>
                ¿Listo para llevar tu negocio al siguiente nivel con 
                  <span className="text-transparent pl-2 bg-gradient-to-r from-[#D247BF] to-primary bg-clip-text">
                  Inteligencia Artificial?
                  </span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="lg:w-[80%] text-xl text-muted-foreground">
              Agenda una consultoría inicial gratuita con nosotros y descubre las mejores oportunidades para tu negocio.
            </CardContent>

            <CardFooter>
              <FixedLinkButton asChild>
                
                  Agendar Ahora
                
              </FixedLinkButton>
            </CardFooter>
          </Card>
        </div>
      </div>
      <hr className="border-secondary" />
    </section>
  );
};
