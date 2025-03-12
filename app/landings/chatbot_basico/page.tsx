"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  MessageSquare,
  Clock,
  Zap,
  Star,
  ChevronRight,
  Users,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import { TestimonialSection } from "@/components/layout/sections/testimonial"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Image src="/logo.png" alt="Logo" width={40} height={40} className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white"></Image>{/* <MessageSquare className="h-6 w-6 text-primary" /> */}
            <span>Automatiza Lo Fome</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Características
            </Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
              Cómo Funciona
            </Link>
            <Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
            <Button asChild size="sm">
              <Link href="#pricing">Obtén el Tuyo</Link>
            </Button>
          </nav>
          <Button variant="outline" size="icon" className="md:hidden">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container relative overflow-hidden py-20 md:py-32 lg:py-40">
          <div className="absolute inset-0 bg-grid-pattern opacity-5 -z-10"></div>
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="flex flex-col text-center md:text-left">
              <Badge className="w-fit mx-auto md:mx-0 mb-4">¡Oferta Especial!</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Tu Primer Chatbot con IA Por Solo <span className="text-primary">1 USD</span>
              </h1>
              <p className="text-xl text-muted-foreground mt-4 max-w-md mx-auto md:mx-0">
                Automatiza tu atención al cliente en WhatsApp, Instagram o tu Página Web y descubre el potencial de la IA sin arriesgar
                tu presupuesto.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 mx-auto md:mx-0">
                <Button asChild size="lg" className="text-lg font-bold">
                  <Link href="#pricing">Obtén el Tuyo Ahora</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="#how-it-works">Cómo Funciona</Link>
                </Button>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 p-4">
                <div className="h-full w-full rounded-xl bg-card p-6 shadow-lg">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">ChatBot IA</p>
                      <p className="text-xs text-muted-foreground">En línea</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-4">
                    <div className="ml-auto w-4/5 rounded-lg rounded-tr-none bg-secondary p-3">
                      <p className="text-sm">Hola, ¿cómo puedo ayudarte hoy?</p>
                    </div>
                    <div className="w-4/5 rounded-lg rounded-tl-none bg-muted p-3">
                      <p className="text-sm">¿Cuáles son sus horarios de atención?</p>
                    </div>
                    <div className="ml-auto w-4/5 rounded-lg rounded-tr-none bg-secondary p-3">
                      <p className="text-sm">
                        Nuestro horario es de lunes a viernes de 9:00 a 18:00. ¿Necesitas algo más?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Brief Intro with Stats */}
        <section className="bg-muted/50 py-16">
          <div className="container text-center">
            <p className="text-xl text-muted-foreground max-w-screen-md mx-auto">
              En <span className="font-bold">Automatiza Lo Fome</span>, creemos que todo negocio merece beneficiarse de la
              automatización. Con nuestro Chatbot de 1 USD o $.1000 CLP, obtén una versión básica pero poderosa para responder
              preguntas y capturar leads.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <p className="text-muted-foreground">Disponibilidad</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <p className="text-muted-foreground">Tasa de Respuesta</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold text-primary">Sólo $1.000 CLP</div>
                <p className="text-muted-foreground">Por mes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-24 sm:py-32">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold">Características Principales</h2>
            <p className="text-muted-foreground mt-4 max-w-md mx-auto">
              Nuestro chatbot de 1 USD incluye todo lo que necesitas para empezar a automatizar tu atención al cliente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Disponible 24/7</h3>
              <p className="text-muted-foreground mt-2">
                Tu chatbot nunca duerme, respondiendo consultas a cualquier hora del día o noche.
              </p>
            </Card>

            <Card className="p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Respuestas Instantáneas</h3>
              <p className="text-muted-foreground mt-2">
                Responde a tus clientes en segundos, mejorando su experiencia y satisfacción.
              </p>
            </Card>

            <Card className="p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Captura de Leads</h3>
              <p className="text-muted-foreground mt-2">
                Recopila información de contacto de tus clientes potenciales automáticamente.
              </p>
            </Card>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="bg-muted/50 py-24 sm:py-32">
          <div className="container">
            <h2 className="text-4xl font-bold text-center mb-12">Cómo Funciona</h2>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-background rounded-lg p-6 relative">
                <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h3 className="text-xl font-bold mb-4">Contrata</h3>
                <p className="text-muted-foreground">
                  Haz clic en 'Obtén el Tuyo Ahora' y completa el registro con un pago mensual de 1 USD o $1.000 si estás en Chile.
                </p>
                <img
                  src="/placeholder.svg?height=120&width=200"
                  alt="Proceso de contratación"
                  className="mt-4 rounded-md w-full object-cover"
                />
              </div>

              <div className="bg-background rounded-lg p-6 relative">
                <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h3 className="text-xl font-bold mb-4">Configura</h3>
                <p className="text-muted-foreground">
                  Sigue los pasos en la página, añade tu información básica (horarios, preguntas frecuentes, datos de contacto), y tus preguntas frecuentes.
                </p>
                <img
                  src="/placeholder.svg?height=120&width=200"
                  alt="Proceso de configuración"
                  className="mt-4 rounded-md w-full object-cover"
                />
              </div>
              <div className="bg-background rounded-lg p-6 relative">
                <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4">Integra</h3>
                <p className="text-muted-foreground">
                  Sigue nuestro tutorial para conectar tu chatbot con tus redes sociales o página web.
                </p>
                <img
                  src="/placeholder.svg?height=120&width=200"
                  alt="Proceso de configuración"
                  className="mt-4 rounded-md w-full object-cover"
                />
              </div>

              <div className="bg-background rounded-lg p-6 relative">
                <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h3 className="text-xl font-bold mb-4">Lanza Tu Chatbot</h3>
                <p className="text-muted-foreground">
                  Empieza a responder en WhatsApp, Instagram o tu página web automáticamente y captura nuevos clientes.
                </p>
                <img
                  src="/placeholder.svg?height=120&width=200"
                  alt="Chatbot en funcionamiento"
                  className="mt-4 rounded-md w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {/* <section className="container py-24 sm:py-32">
          <h2 className="text-3xl font-bold text-center mb-12">Lo Que Dicen Nuestros Clientes</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-muted"></div>
                <div>
                  <p className="font-bold">María García</p>
                  <p className="text-sm text-muted-foreground">Boutique de Ropa</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "El chatbot ha sido una excelente inversión. Ahora puedo atender consultas básicas 24/7 y me ha liberado
                tiempo para concentrarme en otras áreas de mi negocio."
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-muted"></div>
                <div>
                  <p className="font-bold">Carlos Rodríguez</p>
                  <p className="text-sm text-muted-foreground">Restaurante Local</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "Por solo 1 USD, este chatbot responde preguntas sobre nuestro menú y horarios. Ha reducido las llamadas
                repetitivas en un 40%. ¡Increíble relación calidad-precio!"
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-full bg-muted"></div>
                <div>
                  <p className="font-bold">Laura Martínez</p>
                  <p className="text-sm text-muted-foreground">Consultoría</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground">
                "Estaba escéptica por el precio, pero el chatbot ha superado mis expectativas. Ahora captura información
                de clientes potenciales incluso cuando estoy ocupada."
              </p>
            </Card>
          </div>
        </section> */}
        <TestimonialSection />

        {/* Pricing Section */}
        <section id="pricing" className="bg-muted/50 py-24 sm:py-32">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold">Precio Increíble</h2>
              <p className="text-muted-foreground mt-4 max-w-md mx-auto">
                Comienza con nuestro chatbot básico por solo 1 USD y actualiza cuando estés listo.
              </p>
            </div>

            <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-8 max-w-[40%] mx-auto">
              <Card className="p-6 border-primary">
                <div className="text-center mb-6">
                  <Badge>Oferta Especial</Badge>
                  <h3 className="text-2xl font-bold mt-2">Chatbot Básico</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$1</span>
                    <span className="text-muted-foreground"> USD</span>
                  </div>
                  <p className="text-muted-foreground mt-2">Mensual</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Respuestas automáticas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Integración con WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Integración con Instagram</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Horarios y preguntas frecuentes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Hasta 100 conversaciones al mes</span>
                  </div>
                </div>

                <Button className="w-full">Obtener Ahora</Button>
              </Card>

              {/* <Card className="p-6 relative overflow-hidden border-primary">
                <div className="absolute -right-12 top-6 rotate-45 bg-primary text-primary-foreground py-1 px-12 text-sm font-medium">
                  Popular
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mt-2">Chatbot Pro</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$29</span>
                    <span className="text-muted-foreground"> USD</span>
                  </div>
                  <p className="text-muted-foreground mt-2">Mensual</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Todo lo del plan Básico</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Integración con Instagram</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Personalización avanzada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Análisis de conversaciones</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Soporte prioritario</span>
                  </div>
                </div>

                <Button className="w-full">Contactar</Button>
              </Card>

              <Card className="p-6 md:col-span-2 lg:col-span-1">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mt-2">Chatbot Enterprise</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">Personalizado</span>
                  </div>
                  <p className="text-muted-foreground mt-2">Contacta para más info</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Todo lo del plan Pro</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Integración con CRM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>IA avanzada personalizada</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Múltiples canales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Soporte dedicado 24/7</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Solicitar Demo
                </Button>
              </Card> */}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="container py-24 sm:py-32">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>¿Por qué cuesta solo 1 USD?</AccordionTrigger>
                <AccordionContent>
                  Creemos que la IA debe ser accesible para todos los negocios. El pago mensual simbólico de 1 USD nos ayuda a
                  filtrar curiosos y demuestra tu interés real en implementar un chatbot para tu negocio.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>¿No me van a subir el precio después?</AccordionTrigger>
                <AccordionContent>
                  No. Si bien podemos subir el precio a nuevos clientes, los clientes existentes mantendrán su precio.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>¿Cómo se integra?</AccordionTrigger>
                <AccordionContent>
                  Después de tu compra, recibirás instrucciones detalladas para enlazar el chatbot a tu cuenta de
                  WhatsApp Business, Instagram o Web. El proceso es sencillo y puedes tener soporte mediante nuestra propia IA si lo deseas.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>¿Puedo personalizar los mensajes?</AccordionTrigger>
                <AccordionContent>
                  Sí, puedes definir mensajes de bienvenida y respuestas a preguntas frecuentes. En el plan básico, la
                  personalización es limitada, pero suficiente para cubrir las necesidades esenciales de tu negocio.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>¿Qué pasa si necesito más funcionalidades?</AccordionTrigger>
                <AccordionContent>
                  Puedes agendar una reunión con nosotros para discutir tus necesidades y ofrecerte un plan personalizado.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>¿Ofrecen soporte técnico?</AccordionTrigger>
                <AccordionContent>
                  Para el plan básico de 1 USD, ofrecemos soporte a través de nuestro chatbot. Para servicios avanzados, ofrecemos soporte dedicado.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold">Haz crecer tu negocio con un chatbot que atiende por ti 24/7</h2>
            <p className="mt-4 text-primary-foreground/80 max-w-xl mx-auto">
              Por solo 1 USD, da el primer paso hacia la automatización de tu atención al cliente y experimenta el poder
              de la IA.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8 text-lg font-bold">
              <Link href="#pricing">Sí, Quiero Mi Chatbot por 1 USD</Link>
            </Button>
            <p className="mt-4 text-sm text-primary-foreground/70">
              Sin compromisos a largo plazo. Satisfacción garantizada.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Producto</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Características
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Precios
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Términos y Condiciones
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Síguenos</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>ChatBot IA - Todos los derechos reservados © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

