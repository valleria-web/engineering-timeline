// src/App.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";

// Datos base: Tiempo conocido (1..10)
const knownPrinciples = [
  {
    id: 1,
    title: "Palanca y máquinas simples",
    era: "≈ 3000 a.C.",
    summary:
      "Ventaja mecánica mediante palancas, planos inclinados, poleas tempranas.",
  },
  {
    id: 2,
    title: "Estática",
    era: "≈ 260 a.C. (Arquímedes)",
    summary: "Equilibrio de fuerzas y momentos; base de estructuras.",
  },
  {
    id: 3,
    title: "Hidrostática",
    era: "≈ 250 a.C. (Arquímedes)",
    summary: "Flotación y presión en fluidos; presas, barcos, canales.",
  },
  {
    id: 4,
    title: "Cinemática y dinámica clásica",
    era: "≈ 1600–1700 (Galileo y Newton)",
    summary:
      "Velocidad, aceleración, leyes de movimiento; fundamento de la mecánica.",
  },
  {
    id: 5,
    title: "Fuerza centrípeta / centrífuga",
    era: "≈ 1600–1700 (Newton y Huygens)",
    summary: "Movimiento circular y fuerzas inerciales.",
  },
  {
    id: 6,
    title: "Termodinámica",
    era: "≈ 1800–1850",
    summary: "Calor, trabajo, energía y entropía; motores y refrigeración.",
  },
  {
    id: 7,
    title: "Electromagnetismo",
    era: "≈ 1820–1870 (Faraday, Maxwell)",
    summary: "Campos eléctrico y magnético; inducción; telecomunicaciones.",
  },
  {
    id: 8,
    title: "Resistencia de materiales",
    era: "≈ 1800–1900",
    summary:
      "Esfuerzos, deformaciones, elasticidad/plasticidad; diseño estructural.",
  },
  {
    id: 9,
    title: "Ingeniería de control",
    era: "≈ 1930–1950",
    summary: "Retroalimentación, estabilidad y sistemas dinámicos.",
  },
  {
    id: 10,
    title: "Computación e ingeniería de software",
    era: "≈ 1950–presente",
    summary: "Algoritmos, simulación, sistemas embebidos y IA aplicada.",
  },
];

// Reversión (pares conceptuales con índice negativo)
const reversedPrinciples = [
  {
    id: -1,
    pairTo: 1,
    title: "Gran Pirámide de Guiza",
    era: "≈ 2560 a.C.",
    place: "Egipto",
    principle: "Palancas, planos inclinados, rodillos y logística monumental.",
    details:
      "Alineación cardinal, tolerancias milimétricas en bloques masivos; gestión de proyectos y módulos constructivos.",
  },
  {
    id: -2,
    pairTo: 1,
    title: "Stonehenge",
    era: "≈ 2500 a.C.",
    place: "Inglaterra",
    principle: "Izado megalítico con palancas/trineos; alineación solar.",
    details:
      "Piedras de hasta ~25 t dispuestas con precisión astronómica; probablemente rodillos y rampas.",
  },
  {
    id: -3,
    pairTo: 4,
    title: "Göbekli Tepe",
    era: "≈ 9600 a.C.",
    place: "Turquía",
    principle: "Pilares monolíticos y estabilidad de cargas antes de ciudades agrícolas.",
    details:
      "Organización de trabajo, diseño simbólico y control de equilibrio estructural muy temprano.",
  },
  {
    id: -4,
    pairTo: 7,
    title: "Ámbar y magnetita (observaciones clásicas)",
    era: "≥ 600 a.C. / s. III–II a.C.",
    place: "Grecia / China",
    principle:
      "Electricidad estática (ámbar frotado) y magnetismo (imanes naturales, brújula).",
    details:
      "Fenómenos electromagnéticos observados y aplicados mucho antes de la formalización teórica.",
  },
  {
    id: -5,
    pairTo: 3,
    title: "Qanats y cisternas protohistóricas",
    era: "≥ II milenio a.C.",
    place: "Irán / Levante",
    principle:
      "Gestión de niveles, presiones y flujo por gravedad en galerías subterráneas.",
    details:
      "Distribución de agua estable y sostenible en desiertos; control de gradientes hidráulicos.",
  },
  {
    id: -6,
    pairTo: 6,
    title: "Yakhchals y badgir (captadores de viento)",
    era: "≥ 400 a.C.",
    place: "Persia",
    principle:
      "Convección natural y enfriamiento evaporativo; almacenamiento de hielo en climas cálidos.",
    details:
      "Arquitectura bioclimática: tiro térmico, torres de viento y piscinas sombreadas.",
  },
  {
    id: -7,
    pairTo: 8,
    title: "Mampostería inca (Coricancha / Sacsayhuamán)",
    era: "≈ 1200–1500 d.C.",
    place: "Perú",
    principle:
      "Bloques poligonales a hueso que disipan esfuerzos; alto desempeño sísmico.",
    details:
      "Interfaz piedra-piedra con múltiples caras, sin mortero; fricción y geometría para distribuir cargas.",
  },
  {
    id: -8,
    pairTo: 9,
    title: "Relojes de agua y autómatas (Ktesibios / Herón)",
    era: "s. III a.C. / s. I d.C.",
    place: "Alejandría",
    principle: "Feedback mecánico/fluídico, regulación de nivel y secuencias automáticas.",
    details:
      "Flotadores, válvulas, sifones y controles de caudal como bucles de retroalimentación tempranos.",
  },
  {
    id: -9,
    pairTo: 5,
    title: "Honda prehistórica y torno de alfarero",
    era: "≥ Neolítico",
    place: "Diversos",
    principle: "Dinámica circular intuitiva; control de rotación estable.",
    details:
      "Transferencia de momento angular en la honda; velocidad angular constante en tornear arcilla.",
  },
  {
    id: -10,
    pairTo: 10,
    title: "Mecanismo de Anticitera / Quipus",
    era: "≈ 100 a.C. / ≈ 1400 d.C.",
    place: "Grecia / Andes",
    principle:
      "Cómputo analógico de efemérides y codificación mnemotécnica/algorítmica.",
    details:
      "Engranajes diferenciales para predicciones astronómicas; datos y procedimientos en cuerdas y nudos.",
  },
  {
    id: -11,
    pairTo: 2,
    title: "Granitos de Guiza (cámaras y aligeramientos)",
    era: "≈ 2560 a.C.",
    place: "Egipto",
    principle: "Desvío de cargas y estabilidad estática mediante cámaras de descarga.",
    details:
      "Uso de vigas y espacios para redistribuir compresiones sobre la Cámara del Rey.",
  },
  {
    id: -12,
    pairTo: 3,
    title: "Nabta Playa (megalitos y gestión de agua)",
    era: "≈ 7000–6500 a.C.",
    place: "Sáhara egipcio",
    principle: "Observación estacional y manejo de cuencas; relación con niveles de agua.",
    details:
      "Conjunto megalítico alineado a solsticio de verano; asentamientos alrededor de paleolagos.",
  },
];

function ItemCard({ side, head, sub, body, tag }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl shadow p-4 md:p-5 border ${
        side === "left" ? "bg-white" : "bg-slate-50"
      }`}
    >
      <div className="text-xs uppercase tracking-wider mb-1 opacity-70">{tag}</div>
      <div className="text-lg md:text-xl font-semibold">{head}</div>
      <div className="text-sm md:text-base opacity-80 mb-2">{sub}</div>
      <div className="text-sm md:text-base leading-relaxed">{body}</div>
    </motion.div>
  );
}

export default function ReversionTimeline() {
  const [expanded, setExpanded] = useState(false);

  // Índices para emparejar: agrupa reversión por pairTo
  const grouped = knownPrinciples.map((kp) => ({
    kp,
    rev: reversedPrinciples.filter((rp) => rp.pairTo === kp.id),
  }));

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
            Reversión de la Ingeniería — Punto Cero & Épocas Negativas
          </h1>
          <p className="mt-2 text-slate-700 md:text-lg">
            A la izquierda: <b>Tiempo conocido</b> (principios formales). A la derecha: <b>Reversión</b> —
            ejemplos históricos que anticipan o evocan esos principios antes del Punto Cero (Antigüedad).
          </p>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="px-3 py-2 rounded-xl shadow border bg-white text-sm font-medium hover:shadow-md transition"
            >
              {expanded ? (
                <span className="inline-flex items-center gap-1"><Minus size={16}/> Contraer detalles</span>
              ) : (
                <span className="inline-flex items-center gap-1"><Plus size={16}/> Expandir detalles</span>
              )}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {grouped.map(({ kp, rev }) => (
            <React.Fragment key={kp.id}>
              {/* Lado conocido */}
              <ItemCard
                side="left"
                head={`#${kp.id} · ${kp.title}`}
                sub={kp.era}
                body={kp.summary}
                tag="Tiempo conocido"
              />

              {/* Lado reversión (puede haber varios por par) */}
              <div className="space-y-3">
                {rev.map((rp) => (
                  <motion.div key={rp.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}>
                    <div className="rounded-2xl shadow p-4 md:p-5 border bg-slate-50">
                      <div className="text-xs uppercase tracking-wider mb-1 opacity-70">Reversión · #{rp.id}</div>
                      <div className="text-lg md:text-xl font-semibold">{rp.title}</div>
                      <div className="text-sm md:text-base opacity-80 mb-2">{rp.place} · {rp.era}</div>
                      <div className="text-sm md:text-base leading-relaxed">{rp.principle}</div>

                      <AnimatePresence>{expanded && (
                        <motion.p
                          className="text-sm md:text-base leading-relaxed mt-2 text-slate-700"
                          initial={{height:0, opacity:0}}
                          animate={{height:"auto", opacity:1}}
                          exit={{height:0, opacity:0}}
                        >
                          {rp.details}
                        </motion.p>
                      )}</AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>

        {/* Extras no emparejados directos, pero relevantes */}
        <section className="mt-8 md:mt-12">
          <h2 className="text-xl md:text-2xl font-semibold mb-3">Otros hitos de la Reversión</h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <ItemCard
              side="right"
              head="Nabta Playa (megalitos y gestión de agua)"
              sub="Sáhara egipcio · ≈ 7000–6500 a.C."
              body="Observatorio solar y asentamientos alrededor de paleolagos; conocimiento estacional del agua."
              tag="Reversión · # -12"
            />
            <ItemCard
              side="right"
              head="Cueva de Altamira / Lascaux"
              sub="España / Francia · ≈ 17 000–15 000 a.C."
              body="Técnicas pictóricas avanzadas, pigmentos y control de iluminación en cavidades profundas."
              tag="Reversión · # -4"
            />
          </div>
        </section>

        <footer className="mt-10 text-sm text-slate-600">
          <p>
            Diseño interactivo: haz clic en <em>Expandir detalles</em> para ver notas adicionales de cada hito de la Reversión.
          </p>
        </footer>
      </div>
    </div>
  );
}
