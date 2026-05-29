import { useState } from "react";
import { motion } from "framer-motion";
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
  svgPaths: React.ReactNode;
}

const foundations: FoundationType[] = [
  {
    id: "piles",
    name: "Свайный",
    subtitle: "Ж/б забивные сваи",
    badge: "Наш стандарт",
    badgeColor: "bg-primary text-primary-foreground",
    depth: "3–5 м",
    load: "до 10 т / свая",
    pros: [
      "Монтаж за 1 день",
      "Работает на любом грунте",
      "Без земляных работ",
      "Не зависит от уровня грунтовых вод",
      "Минимальное нарушение участка",
    ],
    when: "Применяем во всех проектах как основной тип фундамента. Оптимален для пучинистых, водонасыщенных и сложных грунтов.",
    svgPaths: (
      <g>
        {/* Ground surface */}
        <rect x="20" y="105" width="200" height="8" fill="#c8a870" rx="2"/>
        {/* Soil layers */}
        <rect x="20" y="113" width="200" height="30" fill="#b89060"/>
        <rect x="20" y="143" width="200" height="25" fill="#a07848"/>
        <rect x="20" y="168" width="200" height="20" fill="#8c6030"/>
        {/* Dense layer */}
        <rect x="20" y="188" width="200" height="12" fill="#6a4820"/>
        {/* Piles */}
        {[50, 110, 170].map((x) => (
          <g key={x}>
            <rect x={x - 7} y="80" width="14" height="115" rx="2" fill="#94a3b8" stroke="#64748b" strokeWidth="1"/>
            <rect x={x - 7} y="80" width="14" height="4" rx="1" fill="#64748b"/>
            {/* Pile tip */}
            <polygon points={`${x-7},195 ${x+7},195 ${x},200`} fill="#64748b"/>
          </g>
        ))}
        {/* Grillage beam */}
        <rect x="30" y="68" width="180" height="20" rx="3" fill="#94a3b8" stroke="#64748b" strokeWidth="1"/>
        {/* 3D top of grillage */}
        <polygon points="30,68 210,68 215,62 35,62" fill="#b0bec5" stroke="#64748b" strokeWidth="0.5"/>
        {/* Floor structure on top */}
        <rect x="32" y="54" width="176" height="14" rx="2" fill="#d4b896" stroke="#b09070" strokeWidth="0.5"/>
        <rect x="32" y="48" width="176" height="8" rx="1" fill="#c9a876"/>
        {/* Snow/surface */}
        <ellipse cx="110" cy="105" rx="92" ry="3" fill="#e8dcc8" opacity="0.5"/>
        {/* Depth indicator */}
        <line x1="225" y1="105" x2="225" y2="195" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2"/>
        <line x1="220" y1="105" x2="230" y2="105" stroke="#94a3b8" strokeWidth="1"/>
        <line x1="220" y1="195" x2="230" y2="195" stroke="#94a3b8" strokeWidth="1"/>
        <text x="235" y="155" fontSize="9" fill="#64748b">3–5 м</text>
        {/* Label */}
        <text x="110" y="220" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1a1a1a">Ж/б забивная свая 150×150 мм</text>
      </g>
    ),
  },
  {
    id: "slab",
    name: "Плитный",
    subtitle: "Монолитная плита",
    badge: "Под заказ",
    badgeColor: "bg-muted text-foreground border border-border",
    depth: "0.3–0.5 м",
    load: "равномерная",
    pros: [
      "Отличная жёсткость",
      "Готовый черновой пол",
      "Максимальная несущая",
      "Подходит под тяжёлые дома",
      "Снижает теплопотери снизу",
    ],
    when: "Применяется на плотных, стабильных грунтах. Увеличивает стоимость фундамента, зато даёт монолитное основание для тяжёлых конструкций.",
    svgPaths: (
      <g>
        {/* Ground surface */}
        <rect x="20" y="130" width="200" height="8" fill="#c8a870" rx="2"/>
        {/* Soil under slab */}
        <rect x="20" y="138" width="200" height="62" fill="#b89060"/>
        {/* Sand cushion */}
        <rect x="25" y="155" width="190" height="12" fill="#d4b896" stroke="#b09070" strokeWidth="0.5" rx="1"/>
        <text x="120" y="164" textAnchor="middle" fontSize="8" fill="#7a6040">щебень + песок</text>
        {/* Concrete slab */}
        <rect x="22" y="120" width="196" height="35" rx="3" fill="#94a3b8" stroke="#64748b" strokeWidth="1"/>
        {/* Rebar indication */}
        {[135, 145].map((y) => (
          <line key={y} x1="30" y1={y} x2="210" y2={y} stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4,6" opacity="0.6"/>
        ))}
        {[50, 90, 130, 170].map((x) => (
          <line key={x} x1={x} y1="122" x2={x} y2="153" stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4,6" opacity="0.6"/>
        ))}
        {/* 3D top of slab */}
        <polygon points="22,120 218,120 222,114 26,114" fill="#b0bec5" stroke="#64748b" strokeWidth="0.5"/>
        {/* Insulation */}
        <rect x="25" y="108" width="190" height="7" rx="1" fill="#f5c87a" stroke="#e0a845" strokeWidth="0.5"/>
        {/* Floor structure */}
        <rect x="25" y="98" width="190" height="12" rx="2" fill="#d4b896" stroke="#b09070" strokeWidth="0.5"/>
        <rect x="25" y="92" width="190" height="8" rx="1" fill="#c9a876"/>
        {/* Width indicator */}
        <text x="110" y="220" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1a1a1a">Монолит с арматурой Ø12 мм</text>
      </g>
    ),
  },
  {
    id: "strip",
    name: "Ленточный",
    subtitle: "Монолитный или блочный",
    badge: "Под заказ",
    badgeColor: "bg-muted text-foreground border border-border",
    depth: "0.5–1.8 м",
    load: "по контуру стен",
    pros: [
      "Классическое решение",
      "Возможность подвала",
      "Хорошо несёт стены",
      "Долговечность 100+ лет",
      "Привычен бригадам",
    ],
    when: "Подходит для непучинистых, стабильных грунтов ниже глубины промерзания. Требует земляных работ и выдержки бетона.",
    svgPaths: (
      <g>
        {/* Ground surface */}
        <rect x="20" y="118" width="200" height="7" fill="#c8a870" rx="2"/>
        {/* Soil */}
        <rect x="20" y="125" width="200" height="75" fill="#b89060"/>
        {/* Strip foundation - left */}
        <rect x="30" y="100" width="36" height="100" rx="2" fill="#94a3b8" stroke="#64748b" strokeWidth="1"/>
        {/* Strip foundation - right */}
        <rect x="174" y="100" width="36" height="100" rx="2" fill="#94a3b8" stroke="#64748b" strokeWidth="1"/>
        {/* 3D tops */}
        <polygon points="30,100 66,100 71,94 35,94" fill="#b0bec5" stroke="#64748b" strokeWidth="0.5"/>
        <polygon points="174,100 210,100 215,94 179,94" fill="#b0bec5" stroke="#64748b" strokeWidth="0.5"/>
        {/* Rebar */}
        {[108, 118].map((y) => (
          <g key={y}>
            <line x1="34" y1={y} x2="62" y2={y} stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4,6" opacity="0.6"/>
            <line x1="178" y1={y} x2="206" y2={y} stroke="#e11d48" strokeWidth="1.5" strokeDasharray="4,6" opacity="0.6"/>
          </g>
        ))}
        {/* Sand cushion */}
        <rect x="32" y="197" width="32" height="8" fill="#d4b896" rx="1"/>
        <rect x="176" y="197" width="32" height="8" fill="#d4b896" rx="1"/>
        {/* Floor beam between */}
        <rect x="64" y="86" width="112" height="14" rx="2" fill="#d4b896" stroke="#b09070" strokeWidth="0.5"/>
        {/* Insulation on top of strip */}
        <rect x="32" y="90" width="34" height="10" fill="#f5c87a" stroke="#e0a845" strokeWidth="0.5" rx="1"/>
        <rect x="174" y="90" width="34" height="10" fill="#f5c87a" stroke="#e0a845" strokeWidth="0.5" rx="1"/>
        {/* Floor */}
        <rect x="30" y="80" width="180" height="10" rx="1" fill="#c9a876"/>
        {/* Depth indicator */}
        <line x1="218" y1="118" x2="218" y2="200" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3,2"/>
        <line x1="213" y1="118" x2="223" y2="118" stroke="#94a3b8" strokeWidth="1"/>
        <line x1="213" y1="200" x2="223" y2="200" stroke="#94a3b8" strokeWidth="1"/>
        <text x="228" y="162" fontSize="9" fill="#64748b">0.5–1.8</text>
        <text x="228" y="172" fontSize="9" fill="#64748b">м</text>
        <text x="110" y="220" textAnchor="middle" fontSize="10" fontWeight="600" fill="#1a1a1a">Монолит с армированием</text>
      </g>
    ),
  },
];

export function FoundationSection() {
  const [active, setActive] = useState("piles");
  const found = foundations.find((f) => f.id === active)!;

  return (
    <section className="py-14 md:py-20 bg-muted/40 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            Основание дома
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Типы фундаментов
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Подбираем тип фундамента под геологию участка. Свайный — наш стандарт: быстрее, надёжнее и не зависит от грунтовых вод.
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

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
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
                <svg viewBox="0 0 240 230" className="w-full max-w-[260px]">
                  <defs>
                    <pattern id="ground-pat" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                      <rect width="8" height="8" fill="#c8a870"/>
                      <circle cx="2" cy="2" r="0.8" fill="rgba(0,0,0,0.1)"/>
                      <circle cx="6" cy="5" r="0.6" fill="rgba(0,0,0,0.07)"/>
                    </pattern>
                  </defs>
                  {found.svgPaths}
                </svg>
              </div>

              {/* Info */}
              <div className="lg:w-3/5 p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <h3 className="text-2xl font-serif font-bold text-foreground">
                    {found.name}
                  </h3>
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
                      <li key={i} className="flex items-center gap-2.5 text-sm text-foreground/80">
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Check className="w-2.5 h-2.5 text-primary" strokeWidth={3} />
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
      </div>
    </section>
  );
}
