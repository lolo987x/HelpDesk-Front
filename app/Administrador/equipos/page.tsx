"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Filter, Search, Plus, Pencil, Trash2, Eye, EyeOff, Monitor, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, X } from "lucide-react";

// ── Tipos y constantes ───────────────────────────────────────────
interface Equipo {
  id: string; tipo: string; marca: string; modelo: string;
  trabajador: string; contrasena: string; estado: "operacion" | "mantenimiento";
}

const FILAS = 10;
const TRABAJADORES = ["Máximo Chavez","Elena Rivas","Jorge Luna","Sofía Arca","Carlos Ruiz","Diana Maza","Luis Torres"];
const COLS = ["ID EQUIPO/S-N","TIPO","MARCA","MODELO","NOMBRE DEL TRABAJADOR","CONTRASEÑA","ACCIONES"];

const EQUIPOS_INICIALES: Equipo[] = [
  { id: "00269876358", tipo: "Laptop",  marca: "Samsung", modelo: "Vostro896",      trabajador: "Máximo Chavez", contrasena: "pass123", estado: "operacion"     },
  { id: "00269876359", tipo: "Laptop",  marca: "Dell",    modelo: "Latitude 5420",  trabajador: "Elena Rivas",   contrasena: "pass456", estado: "operacion"     },
  { id: "00269876360", tipo: "Desktop", marca: "HP",      modelo: "ProDesk 600",    trabajador: "Jorge Luna",    contrasena: "pass789", estado: "operacion"     },
  { id: "00269876361", tipo: "Monitor", marca: "Samsung", modelo: "Odyssey G5",     trabajador: "Sofía Arca",    contrasena: "pass321", estado: "mantenimiento" },
  { id: "00269876362", tipo: "Laptop",  marca: "Samsung", modelo: "Vostro896",      trabajador: "Carlos Ruiz",   contrasena: "pass654", estado: "operacion"     },
  { id: "00269876363", tipo: "Laptop",  marca: "Lenovo",  modelo: "ThinkPad X1",    trabajador: "Diana Maza",    contrasena: "pass987", estado: "operacion"     },
  { id: "00269876364", tipo: "Desktop", marca: "Dell",    modelo: "OptiPlex 7080",  trabajador: "Luis Torres",   contrasena: "pass111", estado: "operacion"     },
  { id: "00269876365", tipo: "Laptop",  marca: "Samsung", modelo: "Vostro896",      trabajador: "Máximo Chavez", contrasena: "pass222", estado: "operacion"     },
  { id: "00269876366", tipo: "Laptop",  marca: "Samsung", modelo: "Vostro896",      trabajador: "Máximo Chavez", contrasena: "pass333", estado: "mantenimiento" },
  { id: "00269876367", tipo: "Laptop",  marca: "Samsung", modelo: "Vostro896",      trabajador: "Máximo Chavez", contrasena: "pass444", estado: "operacion"     },
  { id: "00269876368", tipo: "Desktop", marca: "HP",      modelo: "EliteDesk 800",  trabajador: "Elena Rivas",   contrasena: "pass555", estado: "operacion"     },
  { id: "00269876369", tipo: "Monitor", marca: "LG",      modelo: "UltraWide 34",   trabajador: "Jorge Luna",    contrasena: "pass666", estado: "operacion"     },
  { id: "00269876370", tipo: "Laptop",  marca: "Lenovo",  modelo: "IdeaPad 5",      trabajador: "Sofía Arca",    contrasena: "pass777", estado: "mantenimiento" },
  { id: "00269876371", tipo: "Desktop", marca: "Samsung", modelo: "All-in-One",     trabajador: "Carlos Ruiz",   contrasena: "pass888", estado: "operacion"     },
  { id: "00269876372", tipo: "Laptop",  marca: "Dell",    modelo: "XPS 15",         trabajador: "Diana Maza",    contrasena: "pass999", estado: "operacion"     },
  { id: "00269876373", tipo: "Monitor", marca: "HP",      modelo: "Z27k G3",        trabajador: "Luis Torres",   contrasena: "pass000", estado: "operacion"     },
  { id: "00269876374", tipo: "Laptop",  marca: "Lenovo",  modelo: "ThinkPad E14",   trabajador: "Máximo Chavez", contrasena: "passabc", estado: "operacion"     },
  { id: "00269876375", tipo: "Desktop", marca: "Dell",    modelo: "Precision 3660", trabajador: "Elena Rivas",   contrasena: "passdef", estado: "mantenimiento" },
  { id: "00269876376", tipo: "Laptop",  marca: "Samsung", modelo: "Galaxy Book3",   trabajador: "Jorge Luna",    contrasena: "passghi", estado: "operacion"     },
  { id: "00269876377", tipo: "Monitor", marca: "LG",      modelo: "27UK850",        trabajador: "Sofía Arca",    contrasena: "passjkl", estado: "operacion"     },
];

// ── Sub-componentes 
function PasswordCell({ value }: { value: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center gap-1">
      <span className="text-gray-500 text-xs font-mono">{show ? value : "•••••••"}</span>
      <button onClick={() => setShow(!show)} className="text-gray-400 hover:text-gray-600 ml-1">
        {show ? <EyeOff size={12} /> : <Eye size={12} />}
      </button>
    </div>
  );
}

function Campo({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}

function EquipoModal({ open, onClose, titulo, subtitulo, equipo, onGuardar, labelBoton }: {
  open: boolean; onClose: () => void; titulo: string; subtitulo: string;
  equipo: Partial<Equipo>; onGuardar: (d: Partial<Equipo>) => void; labelBoton: string;
}) {
  const [form, setForm] = useState<Partial<Equipo>>(equipo);
  const [showPass, setShowPass] = useState(false);
  const set = (k: keyof Equipo, v: string) => setForm((p) => ({ ...p, [k]: v }));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg p-0 overflow-hidden rounded-2xl border-0 shadow-xl">
        <div className="bg-orange-500 px-6 py-4 flex items-center justify-between">
          <div>
            <DialogTitle className="text-white font-bold text-lg">{titulo}</DialogTitle>
            <p className="text-orange-100 text-xs mt-0.5">{subtitulo}</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white"><X size={18} /></button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Campo label="Nombre del Equipo">
              <Input placeholder="Ej. Estación de Diseño 01" value={form.modelo || ""} onChange={(e) => set("modelo", e.target.value)} className="h-9 text-sm border-gray-200" />
            </Campo>
            <Campo label="N° de Serie">
              <Input placeholder="SN-89234-XP" value={form.id || ""} onChange={(e) => set("id", e.target.value)} className="h-9 text-sm border-gray-200" />
            </Campo>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Campo label="Tipo">
              <Select value={form.tipo || ""} onValueChange={(v) => set("tipo", v)}>
                <SelectTrigger className="h-9 text-sm border-gray-200"><SelectValue placeholder="Laptop" /></SelectTrigger>
                <SelectContent>
                  {["Laptop","Desktop","Monitor","Tablet","Impresora"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </Campo>
            <Campo label="Modelo">
              <Input placeholder="MacBook Pro M2 2023" value={form.modelo || ""} onChange={(e) => set("modelo", e.target.value)} className="h-9 text-sm border-gray-200" />
            </Campo>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Campo label="Contraseña">
              <div className="relative">
                <Input type={showPass ? "text" : "password"} placeholder="Ingrese Contraseña"
                  value={form.contrasena || ""} onChange={(e) => set("contrasena", e.target.value)}
                  className="h-9 text-sm border-gray-200 pr-9" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </Campo>
            <Campo label="Marca">
              <Input placeholder="Apple Inc." value={form.marca || ""} onChange={(e) => set("marca", e.target.value)} className="h-9 text-sm border-gray-200" />
            </Campo>
          </div>
          <Campo label="Trabajador">
            <Select value={form.trabajador || ""} onValueChange={(v) => set("trabajador", v)}>
              <SelectTrigger className="h-9 text-sm border-gray-200"><SelectValue placeholder="Ingrese Nombre del Trabajador" /></SelectTrigger>
              <SelectContent>
                {TRABAJADORES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </Campo>
        </div>

        <div className="px-6 pb-5 flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 h-10 text-sm font-semibold border-gray-200 text-gray-600 hover:bg-gray-50">Cerrar</Button>
          <Button onClick={() => onGuardar(form)} className="flex-1 h-10 text-sm font-bold text-white bg-orange-500 hover:bg-orange-600">{labelBoton}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function EquiposPage() {
  const [equipos, setEquipos]       = useState<Equipo[]>(EQUIPOS_INICIALES);
  const [inputs, setInputs]         = useState({ id: "", tipo: "todas", marca: "todas", cliente: "" });
  const [filtros, setFiltros]       = useState({ id: "", tipo: "todas", marca: "todas", cliente: "" });
  const [pagina, setPagina]         = useState(1);
  const [modalCrear, setModalCrear] = useState(false);
  const [editando, setEditando]     = useState<Equipo | null>(null);

  const set = (k: keyof typeof inputs, v: string) => setInputs((p) => ({ ...p, [k]: v }));

  const filtrados = equipos.filter((e) =>
    (!filtros.id      || e.id.includes(filtros.id)) &&
    (filtros.tipo === "todas"  || e.tipo  === filtros.tipo) &&
    (filtros.marca === "todas" || e.marca === filtros.marca) &&
    (!filtros.cliente || e.trabajador.toLowerCase().includes(filtros.cliente.toLowerCase()))
  );

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / FILAS));
  const paginados    = filtrados.slice((pagina - 1) * FILAS, pagina * FILAS);
  const tipos        = ["todas", ...Array.from(new Set(equipos.map((e) => e.tipo)))];
  const marcas       = ["todas", ...Array.from(new Set(equipos.map((e) => e.marca)))];

  const aplicarFiltros = () => { setFiltros(inputs); setPagina(1); };

  const handleCrear = (data: Partial<Equipo>) => {
    setEquipos((prev) => [{ id: `0026987${Math.floor(Math.random() * 9000 + 1000)}`, tipo: data.tipo || "Laptop",
      marca: data.marca || "", modelo: data.modelo || "", trabajador: data.trabajador || "",
      contrasena: data.contrasena || "", estado: "operacion" }, ...prev]);
    setModalCrear(false);
  };

  const handleEditar = (data: Partial<Equipo>) => {
    if (!editando) return;
    setEquipos((prev) => prev.map((e) => e.id === editando.id ? { ...e, ...data } : e));
    setEditando(null);
  };

  return (
    <div className="w-full min-h-full p-4 xl:p-6 space-y-4">

      <div>
        <h1 className="text-xl xl:text-2xl font-bold text-gray-900">Equipos</h1>
        <p className="text-sm text-gray-400 mt-0.5">Gestiona el inventario de equipos asignados.</p>
      </div>

      <Card className="shadow-none border border-gray-100">
        <CardContent className="p-4 xl:p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-bold text-gray-700">Filtros</span>
            </div>
            <Button onClick={() => setModalCrear(true)} className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold h-9 px-4 gap-1.5 rounded-lg">
              <Plus size={14} /> Crear Equipo
            </Button>
          </div>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
            <Campo label="ID Equipo">
              <Input placeholder="Buscar por ID..." value={inputs.id} onChange={(e) => set("id", e.target.value)} className="h-9 text-sm border-gray-200 focus-visible:ring-orange-400" />
            </Campo>
            <Campo label="Tipo">
              <Select value={inputs.tipo} onValueChange={(v) => set("tipo", v)}>
                <SelectTrigger className="h-9 text-sm border-gray-200"><SelectValue placeholder="Todas" /></SelectTrigger>
                <SelectContent>{tipos.map((t) => <SelectItem key={t} value={t}>{t === "todas" ? "Todas" : t}</SelectItem>)}</SelectContent>
              </Select>
            </Campo>
            <Campo label="Marca">
              <Select value={inputs.marca} onValueChange={(v) => set("marca", v)}>
                <SelectTrigger className="h-9 text-sm border-gray-200"><SelectValue placeholder="Todas" /></SelectTrigger>
                <SelectContent>{marcas.map((m) => <SelectItem key={m} value={m}>{m === "todas" ? "Todas" : m}</SelectItem>)}</SelectContent>
              </Select>
            </Campo>
            <Campo label="Cliente a cargo">
              <Input placeholder="Nombre Cliente..." value={inputs.cliente} onChange={(e) => set("cliente", e.target.value)} className="h-9 text-sm border-gray-200 focus-visible:ring-orange-400" />
            </Campo>
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
                <tr className="bg-orange-50 border-b border-orange-100">
                  {COLS.map((col) => (
                    <th key={col} className="text-left text-[10px] font-bold text-orange-400 uppercase tracking-wider px-4 py-3 whitespace-nowrap">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginados.length === 0 ? (
                  <tr><td colSpan={7} className="text-center py-12 text-sm text-gray-400">No se encontraron equipos.</td></tr>
                ) : paginados.map((e, i) => (
                  <tr key={e.id} className={`border-b border-gray-50 hover:bg-orange-50/30 transition-colors ${i % 2 === 0 ? "bg-white" : "bg-gray-50/20"}`}>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="text-[11px] font-mono font-semibold text-blue-600 bg-blue-50 border-blue-200 px-2 py-0.5 rounded">{e.id}</Badge>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{e.tipo}</td>
                    <td className="px-4 py-3 text-gray-700">{e.marca}</td>
                    <td className="px-4 py-3 text-gray-600">{e.modelo}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{e.trabajador}</td>
                    <td className="px-4 py-3"><PasswordCell value={e.contrasena} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => setEditando(e)} className="p-1.5 rounded-md hover:bg-green-50 text-green-500 hover:text-green-600 transition-colors"><Pencil size={14} /></button>
                        <button onClick={() => setEquipos((prev) => prev.filter((eq) => eq.id !== e.id))} className="p-1.5 rounded-md hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 flex-wrap gap-2">
            <p className="text-xs text-gray-400">
              Mostrando del {filtrados.length === 0 ? 0 : (pagina - 1) * FILAS + 1} al {Math.min(pagina * FILAS, filtrados.length)} de {filtrados.length} resultados
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-400 mr-2">Filas: {FILAS}</span>
              <Button variant="ghost" size="sm" onClick={() => setPagina((p) => Math.max(1, p - 1))} disabled={pagina === 1} className="h-7 w-7 p-0 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ChevronLeft size={14} /></Button>
              {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
                <Button key={n} variant="ghost" size="sm" onClick={() => setPagina(n)}
                  className={`h-7 w-7 p-0 text-xs font-semibold rounded-md transition-colors ${pagina === n ? "bg-orange-500 text-white hover:bg-orange-600" : "text-gray-500 hover:text-gray-800"}`}>{n}</Button>
              ))}
              <Button variant="ghost" size="sm" onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))} disabled={pagina === totalPaginas} className="h-7 w-7 p-0 text-gray-400 hover:text-gray-700 disabled:opacity-30"><ChevronRight size={14} /></Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Equipos",    valor: equipos.length,                                            icon: Monitor,      bg: "bg-orange-100", color: "text-orange-500" },
          { label: "En Operación",     valor: equipos.filter((e) => e.estado === "operacion").length,    icon: CheckCircle,  bg: "bg-green-100",  color: "text-green-500"  },
          { label: "En Mantenimiento", valor: equipos.filter((e) => e.estado === "mantenimiento").length,icon: AlertCircle,  bg: "bg-red-100",    color: "text-red-500"    },
        ].map(({ label, valor, icon: Icon, bg, color }) => (
          <Card key={label} className="shadow-none border border-gray-100">
            <CardContent className="p-3 xl:p-4 flex items-center gap-3">
              <div className={`p-2 rounded-xl flex-shrink-0 ${bg}`}><Icon className={`w-5 h-5 ${color}`} /></div>
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{label}</p>
                <p className="text-2xl font-bold text-gray-800">{valor.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EquipoModal open={modalCrear} onClose={() => setModalCrear(false)} titulo="Añade un equipo"
        subtitulo="Completa la información técnica y asignación para el nuevo equipo."
        equipo={{}} onGuardar={handleCrear} labelBoton="+ Agregar" />

      <EquipoModal open={!!editando} onClose={() => setEditando(null)} titulo="Editar Equipo"
        subtitulo="Actualiza la información técnica y asignación del equipo en el sistema."
        equipo={editando || {}} onGuardar={handleEditar} labelBoton="✓ Editar" />
    </div>
  );
}