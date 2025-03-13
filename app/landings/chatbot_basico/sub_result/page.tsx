"use client"

import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Mail, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

export default function ResultadoPage() {
  const searchParams = useSearchParams()
  const success = searchParams.get("success") === "true"
  const nombre = searchParams.get("nombre") || ""

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center p-6 ${
        success ? "bg-gradient-to-br from-green-50 to-green-100" : "bg-gradient-to-br from-red-50 to-red-100"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-6 z-20"
      >
        <Image
          src="/logo.png?height=60&width=180"
          alt="Logo"
          width={180}
          height={60}
          className="h-auto"
        />
      </motion.div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {success ? (
          <>
            <div className="absolute top-20 left-10 w-64 h-64 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-green-300 rounded-full opacity-20 blur-3xl"></div>
          </>
        ) : (
          <>
            <div className="absolute top-20 left-10 w-64 h-64 bg-red-200 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-red-300 rounded-full opacity-20 blur-3xl"></div>
          </>
        )}
      </div>

      <div className="relative z-10 max-w-3xl w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="flex justify-center"
        >
          {success ? (
            <CheckCircle className="w-32 h-32 md:w-40 md:h-40 text-green-500" />
          ) : (
            <XCircle className="w-32 h-32 md:w-40 md:h-40 text-red-500" />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          {success ? (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-4">¡Suscripción Exitosa!</h1>
              <p className="text-xl text-gray-700 mb-6">
                Hola <span className="font-semibold">{nombre}</span>, gracias por registrarte.
              </p>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-green-200 flex items-start space-x-4 max-w-xl mx-auto shadow-lg">
                <Mail className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                <p className="text-left text-green-800">
                  Por favor, revisa tu correo electrónico donde encontrarás el enlace de inicio de sesión y tus
                  credenciales. Asegúrate de revisar también tu carpeta de spam si no lo encuentras.
                </p>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-3xl md:text-4xl font-bold text-red-700 mb-4">Suscripción Fallida!</h1>
              <p className="text-xl text-gray-700 mb-6">
                Lo sentimos <span className="font-semibold">{nombre}</span>, ha ocurrido un error.
              </p>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-red-200 max-w-xl mx-auto shadow-lg">
                <p className="text-left text-red-800">
                  Por favor, intenta nuevamente o contacta a nuestro equipo de soporte si el problema persiste. Estamos
                  aquí para ayudarte a resolver cualquier inconveniente.
                </p>
              </div>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10"
        >
          <Button
            variant={success ? "default" : "destructive"}
            size="lg"
            className="px-8"
            onClick={() => (window.location.href = "/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {success ? "Volver al inicio" : "Intentar nuevamente"}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

