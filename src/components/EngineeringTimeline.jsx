import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight, Minus, Plus } from "lucide-react";

// Datos base: Tiempo conocido (1..10)
const EngineeringPrincipals = [
  {
    id: 1,
    title: "Palanca y máquinas simples",
    era: "≈ 3000 a.C.",
    summary:
      "Ventaja mecánica mediante palancas, planos inclinados, poleas tempranas.",
    exampleTitle: "Ejemplo significativo:",
    examples: [
      "Grúa romana (Polyspastos) — izado con cabrestantes y ruedas de andar (≈ s. I a.C.).",
      "Shaduf egipcio — palanca para elevar agua (≈ II milenio a.C.).",
    ],
    assocTitle:
      "BricksChallenge → ingeniería clásica y mecánica preindustrial (palancas, engranajes, transmisiones).",
    assoc: [
      "BC-3 The Level Principle — palanca / nivel",
      "BC-4 Belt Transmission — poleas, molinos",
      "BC-5 Gear, Chain, and Snail Transmissions — engranajes primitivos",
      "BC-6 Crown Gear Transmission — evolución de engranajes",
    ],
  },
  {
    id: 2,
    title: "Estática",
    era: "≈ 260 a.C. (Arquímedes)",
    summary: "Equilibrio de fuerzas y momentos; base de estructuras.",
    exampleTitle: "Ejemplo significativo:",
    examples: [
      "Pont du Gard (acueducto romano) — arco de piedra en equilibrio (≈ s. I d.C.).",
    ],
    assocTitle:
      "BricksChallenge → ingeniería clásica y mecánica preindustrial (palancas, engranajes, transmisiones).",
    assoc: [
      "BC-3 The Level Principle — palanca / nivel",
      "BC-4 Belt Transmission — poleas, molinos",
      "BC-5 Gear, Chain, and Snail Transmissions — engranajes primitivos",
      "BC-6 Crown Gear Transmission — evolución de engranajes",
    ],
  },
  {
    id: 3,
    title: "Hidrostática",
    era: "≈ 250 a.C. (Arquímedes)",
    summary: "Flotación y presión en fluidos; presas, barcos, canales.",
    exampleTitle: "Ejemplo significativo:",
    examples: [
      "Sifón invertido del acueducto de Gier (Lyon) — conducción a presión (≈ s. I d.C.).",
    ],
    assocTitle: "—",
    assoc: [],
  },
  {
    id: 4,
    title: "Cinemática y dinámica clásica",
    era: "≈ 1600–1700 (Galileo y Newton)",
    summary:
      "Movimiento de cuerpos, aceleración, leyes de Newton, velocidad, leyes de movimiento; fundamento de la mecánica.",
    exampleTitle: "Ejemplo significativo:",
    examples: [
      "Planos inclinados de Galileo — medición de aceleración (≈ 1600s).",
    ],
    assocTitle:
      "BricksChallenge + Galileo Technic → transmisiones, cinemática y mecanismos.",
    assoc: [
      "BC-2 Centrifugal Force (Newton/Huygens)",
      "BC-7 Speed Increasing/Decreasing Transmissions",
      "BC-8 Double Speed/Power Transmissions",
      "BC-9 Idler Gear and Symmetry",
      "GT-1 Calculating Double Speed Transmissions",
      "GT-2 Vibrations, Universal Joint, Angular Momentum",
      "GT-3 Mechanical Force Control",
      "GT-4 Mechanical Linkage",
      "GT-5 Circular to Linear",
      "GT-6 Oscillation",
      "GT-7 Potential and Kinetic Energies",
      "GT-8 Steering Mechanism",
    ],

  },
  {
    id: 5,
    title: "Fuerza centrípeta / centrífuga",
    era: "≈ 1600–1700 (Newton y Huygens)",
    summary: "Movimiento circular y fuerzas inerciales.",
    exampleTitle: "Ejemplo significativo:",
    examples: [
      "Regulador centrífugo de Watt — control de velocidad por fuerza centrífuga (1788).",
    ],
    assocTitle:
      "BricksChallenge → ingeniería clásica y mecánica preindustrial (palancas, engranajes, transmisiones).",
    assoc: [
      "BC-2 Centrifugal Force (Newton/Huygens)",
    ],
  },
  {
    id: 6,
    title: "Termodinámica",
    era: "≈ 1800–1850",
    summary: "Calor, trabajo, energía y entropía; motores y refrigeración.",
    exampleTitle: "Ejemplo significativo:",
    examples: [
      "Máquina de vapor de Watt — conversión de calor en trabajo útil (≈ 1776–1781).",
    ],
    assocTitle: "—",
    assoc: [],
  },
  {
    id: 7,
    title: "Electromagnetismo",
    era: "≈ 1820–1870 (Faraday, Maxwell)",
    summary: "Campos eléctrico y magnético; inducción; telecomunicaciones.",
    exampleTitle: "Ejemplo significativo:",
    examples: [
      "Disco de Faraday — primer generador eléctrico (1831).",
    ],
  },
  {
    id: 8,
    title: "Resistencia de materiales",
    era: "≈ 1800–1900",
    summary:
      "Esfuerzos, deformaciones, elasticidad/plasticidad; diseño estructural.",
    exampleTitle: "Ejemplo significativo:",
    examples: [
      "The Iron Bridge (Coalbrookdale, 1779) — primer puente de hierro fundido.",
    ],
    assocTitle:
      "Galileo Technic → mecánica avanzada aplicada en industria (Ingeniería Moderna).",
    assoc: [
      "GT (todos) aplicados a cálculo y mecanismos",
    ],
  },
  {
    id: 9,
    title: "Ingeniería de control",
    era: "≈ 1930–1950",
    summary: "Retroalimentación, estabilidad y sistemas dinámicos.",
    exampleTitle: "Ejemplo significativo:",
    examples: [
      "Piloto automático de Sperry — estabilización de aeronaves (1912).",
    ],
    assocTitle:
      "Robotoys → ingeniería de control y robótica educativa (segunda mitad del siglo XX).",
    assoc: [
      "RT-2 a RT-14: movimiento, tiempo, sensores, multithreading, loops",
    ],
  },
  {
    id: 10,
    title: "Computación e ingeniería de software",
    era: "≈ 1950–presente",
    summary: "Algoritmos, simulación, sistemas embebidos y IA aplicada.",
    exampleTitle: "Ejemplo significativo:",
    examples: [
      "ENIAC — computadora electrónica de propósito general (1945).",
    ],
    assocTitle:
      "AlgoC → ingeniería de software y mecatrónica (siglo XXI).",
    assoc: [
      "AC Ch. 2–20: estructuras, funciones, debugging, sensores, loops, arrays, multithreading",
    ],
  },
  {
    id: 11,
    title: "Principio de Precisión Astronómica y Geométrica",
    era: "≈ indeterminate",
    summary: "Aplicación de la observación celeste y el dominio geométrico para alinear construcciones colosales con puntos cardinales, solsticios, equinoccios o estrellas circumpolares, alcanzando tolerancias extraordinarias.",
    exampleTitle: "Ejemplos significativos:",
    examples: [
      "Gran Pirámide de Guiza (Egipto) — orientación al norte verdadero y relación con estrellas circumpolares.",
      "Stonehenge (Inglaterra) — alineación con solsticios y calendario solar megalítico.",
      "Göbekli Tepe (Turquía) — complejos de pilares con posibles vínculos astronómicos y organización social temprana.",
      "Coricancha y Sacsayhuamán (Perú) — mampostería poligonal con alineaciones solares y sísmicas.",
    ],
  }
];
// Ancient Engineering -  AE (pares conceptuales con índice negativo)
const reversedPrinciples = [

  {
    id: -1,
    pairTo: 11,
    title: "Gran Pirámide de Guiza (Ancient Engineering)",
    era: "≈ indeterminate",
    place: "Egipto",
    principle: "Principio de Precisión Astronómica y Geométrica",
    details: [
      "Posible instrumento astronómico monumental: evidencia de inteligencia capaz de alinearse con el cosmos.",
      "Alineación al norte verdadero con error de minutos de arco.",
      "Relación con estrellas circumpolares y solsticios.",
    ],
    precisionPoints: [
      "Teodolito a escala colosal.",
      "Tolerancias geométricas y astronómicas extraordinarias.",
    ],
  },
  {
    id: -21,
    pairTo: 11,
    title: "Stonehenge (Ancient Engineering)",
    era: "≈ indeterminate ",
    place: "Inglaterra",
    principle: "Relevancia: Monumento megalítico alineado con los solsticios.",
    details:
      ["Piedras de hasta ~25 t dispuestas con precisión astronómica en pleno Neolítico.",
      ],
  },
  {
    id: -22,
    pairTo: 11,
    title: "Göbekli Tepe (Ancient Engineering)",
    era: "≈ indeterminate",
    place: "Turquía",
    principle: "Relevancia: Complejo de templos con columnas de piedra de hasta 10 toneladas. Pilares monolíticos y estabilidad de cargas antes de ciudades agrícolas.",
    details:
      ["Construido antes de la agricultura masiva y las ciudades. Indica organización social y conocimiento técnico avanzado.",
      ],
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
      ["Fenómenos electromagnéticos observados y aplicados mucho antes de la formalización teórica.",
      ],
  },
  {
    id: -3,
    pairTo: 3,
    title: "Qanats y cisternas protohistóricas",
    era: "≥ II milenio a.C.",
    place: "Irán / Levante",
    principle:
      "Gestión de niveles, presiones y flujo por gravedad en galerías subterráneas.",
    details:
      ["Distribución de agua estable y sostenible en desiertos; control de gradientes hidráulicos.",
      ],
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
      ["Arquitectura bioclimática: tiro térmico, torres de viento y piscinas sombreadas.",
      ],
  },
  {
    id: -7,
    pairTo: 2,
    title: "Mampostería inca (Coricancha / Sacsayhuamán)",
    era: "≈ indeterminate ",
    place: "Perú",
    principle:
      "Construcción con bloques poligonales perfectamente ajustados, sin mortero.",
    details:
      ["Distribución de cargas.Estabilidad de muros frente a fuerzas externas (incluyendo sismos). Uso de geometría de contacto para transmitir fuerzas y evitar colapso.",
      ],
  },
  {
    id: -8,
    pairTo: 8,
    title: "Relojes de agua y autómatas (Ktesibios / Herón)",
    era: "s. III a.C. / s. I d.C.",
    place: "Alejandría",
    principle: "Feedback mecánico/fluídico, regulación de nivel y secuencias automáticas.",
    details:
      ["Flotadores, válvulas, sifones y controles de caudal como bucles de retroalimentación tempranos.",
      ],
  },
  {
    id: -5,
    pairTo: 5,
    title: "Honda prehistórica y torno de alfarero - Rueda de Ur",
    era: "≥ Neolítico",
    place: "Diversos",
    principle: "Dinámica circular intuitiva; control de rotación estable.",
    details:
      ["Transferencia de momento angular en la honda; velocidad angular constante en tornear arcilla.",
      ],
  },
  {
    id: -10,
    pairTo: 10,
    title: "Mecanismo de Anticitera / Quipus",
    era: "≈ indeterminate ",
    place: "Grecia / Andes",
    principle:
      "Cómputo analógico de efemérides y codificación mnemotécnica/algorítmica.",
    details:
      ["Engranajes diferenciales para predicciones astronómicas; datos y procedimientos en cuerdas y nudos.",
      ],
  },
  {
    id: -11,
    pairTo: 0,
    title: "Granitos de Guiza (cámaras y aligeramientos)",
    era: "≈ indeterminate ",
    place: "Egipto",
    principle: "Desvío de cargas y estabilidad estática mediante cámaras de descarga.",
    details:
      ["Uso de vigas y espacios para redistribuir compresiones sobre la Cámara del Rey.",
      ],
  },
  {
    id: -12,
    pairTo: 3,
    title: "Nabta Playa (megalitos y gestión de agua)",
    era: "≈ indeterminate",
    place: "Sáhara egipcio",
    principle: "Observación estacional y manejo de cuencas; relación con niveles de agua.",
    details:
      ["Conjunto megalítico alineado a solsticio de verano; asentamientos alrededor de paleolagos.",
      ],
  },
];

// Matemáticas relacionadas por principio (id → grupos)
const mathMap = {
  1: {
    title: "Aritmética",
    principal: "Estudio de los números y las operaciones básicas entre ellos, como suma, resta, multiplicación y división",
    secondary: "Geometría (empírica) formas, tamaños, propiedades de las figuras y el espacio. ",
    figures: "Euclides, Gauss, Riemann, Poincaré (sec.: Viète, Descartes, Euler)",
    existed: "Geometría práctica y topografía; aritmética/proporciones; nivel de agua; triángulo 3–4–5",
    formalized: "Geometría axiomática (Euclides) y trigonometría; ley de la palanca y estática",
    details: [
      { text: "Bases empíricas de medida y nivelación", status: "existed" },
      { text: "Trigonometría formal para ángulos y razones", status: "formalized" },
    ],
    links: [
      { text: "Triangulación, proporciones y nivelación en máquinas simples", status: "existed" },
      { text: "Relación seno/coseno para palancas y ángulos de trabajo", status: "formalized" },
    ],
  },
  2: {
    title: "Geometría del equilibrio (simetría y las proporciones)",
    principal: "Geometría y Topología",
    secondary: "Álgebra Lineal; Cálculo",
    figures: "Euclides, Gauss, Riemann, Cauchy, Jordan, von Neumann",
    existed: "Trazado geométrico de arcos/bóvedas; reglas empíricas de equilibrio y aplomado",
    formalized: "Estática (momentos) y métodos matriciales (álgebra lineal)",
    details: [
      { text: "Arcos y bóvedas guiados por geometría práctica", status: "existed" },
      { text: "Cálculo de momentos y resolución matricial", status: "formalized" },
    ],
    links: [
      { text: "Formas de arcos y bóvedas; descomposición de fuerzas", status: "existed" },
      { text: "Matrices de rigidez y equilibrio nodal (métodos clásicos)", status: "formalized" },
    ],
  },
  3: {
    title: "Cálculo de fluidos",
    principal: "Cálculo y Análisis Real",
    secondary: "Análisis Complejo y Funcional",
    figures: "Newton, Leibniz, Cauchy, Riemann, Lebesgue (sec.: Hilbert, Banach)",
    existed: "Gestión empírica de caudales por gravedad; nivelación y aforos básicos",
    formalized: "Principio de Arquímedes; presión hidrostática; cálculo diferencial",
    details: [
      { text: "Aprovechamiento por gravedad y aforos empíricos", status: "existed" },
      { text: "Modelos de presión/flotación y flujo potencial", status: "formalized" },
    ],
    links: [
      { text: "Principio de Arquímedes y presión hidrostática", status: "formalized" },
      { text: "Flujo potencial (modelo ideal) y líneas de corriente", status: "formalized" },
    ],
  },
  4: {
    title: "Cálculo de la dinámica (movimiento de los cuerpos y las fuerzas que lo causan)",
    principal: "Cálculo y Análisis Real",
    secondary: "Álgebra Lineal; Matemáticas aplicadas",
    figures: "Newton, Leibniz, Cauchy, Euler; Gauss, Jordan",
    existed: "Cinemática empírica (planos inclinados, péndulos)",
    formalized: "EDO y segunda ley de Newton; métodos numéricos (Runge–Kutta)",
    details: [
      { text: "Observación de movimientos y tiempos", status: "existed" },
      { text: "EDO de 2º orden y soluciones numéricas", status: "formalized" },
    ],
    links: [
      { text: "Leyes de movimiento: EDO de 2º orden", status: "formalized" },
      { text: "Integración numérica (Runge–Kutta) para sistemas no lineales", status: "formalized" },
    ],
  },
  5: {
    title: "Trigonometría del giro",
    principal: "Álgebra de Transición (precalc/trig)",
    secondary: "Cálculo",
    figures: "Viète, Descartes, Euler, Newton, Leibniz",
    existed: "Trigonometría práctica del círculo; experiencia con giros y resortes",
    formalized: "Aceleración centrípeta y dinámica rotacional en cálculo",
    details: [
      { text: "Giro uniforme, ángulos y sincronía", status: "existed" },
      { text: "Curvatura y aceleración centrípeta", status: "formalized" },
    ],
    links: [
      { text: "Movimiento circular uniforme y no uniforme", status: "existed" },
      { text: "Curvatura y aceleración centrípeta", status: "formalized" },
    ],
  },
  6: {
    title: "Análisis térmico y numérico",
    principal: "Matemáticas aplicadas y modelado",
    secondary: "Cálculo; Probabilidad/Estadística",
    figures: "Fourier, Laplace, Navier–Stokes, Runge–Kutta; Boltzmann",
    existed: "Observación de calor/trabajo en hornos y máquinas tempranas",
    formalized: "Leyes de la termodinámica; ecuación del calor/NS; métodos numéricos",
    details: [
      { text: "Prácticas de combustión y transferencia de calor", status: "existed" },
      { text: "EDP del calor/flujo y discretización numérica", status: "formalized" },
    ],
    links: [
      { text: "Balances de energía y entropía (EDP)", status: "formalized" },
      { text: "Métodos numéricos para transferencia de calor y fluidos", status: "formalized" },
    ],
  },
  7: {
    title: "Campos y ondas",
    principal: "Análisis Complejo y Funcional",
    secondary: "Aplicadas/Modelado; Cálculo",
    figures: "Cauchy, Riemann, Hilbert, Banach (sec.: Maxwell, Fourier)",
    existed: "Fenómenos eléctricos/magnéticos observados (ámbar, magnetita)",
    formalized: "Ecuaciones de Maxwell; transformadas y análisis espectral",
    details: [
      { text: "Observación de atracción eléctrica y brújula", status: "existed" },
      { text: "Ondas EM y transformadas (Fourier/Laplace)", status: "formalized" },
    ],
    links: [
      { text: "Ondas EM, condiciones de contorno y transformadas", status: "formalized" },
      { text: "Circuitos, señales y espectro", status: "formalized" },
    ],
  },
  8: {
    title: "Mecánica del continuo (elasticidad)",
    principal: "Álgebra Lineal & Cálculo (Mecánica del Continuo)",
    secondary: "Análisis Numérico; EDP (ecuaciones en derivadas parciales)",
    figures: "Cauchy, Navier, Kelvin, Timoshenko (sec.: Gauss, Jordan, Ritz, Galerkin)",
    existed: "Reglas empíricas de resistencia; prueba y error con materiales",
    formalized: "Ecuaciones de elasticidad (Navier–Cauchy), tensores y métodos numéricos (FEM)",
    details: [
      { text: "Tensores esfuerzo–deformación y constitutivas (Hooke lineal)", status: "formalized" },
      { text: "Problemas de eigenvalores: modos propios y pandeo", status: "formalized" },
    ],
    links: [
      { text: "Tensores esfuerzo–deformación y modos propios", status: "formalized" },
      { text: "Elementos finitos para estructuras (sistemas lineales masivos)", status: "formalized" },
    ],
  },
  9: {
    title: "Modelado matemático de control",
    principal: "Álgebra Lineal",
    secondary: "Probabilidad/Estadística; Discretas",
    figures: "Kalman; Gauss, Kolmogórov, Shannon",
    existed: "Regulación empírica (flotadores, reguladores centrífugos)",
    formalized: "Espacio de estados; observadores; control óptimo; filtrado (Kalman)",
    details: [
      { text: "Realimentación mecánica y regulación práctica", status: "existed" },
      { text: "Representación en espacio de estados y observadores", status: "formalized" },
      { text: "Filtrado/estimación (Kalman) y control óptimo", status: "formalized" },
    ],
    links: [
      { text: "Espacio de estados, observadores y control óptimo", status: "formalized" },
      { text: "Filtrado de ruido, lógica de eventos y muestreo", status: "formalized" },
    ],
  },
  10: {
    title: "Computación discreta y lógica",
    principal: "Discretas/Combinatoria/Números",
    secondary: "Fundamentos y Lógica; Prob/Estadística",
    figures: "Turing, Shannon, Erdős, Diffie–Hellman (sec.: Frege, Russell, Gödel)",
    existed: "Algoritmos artesanales, mnemotecnia (quipus)",
    formalized: "Lógica matemática, teoría de algoritmos, criptografía moderna y ML",
    details: [
      { text: "Procedimientos y cómputo manual", status: "existed" },
      { text: "Teoría de algoritmos y criptografía", status: "formalized" },
    ],
    links: [
      { text: "Algoritmia, grafos, criptografía y verificación", status: "formalized" },
      { text: "Aprendizaje automático e inferencia", status: "formalized" },
    ],
  },
  11: {
    title: "Precisión astronómica y geométrica",
    principal: "Geometría/Trigonometría/Astronomía matemática",
    secondary: "Geodesia y topografía; Teoría de errores; Mecánica de materiales; Optimización logística",
    figures: "Sacerdotes-astrónomos y arquitectos egipcios, constructores megalíticos, ingenieros incas",
    existed: "Alineaciones empíricas con gnomon, miras y observación estelar; proporciones armónicas intuitivas",
    formalized: "Trigonometría esférica, astronomía matemática, teoría de errores, FEM, optimización y logística moderna",
    details: [
      { text: "Alineaciones solares, lunares y estelares con instrumentos simples", status: "existed" },
      { text: "Uso empírico de proporciones armónicas y modulares en diseño", status: "existed" },
      { text: "Geometría, trigonometría y astronomía formalizadas", status: "formalized" },
      { text: "Geodesia y topografía de precisión para nivelación y orientación", status: "formalized" },
      { text: "Teoría de errores y tolerancias en mediciones", status: "formalized" },
      { text: "Mecánica de materiales y análisis estructural (FEM)", status: "formalized" },
      { text: "Optimización matemática de logística y montaje", status: "formalized" },
    ],
    links: [
      { text: "Geometría práctica y trigonometría aplicada", status: "existed" },
      { text: "Astronomía matemática y trigonometría esférica", status: "formalized" },
      { text: "Geodesia, cartografía y topografía de precisión", status: "formalized" },
      { text: "Teoría de errores y métodos estadísticos", status: "formalized" },
      { text: "Mecánica de materiales y resistencia de estructuras", status: "formalized" },
      { text: "Optimización de recursos y logística en megaobras", status: "formalized" },
    ],
  },
};

function ItemCard({ side, head, sub, body, tag, listTitle, listItems, badges }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-2xl shadow p-4 md:p-5 border ${side === "left" ? "bg-white" : "bg-slate-50"}`}
    >
      <div className="text-xs uppercase tracking-wider mb-1 opacity-70">{tag}</div>
      <div className="text-lg md:text-xl font-semibold">{head}</div>
      <div className="text-sm md:text-base opacity-80 mb-2">{sub}</div>
      {body && <div className="text-sm md:text-base leading-relaxed">{body}</div>}
      {Array.isArray(badges) && badges.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {badges.map((b, i) => (
            <span
              key={i}
              title={b.tooltip || b.label}
              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${b.variant === 'existed'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-indigo-50 text-indigo-800 border-indigo-200'
                }`}
            >
              {b.label}
            </span>
          ))}
        </div>
      )}
      {Array.isArray(listItems) && listItems.length > 0 && (
        <div className="mt-2 text-slate-700">
          {listTitle && (
            <div className="text-sm md:text-base font-medium mb-1">{listTitle}</div>
          )}
          <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
            {listItems.map((it, idx) => {
              const obj = typeof it === 'object' && it !== null ? it : null;
              const status = obj?.status; // 'existed' | 'formalized' | undefined
              const text = obj?.text || (typeof it === 'string' ? it : String(it));
              const color = status === 'existed' ? 'text-emerald-700' : status === 'formalized' ? 'text-indigo-700' : 'text-slate-800';
              const dot = status === 'existed' ? 'bg-emerald-500' : status === 'formalized' ? 'bg-indigo-500' : 'bg-slate-400';
              return (
                <li key={idx} className={`flex items-start gap-2 ${color}`}>
                  <span className={`mt-1 inline-block w-2 h-2 rounded-full ${dot}`}></span>
                  <span>{text}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </motion.div>
  );
}

function Connector({ leftLabel, rightLabel }) {
  return (
    <div className="relative flex items-center my-2 md:my-3">
      <div className="flex-1 h-px bg-slate-300" />
      <div className="mx-2 text-xs md:text-sm font-medium opacity-70 whitespace-nowrap">
        {leftLabel} ↔ {rightLabel}
      </div>
      <div className="flex-1 h-px bg-slate-300" />
    </div>
  );
}

export default function AncientEngineering() {
  const [expanded, setExpanded] = useState(true);

  // Índices para emparejar: agrupa AE por pairTo
  const grouped = EngineeringPrincipals.map((kp) => ({
    kp,
    rev: reversedPrinciples.filter((rp) => rp.pairTo === kp.id),
  }));

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-white to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight">
            Engineering Principles Timeline & Ancient Engineering
          </h1>
          <p className="mt-2 text-slate-700 md:text-lg">
            A la izquierda: <b>Engineering Principles</b> (principios formales). A la derecha: <b>Ancient Engineering</b> —
            ejemplos históricos que anticipan o evocan esos principios antes de su posible descubrimiento (Antigüedad).
          </p>
          <div className="mt-3 p-3 md:p-4 rounded-xl border bg-amber-50 text-amber-900 text-sm md:text-base leading-relaxed">
            <b>Nota histórica.</b> La práctica de la <b>ingeniería</b> (construcción, canales, herramientas) antecede a la <b>matemática formal</b>. Con el tiempo, las matemáticas pasan a <b>formalizar</b> y <b>potenciar</b> la ingeniería. En esta tabla: cada fila cruza <i>Principio de ingeniería</i> ↔ <i>Programas educativos</i> ↔ <i>Matemáticas relacionadas</i> ↔ <i>Ancient Engineering</i>, indicando <u>Grupo matemático principal (secundario)</u> y <u>personajes representativos</u>.
          </div>

          <div className="mt-2 flex items-center gap-3">
            <div className="inline-flex items-center gap-2 text-xs md:text-sm">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-800 border-emerald-200">Existía entonces</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full border bg-indigo-50 text-indigo-800 border-indigo-200">Formalización</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="px-3 py-2 rounded-xl shadow border bg-white text-sm font-medium hover:shadow-md transition"
            >
              {expanded ? (
                <span className="inline-flex items-center gap-1"><Minus size={16} /> Contraer detalles</span>
              ) : (
                <span className="inline-flex items-center gap-1"><Plus size={16} /> Expandir detalles</span>
              )}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {grouped.map(({ kp, rev }) => (
            <React.Fragment key={kp.id}>
              {/* Lado conocido */}
              <ItemCard
                side="left"
                head={`#${kp.id} · ${kp.title}`}
                sub={kp.era}
                body={kp.summary}
                tag="Engineering Principles"
                listTitle={kp.exampleTitle}
                listItems={kp.examples}
              />

              {/* Columna de asociaciones (programas) */}
              <ItemCard
                side="left"
                head="Programas educativos"
                sub={kp.assocTitle || ""}
                tag="BC / GT / RT / AC"
                body={!kp.assoc || kp.assoc.length === 0 ? "—" : undefined}
                listTitle={kp.assoc && kp.assoc.length > 0 ? "" : undefined}
                listItems={kp.assoc || []}
              />

              {/* Columna de matemáticas */}
              <ItemCard
                side="left"
                head={mathMap[kp.id]?.title || "Matemáticas relacionadas"}
                sub=""
                tag="Matemáticas"
                body={!mathMap[kp.id] ? "—" : undefined}
                listTitle={mathMap[kp.id] ? "" : undefined}
                listItems={mathMap[kp.id]
                  ? [
                    mathMap[kp.id].principal
                      ? `Grupo: ${mathMap[kp.id].principal}${mathMap[kp.id].secondary ? ` (secundario: ${mathMap[kp.id].secondary})` : ""}`
                      : null,
                    mathMap[kp.id].figures ? `Personajes: ${mathMap[kp.id].figures}` : null,
                    ...(mathMap[kp.id].links || [])
                  ].filter(Boolean)
                  : []}
              /> {/* Lado AE (puede haber varios por par) */}
              <div className="space-y-3">
                {rev.map((rp) => (
                  <motion.div key={rp.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                    <div className="rounded-2xl shadow p-4 md:p-5 border bg-slate-50">
                      <div className="text-xs uppercase tracking-wider mb-1 opacity-70">Ancient Engineering · #{rp.id}</div>
                      <div className="text-lg md:text-xl font-semibold">{rp.title}</div>
                      <div className="text-sm md:text-base opacity-80 mb-2">{rp.place} · {rp.era}</div>
                      <div className="text-sm md:text-base leading-relaxed">{rp.principle}</div>

                      <AnimatePresence>{expanded && (
                        <motion.div
                          className="mt-2 text-slate-700"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                        >
                          {Array.isArray(rp.details) ? (
                            <div className="space-y-3">
                              {rp.detailsTitle && (
                                <div className="text-sm md:text-base font-medium">{rp.detailsTitle}</div>
                              )}
                              <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                                {rp.details.map((d, i) => (
                                  <li key={i}>{d}</li>
                                ))}
                              </ul>
                              {Array.isArray(rp.precisionPoints) && rp.precisionPoints.length > 0 && (
                                <div className="pt-1">
                                  {rp.precisionTitle && (
                                    <div className="text-sm md:text-base font-medium mb-1">{rp.precisionTitle}</div>
                                  )}
                                  <ul className="list-disc pl-5 space-y-1 text-sm md:text-base">
                                    {rp.precisionPoints.map((p, j) => (
                                      <li key={j}>{p}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm md:text-base leading-relaxed">{rp.details}</p>
                          )}
                        </motion.div>
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
          <h2 className="text-xl md:text-2xl font-semibold mb-3">Otros hitos de la Ancient Engineering</h2>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <ItemCard
              side="right"
              head="Nabta Playa (megalitos y gestión de agua)"
              sub="Sáhara egipcio · ≈ 7000–6500 a.C."
              body="Observatorio solar y asentamientos alrededor de paleolagos; conocimiento estacional del agua."
              tag="AE· # -12"
            />
            <ItemCard
              side="right"
              head="Cueva de Altamira / Lascaux"
              sub="España / Francia · ≈ 17 000–15 000 a.C."
              body="Técnicas pictóricas avanzadas, pigmentos y control de iluminación en cavidades profundas."
              tag="AE · # -4"
            />
          </div>
        </section>

        <footer className="mt-10 text-sm text-slate-600">
          <p>
            VdSR
          </p>
        </footer>
      </div>
    </div>
  );
}
