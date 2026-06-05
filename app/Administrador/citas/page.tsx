"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Monitor, User, MoreVertical } from "lucide-react";

// ── Tipos y constantes ───────────────────────────────────────────
interface Cita {
  id: number;
  hora: string;
  titulo: string;
  tecnico: string;
  equipo: string;
  dia: number;
}

const MESES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DIAS_SEMANA = ["DOM","LUN","MAR","MIE","JUE","VIE","SAB"];

const CITAS: Cita[] = [
  { id: 1,  hora: "10:30 am", titulo: "Falla en Hardware de PC", tecnico: "Luis Fernández Rojas", equipo: "PC Oficina HP", dia: 7  },
  { id: 2,  hora: "10:30 am", titulo: "Falla en Hardware de PC", tecnico: "Luis Fernández Rojas", equipo: "PC Oficina HP", dia: 10 },
  { id: 3,  hora: "10:30 am", titulo: "Falla en Hardware de PC", tecnico: "Luis Fernández Rojas", equipo: "PC Oficina HP", dia: 11 },
  { id: 4,  hora: "10:30 am", titulo: "Falla en Hardware de PC", tecnico: "Luis Fernández Rojas", equipo: "PC Oficina HP", dia: 12 },
  { id: 5,  hora: "10:30 am", titulo: "Falla en Hardware de PC", tecnico: "Luis Fernández Rojas", equipo: "PC Oficina HP", dia: 13 },
  { id: 6,  hora: "10:30 am", titulo: "Falla en Hardware de PC", tecnico: "Luis Fernández Rojas", equipo: "PC Oficina HP", dia: 15 },
  { id: 7,  hora: "10:30 am", titulo: "Falla en Hardware de PC", tecnico: "Luis Fernández Rojas", equipo: "PC Oficina HP", dia: 18 },
  { id: 8,  hora: "12:30 pm", titulo: "Falla en Hardware de PC", tecnico: "Luis Fernández Rojas", equipo: "PC Oficina HP", dia: 7  },
  { id: 9,  hora: "12:30 pm", titulo: "Falla en Hardware de PC", tecnico: "Luis Fernández Rojas", equipo: "PC Oficina HP", dia: 12 },
  { id: 10, hora: "12:30 pm", titulo: "Falla en Hardware de PC", tecnico: "Luis Fernández Rojas", equipo: "PC Oficina HP", dia: 13 },
];

function getDiasEnMes(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getPrimerDiaSemana(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

function getSemanas(year: number, month: number): (number | null)[][] {
  const total = getDiasEnMes(year, month);
  const inicio = getPrimerDiaSemana(year, month);
  const dias: (number | null)[] = [...Array(inicio).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  while (dias.length % 7 !== 0) dias.push(null);
  const semanas: (number | null)[][] = [];
  for (let i = 0; i < dias.length; i += 7) semanas.push(dias.slice(i, i + 7));
  return semanas;
}

function CitaCard({ cita }: { cita: Cita }) {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-md p-1.5 mb-1 text-[11px] leading-tight">
      <div className="flex items-start justify-between gap-1 mb-0.5">
        <span className="text-amber-600 font-semibold">{cita.hora}</span>
        <button className="text-gray-400 hover:text-gray-600 flex-shrink-0"><MoreVertical size={11} /></button>
      </div>
      <p className="font-bold text-gray-800 mb-1">{cita.titulo}</p>
      <div className="flex items-center gap-1 text-gray-500 mb-0.5">
        <User size={9} className="flex-shrink-0" />
        <span className="truncate">{cita.tecnico}</span>
      </div>
      <div className="flex items-center gap-1 text-gray-500">
        <Monitor size={9} className="flex-shrink-0" />
        <span className="truncate">{cita.equipo}</span>
      </div>
    </div>
  );
}

export default function CronogramaPage() {
  const hoy = new Date();
  const [año, setAño]   = useState(hoy.getFullYear());
  const [mes, setMes]   = useState(hoy.getMonth());

  const irMesAnterior = () => { if (mes === 0) { setMes(11); setAño(a => a - 1); } else setMes(m => m - 1); };
  const irMesSiguiente = () => { if (mes === 11) { setMes(0); setAño(a => a + 1); } else setMes(m => m + 1); };

  const semanas = getSemanas(año, mes);
  const hoyDia  = hoy.getFullYear() === año && hoy.getMonth() === mes ? hoy.getDate() : null;

  const citasDelDia = (dia: number | null) =>
    dia ? CITAS.filter((c) => c.dia === dia) : [];

  return (
    <div className="w-full min-h-full p-4 xl:p-6 space-y-4">

      <div>
        <h1 className="text-xl xl:text-2xl font-bold text-gray-900">Cronograma de Citas</h1>
        <p className="text-sm text-gray-400 mt-0.5">Visualiza y gestiona las citas programadas del mes.</p>
      </div>

      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white">

        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
          <button onClick={irMesAnterior} className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors">
            <ChevronLeft size={16} />
          </button>
          <span className="text-sm font-bold text-gray-800 min-w-[120px] text-center capitalize">
            {MESES[mes]}, {año}
          </span>
          <button onClick={irMesSiguiente} className="p-1 rounded hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse min-w-[700px]">

            <thead>
              <tr>
                {DIAS_SEMANA.map((d) => (
                  <th key={d} className="bg-orange-500 text-white text-xs font-bold uppercase tracking-wider text-center py-2.5 border-r border-orange-400 last:border-r-0">
                    {d}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {semanas.map((semana, si) => (
                <tr key={si} className="border-t border-gray-100">
                  {semana.map((dia, di) => {
                    const esHoy  = dia === hoyDia;
                    const citas  = citasDelDia(dia);
                    return (
                      <td key={di} className="border-r border-gray-100 last:border-r-0 align-top p-1.5 min-h-[100px]"
                        style={{ verticalAlign: "top" }}>
                        {dia && (
                          <>
                            <div className={`text-xs font-bold mb-1 w-6 h-6 flex items-center justify-center rounded-full ${
                              esHoy ? "bg-orange-500 text-white" : "text-gray-500"
                            }`}>
                              {dia}
                            </div>
                            {citas.map((cita) => <CitaCard key={cita.id} cita={cita} />)}
                          </>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}