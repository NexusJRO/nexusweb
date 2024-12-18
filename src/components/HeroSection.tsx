"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Github, Instagram, ArrowRight, Download } from "lucide-react";

// Dynamically import Lottie Player with SSR disabled
const LottiePlayer = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-8 sm:py-12 md:py-16 ">
      <div className="max-w-6xl w-full mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
        {/* Lottie Animation */}
        <div className="flex justify-center w-full order-2 md:order-1">
          <div className="w-full flex justify-center items-center">
            <LottiePlayer
              src="/home/Notifi.json"
              className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-contain"
              loop
              autoplay
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-4 sm:space-y-6 text-center md:text-left order-1 md:order-2">
          {/* Animated Intro */}
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2 sm:mb-4">
            <span className="w-8 h-1 bg-blue-500 rounded-full"></span>
            <p className=" text-sm sm:text-base tracking-wide">
              Tech excellence always
            </p>
          </div>

          {/* Headline with Dynamic Emphasis and Underline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold  leading-tight relative">
            <span className="relative">
              Nexus
              <svg
                className="absolute left-0 bottom-[-10px] w-full"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q50 10, 100 5"
                  fill="none"
                  stroke="#3B82F6"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="text-blue-500 animate-text-shimmer"> JR</span>
          </h1>

          <p className=" text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
            Com cada linha de código e cada projeto concluído, reforçamos nosso
            compromisso com a excelência técnica e a inovação contínua.
          </p>

          {/* Call to Action Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center md:justify-start">
            <button
              className="group relative px-6 sm:px-8 py-2 sm:py-3 rounded-lg 
                bg-blue-500  font-semibold
                hover:bg-blue-600 transition-all duration-300
                shadow-lg hover:shadow-xl
                flex items-center gap-2 sm:gap-3
                active:scale-95 text-sm sm:text-base"
            >
              <span>Ver Meus Projetos</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Social Links with Hover Effects */}
            <div className="flex items-center gap-3 sm:gap-4">
              <a
                href="https://github.com/NexusJRO"
                className="text-neutral-400 hover:text-blue-400 
                  transition-all duration-300 
                  hover:scale-110 active:scale-90"
                aria-label="Github Profile"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6 " />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-blue-400 
                  transition-all duration-300 
                  hover:scale-110 active:scale-90"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-blue-400 
                  transition-all duration-300 
                  hover:scale-110 active:scale-90"
                aria-label="Download Resume"
              >
                <Download className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
