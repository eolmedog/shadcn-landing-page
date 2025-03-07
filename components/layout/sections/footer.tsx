import { Separator } from "@/components/ui/separator";
import { ChevronsDownIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Building2, Clock, Mail, Phone } from "lucide-react";

export const FooterSection = () => {
  return (
    <footer id="footer" className="container py-16 sm:py-24">
      <div className="p-6 sm:p-10 bg-card border border-secondary rounded-2xl">
        {/* Parent Flex Container */}
        <div className="flex flex-row sm:flex-col w-full gap-x-12 gap-y-8">
          {/* Logo and Name Section */}
          <div className="flex flex-col items-start">
            <Link href="#" className="flex items-center font-bold">
              <Image 
                alt="Logo" 
                src="/logo.png" 
                width={60} 
                height={60} 
                className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white" 
              />
              <h3 className="text-lg sm:text-2xl">Automatiza Lo Fome</h3>
            </Link>
          </div>

          {/* Contact Details - Moves to the Right on Larger Screens */}
          <div className="flex flex-col gap-2 sm:ml-auto text-sm">
            {/* Find Us */}
            <div>
              <div className="flex gap-2 mb-1">
                <Building2 />
                <div>Cerro El Plomo 5931, Oficina 1213. <br />Las Condes, Santiago. Chile.</div>
              </div>
              
            </div>

            
            
              <div className="flex gap-2 mb-1">
                <Phone />
                <div>+(569) 9888 9881</div>
              </div>
              
            

            {/* Mail Us */}
            <div>
              <div className="flex gap-2 mb-1">
                <Mail />
                <div>contacto@automatizalofome.cl</div>
              </div>
              
            </div>

            {/* Visit Us */}
            {/* <div>
              <div className="flex gap-2">
                <Clock />
                <div className="font-bold">Visit us</div>
              </div>
              <div>
                <div>Monday - Friday</div>
                <div>8AM - 4PM</div>
              </div>
            </div> */}
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-6" />

        {/* Copyright Section */}
        <section className="text-center text-sm sm:text-base">
          <h3>
            &copy; {new Date().getFullYear()} Todos los derechos reservados.
          </h3>
        </section>
      </div>
    </footer>
  );
};
