import { motion } from "framer-motion";
import { X, Check, ThermometerSun, Snowflake, Flame, Wind, AlertTriangle } from "lucide-react";

function HouseSVG({
  id,
  wallColor,
  fillGrad,
  tempLabel,
  tempColor,
  season,
  wallThick,
  badLabel,
}: {
  id: string;
  wallColor: string;
  fillGrad: [string, string];
  tempLabel: string;
  tempColor: string;
  season: "summer" | "winter";
  wallThick: number;
  badLabel?: string;
}) {
  const W = 220;
  const H = 170;
  const wallW = wallThick;
  // House geometry
  const roofPeak = { x: W / 2, y: 12 };
  const roofLeft = { x: 14, y: 64 };
  const roofRight = { x: W - 14, y: 64 };
  const wallTL = { x: 24, y: 64 };
  const wallBL = { x: 24, y: H - 14 };
  const wallBR = { x: W - 24, y: H - 14 };
  const wallTR = { x: W - 24, y: 64 };

  const gradId = `house-grad-${id}`;
  const roofGradId = `roof-grad-${id}`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillGrad[0]}/>
          <stop offset="100%" stopColor={fillGrad[1]}/>
        </linearGradient>
        <linearGradient id={roofGradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillGrad[0]} stopOpacity="0.7"/>
          <stop offset="100%" stopColor={fillGrad[1]} stopOpacity="0.9"/>
        </linearGradient>
      </defs>

      {/* House fill */}
      <polygon
        points={`${wallTL.x},${wallTL.y} ${wallTR.x},${wallTR.y} ${wallBR.x},${wallBR.y} ${wallBL.x},${wallBL.y}`}
        fill={`url(#${gradId})`}
        stroke={wallColor}
        strokeWidth={2}
      />
      {/* Wall thickness indicator — inner line */}
      <polygon
        points={`${wallTL.x + wallW},${wallTL.y + wallW * 0.5} ${wallTR.x - wallW},${wallTR.y + wallW * 0.5} ${wallBR.x - wallW},${wallBR.y} ${wallBL.x + wallW},${wallBL.y}`}
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth={1.5}
        strokeDasharray="4,3"
      />

      {/* Roof */}
      <polygon
        points={`${roofPeak.x},${roofPeak.y} ${roofLeft.x},${roofLeft.y} ${roofRight.x},${roofRight.y}`}
        fill={`url(#${roofGradId})`}
        stroke={wallColor}
        strokeWidth={2}
      />

      {/* Window */}
      <rect x={W / 2 - 18} y={85} width={36} height={28} rx={3}
        fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth={1.5}/>
      <line x1={W / 2} y1={85} x2={W / 2} y2={113} stroke="rgba(255,255,255,0.3)" strokeWidth={1}/>
      <line x1={W / 2 - 18} y1={99} x2={W / 2 + 18} y2={99} stroke="rgba(255,255,255,0.3)" strokeWidth={1}/>

      {/* Door */}
      <rect x={W / 2 - 10} y={H - 38} width={20} height={24} rx={2}
        fill="rgba(0,0,0,0.15)" stroke="rgba(255,255,255,0.3)" strokeWidth={1}/>

      {/* Temperature label */}
      <text x={W / 2} y={77} textAnchor="middle" fontSize={18} fontWeight="800" fill={tempColor} style={{ filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.4))" }}>
        {tempLabel}
      </text>

      {/* Wall thickness label */}
      <text x={wallTL.x + wallW / 2} y={H - 20} textAnchor="middle" fontSize={8} fontWeight="700" fill="rgba(255,255,255,0.8)">
        {wallThick < 6 ? "~50 мм" : "~200 мм"}
      </text>

      {/* Bad label (alert) */}
      {badLabel && (
        <text x={W / 2} y={H - 5} textAnchor="middle" fontSize={8} fontWeight="700" fill="rgba(255,100,100,0.9)">
          {badLabel}
        </text>
      )}
    </svg>
  );
}

const rows = [
  {
    aspect: "Каркас стен",
    them: "Доска 50×100 мм — дешевле",
    us: "Доска 45×145–190 мм сухой кам. сушки",
    theyBad: true,
  },
  {
    aspect: "Утеплитель",
    them: "Пенопласт 50–100 мм или дешёвая стекловата",
    us: "Каменная вата 150–250 мм (не горит, не гниёт, дышит)",
    theyBad: true,
  },
  {
    aspect: "Ветрозащита",
    them: "Отсутствует или плёнка без диффузии",
    us: "Мембрана Tyvek — пар выходит, ветер не входит",
    theyBad: true,
  },
  {
    aspect: "Пароизоляция",
    them: "Нет или полиэтилен без проклейки стыков",
    us: "Паробарьер со сплошной проклейкой всех стыков",
    theyBad: true,
  },
  {
    aspect: "Летом в доме",
    them: "+33–38°C — как в духовке, пенопласт не дышит",
    us: "+22–24°C — прохладно без кондиционера",
    theyBad: true,
  },
  {
    aspect: "Зимой в доме",
    them: "Промерзающие углы, сквозняки, огромные счета",
    us: "Тепло и тихо при минимальном отоплении",
    theyBad: true,
  },
  {
    aspect: "Пожаробезопасность",
    them: "Пенопласт — горит и выделяет токсичный дым",
    us: "Каменная вата — класс горючести НГ (негорючая)",
    theyBad: true,
  },
  {
    aspect: "Срок службы",
    them: "5–10 лет до первых деформаций каркаса",
    us: "50+ лет — гарантия 5 лет, договор на каждый этап",
    theyBad: true,
  },
];

const scenarios = [
  {
    season: "summer" as const,
    icon: ThermometerSun,
    label: "Лето, +30°C на улице",
    them: {
      temp: "+36°C",
      tempColor: "#fff",
      grad: ["#ef4444", "#b45309"] as [string, string],
      wall: "#dc2626",
      thick: 3,
      desc: "Пенопласт не дышит. Дом раскаляется. Кондиционер работает без остановки.",
      tag: "КАК ДУХОВКА",
    },
    us: {
      temp: "+22°C",
      tempColor: "#fff",
      grad: ["#0ea5e9", "#06b6d4"] as [string, string],
      wall: "#0284c7",
      thick: 12,
      desc: "Каменная вата дышит и буферизирует температуру. Прохладно без кондиционера.",
      tag: "ПРОХЛАДНО",
    },
  },
  {
    season: "winter" as const,
    icon: Snowflake,
    label: "Зима, −25°C на улице",
    them: {
      temp: "−5°C",
      tempColor: "#bfdbfe",
      grad: ["#1e3a5f", "#172554"] as [string, string],
      wall: "#1e40af",
      thick: 3,
      desc: "Тонкий утеплитель промерзает. Углы покрываются плесенью. Котёл работает на пределе.",
      tag: "ПРОМЕРЗАЕТ",
    },
    us: {
      temp: "+21°C",
      tempColor: "#fed7aa",
      grad: ["#ea580c", "#f59e0b"] as [string, string],
      wall: "#c2410c",
      thick: 12,
      desc: "250 мм каменной ваты держат тепло. Котёл работает в 2 раза меньше. Плесени нет.",
      tag: "ТЕПЛО И ТИХО",
    },
  },
];

export function ComparisonSection() {
  return (
    <section className="py-10 md:py-14 bg-slate-950 text-white overflow-hidden relative">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 text-orange-400 font-semibold uppercase tracking-wider text-sm mb-4">
              <AlertTriangle className="w-4 h-4"/>
              Почему важно выбирать правильно
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-5 leading-tight">
              Конкуренты строят{" "}
              <span className="text-red-400">дёшево.</span>
              <br/>
              Вы будете жить в этом{" "}
              <span className="text-primary italic">всю жизнь.</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              Большинство застройщиков экономят на каркасе и утеплении — это не видно снаружи, но сразу чувствуется в первое лето и первую зиму.
            </p>
          </motion.div>
        </div>

        {/* Seasonal scenarios */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-14">
          {scenarios.map((sc, si) => {
            const Icon = sc.icon;
            return (
              <motion.div
                key={si}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: si * 0.15 }}
                className="bg-slate-900/70 border border-slate-700/60 rounded-2xl overflow-hidden"
              >
                {/* Scenario header */}
                <div className="flex items-center gap-3 px-5 py-3 bg-slate-800/60 border-b border-slate-700/50">
                  <Icon className="w-5 h-5 text-slate-300"/>
                  <span className="font-bold text-slate-200 text-sm">{sc.label}</span>
                </div>

                <div className="grid grid-cols-2 gap-0">
                  {/* Competitor */}
                  <div className="p-4 border-r border-slate-700/50">
                    <div className="flex items-center gap-1.5 mb-3">
                      <X className="w-4 h-4 text-red-400 shrink-0"/>
                      <span className="text-xs font-bold text-red-400 uppercase tracking-wide">Конкуренты</span>
                    </div>
                    <div className="h-36 mb-3 rounded-xl overflow-hidden relative">
                      <HouseSVG
                        id={`them-${si}`}
                        wallColor={sc.them.wall}
                        fillGrad={sc.them.grad}
                        tempLabel={sc.them.temp}
                        tempColor={sc.them.tempColor}
                        season={sc.season}
                        wallThick={sc.them.thick}
                      />
                      <div className="absolute top-2 right-2 bg-red-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {sc.them.tag}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{sc.them.desc}</p>
                  </div>

                  {/* Us */}
                  <div className="p-4">
                    <div className="flex items-center gap-1.5 mb-3">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0"/>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">УльтраКаркас</span>
                    </div>
                    <div className="h-36 mb-3 rounded-xl overflow-hidden relative">
                      <HouseSVG
                        id={`us-${si}`}
                        wallColor={sc.us.wall}
                        fillGrad={sc.us.grad}
                        tempLabel={sc.us.temp}
                        tempColor={sc.us.tempColor}
                        season={sc.season}
                        wallThick={sc.us.thick}
                      />
                      <div className="absolute top-2 right-2 bg-emerald-500/90 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        {sc.us.tag}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{sc.us.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900/60 border border-slate-700/60 rounded-2xl overflow-hidden mb-10"
        >
          <div className="grid grid-cols-[1fr_1fr_1fr] bg-slate-800/80 border-b border-slate-700/50">
            <div className="px-4 md:px-6 py-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Что сравниваем</div>
            <div className="px-4 md:px-6 py-3 flex items-center gap-2 border-l border-slate-700/50">
              <X className="w-3.5 h-3.5 text-red-400 shrink-0"/>
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Типичный застройщик</span>
            </div>
            <div className="px-4 md:px-6 py-3 flex items-center gap-2 border-l border-slate-700/50 bg-primary/10">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0"/>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">УльтраКаркас</span>
            </div>
          </div>

          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className={`grid grid-cols-[1fr_1fr_1fr] border-b border-slate-800/70 last:border-0 ${
                i % 2 === 0 ? "bg-transparent" : "bg-slate-900/30"
              }`}
            >
              <div className="px-4 md:px-6 py-3.5">
                <span className="text-sm font-semibold text-slate-200">{row.aspect}</span>
              </div>
              <div className="px-4 md:px-6 py-3.5 border-l border-slate-800/50 flex items-start gap-2">
                <X className="w-3.5 h-3.5 text-red-500/70 mt-0.5 shrink-0"/>
                <span className="text-xs text-slate-400 leading-relaxed">{row.them}</span>
              </div>
              <div className="px-4 md:px-6 py-3.5 border-l border-slate-800/50 bg-primary/5 flex items-start gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0"/>
                <span className="text-xs text-slate-200 leading-relaxed">{row.us}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {[
            {
              icon: Flame,
              title: "Каменная вата",
              text: "Не горит, не гниёт, не слёживается. Класс НГ — самый безопасный утеплитель для жилого дома.",
              iconCl: "text-orange-400",
              bg: "bg-orange-400/10 border-orange-400/20",
            },
            {
              icon: Wind,
              title: "Правильный пирог",
              text: "Ветрозащита + пароизоляция + вент. зазор = конструкция дышит и никогда не гниёт.",
              iconCl: "text-blue-400",
              bg: "bg-blue-400/10 border-blue-400/20",
            },
            {
              icon: Check,
              title: "Прочный каркас",
              text: "Сухая доска камерной сушки 45×145–190 мм. Дом не «ходит», не скрипит и не ведёт 50+ лет.",
              iconCl: "text-emerald-400",
              bg: "bg-emerald-400/10 border-emerald-400/20",
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className={`rounded-xl border p-5 ${item.bg}`}>
                <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${item.iconCl}`}/>
                </div>
                <div className="font-bold text-white mb-1">{item.title}</div>
                <div className="text-sm text-slate-400 leading-relaxed">{item.text}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
