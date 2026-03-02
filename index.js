import React, { useState } from 'react';

// --- Base de Datos 2026 ---

const generateMonthTemplate = (daysInMonth, startDay, specialEvents = {}, includePlaceholders = true) => {
    const events = {};
    for (let i = 1; i <= daysInMonth; i++) {
        const dayOfWeek = (startDay + i - 1) % 7;
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        if (specialEvents[i]) {
            events[i] = specialEvents[i];
        } else if (!isWeekend && includePlaceholders) {
            events[i] = { profe: '...', tema: '...' };
        }
    }
    return events;
};

const generateJulyEvents = () => {
    const events = {};
    for (let i = 1; i <= 31; i++) {
        const dayOfWeek = (3 + i - 1) % 7;
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

        if (i === 9) {
            events[i] = { type: 'feriado', event: 'Día de la Independencia' };
        } else if (i >= 20) {
            events[i] = { type: 'receso', event: 'Receso Invernal' };
        } else if (!isWeekend) {
            events[i] = { profe: '...', tema: '...' };
        }
    }
    return events;
};

const calendarData = {
    "Marzo 2026": {
        daysInMonth: 31,
        startDay: 0,
        events: generateMonthTemplate(31, 0, {
            24: { type: 'feriado', event: 'Día Nacional de la Memoria por la Verdad y la Justicia' },
            29: { pastoral: 'Domingo de Ramos: Inicio de la Semana Santa' }
        })
    },
    "Abril 2026": {
        daysInMonth: 30,
        startDay: 3,
        events: generateMonthTemplate(30, 3, {
            2: { type: 'feriado', event: 'Día del Veterano y de los Caídos en la Guerra de Malvinas / Jueves Santo' },
            3: { type: 'feriado', event: 'Viernes Santo', pastoral: 'Celebración de la Pasión' },
            5: { pastoral: 'Domingo de Pascua de Resurrección' }
        })
    },
    "Mayo 2026": {
        daysInMonth: 31,
        startDay: 5,
        events: generateMonthTemplate(31, 5, {
            1: { type: 'feriado', event: 'Día del Trabajador' },
            25: { type: 'feriado', event: 'Día de la Revolución de Mayo' }
        })
    },
    "Junio 2026": {
        daysInMonth: 30,
        startDay: 1,
        events: generateMonthTemplate(30, 1, {
            17: { type: 'feriado', event: 'Paso a la Inmortalidad de Güemes' },
            20: { type: 'feriado', event: 'Día de la Bandera' }
        })
    },
    "Julio 2026": {
        daysInMonth: 31,
        startDay: 3,
        events: generateJulyEvents()
    },
    "Agosto 2026": {
        daysInMonth: 31,
        startDay: 6,
        events: generateMonthTemplate(31, 6, {
            4: { event: 'Día del Párroco' },
            15: { event: 'Día de la Asunción de María' },
            17: { type: 'feriado', event: 'Paso a la Inmortalidad de San Martín' },
            21: { event: 'Día del Catequista' }
        })
    },
    "Septiembre 2026": {
        daysInMonth: 30,
        startDay: 2,
        events: generateMonthTemplate(30, 2, {
            11: { type: 'feriado', event: 'Día del Maestro' },
            21: { type: 'feriado', event: 'Día del Estudiante / Primavera', pastoral: '...' }
        })
    },
    "Octubre 2026": {
        daysInMonth: 31,
        startDay: 4,
        events: generateMonthTemplate(31, 4, {
            12: { type: 'feriado', event: 'Día del Respeto a la Diversidad Cultural' }
        })
    },
    "Noviembre 2026": {
        daysInMonth: 30,
        startDay: 0,
        events: generateMonthTemplate(30, 0, {
            2: { pastoral: 'Conmemoración de los Fieles Difuntos' },
            20: { type: 'feriado', event: 'Día de la Soberanía Nacional' }
        })
    },
    "Diciembre 2026": {
        daysInMonth: 31,
        startDay: 2,
        events: generateMonthTemplate(31, 2, {
            8: { type: 'feriado', event: 'Inmaculada Concepción de María' },
            25: { type: 'feriado', event: 'Navidad' }
        }, false)
    }
};

const DAYS_OF_WEEK = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
const MONTHS_LIST = ['Marzo 2026', 'Abril 2026', 'Mayo 2026', 'Junio 2026', 'Julio 2026', 'Agosto 2026', 'Septiembre 2026', 'Octubre 2026', 'Noviembre 2026', 'Diciembre 2026'];

const COLORS = {
    azulInst: '#1F4E79',
    rojoLadrillo: '#C0504D',
    blanco: '#FFFFFF',
    negro: '#000000',
    grisClaro: '#F2F2F2',
    amarillo: '#FFE699',
    celesteFondo: '#9BC2E6',
    rosaFondo: '#F2DCDB',
    verdeProfe: '#00B050',
    celesteProfe: '#00B0F0',
    azulReceso: '#D6EAF8'
};

export default function App() {
    const [currentMonth, setCurrentMonth] = useState('Marzo 2026');
    const [filter, setFilter] = useState('all');
    const [isTemplateMode, setIsTemplateMode] = useState(false);

    const activeData = calendarData[currentMonth];

    const isMatch = (dayData) => {
        if (!dayData) return false;
        if (filter === 'all') return true;
        if (filter === 'equipo') return ['Franco Cattani', 'Mayra', 'Mauro'].includes(dayData.profe);
        if (filter === 'pastoral') return !!dayData.pastoral;
        return true;
    };

    const getEventBgColor = (data) => {
        if (data.type === 'feriado') return COLORS.rosaFondo;
        if (data.type === 'receso') return COLORS.azulReceso;
        if (data.pastoral && data.pastoral.toLowerCase().includes('liturgia')) return COLORS.rosaFondo;
        if (data.pastoral && data.pastoral.toLowerCase().includes('convivencia')) return COLORS.celesteFondo;
        return COLORS.rosaFondo;
    };

    const handleExportPDF = () => {
        window.print();
    };

    return (
        <>
            <style>
                {`
          @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&display=swap');

          @media print {
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            @page {
              size: landscape;
              margin: 1cm;
            }
          }
        `}
            </style>

            <div className="min-h-screen bg-gray-100 p-2 md:p-8" style={{ fontFamily: 'Arial, Calibri, sans-serif' }}>

                <div className="max-w-7xl mx-auto mb-4 bg-white p-3 border border-black print:hidden flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">

                    <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {MONTHS_LIST.map(month => (
                            <button
                                key={month}
                                onClick={() => setCurrentMonth(month)}
                                className="px-3 py-1 border border-black text-sm"
                                style={{
                                    backgroundColor: currentMonth === month ? COLORS.azulInst : COLORS.blanco,
                                    color: currentMonth === month ? COLORS.blanco : COLORS.negro,
                                    fontWeight: currentMonth === month ? 'bold' : 'normal'
                                }}
                            >
                                {month.split(' ')[0]}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-3 items-center justify-center">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="border border-black p-1 text-sm outline-none bg-white cursor-pointer"
                        >
                            <option value="all">Ver todo el calendario</option>
                            <option value="equipo">Turnos del Equipo (Franco, Mayra, Mauro)</option>
                            <option value="pastoral">Eventos Pastorales</option>
                        </select>

                        <button
                            onClick={() => setIsTemplateMode(!isTemplateMode)}
                            className="flex items-center gap-2 px-4 py-1.5 border-2 border-black font-bold text-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                            style={{ backgroundColor: isTemplateMode ? COLORS.celesteFondo : COLORS.blanco, color: COLORS.negro }}
                        >
                            {isTemplateMode ? '✏️ Ver Nombres' : '🖨️ Modo Plantilla'}
                        </button>

                        <button
                            onClick={handleExportPDF}
                            className="flex items-center gap-2 px-4 py-1.5 border-2 border-black font-bold text-sm shadow-[2px_2px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                            style={{ backgroundColor: COLORS.amarillo, color: COLORS.negro }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 9V2h12v7"></path>
                                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                                <rect x="6" y="14" width="12" height="8"></rect>
                            </svg>
                            Exportar a PDF
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto bg-white border-2 border-black overflow-x-auto">
                    <div className="min-w-[1000px]">

                        <div className="flex items-center justify-between p-4 border-b-2 border-black bg-white">
                            <div className="w-1/4 flex justify-center">
                                {/* --- SECCIÓN DEL LOGO --- */}
                                <div className="w-20 h-20 flex items-center justify-center overflow-hidden">
                                    <img
                                        src="https://via.placeholder.com/80?text=San+Jose" // CAMBIÁ ESTO POR LA RUTA DE TU LOGO
                                        alt="Logo San José"
                                        className="max-w-full max-h-full object-contain"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                    {/* Fallback en caso de que no cargue la imagen */}
                                    <div className="text-[10px] font-bold text-center uppercase" style={{ color: COLORS.azulInst }}>
                                        Sin Logo
                                    </div>
                                </div>
                            </div>

                            <div className="w-2/4 text-center">
                                <h1 className="font-bold text-2xl md:text-3xl uppercase tracking-wide" style={{ color: COLORS.azulInst, fontFamily: "'Oswald', sans-serif" }}>
                                    Calendario de Oración de {currentMonth.split(' ')[0]}
                                </h1>
                            </div>

                            <div className="w-1/4 text-center leading-tight flex flex-col justify-center" style={{ color: COLORS.azulInst }}>
                                <div className="font-bold text-xl uppercase tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>
                                    San José de Libertad
                                </div>
                                <div className="text-[11px] font-medium mt-0.5">Escuela Secundaria</div>
                                <div className="text-[10px] mt-1 uppercase opacity-80 leading-none">
                                    Escuelas Parroquiales de Libertad<br />Obispado de Merlo-Moreno
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-7 border-b-2 border-black" style={{ backgroundColor: COLORS.rojoLadrillo }}>
                            {DAYS_OF_WEEK.map((day) => (
                                <div key={day} className="py-2 text-center text-xs md:text-sm font-bold border-r border-black last:border-r-0" style={{ color: COLORS.blanco }}>
                                    {day}
                                </div>
                            ))}
                        </div>

                        <div className="grid grid-cols-7" style={{ gridAutoRows: 'minmax(120px, auto)' }}>

                            {Array.from({ length: activeData.startDay }).map((_, i) => (
                                <div key={`empty-${i}`} className="border-r border-b border-black" style={{ backgroundColor: COLORS.grisClaro }}></div>
                            ))}

                            {Array.from({ length: activeData.daysInMonth }).map((_, i) => {
                                const dayNum = i + 1;
                                const data = activeData.events[dayNum];
                                const isWeekend = (activeData.startDay + i) % 7 === 0 || (activeData.startDay + i) % 7 === 6;

                                const cellBgColor = (!isWeekend || data) ? COLORS.blanco : COLORS.grisClaro;

                                const opacity = (!isMatch(data)) ? '0.2' : '1';

                                return (
                                    <div
                                        key={dayNum}
                                        className="border-r border-b border-black flex flex-col transition-opacity"
                                        style={{ backgroundColor: cellBgColor, opacity: opacity }}
                                    >
                                        <div className="font-bold text-sm px-2 py-1" style={{ color: COLORS.negro }}>
                                            {dayNum}
                                        </div>

                                        <div className="flex-1 flex flex-col justify-start">

                                            {data && (data.type === 'feriado' || data.type === 'receso') && !data.profe && !data.tema ? (
                                                <div className="flex-1 flex flex-col items-center justify-center p-2 text-center text-[11px] font-bold border-t border-black" style={{ backgroundColor: getEventBgColor(data), color: COLORS.negro }}>
                                                    <span>{data.event}</span>
                                                    {data.pastoral && <span className="mt-1">{data.pastoral}</span>}
                                                </div>
                                            ) : (
                                                <>
                                                    {!isWeekend && data && (data.profe || data.tema) && (
                                                        <>
                                                            <div className="text-center text-[11px] leading-tight px-1 mb-1 mt-1 min-h-[14px]">
                                                                <span className="font-bold" style={{ color: COLORS.verdeProfe }}>Profe: </span>
                                                                <span style={{ color: COLORS.celesteProfe }}>{isTemplateMode ? '' : (data?.profe || '')}</span>
                                                            </div>

                                                            <div className="text-center text-[10px] sm:text-[11px] p-1 border-t border-black flex-1 flex flex-col justify-center min-h-[35px]" style={{ backgroundColor: COLORS.amarillo }}>
                                                                <div style={{ color: COLORS.negro }}>
                                                                    <span className="font-bold">Tema: </span>
                                                                    <span>{isTemplateMode ? '' : (data?.tema || '')}</span>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}

                                                    {data && (data.event || data.pastoral) && (
                                                        <div className={`text-center text-[10px] sm:text-[11px] p-1 font-bold border-black ${(!data.profe && !data.tema) ? 'flex-1 flex flex-col justify-center' : 'border-t'}`} style={{ backgroundColor: getEventBgColor(data), color: COLORS.negro }}>
                                                            {data.event && <div>{data.event}</div>}
                                                            {data.pastoral && <div>{data.pastoral}</div>}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}