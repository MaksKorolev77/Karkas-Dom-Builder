import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

type ZoneId = "roof" | "ceiling" | "walls" | "floor" | "foundation";

const ZONES: Record<ZoneId, {
  label: string;
  sublabel: string;
  color: string;
  glowColor: string;
  specs: { k: string; v: string }[];
  description: string;
}> = {
  roof: {
    label: "Металлочерепица",
    sublabel: "Финберг 0.5 мм, полиэстровое покрытие",
    color: "#64748b",
    glowColor: "rgba(100,116,139,0.4)",
    specs: [
      { k: "Материал", v: "Стальной лист 0.5 мм" },
      { k: "Покрытие", v: "Полиэстер 25 мкм" },
      { k: "Доборные элементы", v: "Конёк, снегозадержатели, водостоки" },
      { k: "Срок службы", v: "50+ лет" },
    ],
    description: "Финская металлочерепица с полиэстровым покрытием. Устойчива к коррозии и ультрафиолету. В комплектацию Оптимум и Максимум входят водостоки, снегозадержатели и подшив свесов пластиковыми софитами.",
  },
  ceiling: {
    label: "Утепление кровли",
    sublabel: "Каменная вата 200–250 мм + пароизоляция",
    color: "#f5a020",
    glowColor: "rgba(245,160,32,0.35)",
    specs: [
      { k: "Стропила", v: "Доска 45×190 мм" },
      { k: "Утеплитель", v: "Каменная вата Rockwool 200–250 мм" },
      { k: "Пароизоляция", v: "Паробарьер 0.2 мм" },
      { k: "Теплосопротивление", v: "R = 5.0–6.25 м²·°С/Вт" },
    ],
    description: "Стропильная система из сухой доски 45×190 мм. Между стропилами — каменная вата. Снизу — пароизоляция с проклейкой стыков. Сверху — ветрозащита, контробрешётка, обрешётка и металлочерепица. Потолок не промерзает даже при -40°С.",
  },
  walls: {
    label: "Стены",
    sublabel: "Каркас + каменная вата 150–250 мм",
    color: "#e07020",
    glowColor: "rgba(224,112,32,0.4)",
    specs: [
      { k: "Каркас (Эконом)", v: "Доска 45×145 мм" },
      { k: "Каркас (Оптимум/Макс)", v: "45×145 мм + контркаркас 50 мм" },
      { k: "Утеплитель", v: "150 / 200 / 250 мм каменной ваты" },
      { k: "Теплосопротивление", v: "R = 3.75 / 5.0 / 6.25 м²·°С/Вт" },
    ],
    description: "Несущий каркас из сухой строганной доски. Перекрёстный контркаркас полностью устраняет мостики холода через стойки. Снаружи — ветрозащита Tyvek, изнутри — пароизоляция с двойной проклейкой. Стены дышат, не горят, не гниют.",
  },
  floor: {
    label: "Перекрытие пола",
    sublabel: "Лаги 45×190 мм + 200–250 мм утеплителя",
    color: "#a07848",
    glowColor: "rgba(160,120,72,0.4)",
    specs: [
      { k: "Лаги", v: "Доска 45×190 мм с шагом 600 мм" },
      { k: "Утеплитель", v: "Каменная вата 200–250 мм" },
      { k: "Чёрновой пол", v: "Обрезная доска 20×100 мм" },
      { k: "Покрытие (Оптимум+)", v: "Фанера 18 мм" },
    ],
    description: "Лаги пола на 45×190 мм опираются на обвязочный брус и ростверк. Пространство между лагами заполнено каменной ватой. Полы тёплые без тёплых систем — зимой пол комфортен даже в носках. Мостики холода через лаги исключены.",
  },
  foundation: {
    label: "Фундамент",
    sublabel: "Ж/б сваи 150×150 мм, глубина 3–5 м",
    color: "#94a3b8",
    glowColor: "rgba(148,163,184,0.4)",
    specs: [
      { k: "Тип свай", v: "Ж/б забивные 150×150 мм" },
      { k: "Глубина", v: "3–5 м (до несущего слоя)" },
      { k: "Несущая", v: "до 10 т / свая" },
      { k: "Монтаж", v: "1 день, без земляных работ" },
    ],
    description: "Забивные железобетонные сваи — самый надёжный и быстрый фундамент для каркасного дома. Работают на любых грунтах: пучинистых, водонасыщенных, торфяных. Не зависят от глубины грунтовых вод. Нагрузка передаётся прямо на несущий слой грунта.",
  },
};

function ZoneCard({ zone }: { zone: ZoneId }) {
  const z = ZONES[zone];
  return (
    <motion.div
      key={zone}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="bg-slate-800/90 border border-slate-600/60 rounded-2xl p-5 md:p-6 max-w-3xl mx-auto"
    >
      <div className="flex flex-wrap items-start gap-4 mb-4">
        <div>
          <h3 className="text-lg md:text-xl font-bold text-white mb-0.5">{z.label}</h3>
          <p className="text-sm text-slate-400">{z.sublabel}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
        {z.specs.map((s) => (
          <div key={s.k} className="bg-slate-900/60 rounded-xl p-3">
            <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide mb-1">{s.k}</div>
            <div className="text-xs font-medium text-slate-200 leading-snug">{s.v}</div>
          </div>
        ))}
      </div>
      <p className="text-sm text-slate-400 leading-relaxed">{z.description}</p>
    </motion.div>
  );
}

export function HouseSchematic() {
  const [activeZone, setActiveZone] = useState<ZoneId | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  const handleZone = (z: ZoneId) => setActiveZone(prev => prev === z ? null : z);
  const isActive = (z: ZoneId) => activeZone === z;
  const isDimmed = (z: ZoneId) => activeZone !== null && !isActive(z);

  const zoneOpacity = (z: ZoneId, base = 1) => isDimmed(z) ? base * 0.3 : isActive(z) ? 1 : base;

  return (
    <section ref={ref} className="py-14 md:py-20 bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 md:mb-12"
        >
          <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            Технология строительства
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
            Разрез каркасного дома
          </h2>
          <p className="text-base md:text-lg text-slate-400">
            Нажмите на любую зону, чтобы узнать подробности конструктива
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="max-w-5xl mx-auto"
        >
          <svg viewBox="0 0 900 560" className="w-full drop-shadow-2xl" style={{ maxHeight: 520 }}>
            <defs>
              {/* Blueprint grid */}
              <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(148,163,184,0.06)" strokeWidth="0.5"/>
              </pattern>
              {/* Insulation pattern (waves) */}
              <pattern id="ins-pat" x="0" y="0" width="20" height="12" patternUnits="userSpaceOnUse">
                <rect width="20" height="12" fill="#f5a020" opacity="0.85"/>
                <path d="M0 4 Q5 1 10 4 Q15 7 20 4" stroke="#d4801a" strokeWidth="1" fill="none" opacity="0.5"/>
                <path d="M0 9 Q5 6 10 9 Q15 12 20 9" stroke="#d4801a" strokeWidth="1" fill="none" opacity="0.5"/>
              </pattern>
              {/* Floor insulation */}
              <pattern id="floor-ins-pat" x="0" y="0" width="20" height="10" patternUnits="userSpaceOnUse">
                <rect width="20" height="10" fill="#d4901a" opacity="0.7"/>
                <path d="M0 3 Q5 1 10 3 Q15 5 20 3" stroke="#b4700a" strokeWidth="1" fill="none" opacity="0.5"/>
                <path d="M0 7 Q5 5 10 7 Q15 9 20 7" stroke="#b4700a" strokeWidth="1" fill="none" opacity="0.5"/>
              </pattern>
              {/* Wood pattern */}
              <pattern id="wood-pat" x="0" y="0" width="14" height="8" patternUnits="userSpaceOnUse">
                <rect width="14" height="8" fill="#9a6830"/>
                <line x1="0" y1="2.5" x2="14" y2="2.5" stroke="#7a4810" strokeWidth="0.5" opacity="0.5"/>
                <line x1="0" y1="5.5" x2="14" y2="5.5" stroke="#7a4810" strokeWidth="0.3" opacity="0.4"/>
              </pattern>
              {/* Soil hatch */}
              <pattern id="soil-pat" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                <rect width="12" height="12" fill="#5a3a1a"/>
                <line x1="0" y1="6" x2="6" y2="0" stroke="#7a5030" strokeWidth="1" opacity="0.4"/>
                <line x1="6" y1="12" x2="12" y2="6" stroke="#7a5030" strokeWidth="1" opacity="0.4"/>
              </pattern>
              {/* Concrete */}
              <pattern id="concrete-pat" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                <rect width="10" height="10" fill="#64748b"/>
                <circle cx="3" cy="3" r="1" fill="rgba(255,255,255,0.1)"/>
                <circle cx="7" cy="7" r="0.8" fill="rgba(0,0,0,0.1)"/>
              </pattern>
              {/* Glow filter */}
              <filter id="glow-orange">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="glow-white">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0f172a"/>
                <stop offset="100%" stopColor="#1e293b"/>
              </linearGradient>
              <linearGradient id="soil-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5a3a1a"/>
                <stop offset="100%" stopColor="#2a1a08"/>
              </linearGradient>
              <linearGradient id="interior-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1e3050" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#162240" stopOpacity="0.4"/>
              </linearGradient>
            </defs>

            {/* Background */}
            <rect width="900" height="560" fill="url(#sky-grad)"/>
            <rect width="900" height="560" fill="url(#grid)"/>

            {/* ── SOIL ZONE ── */}
            <rect x="0" y="444" width="900" height="116" fill="url(#soil-grad)"/>
            {/* Soil texture over gradient */}
            <rect x="0" y="444" width="900" height="116" fill="url(#soil-pat)" opacity="0.3"/>
            {/* Ground line */}
            <line x1="0" y1="444" x2="900" y2="444" stroke="#a07038" strokeWidth="1.5" strokeDasharray="6,4"/>

            {/* ── FOUNDATION PILES ── */}
            {[252, 444, 636].map((px, i) => (
              <g key={i} onClick={() => handleZone("foundation")} style={{ cursor: "pointer" }}>
                {/* Pile in soil */}
                <rect x={px} y={424} width={18} height={106}
                  fill="url(#concrete-pat)"
                  opacity={zoneOpacity("foundation", 0.9)}
                  stroke={isActive("foundation") ? "#f57a00" : "rgba(148,163,184,0.3)"}
                  strokeWidth={isActive("foundation") ? 1.5 : 0.5}
                />
                {/* Rebar lines */}
                <line x1={px + 5} y1={430} x2={px + 5} y2={520} stroke="#e11d48" strokeWidth="1" strokeDasharray="4,5" opacity={zoneOpacity("foundation", 0.4)}/>
                <line x1={px + 13} y1={430} x2={px + 13} y2={520} stroke="#e11d48" strokeWidth="1" strokeDasharray="4,5" opacity={zoneOpacity("foundation", 0.4)}/>
              </g>
            ))}

            {/* ── GRILLAGE BEAM ── */}
            <g onClick={() => handleZone("foundation")} style={{ cursor: "pointer" }}>
              <rect x={130} y={424} width={640} height={20}
                fill="url(#concrete-pat)"
                opacity={zoneOpacity("foundation", 0.95)}
                stroke={isActive("foundation") ? "#f57a00" : "rgba(148,163,184,0.3)"}
                strokeWidth={isActive("foundation") ? 1.5 : 0.5}
              />
              {/* Rebar suggestion */}
              {[155, 220, 285, 350, 415, 480, 545, 610, 680, 720].map((rx) => (
                <circle key={rx} cx={rx} cy={434} r={2.5} fill="#e11d48" opacity={zoneOpacity("foundation", 0.5)}/>
              ))}
              {/* 3D top of grillage */}
              <polygon points="130,424 770,424 776,418 136,418" fill="#94a3b8" opacity={zoneOpacity("foundation", 0.6)}/>
            </g>

            {/* ── FLOOR INSULATION ── */}
            <g onClick={() => handleZone("floor")} style={{ cursor: "pointer" }}>
              <rect x={130} y={370} width={640} height={54}
                fill="url(#floor-ins-pat)"
                opacity={zoneOpacity("floor", 0.9)}
                stroke={isActive("floor") ? "#f57a00" : "rgba(148,163,184,0.15)"}
                strokeWidth={isActive("floor") ? 1.5 : 0.5}
                filter={isActive("floor") ? "url(#glow-orange)" : undefined}
              />
              {/* 3D side */}
              <polygon points="130,370 136,364 136,418 130,424" fill="#b4700a" opacity={zoneOpacity("floor", 0.5)}/>
            </g>

            {/* ── FLOOR BOARDS ── */}
            <g onClick={() => handleZone("floor")} style={{ cursor: "pointer" }}>
              <rect x={130} y={348} width={640} height={22}
                fill="url(#wood-pat)"
                opacity={zoneOpacity("floor", 0.95)}
                stroke={isActive("floor") ? "#f57a00" : "rgba(148,163,184,0.15)"}
                strokeWidth={isActive("floor") ? 1.5 : 0.5}
              />
              {/* Board gaps */}
              {[210, 290, 370, 450, 530, 610, 690].map((bx) => (
                <line key={bx} x1={bx} y1={348} x2={bx} y2={370} stroke="rgba(0,0,0,0.3)" strokeWidth="1" opacity={zoneOpacity("floor", 0.5)}/>
              ))}
              {/* 3D top of floor */}
              <polygon points="130,348 770,348 776,342 136,342" fill="#c08038" opacity={zoneOpacity("floor", 0.5)}/>
            </g>

            {/* ── INTERIOR SPACE ── */}
            <rect x={248} y={100} width={404} height={248}
              fill="url(#interior-grad)"
              onClick={() => setActiveZone(null)}
              style={{ cursor: "default" }}
            />
            {/* Interior ambient glow */}
            <rect x={250} y={102} width={400} height={244}
              fill="none"
              stroke="rgba(148,163,184,0.05)"
              strokeWidth="1"
            />

            {/* ── LEFT WALL LAYERS ── (x=130 to x=248) */}
            <g onClick={() => handleZone("walls")} style={{ cursor: "pointer" }}>
              {/* Exterior cladding (wood) */}
              <rect x={130} y={100} width={14} height={248}
                fill="url(#wood-pat)" opacity={zoneOpacity("walls", 0.95)}
                stroke={isActive("walls") ? "#f57a00" : "rgba(148,163,184,0.15)"} strokeWidth={isActive("walls") ? 1.5 : 0.5}
              />
              {/* OSB + membrane */}
              <rect x={144} y={100} width={10} height={248}
                fill="#7a8a9a" opacity={zoneOpacity("walls", 0.8)}
                stroke={isActive("walls") ? "#f57a00" : "rgba(148,163,184,0.1)"} strokeWidth={isActive("walls") ? 1 : 0}
              />
              {/* Insulation (main, largest) */}
              <rect x={154} y={100} width={72} height={248}
                fill="url(#ins-pat)" opacity={zoneOpacity("walls", 0.95)}
                stroke={isActive("walls") ? "#f57a00" : "rgba(148,163,184,0.15)"} strokeWidth={isActive("walls") ? 1.5 : 0.5}
                filter={isActive("walls") ? "url(#glow-orange)" : undefined}
              />
              {/* Vapor barrier */}
              <rect x={226} y={100} width={4} height={248}
                fill="#60a5fa" opacity={zoneOpacity("walls", 0.85)}
              />
              {/* Interior finish */}
              <rect x={230} y={100} width={18} height={248}
                fill="#b8946a" opacity={zoneOpacity("walls", 0.9)}
                stroke={isActive("walls") ? "#f57a00" : "rgba(148,163,184,0.1)"} strokeWidth={isActive("walls") ? 1 : 0}
              />
              {/* 3D top side of wall */}
              <polygon points="130,100 248,100 253,94 135,94" fill="#7a5030" opacity={zoneOpacity("walls", 0.5)}/>
            </g>

            {/* ── RIGHT WALL LAYERS ── (x=652 to x=770) */}
            <g onClick={() => handleZone("walls")} style={{ cursor: "pointer" }}>
              {/* Interior finish */}
              <rect x={652} y={100} width={18} height={248}
                fill="#b8946a" opacity={zoneOpacity("walls", 0.9)}
                stroke={isActive("walls") ? "#f57a00" : "rgba(148,163,184,0.1)"} strokeWidth={isActive("walls") ? 1 : 0}
              />
              {/* Vapor barrier */}
              <rect x={670} y={100} width={4} height={248}
                fill="#60a5fa" opacity={zoneOpacity("walls", 0.85)}
              />
              {/* Insulation */}
              <rect x={674} y={100} width={72} height={248}
                fill="url(#ins-pat)" opacity={zoneOpacity("walls", 0.95)}
                stroke={isActive("walls") ? "#f57a00" : "rgba(148,163,184,0.15)"} strokeWidth={isActive("walls") ? 1.5 : 0.5}
                filter={isActive("walls") ? "url(#glow-orange)" : undefined}
              />
              {/* OSB + membrane */}
              <rect x={746} y={100} width={10} height={248}
                fill="#7a8a9a" opacity={zoneOpacity("walls", 0.8)}
              />
              {/* Exterior cladding */}
              <rect x={756} y={100} width={14} height={248}
                fill="url(#wood-pat)" opacity={zoneOpacity("walls", 0.95)}
                stroke={isActive("walls") ? "#f57a00" : "rgba(148,163,184,0.15)"} strokeWidth={isActive("walls") ? 1.5 : 0.5}
              />
              {/* 3D top side of right wall */}
              <polygon points="652,100 770,100 775,94 657,94" fill="#7a5030" opacity={zoneOpacity("walls", 0.5)}/>
            </g>

            {/* ── CEILING INSULATION ZONE ── */}
            <g onClick={() => handleZone("ceiling")} style={{ cursor: "pointer" }}>
              {/* Insulation in roof structure */}
              <polygon
                points="110,100 450,36 790,100 770,100 450,50 130,100"
                fill="url(#ins-pat)"
                opacity={zoneOpacity("ceiling", 0.9)}
                stroke={isActive("ceiling") ? "#f57a00" : "rgba(148,163,184,0.2)"}
                strokeWidth={isActive("ceiling") ? 1.5 : 0.5}
                filter={isActive("ceiling") ? "url(#glow-orange)" : undefined}
              />
              {/* Ceiling boards */}
              <rect x={248} y={100} width={404} height={10}
                fill="url(#wood-pat)"
                opacity={zoneOpacity("ceiling", 0.8)}
              />
            </g>

            {/* ── ROOF OUTER SURFACE ── */}
            <g onClick={() => handleZone("roof")} style={{ cursor: "pointer" }}>
              {/* Outer roof left slope */}
              <polygon
                points="106,100 450,32 130,100"
                fill="#334155"
                opacity={zoneOpacity("roof", 0.95)}
                stroke={isActive("roof") ? "#f57a00" : "rgba(148,163,184,0.3)"}
                strokeWidth={isActive("roof") ? 2 : 0.8}
                filter={isActive("roof") ? "url(#glow-white)" : undefined}
              />
              {/* Outer roof right slope */}
              <polygon
                points="450,32 794,100 770,100"
                fill="#3d4f63"
                opacity={zoneOpacity("roof", 0.95)}
                stroke={isActive("roof") ? "#f57a00" : "rgba(148,163,184,0.3)"}
                strokeWidth={isActive("roof") ? 2 : 0.8}
              />
              {/* Ridge tile */}
              <rect x={440} y={28} width={20} height={10} rx={3}
                fill="#475569" opacity={zoneOpacity("roof", 0.95)}
              />
              {/* Tile lines on left slope */}
              {[150, 200, 250, 310, 370, 410].map((tx, i) => {
                const frac = (tx - 106) / (450 - 106);
                const y1 = 100 - frac * 68;
                return <line key={i} x1={tx} y1={y1 + 2} x2={tx - 8} y2={y1 + 10} stroke="rgba(255,255,255,0.08)" strokeWidth="1" opacity={zoneOpacity("roof", 1)}/>;
              })}
            </g>

            {/* ── DIMENSION LINES ── */}
            {/* Wall thickness */}
            <line x1={130} y1={520} x2={248} y2={520} stroke="#475569" strokeWidth="1"/>
            <line x1={130} y1={516} x2={130} y2={524} stroke="#475569" strokeWidth="1"/>
            <line x1={248} y1={516} x2={248} y2={524} stroke="#475569" strokeWidth="1"/>
            <text x={189} y={535} textAnchor="middle" fontSize="9" fill="#64748b">≈ 300 мм</text>

            {/* Wall height */}
            <line x1={80} y1={100} x2={80} y2={348} stroke="#475569" strokeWidth="1" strokeDasharray="3,3"/>
            <line x1={76} y1={100} x2={84} y2={100} stroke="#475569" strokeWidth="1"/>
            <line x1={76} y1={348} x2={84} y2={348} stroke="#475569" strokeWidth="1"/>
            <text x={65} y={228} textAnchor="middle" fontSize="9" fill="#64748b" transform="rotate(-90,65,228)">2.7 м</text>

            {/* ── LABELS ── */}
            {/* Roof label */}
            <line x1={270} y1={58} x2={210} y2={42} stroke="#64748b" strokeWidth="1" strokeDasharray="3,2" opacity={zoneOpacity("roof")}/>
            <circle cx={210} cy={42} r={3} fill={isActive("roof") ? "#f57a00" : "#64748b"} opacity={zoneOpacity("roof")}/>
            <text x={205} y={35} textAnchor="middle" fontSize="10" fontWeight="600" fill={isActive("roof") ? "#f57a00" : "#94a3b8"} opacity={zoneOpacity("roof")}>Металлочерепица</text>

            {/* Ceiling insulation label */}
            <line x1={390} y1={68} x2={350} y2={56} stroke="#64748b" strokeWidth="1" strokeDasharray="3,2" opacity={zoneOpacity("ceiling")}/>
            <circle cx={350} cy={56} r={3} fill={isActive("ceiling") ? "#f57a00" : "#f5a020"} opacity={zoneOpacity("ceiling")}/>
            <text x={344} y={50} textAnchor="end" fontSize="10" fontWeight="600" fill={isActive("ceiling") ? "#f57a00" : "#f5a020"} opacity={zoneOpacity("ceiling")}>Утепление кровли 200–250 мм</text>

            {/* Wall insulation label - right side */}
            <line x1={770} y1={225} x2={800} y2={200} stroke="#64748b" strokeWidth="1" strokeDasharray="3,2" opacity={zoneOpacity("walls")}/>
            <circle cx={800} cy={200} r={3} fill={isActive("walls") ? "#f57a00" : "#f5a020"} opacity={zoneOpacity("walls")}/>
            <text x={804} y={198} fontSize="10" fontWeight="600" fill={isActive("walls") ? "#f57a00" : "#f5a020"} opacity={zoneOpacity("walls")}>Каменная вата 150–250 мм</text>
            <text x={804} y={210} fontSize="9" fill="#64748b" opacity={zoneOpacity("walls")}>R = 3.75–6.25 м²·К/Вт</text>

            {/* Exterior label */}
            <line x1={130} y1={220} x2={84} y2={200} stroke="#64748b" strokeWidth="1" strokeDasharray="3,2" opacity={zoneOpacity("walls")}/>
            <circle cx={84} cy={200} r={3} fill={isActive("walls") ? "#f57a00" : "#9a6830"} opacity={zoneOpacity("walls")}/>
            <text x={80} y={196} textAnchor="end" fontSize="10" fontWeight="600" fill={isActive("walls") ? "#f57a00" : "#9a6830"} opacity={zoneOpacity("walls")}>Фасадная отделка</text>

            {/* Floor insulation label */}
            <line x1={450} y1={395} x2={828} y2={395} stroke="#64748b" strokeWidth="1" strokeDasharray="3,2" opacity={zoneOpacity("floor")}/>
            <circle cx={828} cy={395} r={3} fill={isActive("floor") ? "#f57a00" : "#f5a020"} opacity={zoneOpacity("floor")}/>
            <text x={832} y={392} fontSize="10" fontWeight="600" fill={isActive("floor") ? "#f57a00" : "#f5a020"} opacity={zoneOpacity("floor")}>Утепление пола 200 мм</text>
            <text x={832} y={404} fontSize="9" fill="#64748b" opacity={zoneOpacity("floor")}>+ фанера 18 мм</text>

            {/* Grillage label */}
            <line x1={450} y1={434} x2={828} y2={434} stroke="#64748b" strokeWidth="1" strokeDasharray="3,2" opacity={zoneOpacity("foundation")}/>
            <circle cx={828} cy={434} r={3} fill={isActive("foundation") ? "#f57a00" : "#94a3b8"} opacity={zoneOpacity("foundation")}/>
            <text x={832} y={438} fontSize="10" fontWeight="600" fill={isActive("foundation") ? "#f57a00" : "#94a3b8"} opacity={zoneOpacity("foundation")}>Ростверк (обвязка)</text>

            {/* Foundation piles label */}
            <line x1={252} y1={480} x2={60} y2={480} stroke="#64748b" strokeWidth="1" strokeDasharray="3,2" opacity={zoneOpacity("foundation")}/>
            <circle cx={60} cy={480} r={3} fill={isActive("foundation") ? "#f57a00" : "#94a3b8"} opacity={zoneOpacity("foundation")}/>
            <text x={56} y={476} textAnchor="end" fontSize="10" fontWeight="600" fill={isActive("foundation") ? "#f57a00" : "#94a3b8"} opacity={zoneOpacity("foundation")}>Ж/б сваи 150×150 мм</text>
            <text x={56} y={488} textAnchor="end" fontSize="9" fill="#64748b" opacity={zoneOpacity("foundation")}>Глубина 3–5 м</text>

            {/* Vapor barrier label */}
            <line x1={226} y1={200} x2={80} y2={258} stroke="#60a5fa" strokeWidth="0.8" strokeDasharray="2,2" opacity={isDimmed("walls") ? 0.1 : 0.6}/>
            <text x={76} y={258} textAnchor="end" fontSize="9" fill="#60a5fa" opacity={isDimmed("walls") ? 0.1 : 0.5}>Паро-</text>
            <text x={76} y={268} textAnchor="end" fontSize="9" fill="#60a5fa" opacity={isDimmed("walls") ? 0.1 : 0.5}>изоляция</text>
          </svg>
        </motion.div>

        {/* Zone buttons */}
        <div className="flex flex-wrap justify-center gap-2 mt-6 mb-6">
          {(Object.entries(ZONES) as [ZoneId, typeof ZONES[ZoneId]][]).map(([id, zone]) => (
            <button
              key={id}
              onClick={() => handleZone(id)}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-medium border transition-all ${
                isActive(id)
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/30"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500 hover:text-white"
              }`}
            >
              {zone.label}
            </button>
          ))}
        </div>

        {/* Detail card */}
        <div className="min-h-[180px]">
          <AnimatePresence mode="wait">
            {activeZone ? (
              <ZoneCard key={activeZone} zone={activeZone} />
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-slate-500 text-sm mt-8"
              >
                Кликните на зону на схеме или выберите кнопку выше
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
