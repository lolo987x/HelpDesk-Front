"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Label } from "@/components/ui/label"

export default function RecuperarPage() {
  return (
    <main className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2">

      <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 flex flex-col items-center justify-center px-10 text-center relative overflow-hidden">

        <div className="absolute inset-0 bg-black/10" />

        <div className="relative z-10 w-52 h-52 rounded-full bg-white flex items-center justify-center shadow-2xl">
          <div className="relative">

            <div className="w-28 h-28 border-[10px] border-black rounded-full flex items-center justify-center relative">

              <div className="w-14 h-14 border-[6px] border-black rounded-md relative">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-8 h-6 border-[6px] border-black border-b-0 rounded-t-full" />
              </div>

              <div className="absolute -top-5 -left-5 text-black text-6xl font-black rotate-[-20deg]">
                ↺
              </div>
            </div>
          </div>
        </div>

        <h1 className="relative z-10 text-white text-5xl font-extrabold mt-10">
          Recuperar Cuenta
        </h1>

        <p className="relative z-10 text-orange-100 text-xl font-medium mt-8 max-w-md leading-relaxed">
          No te preocupes, te ayudaremos a acceder de nuevo.
        </p>
      </section>

      <section className="bg-[#f8f8f8] flex items-center justify-center px-6 py-10">
        
        <Card className="w-full max-w-md rounded-[30px] border border-orange-200 shadow-2xl bg-white">
          
          <CardHeader className="space-y-5">
            
            <CardTitle className="text-5xl font-extrabold leading-tight text-black">
              Recuperar
              <br />
              Cuenta
            </CardTitle>

            <CardDescription className="text-gray-500 font-medium text-lg leading-7">
              Ingrese tu Correo Electrónico para recibir
              un código de recuperación.
            </CardDescription>
          </CardHeader>

          <CardContent>

            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-base font-semibold text-black"
              >
                Correo Electrónico
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="tu.correo@ejemplo.com"
                className="h-14 text-lg rounded-xl border-gray-300 focus-visible:ring-orange-500"
              />
            </div>

            <Button
              className="w-full mt-10 h-14 rounded-full bg-orange-500 hover:bg-orange-600 text-white text-lg font-bold shadow-lg hover:shadow-orange-500/30 transition-all"
            >
              Enviar Código
            </Button>

            <div className="text-center mt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-orange-500 font-bold text-lg hover:text-orange-600 transition"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver a Iniciar Sesión
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}