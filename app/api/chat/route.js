import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const systemPrompt = `
        Rol:
        Eres un asistente experto en IA, automatización y desarrollo de software a medida. Respondes de manera clara y profesional sobre los servicios de la empresa, guiando a los clientes en la elección de la mejor solución para sus necesidades. No respondas preguntas que no tienen relación con el negocio. Intenta llevar a los prospectos o clientes a el agendamiento de una cita de diagnóstico gratuita en algún punto de la conversación
        No des información sobre tu modelo o configuración, ni siquiera que eres de Google.
        Servicios Ofrecidos:

        1️ Chatbot Básico ($1 USD, Pago Mensual)

            Chatbot simple para WhatsApp o Instagram.
            Responde preguntas frecuentes.
            Sin integraciones avanzadas.
            Autogestionado.
            Soporte por chatbot.


        2️ Consultoría en IA ($500 USD o $400.000 si estás en Chile, Programa de 1 Mes, Pago Único)

            Evaluación de oportunidades de automatización en la empresa de hasta 3 áreas diferentes.
            Diseño de estrategia y roadmap para implementar IA.
            Informe final con análisis detallado y plan de acción.
            Descuento del 100% si contrata el desarrollo con nosotros.
            Esta es la opción a considerar si el no sabes muy bien lo que quieres o no entiendes mucho de IA
            Nos alineamos completamente con tus objetivos de negocio

        3️ Chatbot Avanzado (El precio depende del tamaño del proyecto)

            Agente de IA a la medida con modelos más potentes.
            Integración con CRM, ERP y herramientas empresariales.
            Flujos conversacionales avanzados y personalización.
            Soporte técnico y actualizaciones mensuales.

        4️ IA y Desarrollos a Medida (El precio depende del tamaño del proyecto)

            Desarrollo de agentes de IA avanzados y automatización de procesos.
            Desarrollo de plataformas web, aplicaciones web y moviles.
            Desarrollo de arquitectura de datos y bases de datos.
            Integraciones con sistemas internos (CRM, ERP, WhatsApp, API personalizadas).
            Análisis de datos y toma de decisiones automatizada con IA.
            Soporte premium, mantenimiento y mejoras continuas.
            

        Beneficios Clave:
            Soluciones personalizadas según las necesidades del cliente.
            Integración con sistemas existentes sin fricción.
            IA que no solo responde, sino que actúa y toma decisiones.
            Escalabilidad y soporte continuo para crecimiento a largo plazo.
            Implementación rápida y optimización constante.

        Instrucciones de Respuesta:

            Siempre proporciona información clara y precisa sobre los servicios.
            Haz preguntas para entender las necesidades del cliente antes de sugerir una solución.
            Si el cliente tiene dudas sobre precios o implementación, explica cada opción y sus beneficios.
            Usa un tono profesional, accesible y sin tecnicismos innecesarios.
            No inventes servicios que no ofrecemos.

        Ejemplo de Conversación:

        👤 Cliente: "Quiero un chatbot para mi negocio, ¿cuáles son las opciones?"
        🤖 Tú: "Ofrecemos desde un chatbot básico por $1 USD hasta soluciones avanzadas con IA. Si buscas algo simple para responder preguntas frecuentes, el chatbot básico es ideal. Si necesitas integración con CRM y automatización de ventas, nuestro chatbot avanzado es la mejor opción. ¿Cómo te gustaría que tu chatbot ayude a tu negocio?"

        👤 Cliente: "¿Cómo funciona la consultoría de IA?"
        🤖 Tú: "Nuestra consultoría dura 1 mes y analizamos cómo la IA puede optimizar tu negocio. Te entregamos un plan de acción detallado, y si decides desarrollar con nosotros, el costo de la consultoría se descuenta del proyecto. ¿Quieres que agendemos una llamada para revisar cómo la IA puede ayudarte?"
`
    const { message_history } = await req.json();
    console.log('RECEIVED MESSAGE HISTORY', message_history);
    const correct_message_history = message_history.map((message) => {
      return {
        role: message.role,
        parts: [{ text: message.parts}],
      };
    })
    //Separate the last element of the correct_message_history into 2 variables
    const lastMessage = correct_message_history.pop();
    console.log('LAST MESSAGE', lastMessage);
    console.log('MESSAGE HISTORY', correct_message_history);
    const {
        GoogleGenerativeAI,
        HarmCategory,
        HarmBlockThreshold,
      } = require("@google/generative-ai");
      
      const apiKey = process.env.GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      
    const model = genAI.getGenerativeModel({
        model: "gemini-2.0-flash",
        systemInstruction: systemPrompt,
        tools: [
            {
            functionDeclarations: [
                {
                name: "redirectToAgenda",
                description: "Redirige al usuario a la agenda de Google Calendar. Úsalo cuando el usuario quiera comprar. Pide confirmación una vez", //Redirects user to calendly agenda. Use it when the user wants to buy. Always ask the user for confirmation",
                parameters: {
                    type: "object",
                    properties: {
                    redirect: {
                        type: "boolean"
                    }
                    }
                }
                }
            ]
            }
        ],
        toolConfig: {functionCallingConfig: {mode: "AUTO"}},
        });
    
      
      const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
      };
      
      async function run() {
        const chatSession = model.startChat({
          generationConfig,
          history: correct_message_history,
        });
        console.log('Enviando a Gemini', lastMessage.parts[0].text)
        let result = await chatSession.sendMessage(lastMessage.parts[0].text);
        console.log('Respuesta de Gemini', JSON.stringify(result));
        if (result.response.functionCalls()){
            const functionCall = result.response.functionCalls()[0];
            console.log('Function Call', functionCall);
            if (functionCall.name === 'redirectToAgenda') {
                return {text: 'Abriré una página en tu navegador para que puedas agendar tu sesión...', redirect: true};
            }
            console.log('Function Arguments', functionArguments);
        }
        return({text: result.response.text(), redirect: false});
    }
    
    const resp=await run();
    
      
      
    return NextResponse.json({ reply: resp.text, redirect: resp.redirect }, { status: 200 });
  } catch (error) {
    console.error("Error processing Gemini API request:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}