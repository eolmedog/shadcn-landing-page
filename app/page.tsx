import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { ContactSection } from "@/components/layout/sections/contact";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { PricingSection } from "@/components/layout/sections/pricing";
import { ServicesSection } from "@/components/layout/sections/services";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { TeamSection } from "@/components/layout/sections/team";
import { TestimonialSection } from "@/components/layout/sections/testimonial";
import ChatComponent from "@/components/ui/chat_popup";
import { Navbar } from "@/components/layout/navbar";
export const metadata = {
  title: "Automatiza Lo Fome",
  description: "Potencia tu Negocio con IA",
  icons: {
    icon: "/logo.png",
  }
  // openGraph: {
  //   type: "website",
  //   url: "https://github.com/nobruf/shadcn-landing-page.git",
  //   title: "Shadcn - Landing template",
  //   description: "Free Shadcn landing page for developers",
  //   images: [
  //     {
  //       url: "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
  //       width: 1200,
  //       height: 630,
  //       alt: "Shadcn - Landing template",
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   site: "https://github.com/nobruf/shadcn-landing-page.git",
  //   title: "Shadcn - Landing template",
  //   description: "Free Shadcn landing page for developers",
  //   images: [
  //     "https://res.cloudinary.com/dbzv9xfjp/image/upload/v1723499276/og-images/shadcn-vue.jpg",
  //   ],
  // },
};

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SponsorsSection />
      <BenefitsSection />
      <FeaturesSection />
      <ServicesSection />
      <TestimonialSection />
      {/* //<TeamSection /> */}
      <PricingSection />
      <CommunitySection />s
      {/* <ContactSection />
      <FAQSection /> */}
      <FooterSection />
      <ChatComponent />
    </>
  );
}
