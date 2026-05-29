import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Config = "econom" | "optimum" | "max";

interface RoofLayer {
  id: string;
  name: string;
  material: string;
  thickness: number;
  patternType: "metal" | "wood" | "insulation" | "membrane" | "batten" | "gypsum";
  color: string;
  topColor: string;
  description: string;
}

const roofConfigs: Record<Config, { label: string; subtitle: string; rValue: string; layers: RoofLayer[] }> = {
  econom: {
    label: "Эконом",
    subtitle: "Утепление 200 мм",
    rValue: "R = 5.0",
    layers: [
      { id: "r1", name: "Металлочерепица", material: "Fineberg 0.5 мм", thickness: 0, patternType: "metal", color: "#64748b", topColor: "#475569", description: "Стальной лист 0.5 мм с полимерным покрытием. Устойчива к коррозии. Класс пожаростойкости А2." },
      { id: "r2", name: "Обрешётка", material: "Доска 25×100 мм", thickness: 25, patternType: "wood", color: "#c9a876", topColor: "#a07848", description: "Доска 25×100 мм с шагом 350 мм. Основа под металлочерепицу." },
      { id: "r3", name: "Контробрешётка", material: "Брусок 40×50 мм", thickness: 40, patternType: "batten", color: "#d4b896", topColor: "#b09060", description: "Создаёт вентиляционный зазор между ветрозащитой и обрешёткой для отвода конденсата." },
      { id: "r4", name: "Ветрозащита", material: "Мембрана Tyvek", thickness: 1, patternType: "membrane", color: "#8ab4d4", topColor: "#6890b0", description: "Ветрозащитная паропроницаемая мембрана. Защищает утеплитель от конденсата снаружи." },
      { id: "r5", name: "Стропила + Утеплитель", material: "Каменная вата 200 мм", thickness: 200, patternType: "insulation", color: "#f5c87a", topColor: "#e0a845", description: "Стропила 45×190 мм с шагом 600 мм. Пространство заполнено каменной ватой. R = 5.0 м²·°С/Вт." },
      { id: "r6", name: "Пароизоляция", material: "Паробарьер 0.2 мм", thickness: 1, patternType: "membrane", color: "#60a5fa", topColor: "#3b82f6", description: "Внутренняя пароизоляция с проклейкой стыков. Исключает проникновение пара в утеплитель." },
      { id: "r7", name: "Потолочная обшивка", material: "OSB 9 мм", thickness: 9, patternType: "gypsum", color: "#e0e0e0", topColor: "#c0c0c0", description: "Основа для потолочной отделки: покраска, натяжной потолок, гипсокартон." },
    ]
  },
  optimum: {
    label: "Оптимум",
    subtitle: "Утепление 200 мм",
    rValue: "R = 5.0",
    layers: [
      { id: "r1", name: "Металлочерепица", material: "Fineberg 0.5 мм", thickness: 0, patternType: "metal", color: "#64748b", topColor: "#475569", description: "Стальной лист 0.5 мм с полимерным покрытием Polyester 25 мкм. Срок службы 30+ лет." },
      { id: "r2", name: "Обрешётка", material: "Доска 25×100 мм", thickness: 25, patternType: "wood", color: "#c9a876", topColor: "#a07848", description: "Доска 25×100 мм с шагом под профиль металлочерепицы. Основа для кровельного покрытия." },
      { id: "r3", name: "Контробрешётка", material: "Брусок 40×50 мм", thickness: 50, patternType: "batten", color: "#d4b896", topColor: "#b09060", description: "Вентилируемый зазор 50 мм. Предотвращает накопление конденсата под металлочерепицей." },
      { id: "r4", name: "Ветрозащита", material: "Мембрана Tyvek Soft", thickness: 1, patternType: "membrane", color: "#8ab4d4", topColor: "#6890b0", description: "Диффузионная мембрана Tyvek: выпускает пар наружу, защищает от ветра и внешней влаги." },
      { id: "r5", name: "Стропила + Утеплитель", material: "Каменная вата 200 мм", thickness: 200, patternType: "insulation", color: "#f5c87a", topColor: "#e0a845", description: "Стропила 45×190 мм. Каменная вата укладывается в 2 слоя со смещением швов — мостиков холода нет." },
      { id: "r6", name: "Пароизоляция", material: "Паробарьер с проклейкой", thickness: 1, patternType: "membrane", color: "#60a5fa", topColor: "#3b82f6", description: "Пароизоляция класса А4 с фольгированием. Стыки проклеиваются специальной лентой." },
      { id: "r7", name: "Вент. зазор", material: "Контробрешётка 40 мм", thickness: 40, patternType: "batten", color: "#f0ece4", topColor: "#d8d0c0", description: "Воздушный зазор между пароизоляцией и потолочной обшивкой. Служит для укладки коммуникаций." },
      { id: "r8", name: "Потолочная обшивка", material: "OSB 9 мм + отделка", thickness: 9, patternType: "gypsum", color: "#e0e0e0", topColor: "#c0c0c0", description: "OSB 9 мм под финишную отделку. В комплектации Оптимум — белёный потолок." },
    ]
  },
  max: {
    label: "Максимум",
    subtitle: "Утепление 250 мм",
    rValue: "R = 6.25",
    layers: [
      { id: "r1", name: "Металлочерепица", material: "Fineberg 0.5 мм Pural Matt", thickness: 0, patternType: "metal", color: "#64748b", topColor: "#475569", description: "Премиальное покрытие Pural Matt — матовая поверхность, улучшенная стойкость к царапинам и выгоранию." },
      { id: "r2", name: "Обрешётка", material: "Доска 25×100 мм", thickness: 25, patternType: "wood", color: "#c9a876", topColor: "#a07848", description: "Обрешётка с увеличенным шагом под конкретный профиль металлочерепицы." },
      { id: "r3", name: "Контробрешётка", material: "Брусок 50×50 мм", thickness: 50, patternType: "batten", color: "#d4b896", topColor: "#b09060", description: "Усиленный брусок 50×50 мм. Увеличенный зазор 50 мм улучшает вентиляцию подкровельного пространства." },
      { id: "r4", name: "Ветрозащита", material: "Мембрана Tyvek SuperRo", thickness: 1, patternType: "membrane", color: "#8ab4d4", topColor: "#6890b0", description: "Премиальная мембрана Tyvek SuperRo с Sd = 0.02 м — наилучшая паропроницаемость." },
      { id: "r5", name: "Стропила + Утеплитель", material: "Каменная вата 250 мм", thickness: 250, patternType: "insulation", color: "#f5c87a", topColor: "#e0a845", description: "Стропила 45×190 мм + дополнительный слой контркаркаса 50 мм = 250 мм утеплителя. R = 6.25 м²·°С/Вт." },
      { id: "r6", name: "Пароизоляция", material: "Изоспан RS 0.2 мм", thickness: 1, patternType: "membrane", color: "#60a5fa", topColor: "#3b82f6", description: "Армированная пароизоляция Изоспан RS. Укладывается с нахлёстом и двойной проклейкой стыков." },
      { id: "r7", name: "Вент. зазор", material: "Контробрешётка 50 мм", thickness: 50, patternType: "batten", color: "#f0ece4", topColor: "#d8d0c0", description: "Увеличенный вентилируемый зазор 50 мм. Удобен для размещения электропроводки и инженерных коммуникаций." },
      { id: "r8", name: "Потолочная обшивка", material: "OSB + Гипсокартон 12 мм", thickness: 12, patternType: "gypsum", color: "#e8e8e8", topColor: "#c8c8c8", description: "OSB 9 мм + гипсокартон 12 мм. Идеально под любую чистовую отделку: штукатурку, краску, натяжной потолок." },
    ]
  }
};

function PatternDefs() {
  return (
    <defs>
      <pattern id="roof-metal" x="0" y="0" width="18" height="10" patternUnits="userSpaceOnUse">
        <rect width="18" height="10" fill="#64748b"/>
        <path d="M0 5 L9 0 L18 5" stroke="#475569" strokeWidth="1.5" fill="none"/>
        <path d="M0 10 L9 5 L18 10" stroke="#475569" strokeWidth="0.5" fill="none" opacity="0.5"/>
      </pattern>
      <pattern id="roof-wood" x="0" y="0" width="14" height="8" patternUnits="userSpaceOnUse">
        <rect width="14" height="8" fill="#c9a876"/>
        <line x1="0" y1="2.5" x2="14" y2="2.5" stroke="#a07848" strokeWidth="0.5" opacity="0.5"/>
        <line x1="0" y1="5.5" x2="14" y2="5.5" stroke="#a07848" strokeWidth="0.3" opacity="0.4"/>
      </pattern>
      <pattern id="roof-ins" x="0" y="0" width="18" height="12" patternUnits="userSpaceOnUse">
        <rect width="18" height="12" fill="#f5c87a"/>
        <path d="M0 3 Q4.5 1 9 3 Q13.5 5 18 3" stroke="#d4922a" strokeWidth="1.2" fill="none" opacity="0.6"/>
        <path d="M0 7 Q4.5 5 9 7 Q13.5 9 18 7" stroke="#d4922a" strokeWidth="1.2" fill="none" opacity="0.6"/>
        <path d="M0 11 Q4.5 9 9 11 Q13.5 13 18 11" stroke="#d4922a" strokeWidth="1.2" fill="none" opacity="0.6"/>
      </pattern>
      <pattern id="roof-mem" x="0" y="0" width="8" height="4" patternUnits="userSpaceOnUse">
        <rect width="8" height="4" fill="#8ab4d4"/>
        <line x1="0" y1="2" x2="8" y2="2" stroke="#6890b0" strokeWidth="0.5" opacity="0.5"/>
      </pattern>
      <pattern id="roof-mem2" x="0" y="0" width="8" height="4" patternUnits="userSpaceOnUse">
        <rect width="8" height="4" fill="#60a5fa"/>
        <line x1="0" y1="2" x2="8" y2="2" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5"/>
      </pattern>
      <pattern id="roof-batten" x="0" y="0" width="12" height="10" patternUnits="userSpaceOnUse">
        <rect width="12" height="10" fill="#f0ece4"/>
        <line x1="6" y1="0" x2="6" y2="10" stroke="#d8d0c0" strokeWidth="0.5" strokeDasharray="2,3"/>
      </pattern>
      <pattern id="roof-gypsum" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
        <rect width="16" height="16" fill="#e0e0e0"/>
        <rect width="16" height="16" fill="none" stroke="#c8c8c8" strokeWidth="0.5"/>
      </pattern>
      <filter id="roof-shadow">
        <feDropShadow dx="2" dy="0" stdDeviation="2" floodOpacity="0.12"/>
      </filter>
    </defs>
  );
}

const patternIds: Record<string, string> = {
  metal: "roof-metal",
  wood: "roof-wood",
  insulation: "roof-ins",
  membrane: "roof-mem",
  batten: "roof-batten",
  gypsum: "roof-gypsum",
};

export function RoofSection() {
  const [activeConfig, setActiveConfig] = useState<Config>("optimum");
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const config = roofConfigs[activeConfig];
  const layers = config.layers;
  const total = layers.reduce((sum, l) => sum + l.thickness, 0);

  const WALL_H = 200;
  const DEPTH = 24;
  const SVG_WIDTH = 900;
  const LABEL_AREA_TOP = 90;
  const LABEL_AREA_BOT = 90;
  const SVG_HEIGHT = WALL_H + LABEL_AREA_TOP + LABEL_AREA_BOT + DEPTH;

  const DRAW_W = SVG_WIDTH - 40;
  const MIN_PX = 6;
  const thinLayers = layers.filter(l => l.thickness < 15);
  const thickLayers = layers.filter(l => l.thickness >= 15);
  const thinTotal = thinLayers.length * MIN_PX;
  const thickTotal = thickLayers.reduce((s, l) => s + l.thickness, 0);
  const thickScale = (DRAW_W - thinTotal) / (thickTotal || 1);

  const getLayerW = (thickness: number) =>
    thickness < 15 ? MIN_PX : Math.max(thickness * thickScale, MIN_PX);

  let xCursor = 20;
  const layerBoxes = layers.map((layer) => {
    const w = getLayerW(layer.thickness);
    const box = { ...layer, x: xCursor, w };
    xCursor += w;
    return box;
  });

  const hoveredLayer = hoveredId ? layers.find(l => l.id === hoveredId) : null;

  return (
    <section className="py-14 md:py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            Конструктив
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Пирог кровли
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Семь–восемь слоёв, которые обеспечивают герметичность, тепло и долговечность кровельной конструкции.
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 mb-8">
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
                {roofConfigs[c].label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              Толщина кровельного пирога: <span className="text-primary font-bold">{total} мм</span>
            </span>
            <span>·</span>
            <span className="font-medium text-foreground">
              Теплосопротивление: <span className="text-primary font-bold">{config.rValue} м²·°С/Вт</span>
            </span>
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
              <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="w-full" style={{ maxHeight: 460 }}>
                <PatternDefs />
                {layerBoxes.map((layer, i) => {
                  const isHovered = hoveredId === layer.id;
                  const isOtherHovered = hoveredId !== null && !isHovered;
                  const labelY = i % 2 === 0 ? LABEL_AREA_TOP - 10 : LABEL_AREA_TOP + WALL_H + DEPTH + 10;
                  const lineY1 = i % 2 === 0 ? LABEL_AREA_TOP - 10 : LABEL_AREA_TOP + WALL_H + DEPTH + 10;
                  const lineY2 = i % 2 === 0 ? LABEL_AREA_TOP : LABEL_AREA_TOP + WALL_H;
                  const labelAnchorX = layer.x + layer.w / 2;
                  const patId = patternIds[layer.patternType] ?? "roof-gypsum";

                  return (
                    <g
                      key={layer.id}
                      onMouseEnter={() => setHoveredId(layer.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* 3D top */}
                      <polygon
                        points={`${layer.x},${LABEL_AREA_TOP} ${layer.x + layer.w},${LABEL_AREA_TOP} ${layer.x + layer.w + DEPTH * 0.6},${LABEL_AREA_TOP - DEPTH * 0.5} ${layer.x + DEPTH * 0.6},${LABEL_AREA_TOP - DEPTH * 0.5}`}
                        fill={layer.topColor}
                        opacity={isOtherHovered ? 0.3 : isHovered ? 1 : 0.8}
                        stroke={isHovered ? "#f57a00" : "white"}
                        strokeWidth={isHovered ? 1.5 : 0.5}
                      />
                      {/* 3D right side */}
                      <polygon
                        points={`${layer.x + layer.w},${LABEL_AREA_TOP} ${layer.x + layer.w},${LABEL_AREA_TOP + WALL_H} ${layer.x + layer.w + DEPTH * 0.6},${LABEL_AREA_TOP + WALL_H - DEPTH * 0.5} ${layer.x + layer.w + DEPTH * 0.6},${LABEL_AREA_TOP - DEPTH * 0.5}`}
                        fill={layer.topColor}
                        opacity={isOtherHovered ? 0.25 : isHovered ? 0.85 : 0.65}
                        stroke={isHovered ? "#f57a00" : "white"}
                        strokeWidth={isHovered ? 1 : 0.3}
                      />
                      {/* Front face */}
                      <rect
                        x={layer.x} y={LABEL_AREA_TOP}
                        width={layer.w} height={WALL_H}
                        fill={`url(#${patId})`}
                        opacity={isOtherHovered ? 0.3 : isHovered ? 1 : 0.9}
                        stroke={isHovered ? "#f57a00" : "rgba(0,0,0,0.06)"}
                        strokeWidth={isHovered ? 2 : 0.5}
                        filter={isHovered ? "url(#roof-shadow)" : undefined}
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
                        strokeDasharray={i % 2 === 0 ? "none" : "3,2"}
                        opacity={isOtherHovered ? 0.25 : 1}
                      />
                      {/* Label box */}
                      <g transform={`translate(${labelAnchorX}, ${labelY})`}>
                        <rect
                          x={-52} y={i % 2 === 0 ? -42 : 2}
                          width={104} height={36}
                          rx={6}
                          fill={isHovered ? "#f57a00" : "white"}
                          stroke={isHovered ? "#f57a00" : "#e2e8f0"}
                          strokeWidth={isHovered ? 0 : 1}
                          filter="url(#roof-shadow)"
                          opacity={isOtherHovered ? 0.25 : 1}
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
                          {layer.thickness > 0 ? `${layer.thickness} мм` : "внешний слой"}
                        </text>
                      </g>
                      {layer.w > 50 && (
                        <text
                          x={layer.x + layer.w / 2} y={LABEL_AREA_TOP + WALL_H / 2 + 5}
                          textAnchor="middle" fontSize={layer.w > 90 ? 13 : 10}
                          fontWeight="bold"
                          fill={isHovered ? "#f57a00" : "rgba(0,0,0,0.3)"}
                          opacity={isOtherHovered ? 0.25 : 1}
                        >
                          {layer.thickness > 0 ? `${layer.thickness} мм` : ""}
                        </text>
                      )}
                    </g>
                  );
                })}
                <text x={18} y={LABEL_AREA_TOP + WALL_H / 2 + 5} textAnchor="start" fontSize={11} fontWeight="700" fill="#94a3b8" transform={`rotate(-90, 18, ${LABEL_AREA_TOP + WALL_H / 2 + 5})`}>УЛИЦА</text>
                <text x={SVG_WIDTH - 18} y={LABEL_AREA_TOP + WALL_H / 2 + 5} textAnchor="start" fontSize={11} fontWeight="700" fill="#94a3b8" transform={`rotate(-90, ${SVG_WIDTH - 18}, ${LABEL_AREA_TOP + WALL_H / 2 + 5})`}>ЖИЛЬЁ</text>
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
                Наведите на слой, чтобы узнать подробности
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
