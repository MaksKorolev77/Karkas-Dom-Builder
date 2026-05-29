import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Config = "econom" | "optimum" | "max";

interface Layer {
  id: string;
  name: string;
  material: string;
  thickness: number;
  patternType: "wood" | "insulation" | "osb" | "membrane" | "air" | "cement" | "gypsum";
  color: string;
  topColor: string;
  thermalK: number;
  description: string;
}

const wallConfigs: Record<Config, { label: string; subtitle: string; rValue: string; layers: Layer[] }> = {
  econom: {
    label: "Эконом",
    subtitle: "Утепление 150 мм",
    rValue: "R = 3.75",
    layers: [
      { id: "e1", name: "Внешняя обшивка", material: "OSB-3 12 мм", thickness: 12, patternType: "osb", color: "#d4b896", topColor: "#b8936e", thermalK: 0.13, description: "Ориентированно-стружечная плита 12 мм. Обеспечивает жёсткость каркаса и является основой для финального фасада (штукатурка, краска, облицовка)." },
      { id: "e2", name: "Ветрозащита", material: "Мембрана Tyvek", thickness: 4, patternType: "membrane", color: "#b8d4e8", topColor: "#8ab0cc", thermalK: 0.17, description: "Диффузионная паропроницаемая мембрана. Защищает утеплитель от продувания и внешней влаги, при этом пар свободно выходит наружу." },
      { id: "e3", name: "Каркас + Утеплитель", material: "Каменная вата 150 мм", thickness: 150, patternType: "insulation", color: "#f5c87a", topColor: "#e0a845", thermalK: 0.035, description: "Стойки каркаса 45×145 мм шаг 600 мм. Между ними — каменная вата без зазоров. Плотность 35–50 кг/м³. Теплосопротивление R = 3.75 м²·°С/Вт." },
      { id: "e4", name: "Пароизоляция", material: "Паробарьер 0.2 мм", thickness: 4, patternType: "membrane", color: "#8ab4d4", topColor: "#6890b0", thermalK: 0.5, description: "Полиэтиленовая плёнка-паробарьер. Исключает проникновение водяного пара из помещения в толщу стены. Стыки проклеиваются специальной лентой." },
      { id: "e5", name: "Внутренняя обшивка", material: "OSB-3 9 мм", thickness: 9, patternType: "osb", color: "#dcc898", topColor: "#b8a070", thermalK: 0.13, description: "Внутренний OSB 9 мм — чистовая основа под отделку: шпаклёвку, монтаж ГКЛ или деревянных панелей. Без дополнительных работ." },
    ]
  },
  optimum: {
    label: "Оптимум",
    subtitle: "Утепление 200 мм",
    rValue: "R = 5.0",
    layers: [
      { id: "o1", name: "Наружная отделка", material: "Имитация бруса 20 мм", thickness: 20, patternType: "wood", color: "#a0784a", topColor: "#7a5430", thermalK: 0.15, description: "Карельский профиль из хвойных пород. Готовый финишный фасад — монтируется с вент. зазором. Легко обновить цвет самостоятельно." },
      { id: "o2", name: "Ветрозащита", material: "Мембрана Tyvek Soft", thickness: 4, patternType: "membrane", color: "#b8d4e8", topColor: "#8ab0cc", thermalK: 0.17, description: "Диффузионная мембрана Sd = 0.02 м. Пропускает пар наружу, исключает продувание. Долговечность — не менее срока службы дома." },
      { id: "o3", name: "Жёсткость каркаса", material: "OSB-3 9 мм", thickness: 9, patternType: "osb", color: "#d4b896", topColor: "#b0906a", thermalK: 0.13, description: "Листы OSB по периметру и диагонали рам обеспечивают пространственную жёсткость каркаса без применения укосин." },
      { id: "o4", name: "Каркас + Утеплитель", material: "Каменная вата 200 мм", thickness: 195, patternType: "insulation", color: "#f5c87a", topColor: "#e0a845", thermalK: 0.035, description: "Стойки 45×145 мм + поперечный контркаркас 50 мм. Слои ваты укладываются со смещением швов — мостиков холода через стойки нет. R = 5.0 м²·°С/Вт." },
      { id: "o5", name: "Пароизоляция", material: "Паробарьер 0.2 мм", thickness: 4, patternType: "membrane", color: "#8ab4d4", topColor: "#6890b0", thermalK: 0.5, description: "Надёжная защита конструкции от пара. Стыки с нахлёстом 100 мм и проклейкой лентой — полная герметизация оболочки." },
      { id: "o6", name: "Вент. зазор", material: "Контробрешётка 40 мм", thickness: 40, patternType: "air", color: "#f0ece4", topColor: "#d8d0c0", thermalK: 0.025, description: "Вентилируемый зазор 40 мм между пароизоляцией и отделкой. Также удобен для прокладки электрики без перфорации пароизоляции." },
      { id: "o7", name: "Внутренняя отделка", material: "Имитация бруса 15 мм", thickness: 15, patternType: "wood", color: "#c9a876", topColor: "#a07c50", thermalK: 0.15, description: "Чистовая деревянная отделка — тёплый, эстетичный интерьер без доп. затрат. Монтируется по контробрешётке." },
    ]
  },
  max: {
    label: "Максимум",
    subtitle: "Утепление 250 мм",
    rValue: "R = 6.25",
    layers: [
      { id: "m1", name: "Наружная отделка", material: "Фиброцем. сайдинг 8 мм", thickness: 8, patternType: "cement", color: "#7a8898", topColor: "#5a6878", thermalK: 0.7, description: "Фиброцементный сайдинг НГ (негорючий). Не гниёт, не боится мороза и влаги. Срок службы 50+ лет. Лучший выбор для постоянного проживания." },
      { id: "m2", name: "Ветрозащита", material: "Мембрана Tyvek SuperRo", thickness: 4, patternType: "membrane", color: "#b8d4e8", topColor: "#8ab0cc", thermalK: 0.17, description: "Премиальная мембрана Tyvek SuperRo: максимальная паропроницаемость и прочность в классе. Полное исключение продувания." },
      { id: "m3", name: "Жёсткость каркаса", material: "OSB-3 12 мм", thickness: 12, patternType: "osb", color: "#d4b896", topColor: "#b0906a", thermalK: 0.13, description: "Усиленный OSB-3 12 мм для максимальной жёсткости несущего каркаса из досок 45×190 мм." },
      { id: "m4", name: "Каркас + Утеплитель", material: "Каменная вата 250 мм", thickness: 245, patternType: "insulation", color: "#f5c87a", topColor: "#e0a845", thermalK: 0.035, description: "Стойки 45×190 мм + контркаркас 50 мм = 250 мм. Три слоя со смещением швов. R = 6.25 м²·°С/Вт — лучший показатель в классе каркасных домов." },
      { id: "m5", name: "Пароизоляция", material: "Паробарьер Изоспан RS", thickness: 4, patternType: "membrane", color: "#8ab4d4", topColor: "#6890b0", thermalK: 0.5, description: "Армированная пароизоляция с двойной проклейкой всех стыков. Полная герметизация тепловой оболочки дома." },
      { id: "m6", name: "Вент. зазор", material: "Контробрешётка 50 мм", thickness: 50, patternType: "air", color: "#f0ece4", topColor: "#d8d0c0", thermalK: 0.025, description: "Увеличенный зазор 50 мм — удобно для разводки всех электрических и слаботочных коммуникаций без нарушения пароизоляции." },
      { id: "m7", name: "Внутренняя отделка", material: "OSB + Гипсокартон 12 мм", thickness: 21, patternType: "gypsum", color: "#e8e8e8", topColor: "#c0c0c0", thermalK: 0.35, description: "OSB-9 + ГКЛ 12 мм. Идеальная база под любую чистовую отделку: штукатурка, краска, обои, плитка, декоративный камень." },
    ]
  }
};

function PatternDefs() {
  return (
    <defs>
      <pattern id="wood-pat" x="0" y="0" width="12" height="8" patternUnits="userSpaceOnUse">
        <rect width="12" height="8" fill="#c9a876"/>
        <line x1="0" y1="2" x2="12" y2="2" stroke="#a07c50" strokeWidth="0.5" opacity="0.5"/>
        <line x1="0" y1="5.5" x2="12" y2="5.5" stroke="#a07c50" strokeWidth="0.3" opacity="0.4"/>
      </pattern>
      <pattern id="insulation-pat" x="0" y="0" width="16" height="12" patternUnits="userSpaceOnUse">
        <rect width="16" height="12" fill="#f5c87a"/>
        <path d="M0 3 Q4 1 8 3 Q12 5 16 3" stroke="#d4922a" strokeWidth="1" fill="none" opacity="0.6"/>
        <path d="M0 7 Q4 5 8 7 Q12 9 16 7" stroke="#d4922a" strokeWidth="1" fill="none" opacity="0.6"/>
        <path d="M0 11 Q4 9 8 11 Q12 13 16 11" stroke="#d4922a" strokeWidth="1" fill="none" opacity="0.6"/>
      </pattern>
      <pattern id="osb-pat" x="0" y="0" width="20" height="14" patternUnits="userSpaceOnUse">
        <rect width="20" height="14" fill="#d4b896"/>
        <rect x="1" y="1" width="6" height="4" fill="rgba(0,0,0,0.06)" rx="0.5"/>
        <rect x="10" y="1" width="8" height="3" fill="rgba(0,0,0,0.04)" rx="0.5" transform="rotate(-10,14,2.5)"/>
        <rect x="2" y="8" width="9" height="3" fill="rgba(0,0,0,0.05)" rx="0.5" transform="rotate(8,6.5,9.5)"/>
        <rect x="13" y="7" width="5" height="5" fill="rgba(0,0,0,0.06)" rx="0.5"/>
      </pattern>
      <pattern id="air-pat" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
        <rect width="10" height="10" fill="#f0ece4"/>
        <line x1="0" y1="5" x2="10" y2="5" stroke="#d8d0c0" strokeWidth="0.5" strokeDasharray="2,3"/>
      </pattern>
      <pattern id="cement-pat" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
        <rect width="12" height="12" fill="#7a8898"/>
        <circle cx="3" cy="3" r="0.8" fill="rgba(255,255,255,0.2)"/>
        <circle cx="9" cy="7" r="0.6" fill="rgba(255,255,255,0.15)"/>
        <circle cx="6" cy="10" r="0.5" fill="rgba(255,255,255,0.1)"/>
        <circle cx="2" cy="9" r="0.4" fill="rgba(0,0,0,0.1)"/>
      </pattern>
      <pattern id="gypsum-pat" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="16" height="16" fill="#e8e8e8"/>
        <rect x="0" y="0" width="16" height="16" fill="none" stroke="#d0d0d0" strokeWidth="0.5"/>
      </pattern>
      <pattern id="membrane-pat" x="0" y="0" width="8" height="4" patternUnits="userSpaceOnUse">
        <rect width="8" height="4" fill="#8ab4d4"/>
        <line x1="0" y1="1" x2="8" y2="1" stroke="#6890b0" strokeWidth="0.5" opacity="0.5"/>
        <line x1="0" y1="3" x2="8" y2="3" stroke="#6890b0" strokeWidth="0.3" opacity="0.4"/>
      </pattern>
      <linearGradient id="temp-overlay" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18"/>
        <stop offset="35%" stopColor="#8b5cf6" stopOpacity="0.06"/>
        <stop offset="100%" stopColor="#f97316" stopOpacity="0.18"/>
      </linearGradient>
      <linearGradient id="temp-bar-grad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#3b82f6"/>
        <stop offset="50%" stopColor="#a78bfa"/>
        <stop offset="100%" stopColor="#f97316"/>
      </linearGradient>
      <filter id="layer-shadow">
        <feDropShadow dx="2" dy="0" stdDeviation="2" floodOpacity="0.15"/>
      </filter>
      <filter id="glow-line">
        <feGaussianBlur stdDeviation="1.5" result="blur"/>
        <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
      </filter>
    </defs>
  );
}

const patternIds: Record<string, string> = {
  wood: "wood-pat",
  insulation: "insulation-pat",
  osb: "osb-pat",
  air: "air-pat",
  cement: "cement-pat",
  gypsum: "gypsum-pat",
  membrane: "membrane-pat",
};

export function WallSection() {
  const [activeConfig, setActiveConfig] = useState<Config>("optimum");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const config = wallConfigs[activeConfig];
  const layers = config.layers;
  const total = layers.reduce((sum, l) => sum + l.thickness, 0);

  const WALL_H = 220;
  const DEPTH = 28;
  const SVG_WIDTH = 900;
  const LABEL_AREA_TOP = 96;
  const LABEL_AREA_BOT = 96;
  const TEMP_SECTION_H = 52;
  const SVG_HEIGHT = WALL_H + LABEL_AREA_TOP + LABEL_AREA_BOT + DEPTH + TEMP_SECTION_H;

  const DRAW_W = SVG_WIDTH - 40;
  const MIN_PX = 5;
  const thinLayers = layers.filter(l => l.thickness < 12);
  const thickLayers = layers.filter(l => l.thickness >= 12);
  const thinTotal = thinLayers.length * MIN_PX;
  const thickTotal = thickLayers.reduce((s, l) => s + l.thickness, 0);
  const thickScale = (DRAW_W - thinTotal) / (thickTotal || 1);

  const getLayerW = (thickness: number) =>
    thickness < 12 ? MIN_PX : Math.max(thickness * thickScale, MIN_PX);

  let xCursor = 20;
  const layerBoxes = layers.map((layer) => {
    const w = getLayerW(layer.thickness);
    const box = { ...layer, x: xCursor, w };
    xCursor += w;
    return box;
  });

  const totalDrawW = layerBoxes.reduce((s, b) => s + b.w, 0);

  // Temperature profile through wall
  const T_out = -20;
  const T_in = 21;
  const rTotal = layers.reduce((s, l) => s + (l.thickness / 1000) / l.thermalK, 0);
  let rAccum = 0;
  const interfaceTemps: number[] = [];
  for (const l of layers) {
    rAccum += (l.thickness / 1000) / l.thermalK;
    interfaceTemps.push(T_out + (T_in - T_out) * (rAccum / rTotal));
  }

  const TEMP_BAR_Y = LABEL_AREA_TOP + WALL_H + DEPTH + 12;
  const TEMP_BAR_H = 8;
  const CURVE_Y = TEMP_BAR_Y - 8;

  // Curve points: x at each layer interface, y = proportional to temperature
  const curvePoints: { x: number; t: number }[] = [
    { x: layerBoxes[0].x, t: T_out },
    ...layerBoxes.map((box, i) => ({ x: box.x + box.w, t: interfaceTemps[i] })),
  ];

  const tempToY = (t: number) => CURVE_Y - ((t - T_out) / (T_in - T_out)) * 30;

  const curvePath = curvePoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${tempToY(p.t)}`)
    .join(" ");

  const hoveredLayer = hoveredId ? layers.find(l => l.id === hoveredId) : null;

  return (
    <section className="py-14 md:py-20 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            Конструктив
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Пирог стены
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Каждый слой выполняет свою задачу. Вместе они удерживают тепло при −40°C снаружи.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-card border border-border rounded-xl p-1 shadow-sm">
            {(["econom", "optimum", "max"] as Config[]).map((c) => (
              <button
                key={c}
                onClick={() => { setActiveConfig(c); setHoveredId(null); }}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeConfig === c
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {wallConfigs[c].label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"/>
              <span className="text-muted-foreground">Снаружи</span>
              <span className="font-bold text-blue-500">−20°C</span>
            </div>
            <div className="text-muted-foreground">
              Толщина: <span className="font-bold text-foreground">{total} мм</span>
              {" · "}
              <span className="font-bold text-primary">{config.rValue} м²·К/Вт</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-orange-400"/>
              <span className="text-muted-foreground">Внутри</span>
              <span className="font-bold text-orange-500">+21°C</span>
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeConfig}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full overflow-x-auto"
          >
            <div className="min-w-[640px]">
              <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full" style={{ maxHeight: 520 }}>
                <PatternDefs />

                {/* Temperature gradient overlay on whole wall */}
                <rect
                  x={layerBoxes[0]?.x ?? 20}
                  y={LABEL_AREA_TOP}
                  width={totalDrawW}
                  height={WALL_H}
                  fill="url(#temp-overlay)"
                />

                {layerBoxes.map((layer, i) => {
                  const isHovered = hoveredId === layer.id;
                  const isOtherHovered = hoveredId !== null && !isHovered;
                  const labelY = i % 2 === 0 ? LABEL_AREA_TOP - 10 : LABEL_AREA_TOP + WALL_H + DEPTH + 10;
                  const lineY1 = i % 2 === 0 ? LABEL_AREA_TOP - 10 : LABEL_AREA_TOP + WALL_H + DEPTH + 10;
                  const lineY2 = i % 2 === 0 ? LABEL_AREA_TOP : LABEL_AREA_TOP + WALL_H;
                  const labelAnchorX = layer.x + layer.w / 2;

                  return (
                    <g
                      key={layer.id}
                      onMouseEnter={() => setHoveredId(layer.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* 3D top face */}
                      <polygon
                        points={`${layer.x},${LABEL_AREA_TOP} ${layer.x + layer.w},${LABEL_AREA_TOP} ${layer.x + layer.w + DEPTH * 0.6},${LABEL_AREA_TOP - DEPTH * 0.5} ${layer.x + DEPTH * 0.6},${LABEL_AREA_TOP - DEPTH * 0.5}`}
                        fill={layer.topColor}
                        opacity={isOtherHovered ? 0.4 : isHovered ? 1 : 0.85}
                        stroke={isHovered ? "#f57a00" : "white"}
                        strokeWidth={isHovered ? 1.5 : 0.5}
                      />
                      {/* 3D right face */}
                      <polygon
                        points={`${layer.x + layer.w},${LABEL_AREA_TOP} ${layer.x + layer.w},${LABEL_AREA_TOP + WALL_H} ${layer.x + layer.w + DEPTH * 0.6},${LABEL_AREA_TOP + WALL_H - DEPTH * 0.5} ${layer.x + layer.w + DEPTH * 0.6},${LABEL_AREA_TOP - DEPTH * 0.5}`}
                        fill={layer.topColor}
                        opacity={isOtherHovered ? 0.3 : isHovered ? 0.9 : 0.7}
                        stroke={isHovered ? "#f57a00" : "white"}
                        strokeWidth={isHovered ? 1 : 0.3}
                      />
                      {/* Front face */}
                      <rect
                        x={layer.x} y={LABEL_AREA_TOP}
                        width={layer.w} height={WALL_H}
                        fill={`url(#${patternIds[layer.patternType]})`}
                        opacity={isOtherHovered ? 0.35 : isHovered ? 1 : 0.92}
                        stroke={isHovered ? "#f57a00" : "rgba(0,0,0,0.08)"}
                        strokeWidth={isHovered ? 2 : 0.5}
                      />
                      {isHovered && (
                        <rect x={layer.x} y={LABEL_AREA_TOP} width={layer.w} height={WALL_H}
                          fill="rgba(245,122,0,0.08)"
                        />
                      )}

                      {/* Leader line */}
                      <line
                        x1={labelAnchorX} y1={lineY1}
                        x2={labelAnchorX} y2={lineY2}
                        stroke={isHovered ? "#f57a00" : "#94a3b8"}
                        strokeWidth={isHovered ? 1.5 : 1}
                        strokeDasharray={i % 2 !== 0 ? "3,2" : undefined}
                        opacity={isOtherHovered ? 0.3 : 1}
                      />

                      {/* Label box */}
                      <g transform={`translate(${labelAnchorX}, ${labelY})`}>
                        <rect
                          x={-52} y={i % 2 === 0 ? -42 : 2}
                          width={104} height={36} rx={6}
                          fill={isHovered ? "#f57a00" : "white"}
                          stroke={isHovered ? "#f57a00" : "#e2e8f0"}
                          strokeWidth={isHovered ? 0 : 1}
                          filter="url(#layer-shadow)"
                          opacity={isOtherHovered ? 0.3 : 1}
                        />
                        <text x={0} y={i % 2 === 0 ? -26 : 16}
                          textAnchor="middle" fontSize={9.5} fontWeight="600"
                          fill={isHovered ? "white" : "#1a1a1a"}
                          opacity={isOtherHovered ? 0.3 : 1}
                        >
                          {layer.material.length > 18 ? layer.material.slice(0, 17) + "…" : layer.material}
                        </text>
                        <text x={0} y={i % 2 === 0 ? -14 : 28}
                          textAnchor="middle" fontSize={8.5}
                          fill={isHovered ? "rgba(255,255,255,0.85)" : "#64748b"}
                          opacity={isOtherHovered ? 0.3 : 1}
                        >
                          {`${layer.thickness} мм`}
                        </text>
                      </g>

                      {layer.w > 50 && (
                        <text
                          x={layer.x + layer.w / 2} y={LABEL_AREA_TOP + WALL_H / 2 + 5}
                          textAnchor="middle" fontSize={layer.w > 80 ? 13 : 10}
                          fontWeight="bold"
                          fill={isHovered ? "#f57a00" : "rgba(0,0,0,0.3)"}
                          opacity={isOtherHovered ? 0.3 : 1}
                        >
                          {layer.thickness} мм
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* OUTSIDE / INSIDE labels */}
                <text x={18} y={LABEL_AREA_TOP + WALL_H / 2 + 5} textAnchor="middle" fontSize={10} fontWeight="700" fill="#3b82f6" transform={`rotate(-90,18,${LABEL_AREA_TOP + WALL_H / 2 + 5})`}>УЛИЦА</text>
                <text x={SVG_WIDTH - 18} y={LABEL_AREA_TOP + WALL_H / 2 + 5} textAnchor="middle" fontSize={10} fontWeight="700" fill="#f97316" transform={`rotate(-90,${SVG_WIDTH - 18},${LABEL_AREA_TOP + WALL_H / 2 + 5})`}>ЖИЛЬЁ</text>

                {/* Temperature gradient bar */}
                <rect
                  x={layerBoxes[0]?.x ?? 20} y={TEMP_BAR_Y}
                  width={totalDrawW} height={TEMP_BAR_H} rx={4}
                  fill="url(#temp-bar-grad)" opacity={0.85}
                />

                {/* Temperature curve */}
                <path
                  d={curvePath}
                  fill="none"
                  stroke="white"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity={0.9}
                  filter="url(#glow-line)"
                />
                {/* Dots at key temperature transitions */}
                {curvePoints.map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x} cy={tempToY(p.t)}
                    r={i === 0 || i === curvePoints.length - 1 ? 4 : 3}
                    fill={i === 0 ? "#3b82f6" : i === curvePoints.length - 1 ? "#f97316" : "white"}
                    stroke="white" strokeWidth={1.5}
                    opacity={0.9}
                  />
                ))}
                {/* Temperature labels on bar */}
                <text x={(layerBoxes[0]?.x ?? 20) - 4} y={TEMP_BAR_Y + TEMP_BAR_H / 2 + 4}
                  textAnchor="end" fontSize={9} fontWeight="700" fill="#3b82f6">−20°C</text>
                <text x={(layerBoxes[0]?.x ?? 20) + totalDrawW + 4} y={TEMP_BAR_Y + TEMP_BAR_H / 2 + 4}
                  textAnchor="start" fontSize={9} fontWeight="700" fill="#f97316">+21°C</text>

                {/* Total width indicator */}
                <line x1={20} y1={TEMP_BAR_Y + 28} x2={SVG_WIDTH - 20} y2={TEMP_BAR_Y + 28} stroke="#e2e8f0" strokeWidth="1"/>
                <line x1={20} y1={TEMP_BAR_Y + 24} x2={20} y2={TEMP_BAR_Y + 32} stroke="#e2e8f0" strokeWidth="1.5"/>
                <line x1={SVG_WIDTH - 20} y1={TEMP_BAR_Y + 24} x2={SVG_WIDTH - 20} y2={TEMP_BAR_Y + 32} stroke="#e2e8f0" strokeWidth="1.5"/>
                <text x={SVG_WIDTH / 2} y={TEMP_BAR_Y + 24} textAnchor="middle" fontSize={10} fill="#94a3b8">
                  Общая толщина стены: {total} мм · Теплосопротивление: {config.rValue} м²·К/Вт
                </text>
              </svg>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="h-24 md:h-20 mt-2">
          <AnimatePresence mode="wait">
            {hoveredLayer ? (
              <motion.div
                key={hoveredLayer.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.15 }}
                className="max-w-3xl mx-auto bg-primary/5 border border-primary/20 rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row sm:items-center gap-3"
              >
                <div className="shrink-0">
                  <div className="w-10 h-10 rounded-lg border-2 border-primary/20" style={{ backgroundColor: hoveredLayer.color }}/>
                </div>
                <div>
                  <div className="font-bold text-foreground mb-0.5">{hoveredLayer.name} — {hoveredLayer.material}</div>
                  <div className="text-sm text-muted-foreground leading-snug">{hoveredLayer.description}</div>
                </div>
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-muted-foreground text-sm mt-4"
              >
                Наведите на слой — узнайте зачем он нужен
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
