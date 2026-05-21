import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <div className="w-full flex justify-center">
      <div className="bg-[#111111] text-white rounded-[30px] shadow-2xl p-12 w-full max-w-lg min-h-[620px] flex items-center">

        <form
          className={cn("flex flex-col gap-7 w-full", className)}
          {...props}
        >
          <FieldGroup className="border-0">

            <div className="flex flex-col gap-3 text-left">
              <h1 className="text-5xl font-extrabold tracking-tight text-white">
                Iniciar Sesión
              </h1>

              <p className="text-base text-gray-500 leading-relaxed">
                Bienvenido de nuevo. Por favor, introduce tus credenciales.
              </p>
            </div>

            <Field className="border-0">
              <FieldLabel
                htmlFor="email"
                className="text-[12px] uppercase tracking-[2px] text-orange-500 font-semibold"
              >
                Usuario o email
              </FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="admin@gmail.com"
                required
                className="h-14 mt-2 rounded-xl bg-[#1f1f1f] text-white placeholder:text-gray-500 border-0 focus-visible:ring-1 focus-visible:ring-orange-500"
              />
            </Field>

            <Field className="border-0">
              <div className="flex items-center">
                <FieldLabel
                  htmlFor="password"
                  className="text-[12px] uppercase tracking-[2px] text-orange-500 font-semibold"
                >
                  Contraseña
                </FieldLabel>

                <a
                  href="#"
                  className="ml-auto text-[11px] uppercase text-gray-600 hover:text-gray-400 transition"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <Input
                id="password"
                type="password"
                placeholder="••••••"
                required
                className="h-14 mt-2 rounded-xl bg-[#1f1f1f] text-white placeholder:text-gray-500 border-0 focus-visible:ring-1 focus-visible:ring-orange-500"
              />
            </Field>

            <Field className="border-0">
              <label className="flex items-center gap-3 text-gray-500 text-sm">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 rounded bg-[#1f1f1f] border-0"
                />

                Recordar sesión
              </label>
            </Field>

            <Field className="border-0">
              <Button
                type="submit"
                className="h-14 rounded-xl text-base font-semibold bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:opacity-90 transition-all"
              >
                Iniciar Sesión →
              </Button>
            </Field>

            <Field className="border-0">
              <p className="text-center text-sm text-gray-600">
                ¿No tienes una cuenta?{" "}
                <a
                  href="#"
                  className="text-orange-500 font-medium hover:text-orange-400"
                >
                  Contactar soporte
                </a>
              </p>
            </Field>

          </FieldGroup>
        </form>

      </div>
    </div>
  )
}