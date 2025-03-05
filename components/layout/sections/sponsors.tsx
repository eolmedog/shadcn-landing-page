"use client";

import { Icon } from "@/components/ui/icon";
import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";
import { icons } from "lucide-react";
import Image from 'next/image';
interface sponsorsProps {
  icon: string;
  name: string;
  file: string;
}

const sponsors: sponsorsProps[] = [
  {
    icon: "Crown",
    name: "Centro El Golf",
    file: "/elgolf.jpg",
  },
  {
    icon: "Puzzle",
    name: "Kreems",
    file: "/logo_kreems.png"
  },
  {
    icon: "Squirrel",
    name: "Medestuk",
    file: "/medestuk.webp"
  },
  {
    icon: "Cookie",
    name: "Orsan",
    file: "/orsan_holding_logo.jpeg"
  },
  {
    icon: "Drama",
    name: "Polpaico",
    file: "/polpaico.jpg"
  },
  {
    icon: "Puzzle",
    name: "Tecnasic",
    file: "/tecnasic.jpeg"
  },
  {
    icon: "Puzzle",
    name: "Vilanco",
    file: "/vilanco.png"
  },
  {
    icon: "Puzzle",
    name: "Yadran",
    file: "/yadran.jpeg"
  }


];

export const SponsorsSection = () => {
  return (
    <section id="sponsors" className="max-w-[65%] mx-auto pb-24 sm:pb-32">
      <h2 className="text-lg md:text-xl text-center mb-6">
        Algunos de Nuestros Clientes
      </h2>

      <div className="mx-auto">
        <Marquee
          className="gap-[5rem]"
          fade
          innerClassName="gap-[5rem]"
          pauseOnHover
        >
          {sponsors.map(({ icon, name , file}) => (
            <div
              key={name}
              className="flex items-center text-xl md:text-2xl font-medium rounded-full"
            >
              <Image
                className="rounded-full"
                src={file}
                alt={name}
                width={100}
                height={100}
                
                />
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
