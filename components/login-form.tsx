"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Checkbox,
} from "@/components/ui/checkbox";

import {
  Label,
} from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    router.push("/Administrador/dashboard");
  };

  return (
    <div className="w-full flex justify-center">
      <Card className="w-full max-w-[520px] bg-[#111111] border-0 rounded-[28px] shadow-2xl text-white px-8 py-10">
        
        <CardHeader className="space-y-3 pb-8">
          <CardTitle className="text-6xl font-extrabold leading-none tracking-tight">
            Iniciar Sesión
          </CardTitle>

          <CardDescription className="text-gray-400 text-base leading-relaxed">
            Bienvenido de nuevo. Por favor, introduce tus credenciales.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            className={cn("flex flex-col gap-7", className)}
            {...props}
            onSubmit={onSubmit}
          >
            {/* EMAIL */}
            <div className="grid gap-3">
              <Label
                htmlFor="email"
                className="text-[12px] uppercase tracking-[2px] text-orange-500 font-bold"
              >
                Usuario o Email
              </Label>

              <Input
                id="email"
                type="email"
                placeholder="nombre@empresa.com"
                required
                className="h-14 rounded-xl bg-[#1b1b1b] border-0 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-orange-500"
              />
            </div>

            {/* PASSWORD */}
            <div className="grid gap-3">
              
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="password"
                  className="text-[12px] uppercase tracking-[2px] text-orange-500 font-bold"
                >
                  Contraseña
                </Label>

                <Link
                  href="/password"
                  className="text-[11px] uppercase text-gray-500 hover:text-orange-500 transition font-semibold"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>

              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="h-14 rounded-xl bg-[#1b1b1b] border-0 text-white placeholder:text-gray-500 focus-visible:ring-1 focus-visible:ring-orange-500"
              />
            </div>

            {/* REMEMBER */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="remember"
                className="border-gray-500 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
              />

              <Label
                htmlFor="remember"
                className="text-sm text-gray-400 cursor-pointer"
              >
                Recordar sesión
              </Label>
            </div>

            {/* BUTTON */}
            <Button
              type="submit"
              className="h-14 rounded-2xl text-lg font-bold bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 transition-all shadow-lg hover:shadow-orange-500/30"
            >
              Iniciar Sesión →
            </Button>

            {/* FOOTER */}
            <p className="text-center text-sm text-gray-500">
              ¿No tienes una cuenta?{" "}
              
              <Link
                href="#"
                className="text-orange-500 font-semibold hover:text-orange-400"
              >
                Contactar soporte
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}