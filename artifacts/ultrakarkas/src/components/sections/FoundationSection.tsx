import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";

interface FoundationType {
  id: string;
  name: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  depth: string;
  load: string;
  pros: string[];
  when: string;
  svgContent: React.ReactNode;
}

/* ── SVG illustrations ──────────────────────────────── */

const SVGPilesOnly = (
  <svg viewBox="0 0 280 230" className="w-full max-w-[280px]">
    <defs>
      <pattern id="soil1o" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#8B6914"/>
        <circle cx="2.5" cy="2.5" r="1" fill="rgba(0,0,0,0.12)"/>
        <circle cx="7" cy="6.5" r="0.7" fill="rgba(255,255,255,0.06)"/>
      </pattern>
      <pattern id="soil2o" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#6B4F10"/>
        <line x1="0" y1="5" x2="5" y2="0" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        <line x1="5" y1="10" x2="10" y2="5" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
      </pattern>
      <linearGradient id="pile-grado" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#90A4AE"/>
        <stop offset="100%" stopColor="#546E7A"/>
      </linearGradient>
    </defs>

    {/* Ground levels */}
    <rect x="10" y="100" width="260" height="10" fill="#A0784A" rx="1"/>
    <rect x="10" y="110" width="260" height="28" fill="url(#soil1o)"/>
    <rect x="10" y="138" width="260" height="30" fill="url(#soil2o)"/>
    <rect x="10" y="168" width="260" height="20" fill="#4A3010"/>
    <rect x="10" y="188" width="260" height="32" fill="#3A2008"/>
    <line x1="10" y1="188" x2="270" y2="188" stroke="#5A4020" strokeWidth="1.5" strokeDasharray="6,3"/>
    <text x="140" y="207" textAnchor="middle" fontSize="8" fill="#9A7A50">несущий грунт</text>

    {[55, 140, 225].map((cx, i) => (
      <g key={i}>
        <rect x={cx - 9} y="62" width="18" height="133" rx="2" fill="url(#pile-grado)" stroke="#455A64" strokeWidth="1"/>
        <line x1={cx - 5} y1="66" x2={cx - 5} y2="192" stroke="#ef4444" strokeWidth="1" strokeDasharray="5,5" opacity="0.7"/>
        <line x1={cx + 5} y1="66" x2={cx + 5} y2="192" stroke="#ef4444" strokeWidth="1" strokeDasharray="5,5" opacity="0.7"/>
        {[84, 114, 144, 174].map((y) => (
          <line key={y} x1={cx - 8} y1={y} x2={cx + 8} y2={y} stroke="#ef4444" strokeWidth="0.8" opacity="0.5"/>
        ))}
        <rect x={cx - 13} y="56" width="26" height="10" rx="2" fill="#607D8B" stroke="#455A64" strokeWidth="0.8"/>
        <line x1={cx - 5} y1="56" x2={cx - 5} y2="44" stroke="#ef4444" strokeWidth="1.5" opacity="0.85"/>
        <line x1={cx + 5} y1="56" x2={cx + 5} y2="44" stroke="#ef4444" strokeWidth="1.5" opacity="0.85"/>
        <polygon points={`${cx - 9},195 ${cx + 9},195 ${cx},204`} fill="#455A64"/>
      </g>
    ))}

    <text x="15" y="97" fontSize="9" fontWeight="700" fill="#A0784A">±0.000</text>
    <line x1="258" y1="100" x2="258" y2="195" stroke="#78909C" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="253" y1="100" x2="263" y2="100" stroke="#78909C" strokeWidth="1"/>
    <line x1="253" y1="195" x2="263" y2="195" stroke="#78909C" strokeWidth="1"/>
    <text x="268" y="152" fontSize="8" fill="#78909C">3–5 м</text>
    <text x="140" y="42" textAnchor="middle" fontSize="8" fill="#90A4AE">↑ выпуски арматуры для ростверка</text>
    <text x="140" y="222" textAnchor="middle" fontSize="10" fontWeight="700" fill="#546E7A">Ж/б забивные сваи 150×150 мм</text>
  </svg>
);

const SVGPiles = (
  <svg viewBox="0 0 280 230" className="w-full max-w-[280px]">
    <defs>
      <pattern id="soil1" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#8B6914"/>
        <circle cx="2.5" cy="2.5" r="1" fill="rgba(0,0,0,0.12)"/>
        <circle cx="7" cy="6.5" r="0.7" fill="rgba(255,255,255,0.06)"/>
      </pattern>
      <pattern id="soil2" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#6B4F10"/>
        <line x1="0" y1="5" x2="5" y2="0" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
        <line x1="5" y1="10" x2="10" y2="5" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
      </pattern>
      <pattern id="concrete-p" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#78909C"/>
        <circle cx="3" cy="3" r="0.9" fill="rgba(255,255,255,0.1)"/>
        <circle cx="7.5" cy="7" r="0.7" fill="rgba(0,0,0,0.1)"/>
      </pattern>
      <linearGradient id="pile-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#90A4AE"/>
        <stop offset="100%" stopColor="#546E7A"/>
      </linearGradient>
    </defs>

    {/* Ground levels */}
    <rect x="10" y="100" width="260" height="10" fill="#A0784A" rx="1"/>
    <rect x="10" y="110" width="260" height="28" fill="url(#soil1)"/>
    <rect x="10" y="138" width="260" height="30" fill="url(#soil2)"/>
    <rect x="10" y="168" width="260" height="20" fill="#4A3010"/>
    {/* Dense bearing layer */}
    <rect x="10" y="188" width="260" height="32" fill="#3A2008"/>
    <line x1="10" y1="188" x2="270" y2="188" stroke="#5A4020" strokeWidth="1.5" strokeDasharray="6,3"/>
    <text x="140" y="207" textAnchor="middle" fontSize="8" fill="#9A7A50">несущий грунт</text>

    {/* Piles */}
    {[55, 140, 225].map((cx, i) => (
      <g key={i}>
        {/* Pile body */}
        <rect x={cx - 9} y="78" width="18" height="115" rx="2" fill="url(#pile-grad)" stroke="#455A64" strokeWidth="1"/>
        {/* Rebar */}
        <line x1={cx - 5} y1="82" x2={cx - 5} y2="192" stroke="#ef4444" strokeWidth="1" strokeDasharray="5,5" opacity="0.7"/>
        <line x1={cx + 5} y1="82" x2={cx + 5} y2="192" stroke="#ef4444" strokeWidth="1" strokeDasharray="5,5" opacity="0.7"/>
        {/* Tie rings */}
        {[90, 120, 150, 180].map((y) => (
          <line key={y} x1={cx - 8} y1={y} x2={cx + 8} y2={y} stroke="#ef4444" strokeWidth="0.8" opacity="0.5"/>
        ))}
        {/* Pile point */}
        <polygon points={`${cx - 9},193 ${cx + 9},193 ${cx},200`} fill="#455A64"/>
      </g>
    ))}

    {/* Grillage beam */}
    <rect x="35" y="60" width="210" height="22" rx="3" fill="url(#concrete-p)" stroke="#455A64" strokeWidth="1.5"/>
    {/* Grillage rebar */}
    {[67, 74].map((y) => (
      <line key={y} x1="40" y1={y} x2="240" y2={y} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="8,5" opacity="0.6"/>
    ))}
    {/* Grillage 3D top */}
    <polygon points="35,60 245,60 250,54 40,54" fill="#90A4AE" stroke="#455A64" strokeWidth="0.8"/>
    {/* Grillage label */}
    <text x="140" y="51" textAnchor="middle" fontSize="9" fontWeight="600" fill="#78909C">Ростверк (ж/б)</text>

    {/* Floor structure */}
    <rect x="38" y="44" width="204" height="18" rx="2" fill="#A07848" stroke="#8A6030" strokeWidth="0.8"/>
    <text x="140" y="38" textAnchor="middle" fontSize="9" fontWeight="600" fill="#7A5828">Нижняя обвязка + лаги</text>

    {/* Dimension line */}
    <line x1="258" y1="100" x2="258" y2="188" stroke="#78909C" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="253" y1="100" x2="263" y2="100" stroke="#78909C" strokeWidth="1"/>
    <line x1="253" y1="188" x2="263" y2="188" stroke="#78909C" strokeWidth="1"/>
    <text x="268" y="149" fontSize="8" fill="#78909C">3–5 м</text>

    {/* Ground marker */}
    <text x="15" y="97" fontSize="9" fontWeight="700" fill="#A0784A">±0.000</text>

    {/* Label */}
    <text x="140" y="222" textAnchor="middle" fontSize="10" fontWeight="700" fill="#546E7A">Ж/б забивные сваи 150×150 мм + ростверк</text>
  </svg>
);

const SVGRostwerk = (
  <svg viewBox="0 0 280 230" className="w-full max-w-[280px]">
    <defs>
      <pattern id="soil-r1" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#9B7B3A"/>
        <circle cx="3" cy="3" r="0.8" fill="rgba(0,0,0,0.12)"/>
        <circle cx="7" cy="7" r="0.6" fill="rgba(255,255,255,0.06)"/>
      </pattern>
      <pattern id="sand-r" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="#D4B896"/>
        <circle cx="2" cy="2" r="0.6" fill="rgba(0,0,0,0.1)"/>
        <circle cx="5" cy="5" r="0.4" fill="rgba(0,0,0,0.07)"/>
      </pattern>
      <linearGradient id="beam-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#90A4AE"/>
        <stop offset="100%" stopColor="#607D8B"/>
      </linearGradient>
    </defs>

    {/* Ground */}
    <rect x="10" y="118" width="260" height="8" fill="#9B7B3A" rx="1"/>
    <rect x="10" y="126" width="260" height="94" fill="url(#soil-r1)"/>

    {/* Sand cushion under beams */}
    <rect x="32" y="148" width="46" height="12" fill="url(#sand-r)" stroke="#C4A070" strokeWidth="0.5" rx="1"/>
    <rect x="202" y="148" width="46" height="12" fill="url(#sand-r)" stroke="#C4A070" strokeWidth="0.5" rx="1"/>
    <text x="55" y="155" textAnchor="middle" fontSize="7" fill="#8B6030">щебень</text>
    <text x="225" y="155" textAnchor="middle" fontSize="7" fill="#8B6030">щебень</text>

    {/* Monolithic strip beams */}
    <rect x="28" y="100" width="50" height="52" rx="2" fill="url(#beam-grad)" stroke="#455A64" strokeWidth="1.5"/>
    <rect x="202" y="100" width="50" height="52" rx="2" fill="url(#beam-grad)" stroke="#455A64" strokeWidth="1.5"/>
    {/* 3D tops */}
    <polygon points="28,100 78,100 83,94 33,94" fill="#90A4AE" stroke="#455A64" strokeWidth="0.7"/>
    <polygon points="202,100 252,100 257,94 207,94" fill="#90A4AE" stroke="#455A64" strokeWidth="0.7"/>
    {/* Rebar in beams */}
    {[108, 118, 128, 138].map((y) => (
      <g key={y}>
        <line x1="33" y1={y} x2="73" y2={y} stroke="#ef4444" strokeWidth="1.2" strokeDasharray="5,5" opacity="0.65"/>
        <line x1="207" y1={y} x2="247" y2={y} stroke="#ef4444" strokeWidth="1.2" strokeDasharray="5,5" opacity="0.65"/>
      </g>
    ))}
    {/* Vertical rebar */}
    {[40, 55, 70].map((x) => (
      <line key={x} x1={x} y1="103" x2={x} y2="149" stroke="#ef4444" strokeWidth="0.8" opacity="0.4" strokeDasharray="3,4"/>
    ))}
    {[215, 230, 245].map((x) => (
      <line key={x} x1={x} y1="103" x2={x} y2="149" stroke="#ef4444" strokeWidth="0.8" opacity="0.4" strokeDasharray="3,4"/>
    ))}

    {/* Insulation on top of beams */}
    <rect x="30" y="88" width="46" height="14" fill="#f5c87a" stroke="#d4922a" strokeWidth="0.8" rx="1"/>
    <rect x="204" y="88" width="46" height="14" fill="#f5c87a" stroke="#d4922a" strokeWidth="0.8" rx="1"/>
    <text x="53" y="84" textAnchor="middle" fontSize="7" fill="#d4922a">утеплитель</text>

    {/* Floor joist */}
    <rect x="30" y="74" width="220" height="16" rx="2" fill="#A07848" stroke="#8A6030" strokeWidth="0.8"/>
    {/* Floor board */}
    <rect x="30" y="68" width="220" height="8" rx="1" fill="#C9A876"/>

    {/* Dimension */}
    <line x1="262" y1="118" x2="262" y2="152" stroke="#78909C" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="257" y1="118" x2="267" y2="118" stroke="#78909C" strokeWidth="1"/>
    <line x1="257" y1="152" x2="267" y2="152" stroke="#78909C" strokeWidth="1"/>
    <text x="270" y="139" fontSize="8" fill="#78909C">~0.4 м</text>

    {/* ±0 level */}
    <text x="15" y="115" fontSize="9" fontWeight="700" fill="#9B7B3A">±0.000</text>

    <text x="140" y="222" textAnchor="middle" fontSize="10" fontWeight="700" fill="#546E7A">Монолитный ленточный ростверк с арматурой</text>
  </svg>
);

const SVGSlab = (
  <svg viewBox="0 0 280 230" className="w-full max-w-[280px]">
    <defs>
      <pattern id="soil-sl" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#8B6914"/>
        <circle cx="2.5" cy="2.5" r="0.8" fill="rgba(0,0,0,0.12)"/>
      </pattern>
      <pattern id="sand-sl" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
        <rect width="8" height="8" fill="#D4B896"/>
        <circle cx="2" cy="4" r="0.5" fill="rgba(0,0,0,0.1)"/>
        <circle cx="6" cy="2" r="0.4" fill="rgba(0,0,0,0.08)"/>
      </pattern>
      <linearGradient id="slab-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#90A4AE"/>
        <stop offset="100%" stopColor="#546E7A"/>
      </linearGradient>
    </defs>

    {/* Ground */}
    <rect x="10" y="142" width="260" height="8" fill="#8B6914" rx="1"/>
    <rect x="10" y="150" width="260" height="70" fill="url(#soil-sl)"/>

    {/* Drainage / gravel */}
    <rect x="15" y="162" width="250" height="18" fill="url(#sand-sl)" stroke="#C4A070" strokeWidth="0.5" rx="1"/>
    <text x="140" y="173" textAnchor="middle" fontSize="8" fill="#8B6030">щебень + песок (подушка)</text>

    {/* Waterproofing */}
    <rect x="12" y="155" width="256" height="8" fill="#1e3a5f" rx="1" opacity="0.7"/>
    <text x="140" y="162" textAnchor="middle" fontSize="7" fill="#7ab4d4">гидроизоляция</text>

    {/* Insulation layer */}
    <rect x="14" y="143" width="252" height="14" fill="#f5c87a" stroke="#d4922a" strokeWidth="0.8" rx="1"/>
    <text x="140" y="152" textAnchor="middle" fontSize="8" fill="#b4720a">утеплитель ЭППС 100 мм</text>

    {/* Concrete slab */}
    <rect x="12" y="108" width="256" height="37" rx="2" fill="url(#slab-grad)" stroke="#455A64" strokeWidth="1.5"/>
    {/* Rebar grid */}
    {[117, 128, 139].map((y) => (
      <line key={y} x1="18" y1={y} x2="262" y2={y} stroke="#ef4444" strokeWidth="1.3" strokeDasharray="8,6" opacity="0.65"/>
    ))}
    {[40, 80, 120, 160, 200, 240].map((x) => (
      <line key={x} x1={x} y1="110" x2={x} y2="143" stroke="#ef4444" strokeWidth="1" strokeDasharray="5,5" opacity="0.55"/>
    ))}
    {/* 3D top */}
    <polygon points="12,108 268,108 273,102 17,102" fill="#90A4AE" stroke="#455A64" strokeWidth="0.8"/>

    {/* Screed / floor finish */}
    <rect x="14" y="96" width="252" height="14" rx="1" fill="#C9A876" stroke="#A07848" strokeWidth="0.8"/>
    <text x="140" y="106" textAnchor="middle" fontSize="8" fill="#7A5828">стяжка + чистовой пол</text>

    {/* Dimension lines */}
    <line x1="274" y1="108" x2="274" y2="145" stroke="#78909C" strokeWidth="1" strokeDasharray="3,2"/>
    <line x1="269" y1="108" x2="279" y2="108" stroke="#78909C" strokeWidth="1"/>
    <line x1="269" y1="145" x2="279" y2="145" stroke="#78909C" strokeWidth="1"/>
    <text x="278" y="130" fontSize="8" fill="#78909C" transform="rotate(90,278,130)">350 мм</text>

    <text x="15" y="140" fontSize="9" fontWeight="700" fill="#8B6914">±0.000</text>

    <text x="140" y="222" textAnchor="middle" fontSize="10" fontWeight="700" fill="#546E7A">Монолитная плита с арматурой Ø12 мм</text>
  </svg>
);

const foundations: FoundationType[] = [
  {
    id: "piles-only",
    name: "Ж/б забивные сваи",
    subtitle: "Сваи 150×150 мм без ростверка",
    badge: "Базовый элемент",
    badgeColor: "bg-muted text-foreground border border-border",
    depth: "3–5 м",
    load: "до 10 т / свая",
    pros: [
      "Монтаж за несколько часов",
      "Забиваются без земляных работ",
      "Глубина до несущего слоя грунта",
      "Рабочие выпуски арматуры для последующего ростверка",
      "Подходит для любого типа грунта",
      "Минимальная стоимость из всех вариантов",
    ],
    when: "Используется как начальный этап — забиваем сваи, затем монтируем ростверк поверх. Демонстрирует сам элемент конструктива без обвязки.",
    svgContent: SVGPilesOnly,
  },
  {
    id: "piles",
    name: "Сваи + Ростверк",
    subtitle: "Ж/б забивные сваи 150×150 мм",
    badge: "Наш стандарт",
    badgeColor: "bg-primary text-primary-foreground",
    depth: "3–5 м",
    load: "до 10 т / свая",
    pros: [
      "Монтаж за 1 рабочий день",
      "Работает на любом грунте — пучинистом, водонасыщенном, торфяном",
      "Не зависит от уровня грунтовых вод",
      "Без земляных работ и вывоза грунта",
      "Забиваются до несущего слоя — не осядет",
      "Экономичнее плиты на 30–40%",
    ],
    when: "Применяем во всех проектах как основной фундамент. Оптимален для Подмосковья — пучинистые грунты, высокий УГВ, торф.",
    svgContent: SVGPiles,
  },
  {
    id: "slab",
    name: "Монолитная плита",
    subtitle: "УШП — утеплённая шведская плита",
    badge: "Премиум",
    badgeColor: "bg-violet-100 text-violet-700 border border-violet-200",
    depth: "0.3–0.5 м",
    load: "равномерная по площади",
    pros: [
      "Готовый утеплённый черновой пол",
      "Максимальная жёсткость основания",
      "Идеальна для тёплого пола (трубы в плите)",
      "Не боится подъёма грунтовых вод",
      "Отсутствие продуваемого подполья",
    ],
    when: "Рекомендуется для тяжёлых домов и участков с высоким УГВ. Требует планировки и отсыпки участка. Дороже свайного на 40–60%.",
    svgContent: SVGSlab,
  },
];

export function FoundationSection() {
  const [active, setActive] = useState("piles");
  const found = foundations.find((f) => f.id === active)!;

  return (
    <section className="py-10 md:py-14 bg-muted/40 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-7 md:mb-10">
          <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            Основание дома
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Типы фундаментов
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Подбираем фундамент после геологии участка. Ж/б сваи — наш стандарт: монтаж за день, работает на любом грунте.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-3 mb-10 flex-wrap">
          {foundations.map((f) => (
            <button
              key={f.id}
              onClick={() => setActive(f.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium border transition-all ${
                active === f.id
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                  : "bg-background border-border text-foreground/70 hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* SVG illustration */}
                <div className="lg:w-2/5 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-6 min-h-[280px] relative">
                  {found.id === "piles" && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground">
                        Наш стандарт
                      </span>
                    </div>
                  )}
                  {found.svgContent}
                </div>

                {/* Info */}
                <div className="lg:w-3/5 p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <h3 className="text-2xl font-serif font-bold text-foreground">{found.name}</h3>
                    <span className="text-sm text-muted-foreground font-medium">— {found.subtitle}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-muted/60 rounded-xl p-3">
                      <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide font-medium">Глубина</div>
                      <div className="text-lg font-bold text-primary">{found.depth}</div>
                    </div>
                    <div className="bg-muted/60 rounded-xl p-3">
                      <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wide font-medium">Нагрузка</div>
                      <div className="text-base font-bold text-foreground leading-tight">{found.load}</div>
                    </div>
                  </div>

                  <div className="mb-5">
                    <h4 className="text-sm font-semibold text-foreground mb-3 uppercase tracking-wide">Преимущества</h4>
                    <ul className="space-y-2">
                      {found.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-foreground/80">
                          <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-primary" strokeWidth={3}/>
                          </div>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-primary/5 border border-primary/15 rounded-xl p-4">
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      <span className="font-semibold text-foreground">Когда применяем: </span>
                      {found.when}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
