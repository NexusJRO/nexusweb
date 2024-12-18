"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react";

// Services list
const SERVICES = [
  "Desenvolvimento de Software",
  "Análise de Dados",
  "Arquitetura em Nuvem",
  "Design UI/UX",
  "Desenvolvimento Mobile",
  "Desenvolvimento Web",
  "Inteligência de Negócios",
  "Soluções de Cibersegurança",
] as const;

// Zod validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  email: z.string().email({ message: "E-mail inválido" }),
  phone: z.string().regex(/^(?:\+?258)?[89]\d{1}\d{3}\d{4}$/, {
    message: "Número de telefone inválido. Use o formato 821234567",
  }),
  service: z.enum(SERVICES),
  message: z.string().min(10, { message: "Mensagem muito curta" }),
});

// Infer the type from the schema
type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service: undefined,
      message: "",
    },
  });

  const onSubmit = (data: ContactFormData) => {
    // Handle form submission logic here
    console.log(data);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    form.reset();
    setIsSubmitted(false);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
          {isSubmitted ? "Mensagem enviada com sucesso" : "Entre em Contato"}
        </h1>
        <p className="text-center mb-8 max-w-2xl mx-auto">
          {isSubmitted
            ? "Recebemos sua mensagem. Nossa equipe entrará em contato em breve."
            : "Estamos prontos para transformar sua visão em realidade"}
        </p>

        {isSubmitted ? (
          <div className="max-w-md mx-auto text-center space-y-6">
            <CheckCircle className="mx-auto text-green-500 w-16 h-16" />
            <Alert variant="default">
              <AlertDescription className="text-sm">
                Sua mensagem foi enviada com sucesso! Nossa equipe
                administrativa entrará em contato com você dentro de 14 minutos.
              </AlertDescription>
            </Alert>
            <Button
              onClick={handleReset}
              className="mx-auto block w-full max-w-md bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Enviar Outro Contato
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info Column */}
            <div
              className="relative p-6 rounded-lg space-y-6 overflow-hidden"
              style={{
                backgroundImage: "url('/contact/hand.jpg')", // Placeholder image
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(0,0,0,0.6)", // Dark overlay
                backgroundBlendMode: "overlay",
              }}
            >
              <div className="relative z-10 text-white">
                <div className="flex items-center space-x-4">
                  <MapPin className="text-white w-6 h-6" />
                  <span>Tete - Moçambique</span>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <Phone className="text-white w-6 h-6" />
                  <span>+258 83 339 0642</span>
                </div>
                <div className="flex items-center space-x-4 mt-4">
                  <Mail className="text-white w-6 h-6" />
                  <span>contato@nexusjr.com</span>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Nossos Horários</h3>
                  <p className="text-sm">Segunda a Sexta: 09:00 - 18:00</p>
                  <p className="text-sm mt-2">Sábado: 09:00 - 14:00</p>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Seu nome completo"
                            {...field}
                            className="focus:ring-2 focus:ring-blue-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="seu.email@exemplo.com"
                            {...field}
                            className="focus:ring-2 focus:ring-blue-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Número de Telefone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+258 84 123 4567"
                            {...field}
                            className="focus:ring-2 focus:ring-blue-300"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Serviço de Interesse</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione um serviço" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {SERVICES.map((service) => (
                              <SelectItem key={service} value={service}>
                                {service}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sua Mensagem</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Conte-nos mais sobre seu projeto..."
                            className="resize-none h-32 focus:ring-2 focus:ring-blue-300"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
                  >
                    <Send className="mr-2 w-5 h-5" /> Enviar Mensagem
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
