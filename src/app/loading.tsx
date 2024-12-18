"use client";

import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="text-center">
        <div className="flex justify-center items-center space-x-2 mb-4">
          {/* Animated Loading Dots */}
          <div
            className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "100ms" }}
          ></div>
          <div
            className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"
            style={{ animationDelay: "200ms" }}
          ></div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">Carregando...</h2>

        <p className="text-gray-600">Por favor, aguarde um momento</p>
      </div>
    </div>
  );
}
