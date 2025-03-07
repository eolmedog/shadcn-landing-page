/**
 * v0 by Vercel.
 * @see https://v0.dev/t/BX0dSL3i9Oi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { LoaderCircle, BotMessageSquare, User } from "lucide-react"
import ReactMarkdown from "react-markdown"
import { useState, useRef, useEffect } from "react";

import rehypeSanitize from "rehype-sanitize";

export default function ChatComponent() {
    const [messages, setMessages] = useState([
        { role: "model", parts: "Hola! Soy el Asistente IA de Automatiza Lo Fome. Puedo ayudarte con información y agendar una reunión. ¿En qué puedo ayudarte hoy?" },
        ]);
        const [input, setInput] = useState("");
        const [loading, setLoading] = useState(false);
        const messagesEndRef = useRef(null);
        // 🔹 Scroll to bottom when messages update
        useEffect(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [messages]);
        const formatMessage = (text: string) => {
            return text.split("\n\n").map((paragraph, index) => (
                
                <ReactMarkdown key={index} rehypePlugins={[rehypeSanitize]}>{paragraph}</ReactMarkdown>
            ));
          };    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;
    
        const newMessages = [...messages, { role: "user", parts: input }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);
    
        try {
            const google_calendar_url='https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1DoaNF6jGiZt9clyLQrqRc3vuveJLs2-bPuXM5fU-vvSME0nV2gGwNRHpq5OE-GdBRMnuXju3H'
            const response = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message_history: newMessages.slice(1) }), //Don't include the very first message
            });
    
            const data = await response.json();
            if (response.ok) {
                setMessages([...newMessages, { role: "model", parts: data.reply }]);
                if (data.redirect) {
                    //sleep 3 seconds
                    await new Promise((resolve) => setTimeout(resolve, 3500));
                    //Redirect in new tab
                    window.open(google_calendar_url, "_blank");
                }
            } else {
                setMessages([...newMessages, { role: "model", parts: "Oops! Something went wrong." }]);
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages([...newMessages, { role: "model", parts: "Error reaching OpenAI API." }]);
        } finally {
            setLoading(false);
        }
          };
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" className="fixed bottom-10 right-10 x-50 rounded-full p-4 !bg-primary"><BotMessageSquare className="h-8 w-8 text-white" /></Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col h-full animate-in fade-in-0 slide-in-from-left-460">
                <DialogHeader className="flex items-center justify-between p-4 border-b">
                <DialogTitle>Chat con Nuestro Asistente IA</DialogTitle>
                <DialogClose className="ml-auto">
                    <PanelTopCloseIcon className="h-4 w-4" />
                </DialogClose>
                </DialogHeader>
                <ScrollArea className="flex-1 p-4 space-y-4">
                <div className="flex flex-col gap-2">
                    {messages.map((msg, index) => (
                    <div key={index} className={`flex items-end my-1 ${msg.role === "user" ? "justify-end" : ""}`}>
                        {msg.role === "model" && (
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                            <AvatarFallback><BotMessageSquare /></AvatarFallback>
                        </Avatar>
                        )}
                        <div
                        className={`p-2 rounded-lg ${
                            msg.role === "user" ? "bg-blue-500 text-white dark:bg-blue-800 mr-2" : "bg-gray-200 dark:bg-gray-800 ml-2"
                        }`}
                        >
                        {formatMessage(msg.parts)}
                        </div>
                        {msg.role === "user" && (
                        <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder-user.jpg" alt="John Doe" />
                            <AvatarFallback><User /></AvatarFallback>
                        </Avatar>
                        )}
                    </div>
                    ))}
                </div>
                <div ref={messagesEndRef}></div>
                </ScrollArea>
                <div className="p-4 border-t">
                <form className="flex space-x-2" onSubmit={sendMessage}>
                    <Input type="text" placeholder="Type your message..." className="flex-1" onChange={(e) => setInput(e.target.value)} value={input} />
                    <Button type="submit" disabled={loading}>{loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : "Enviar"}</Button>

                </form>
                </div>
            </DialogContent>
    </Dialog>
  )
}

function PanelTopCloseIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M3 9h18" />
      <path d="m9 16 3-3 3 3" />
    </svg>
  )
}