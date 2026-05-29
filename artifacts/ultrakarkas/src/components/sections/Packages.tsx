import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Minus, Thermometer, Layers, Star, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  { name: "Фундамент", econom: "Ж/б забивные сваи 150x150x3000", optimum: "Ж/б забивные сваи 150x150x3000", max: "Ж/б забивные сваи 150x150x3000" },
  { name: "Нижняя обвязка", econom: "Сухая строганная доска 150×150 мм", optimum: "Сухая строганная доска 150×150 мм", max: "Сухая строганная доска 150×150 мм" },
  { name: "Лаги пола", econom: "Сухая доска 45×190 мм", optimum: "Сухая доска 45×190 мм", max: "Сухая доска 45×190 мм" },
  { name: "Утепление пола", econom: "Каменная вата 200 мм", optimum: "Каменная вата 200 мм", max: "Каменная вата 250 мм", highlight: "max" },
  { name: "Черный пол", econom: "Обрезная доска 20x100 мм", optimum: "Обрезная доска 20x100 мм", max: "Обрезная доска 20x100 мм" },
  { name: "Покрытие пола", econom: false, optimum: "Фанера 18 мм", max: "Фанера 18 мм", highlight: "optimum" },
  { name: "Каркас стен", econom: "Доска 45x145 мм", optimum: "Доска 45x145 мм + брусок 40x50 мм", max: "Доска 45x190 мм + брусок 40x50 мм", highlight: "all" },
  { name: "Утепление стен", econom: "Каменная вата 150 мм", optimum: "Каменная вата 150+50=200 мм", max: "Каменная вата 200+50=250 мм", highlight: "all" },
  { name: "Утепление перегородок", econom: "Каменная вата 100 мм", optimum: "Каменная вата 100 мм", max: "Каменная вата 100 мм" },
  { name: "Внутренняя отделка", econom: false, optimum: "Имитация бруса", max: "OSB + Гипсокартон", highlight: "optimum" },
  { name: "Наружная отделка", econom: "OSB 12 мм", optimum: "Имитация бруса", max: "Фиброцементный сайдинг", highlight: "all" },
  { name: "Отделка потолка", econom: false, optimum: "OSB 9 мм", max: "OSB 9 мм", highlight: "optimum" },
  { name: "Утепление потолка", econom: "Каменная вата 200 мм", optimum: "Каменная вата 200 мм", max: "Каменная вата 250 мм", highlight: "max" },
  { name: "Окна", econom: "Пластиковые ПВХ 70 Рехау", optimum: "Пластиковые ПВХ 70 Рехау", max: "Пластиковые ПВХ 70 Рехау" },
  { name: "Дверь", econom: "Металлическая с терморазрывом 100 мм", optimum: "Металлическая с терморазрывом 100 мм", max: "Металлическая с терморазрывом 100 мм" },
  { name: "Стропило", econom: "Сухая доска 45×190 мм", optimum: "Сухая доска 45×190 мм", max: "Сухая доска 45×190 мм" },
  { name: "Кровля", econom: "Металлочерепица 0.5 мм", optimum: "Металлочерепица 0.5 мм", max: "Металлочерепица 0.5 мм" },
  { name: "Утепление кровли", econom: "Каменная вата 200 мм", optimum: "Каменная вата 200 мм", max: "Каменная вата 250 мм", highlight: "max" },
  { name: "Водостоки", econom: false, optimum: true, max: true, highlight: "optimum" },
  { name: "Снегозадержатели", econom: false, optimum: true, max: true, highlight: "optimum" },
  { name: "Подшив свесов", econom: false, optimum: "Пластиковые софиты", max: "Пластиковые софиты", highlight: "optimum" },
];

interface PackageConfig {
  id: string;
  name: string;
  price: string;
  tagline: string;
  description: string;
  badge?: string;
  energyClass: string;
  energyColor: string;
  wallR: number;
  roofR: number;
  floorR: number;
  wallMm: number;
  roofMm: number;
  floorMm: number;
  highlights: { icon: React.ReactNode; label: string; value: string }[];
  exterior: string;
  interior: string;
  accentColor: string;
}

const packages: PackageConfig[] = [
  {
    id: "econom",
    name: "Эконом",
    price: "от 40 000 ₽/м²",
    tagline: "Базовый тёплый контур",
    description: "Полностью герметичный дом с утеплением 150 мм. Идеален для тех, кто хочет завершить внутреннюю отделку самостоятельно или поэтапно.",
    energyClass: "C",
    energyColor: "#f59e0b",
    wallR: 3.75,
    roofR: 5.0,
    floorR: 5.0,
    wallMm: 150,
    roofMm: 200,
    floorMm: 200,
    exterior: "OSB 12 мм",
    interior: "Без отделки",
    accentColor: "#f59e0b",
    highlights: [
      { icon: <Layers className="w-4 h-4"/>, label: "Стены", value: "150 мм ваты" },
      { icon: <Thermometer className="w-4 h-4"/>, label: "R стен", value: "3.75 м²·К/Вт" },
      { icon: <Layers className="w-4 h-4"/>, label: "Кровля", value: "200 мм ваты" },
      { icon: <Zap className="w-4 h-4"/>, label: "Каркас стен", value: "45×145 мм" },
    ],
  },
  {
    id: "optimum",
    name: "Оптимум",
    price: "от 50 000 ₽/м²",
    tagline: "Золотой стандарт",
    description: "Готовый дом с фасадом и внутренней отделкой. Перекрёстное утепление 200 мм, деревянный интерьер. Самый популярный выбор клиентов.",
    badge: "ХИТ ПРОДАЖ",
    energyClass: "B",
    energyColor: "#22c55e",
    wallR: 5.0,
    roofR: 5.0,
    floorR: 5.0,
    wallMm: 200,
    roofMm: 200,
    floorMm: 200,
    exterior: "Имитация бруса",
    interior: "Имитация бруса",
    accentColor: "#22c55e",
    highlights: [
      { icon: <Layers className="w-4 h-4"/>, label: "Стены", value: "200 мм ваты" },
      { icon: <Thermometer className="w-4 h-4"/>, label: "R стен", value: "5.0 м²·К/Вт" },
      { icon: <Star className="w-4 h-4"/>, label: "Фасад", value: "Имитация бруса" },
      { icon: <Check className="w-4 h-4"/>, label: "Водостоки", value: "В комплекте" },
    ],
  },
  {
    id: "max",
    name: "Максимум",
    price: "от 60 000 ₽/м²",
    tagline: "Премиум энергоэффективность",
    description: "Высший уровень — 250 мм утеплителя, фиброцементный фасад, каркас из доски 45×190 мм. Минимальные потери тепла. Подходит для постоянного проживания.",
    energyClass: "A+",
    energyColor: "#10b981",
    wallR: 6.25,
    roofR: 6.25,
    floorR: 6.25,
    wallMm: 250,
    roofMm: 250,
    floorMm: 250,
    exterior: "Фиброцемент. сайдинг",
    interior: "OSB + Гипсокартон",
    accentColor: "#10b981",
    highlights: [
      { icon: <Layers className="w-4 h-4"/>, label: "Стены", value: "250 мм ваты" },
      { icon: <Thermometer className="w-4 h-4"/>, label: "R стен", value: "6.25 м²·К/Вт" },
      { icon: <Star className="w-4 h-4"/>, label: "Фасад", value: "Фиброцемент НГ" },
      { icon: <Zap className="w-4 h-4"/>, label: "Каркас стен", value: "45×190 мм" },
    ],
  },
];

function RValueBar({ label, value, max = 7 }: { label: string; value: number; max?: number }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className="flex items-center gap-3">
      <div className="text-xs text-muted-foreground w-16 shrink-0">{label}</div>
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>
      <div className="text-xs font-bold text-primary w-12 text-right">{value}</div>
    </div>
  );
}

function WallVisualizer({ mm, color }: { mm: number; color: string }) {
  const layers = [
    { label: "Отделка", w: 14, c: "#9a6830" },
    { label: "OSB", w: 8, c: "#c9a076" },
    { label: "Утеплитель", w: mm * 0.35, c: "#f5c87a" },
    { label: "Парозащита", w: 3, c: "#8ab4d4" },
    { label: "Отделка", w: 10, c: "#d4b896" },
  ];
  const total = layers.reduce((s, l) => s + l.w, 0);
  return (
    <div className="flex items-stretch h-12 rounded-lg overflow-hidden border border-border shadow-sm" style={{ width: "100%" }}>
      {layers.map((l, i) => (
        <div
          key={i}
          className="flex items-center justify-center text-[8px] font-medium text-black/40"
          style={{
            width: `${(l.w / total) * 100}%`,
            background: l.c,
            minWidth: l.label === "Утеплитель" ? 40 : undefined,
          }}
        >
          {l.label === "Утеплитель" ? `${mm} мм` : ""}
        </div>
      ))}
    </div>
  );
}

export function Packages() {
  const [showTable, setShowTable] = useState(false);
  const [activeTab, setActiveTab] = useState("optimum");

  const pkg = packages.find(p => p.id === activeTab)!;

  return (
    <section id="packages" className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            Комплектации
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Выберите свой уровень
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Три тщательно продуманных варианта — от базового тёплого контура до премиального энергоэффективного дома.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-5xl mx-auto mb-12">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-card border border-border shadow-sm rounded-xl mb-0">
            {packages.map(p => (
              <TabsTrigger
                key={p.id}
                value={p.id}
                className="py-3 text-sm sm:text-base md:text-lg rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative"
              >
                {p.name}
                {p.badge && (
                  <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-primary text-white px-2 py-0.5 rounded-full whitespace-nowrap shadow">
                    {p.badge}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {packages.map(p => (
            <TabsContent key={p.id} value={p.id} className="mt-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="bg-card rounded-2xl border border-border shadow-md overflow-hidden mt-4"
                >
                  {/* Header */}
                  <div className="p-6 md:p-8 border-b border-border">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-2xl md:text-3xl font-serif font-bold">{p.name}</h3>
                          {/* Energy class badge */}
                          <div
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-sm font-bold"
                            style={{ background: p.energyColor }}
                          >
                            <Thermometer className="w-3.5 h-3.5"/>
                            Класс {p.energyClass}
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-primary mb-1">{p.tagline}</p>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">{p.description}</p>
                      </div>
                      <div className="md:text-right shrink-0">
                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Стоимость строительства</div>
                        <div className="text-3xl md:text-4xl font-bold text-primary">{p.price}</div>
                        <div className="text-xs text-muted-foreground mt-1">под ключ, включая все работы</div>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Left: specs */}
                    <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-5">Характеристики</h4>

                      {/* Highlights grid */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {p.highlights.map((h, i) => (
                          <div key={i} className="bg-muted/50 rounded-xl p-3">
                            <div className="flex items-center gap-1.5 text-primary mb-1">{h.icon}<span className="text-xs text-muted-foreground">{h.label}</span></div>
                            <div className="text-sm font-bold text-foreground">{h.value}</div>
                          </div>
                        ))}
                      </div>

                      {/* Wall visualizer */}
                      <div className="mb-4">
                        <div className="text-xs text-muted-foreground mb-2 font-medium">Пирог стены — схема в масштабе</div>
                        <WallVisualizer mm={p.wallMm} color={p.accentColor}/>
                      </div>

                      {/* Materials */}
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center py-1.5 border-b border-border/50">
                          <span className="text-muted-foreground">Наружная отделка</span>
                          <span className="font-semibold text-foreground">{p.exterior}</span>
                        </div>
                        <div className="flex justify-between items-center py-1.5 border-b border-border/50">
                          <span className="text-muted-foreground">Внутренняя отделка</span>
                          <span className="font-semibold text-foreground">{p.interior}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: R-value bars */}
                    <div className="p-6 md:p-8">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-5">Тепловые показатели (R, м²·°С/Вт)</h4>

                      <div className="space-y-4 mb-6">
                        <RValueBar label="Стены" value={p.wallR}/>
                        <RValueBar label="Кровля" value={p.roofR}/>
                        <RValueBar label="Пол" value={p.floorR}/>
                      </div>

                      {/* Comparison note */}
                      <div className="bg-muted/50 rounded-xl p-4 mb-4">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Требования норм</div>
                        <div className="space-y-2">
                          {[
                            { label: "СНиП Москва (стены)", norm: 3.13 },
                            { label: "СНиП Москва (кровля)", norm: 4.68 },
                          ].map(({ label, norm }) => (
                            <div key={label} className="flex items-center gap-2 text-xs">
                              <div className="w-2 h-2 rounded-full bg-muted-foreground/40 shrink-0"/>
                              <span className="text-muted-foreground">{label}:</span>
                              <span className="font-semibold">{norm}</span>
                              <span className="text-primary font-bold ml-auto">
                                +{((p.wallR / norm - 1) * 100).toFixed(0)}% к норме
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Energy class visual */}
                      <div className="bg-muted/30 rounded-xl p-4">
                        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Энергетический класс</div>
                        <div className="flex gap-1.5">
                          {["D", "C", "B", "A+"].map((cls, i) => {
                            const isActive = cls === p.energyClass;
                            const colors = ["#ef4444", "#f59e0b", "#22c55e", "#10b981"];
                            return (
                              <div
                                key={cls}
                                className="flex-1 rounded-lg py-2 text-center text-xs font-bold transition-all"
                                style={{
                                  background: isActive ? colors[i] : "transparent",
                                  color: isActive ? "white" : "#94a3b8",
                                  border: `1.5px solid ${isActive ? colors[i] : "#e2e8f0"}`,
                                  transform: isActive ? "scale(1.08)" : "scale(1)",
                                }}
                              >
                                {cls}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center">
          <button
            onClick={() => setShowTable(!showTable)}
            className="text-primary font-medium hover:underline inline-flex items-center gap-2"
          >
            {showTable ? "Скрыть подробное сравнение" : "Показать подробную таблицу сравнения"}
            <motion.svg
              animate={{ rotate: showTable ? 180 : 0 }}
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"/>
            </motion.svg>
          </button>
        </div>

        {showTable && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-8 overflow-x-auto"
          >
            <div className="min-w-[800px] bg-card border border-border rounded-xl shadow-sm overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="w-[250px] font-bold">Характеристика</TableHead>
                    <TableHead className="font-bold text-center">Эконом</TableHead>
                    <TableHead className="font-bold text-center bg-primary/5 text-primary">Оптимум</TableHead>
                    <TableHead className="font-bold text-center">Максимум</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {features.map((f, i) => (
                    <TableRow key={i} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{f.name}</TableCell>
                      <TableCell className={`text-center text-sm ${f.econom === false ? "text-muted-foreground" : ""}`}>
                        {f.econom === false ? <Minus className="w-4 h-4 mx-auto opacity-50"/> :
                         f.econom === true ? <Check className="w-4 h-4 mx-auto text-primary"/> : f.econom}
                      </TableCell>
                      <TableCell className={`text-center text-sm bg-primary/5 ${f.highlight === "optimum" || f.highlight === "all" ? "font-medium text-primary" : ""}`}>
                        {f.optimum === false ? <Minus className="w-4 h-4 mx-auto opacity-50"/> :
                         f.optimum === true ? <Check className="w-4 h-4 mx-auto text-primary"/> : f.optimum}
                      </TableCell>
                      <TableCell className={`text-center text-sm ${f.highlight === "max" || f.highlight === "all" ? "font-medium text-primary" : ""}`}>
                        {f.max === false ? <Minus className="w-4 h-4 mx-auto opacity-50"/> :
                         f.max === true ? <Check className="w-4 h-4 mx-auto text-primary"/> : f.max}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="p-4 text-xs text-muted-foreground text-center bg-muted/20 border-t border-border">
                * Разводка электрики, водоснабжения, отопления и канализации рассчитывается индивидуально. Во всех комплектациях предусмотрены закладные.
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
