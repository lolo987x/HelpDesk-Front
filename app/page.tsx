"use client";

import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-2 bg-[#e9e9e9] overflow-hidden">
      
      {/* LEFT SIDE */}
      <section className="hidden lg:flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#6a1f00] via-[#c95b00] to-[#ff7a00]">
        
        {/* EFECTO LUZ */}
        <div className="absolute inset-0 bg-black/10" />

        {/* LOGO */}
        <div className="relative z-10 flex flex-col items-center text-center px-10">
          
          <div className="w-32 h-32 rounded-[30px] bg-[#ff8a00] shadow-2xl flex items-center justify-center mb-10">
            <div className="w-16 h-16 rounded-full border-[6px] border-white relative">
              
              <div className="absolute w-5 h-5 bg-white rounded-full -left-3 top-1/2 -translate-y-1/2" />
              
              <div className="absolute w-5 h-5 bg-white rounded-full -right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <h1 className="text-white text-7xl font-extrabold tracking-tight">
            HelpDesk
          </h1>

          <p className="text-white/90 text-2xl leading-relaxed mt-8 max-w-md">
            Potenciando la eficiencia del soporte técnico
            con herramientas inteligentes y gestión en tiempo real.
          </p>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="flex flex-col items-center justify-center px-6 py-10 bg-[#efefef]">
        
        <div className="w-full max-w-[520px]">
          <LoginForm />
        </div>

        {/* FOOTER */}
        <div className="mt-14 flex flex-col items-center gap-4 text-[#6b7280]">
          
          <div className="flex items-center gap-8 text-sm font-medium">
            <button className="hover:text-orange-500 transition">
              🌐 ESPAÑOL
            </button>

            <button className="hover:text-orange-500 transition">
              ⊕ AYUDA
            </button>
          </div>

          <p className="text-xs text-center">
            © 2024 TechAsset Support Systems. All rights reserved.
          </p>
        </div>
      </section>
    </main>
  );
}