"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Search, Mail, ChevronLeft, ChevronRight } from "lucide-react";

// ── Tipos y constantes ───────────────────────────────────────────
const ITEMS_POR_PAGINA = 10;

const ESTADO_STYLES: Record<string, string> = {
  "En Progreso": "bg-blue-100 text-blue-600 border-blue-200",
  "Pendiente":   "bg-amber-100 text-amber-600 border-amber-200",
  "Cerrado":     "bg-red-100 text-red-500 border-red-200",
};

const TICKETS = [
  { pin: "#TK-4021", incidente: "Falla de Red LAN",          estado: "En Progreso", soporte: "Juan M.",   empresa: "Corporación X",     fecha: "12/10/2023", tipo: "Remoto"     },
  { pin: "#TK-4022", incidente: "Mantenimiento Preventivo",   estado: "Pendiente",   soporte: "Maria S.",  empresa: "Inversiones Delta",  fecha: "13/10/2023", tipo: "Presencial" },
  { pin: "#TK-4023", incidente: "Instalación Software",       estado: "Cerrado",     soporte: "Carlos R.", empresa: "Logística Nacional", fecha: "14/10/2023", tipo: "Remoto"     },
  { pin: "#TK-4024", incidente: "Soporte Impresora",          estado: "En Progreso", soporte: "Ana P.",    empresa: "Corporación X",     fecha: "15/10/2023", tipo: "Presencial" },
  { pin: "#TK-4025", incidente: "Configuración VPN",          estado: "Pendiente",   soporte: "Juan M.",   empresa: "Tech Solutions",    fecha: "16/10/2023", tipo: "Remoto"     },
  { pin: "#TK-4026", incidente: "Recuperación de Datos",      estado: "Cerrado",     soporte: "Maria S.",  empresa: "Inversiones Delta",  fecha: "17/10/2023", tipo: "Presencial" },
  { pin: "#TK-4027", incidente: "Actualización Windows",      estado: "En Progreso", soporte: "Carlos R.", empresa: "Logística Nacional", fecha: "18/10/2023", tipo: "Remoto"     },
  { pin: "#TK-4028", incidente: "Falla de Servidor",          estado: "Pendiente",   soporte: "Ana P.",    empresa: "Tech Solutions",    fecha: "19/10/2023", tipo: "Presencial" },
  { pin: "#TK-4029", incidente: "Antivirus Corporativo",      estado: "Cerrado",     soporte: "Juan M.",   empresa: "Corporación X",     fecha: "20/10/2023", tipo: "Remoto"     },
  { pin: "#TK-4030", incidente: "Soporte Email",              estado: "En Progreso", soporte: "Maria S.",  empresa: "Tech Solutions",    fecha: "21/10/2023", tipo: "Presencial" },
];

const COLS = ["PIN TICKET", "INCIDENTE", "ESTADO", "SOPORTE", "EMPRESA", "FECHA", "TIPO", "ACCIONES"];

// ── Componente
export default function TicketsPage() {
  const [filtros, setFiltros] = useState({ pin: "", estado: "todos", empresa: "" });
  const [inputs, setInputs]   = useState({ pin: "", estado: "todos", empresa: "" });
  const [pagina, setPagina]   = useState(1);

  const filtrados = TICKETS.filter((t) =>
    (!filtros.pin     || t.pin.toLowerCase().includes(filtros.pin.toLowerCase())) &&
    (filtros.estado === "todos" || t.estado === filtros.estado) &&
    (!filtros.empresa || t.empresa.toLowerCase().includes(filtros.empresa.toLowerCase()))
  );

  const totalPaginas = Math.ceil(filtrados.length / ITEMS_POR_PAGINA);
  const paginados    = filtrados.slice((pagina - 1) * ITEMS_POR_PAGINA, pagina * ITEMS_POR_PAGINA);

  const aplicarFiltros = () => { setFiltros(inputs); setPagina(1); };
  const set = (k: keyof typeof inputs, v: string) => setInputs((p) => ({ ...p, [k]: v }));

  return (
    <div className="w-full min-h-full p-4 xl:p-6 space-y-4">

      <div>
        <h1 className="text-xl xl:text-2xl font-bold text-gray-900">Lista de Tickets</h1>
        <p className="text-sm text-gray-400 mt-0.5">Gestiona y filtra todos los tickets del sistema.</p>
      </div>

      <Card className="shadow-none border border-gray-100">
        <CardContent className="p-4 xl:p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-bold text-gray-700">Filtros</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">PIN de Ticket</label>
              <Input placeholder="Ej: TK-2941" value={inputs.pin} onChange={(e) => set("pin", e.target.value)}
                className="h-9 text-sm border-gray-200 focus-visible:ring-orange-400" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Estado</label>
              <Select value={inputs.estado} onValueChange={(v) => set("estado", v)}>
                <SelectTrigger className="h-9 text-sm border-gray-200">
                  <SelectValue placeholder="Todos los estados" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos los estados</SelectItem>
                  <SelectItem value="En Progreso">En Progreso</SelectItem>
                  <SelectItem value="Pendiente">Pendiente</SelectItem>
                  <SelectItem value="Cerrado">Cerrado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Empresa</label>
              <Input placeholder="Seleccionar Empresa" value={inputs.empresa} onChange={(e) => set("empresa", e.target.value)}
                className="h-9 text-sm border-gray-200 focus-visible:ring-orange-400" />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={aplicarFiltros} className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold h-9 px-5 gap-2 rounded-lg">
              <Search size={14} /> Filtrar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none border border-gray-100">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {COLS.map((col) => (
                    <th key={col} className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider px-4 py-3 whitespace-nowrap">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginados.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-sm text-gray-400">
                      No se encontraron tickets con los filtros aplicados.
                    </td>
                  </tr>
                ) : paginados.map((t, i) => (
                  <tr key={t.pin} className={`border-b border-gray-50 hover:bg-orange-50/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/20"}`}>
                    <td className="px-4 py-3.5 font-bold text-orange-500 whitespace-nowrap">{t.pin}</td>
                    <td className="px-4 py-3.5 text-gray-700 font-medium max-w-[160px]"><span className="line-clamp-2">{t.incidente}</span></td>
                    <td className="px-4 py-3.5 whitespace-nowrap">
                      <Badge variant="outline" className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${ESTADO_STYLES[t.estado]}`}>
                        {t.estado}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{t.soporte}</td>
                    <td className="px-4 py-3.5 text-gray-600 max-w-[130px]"><span className="line-clamp-2">{t.empresa}</span></td>
                    <td className="px-4 py-3.5 text-gray-500 whitespace-nowrap text-xs">{t.fecha}</td>
                    <td className="px-4 py-3.5 text-gray-600 whitespace-nowrap">{t.tipo}</td>
                    <td className="px-4 py-3.5">
                      <button className="p-1.5 rounded-lg hover:bg-orange-100 text-orange-400 hover:text-orange-600 transition-colors">
                        <Mail size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Mostrando {filtrados.length === 0 ? 0 : (pagina - 1) * ITEMS_POR_PAGINA + 1} al {Math.min(pagina * ITEMS_POR_PAGINA, filtrados.length)} de {filtrados.length} resultados
            </p>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => setPagina((p) => Math.max(1, p - 1))} disabled={pagina === 1}
                className="h-7 w-7 p-0 text-gray-400 hover:text-gray-700 disabled:opacity-30">
                <ChevronLeft size={14} />
              </Button>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                <Button key={n} variant="ghost" size="sm" onClick={() => setPagina(n)}
                  className={`h-7 w-7 p-0 text-xs font-semibold rounded-md transition-colors ${pagina === n ? "bg-orange-500 text-white hover:bg-orange-600" : "text-gray-500 hover:text-gray-800"}`}>
                  {n}
                </Button>
              ))}
              <Button variant="ghost" size="sm" onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))} disabled={pagina === totalPaginas || totalPaginas === 0}
                className="h-7 w-7 p-0 text-gray-400 hover:text-gray-700 disabled:opacity-30">
                <ChevronRight size={14} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}