"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function NexusJRAboutSection() {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold  mb-4 tracking-tight">
            Sobre{" "}
            <span className="text-blue-500 animate-text-shimmer">Nós </span>
          </h2>
        </div>

        {/* Missão e Visão */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Missão */}
          <div className="h-full overflow-hidden transform transition-all hover:scale-105">
            <div className="p-6 h-full border-4 border-blue-300 rounded-3xl shadow-lg flex flex-col justify-between">
              <h2 className="text-xl font-semibold mb-3">
                Nossa <span className="text-blue-500">Missão</span>
              </h2>
              <p className="mb-4">
                A Nexus JR existe para redefinir o papel da tecnologia nos
                negócios, criando soluções inovadoras que elevem nossos clientes
                ao próximo nível de eficiência e competitividade.
              </p>
            </div>
          </div>

          {/* Visão */}
          <div className="h-full overflow-hidden transform transition-all hover:scale-105">
            <div className="p-6 h-full border-4 border-blue-300 rounded-3xl shadow-lg flex flex-col justify-between">
              <h2 className="text-xl font-semibold mb-3">
                Nossa <span className="text-blue-500">Visão</span>
              </h2>
              <p className="mb-4">
                Ser a escolha número um em Moçambique e além, conhecida por
                transformar ideias em realidades digitais de impacto.
              </p>
            </div>
          </div>
        </div>

        {/* Botão para mais informações */}
        <div className="text-center">
          <Link
            href="/sobre"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            Saiba Mais
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
