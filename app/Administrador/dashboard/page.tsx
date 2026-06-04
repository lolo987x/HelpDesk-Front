import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Ticket, Lock, Clock, CheckCircle,
  Calendar, BarChart2, ExternalLink, RefreshCw,
} from "lucide-react";

const statsCards = [
  { label: "TICKETS TOTALES", value: 125, icon: Ticket,      iconBg: "bg-orange-100", iconColor: "text-orange-500" },
  { label: "TICKETS ABIERTOS", value: 65,  icon: Lock,       iconBg: "bg-blue-100",   iconColor: "text-blue-500"   },
  { label: "PENDIENTES",        value: 30,  icon: Clock,      iconBg: "bg-amber-100",  iconColor: "text-amber-500"  },
  { label: "CERRADOS",          value: 30,  icon: CheckCircle,iconBg: "bg-green-100",  iconColor: "text-green-500"  },
];

const citas = [
  { nombre: "Ernesto José Arboran", fecha: "Lunes, 25 Nov",   hora: "10:30 AM", tipo: "MANT.", tipoBg: "bg-blue-100 text-blue-600"     },
  { nombre: "Maria Elena Rojas",    fecha: "Martes, 26 Nov",  hora: "09:00 AM", tipo: "MANT.", tipoBg: "bg-blue-100 text-blue-600"     },
  { nombre: "Roberto Sanchez",      fecha: "Martes, 26 Nov",  hora: "03:45 PM", tipo: "REDES", tipoBg: "bg-purple-100 text-purple-600" },
];

const desempeno = [
  { label: "EXCELENTE",  porcentaje: 88, color: "bg-green-500" },
  { label: "REGULAR",    porcentaje: 62, color: "bg-amber-400" },
  { label: "DEFICIENTE", porcentaje: 15, color: "bg-red-500"   },
];

function DonutChart() {
  const r = 54;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-6 flex-wrap">
      <div className="relative flex-shrink-0" style={{ width: "clamp(96px, 12vw, 128px)", height: "clamp(96px, 12vw, 128px)" }}>
        <svg viewBox="0 0 140 140" className="w-full h-full -rotate-90">
          <circle cx="70" cy="70" r={r} fill="none" stroke="#f0f0f0" strokeWidth="18" />
          <circle cx="70" cy="70" r={r} fill="none" stroke="#4f6ef7" strokeWidth="18"
            strokeDasharray={`${0.8 * c} ${c}`} />
          <circle cx="70" cy="70" r={r} fill="none" stroke="#f59e0b" strokeWidth="18"
            strokeDasharray={`${0.2 * c} ${c}`}
            strokeDashoffset={`-${0.8 * c}`} />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-bold text-gray-800" style={{ fontSize: "clamp(13px, 1.5vw, 18px)" }}>80%</span>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 min-w-0">
        {[
          { color: "bg-[#4f6ef7]", label: "Tickets Resueltos", sub: "80% Eficiencia" },
          { color: "bg-amber-400",  label: "Tickets en Proceso", sub: "20% En cola"    },
        ].map((item) => (
          <div key={item.label} className="flex items-start gap-2">
            <span className={`mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.color}`} />
            <div>
              <p className="text-sm font-semibold text-gray-700 leading-tight">{item.label}</p>
              <p className="text-xs text-gray-400">{item.sub}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
          <RefreshCw size={10} className="flex-shrink-0" />
          <span>Actualizado hace 5 minutos</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="w-full min-h-full p-4 xl:p-6 space-y-4">

      <div>
        <h1 className="text-xl xl:text-2xl font-bold text-gray-900">Panel de Control</h1>
        <p className="text-sm text-gray-400 mt-0.5">
          Resumen general del estado del HelpDesk y citas programadas.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {statsCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="shadow-none border border-gray-100 min-w-0">
              <CardContent className="p-3 xl:p-4 flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[9px] xl:text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1 truncate">
                    {stat.label}
                  </p>
                  <p className="text-2xl xl:text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`p-2 xl:p-2.5 rounded-xl flex-shrink-0 ${stat.iconBg}`}>
                  <Icon className={`w-4 h-4 xl:w-5 xl:h-5 ${stat.iconColor}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        <div className="space-y-4 min-w-0">

          <Card className="shadow-none border border-gray-100">
            <CardHeader className="pb-2 pt-4 px-4 xl:px-5 flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-bold text-gray-800">Progreso de Atención</CardTitle>
              <BarChart2 className="w-4 h-4 text-gray-300 flex-shrink-0" />
            </CardHeader>
            <CardContent className="px-4 xl:px-5 pb-4">
              <DonutChart />
            </CardContent>
          </Card>

          <Card className="shadow-none border border-gray-100">
            <CardHeader className="pb-2 pt-4 px-4 xl:px-5">
              <CardTitle className="text-sm font-bold text-gray-800">Valoración de Desempeño</CardTitle>
            </CardHeader>
            <CardContent className="px-4 xl:px-5 pb-4 space-y-3">
              {desempeno.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">
                      {item.label}
                    </span>
                    <span className="text-[10px] font-bold text-gray-600">{item.porcentaje}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div className={`h-2 rounded-full ${item.color} transition-all`} style={{ width: `${item.porcentaje}%` }} />
                  </div>
                </div>
              ))}
              <Separator className="mt-2" />
              <Button variant="ghost" size="sm"
                className="w-full text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1.5 h-8">
                Ver detalle analítico <ExternalLink size={11} />
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="shadow-none border border-gray-100 h-fit min-w-0">
          <CardHeader className="pb-2 pt-4 px-4 xl:px-5 flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-500 flex-shrink-0" />
              <CardTitle className="text-sm font-bold text-gray-800">Citas Programadas</CardTitle>
            </div>
            <Badge className="bg-orange-100 text-orange-500 hover:bg-orange-100 text-[10px] font-bold px-2 py-0.5 border-0 flex-shrink-0">
              HOY
            </Badge>
          </CardHeader>

          <CardContent className="px-4 xl:px-5 pb-2 space-y-0">
            {citas.map((cita, i) => (
              <div key={i}>
                <div className="flex items-center gap-3 py-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-gray-400">
                      <circle cx="12" cy="8" r="4" fill="currentColor" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="currentColor" opacity="0.35" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] font-bold text-orange-500 uppercase tracking-widest mb-0.5">CLIENTE</p>
                    <p className="text-sm font-semibold text-gray-800 truncate leading-tight">{cita.nombre}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                      <Clock size={10} className="flex-shrink-0" />
                      <span className="truncate">{cita.fecha} • {cita.hora}</span>
                    </div>
                  </div>
                  <Badge className={`text-[10px] font-bold px-2 py-0.5 border-0 flex-shrink-0 ${cita.tipoBg} hover:opacity-90`}>
                    {cita.tipo}
                  </Badge>
                </div>
                {i < citas.length - 1 && <Separator />}
              </div>
            ))}
          </CardContent>

          <div className="px-4 xl:px-5 pb-4 pt-2">
            <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg h-10 gap-2">
              <Calendar size={14} /> VER AGENDA COMPLETA
            </Button>
          </div>
        </Card>

      </div>
    </div>
  );
}