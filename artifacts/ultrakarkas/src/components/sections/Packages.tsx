import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Minus, Layers, Star, Droplets, Flame, Wind, Zap } from "lucide-react";
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
  { name: "Окна", econom: "ПВХ 70 Рехау", optimum: "ПВХ 70 Рехау", max: "ПВХ 70 Рехау" },
  { name: "Дверь", econom: "Металлическая с терморазрывом 100 мм", optimum: "Металлическая с терморазрывом 100 мм", max: "Металлическая с терморазрывом 100 мм" },
  { name: "Стропило", econom: "Сухая доска 45×190 мм", optimum: "Сухая доска 45×190 мм", max: "Сухая доска 45×190 мм" },
  { name: "Кровля", econom: "Металлочерепица 0.5 мм", optimum: "Металлочерепица 0.5 мм", max: "Металлочерепица 0.5 мм" },
  { name: "Утепление кровли", econom: "Каменная вата 200 мм", optimum: "Каменная вата 200 мм", max: "Каменная вата 250 мм", highlight: "max" },
  { name: "Водостоки", econom: false, optimum: true, max: true, highlight: "optimum" },
  { name: "Снегозадержатели", econom: false, optimum: true, max: true, highlight: "optimum" },
  { name: "Подшив свесов", econom: false, optimum: "Пластиковые софиты", max: "Пластиковые софиты", highlight: "optimum" },
];

interface WallLayer { label: string; w: number; color: string; }

function MiniWallPie({ layers }: { layers: WallLayer[] }) {
  const total = layers.reduce((s, l) => s + l.w, 0);
  return (
    <div className="flex items-stretch h-10 rounded-lg overflow-hidden border border-border/60 w-full">
      {layers.map((l, i) => (
        <div
          key={i}
          className="flex items-center justify-center text-[7px] font-bold text-black/30 relative group"
          style={{ width: `${(l.w / total) * 100}%`, background: l.color, minWidth: 6 }}
          title={`${l.label} ${l.w}мм`}
        >
          {l.w >= 50 && <span className="absolute inset-0 flex items-center justify-center text-[8px] text-black/40">{l.w}</span>}
        </div>
      ))}
    </div>
  );
}

const packageData = {
  econom: {
    id: "econom",
    name: "Эконом",
    price: "от 40 000 ₽/м²",
    tagline: "Базовый тёплый контур",
    description: "Полностью герметичный дом с утеплением 150 мм — готов к самостоятельной финишной отделке. Экономия на старте, завершение по собственному графику.",
    badge: null as string | null,
    wallMm: 150,
    wallLayers: [
      { label: "OSB", w: 12, color: "#d4b896" },
      { label: "Мембрана", w: 6, color: "#8ab4d4" },
      { label: "Вата", w: 150, color: "#f5c87a" },
      { label: "Пароизоляция", w: 4, color: "#60a5fa" },
      { label: "OSB", w: 9, color: "#dcc898" },
    ] as WallLayer[],
    perks: [
      { icon: Layers, text: "Каркас 45×145 мм — несущая конструкция дома" },
      { icon: Wind, text: "Ветрозащита Tyvek — без продувания снаружи" },
      { icon: Flame, text: "Каменная вата 150 мм — не горит, не гниёт" },
      { icon: Droplets, text: "Пароизоляция — стены не намокают изнутри" },
    ],
    materials: [
      { label: "Фасад", value: "OSB-3 12 мм (под отделку)" },
      { label: "Утепление стен", value: "Каменная вата 150 мм" },
      { label: "Утепление пола", value: "Каменная вата 200 мм" },
      { label: "Утепление кровли", value: "Каменная вата 200 мм" },
      { label: "Интерьер", value: "Без отделки" },
    ],
  },
  optimum: {
    id: "optimum",
    name: "Оптимум",
    price: "от 50 000 ₽/м²",
    tagline: "Готов к жизни сразу",
    description: "Полностью отделанный дом — заезжай и живи. Деревянный фасад, деревянный интерьер, перекрёстное утепление 200 мм. Самый популярный выбор клиентов.",
    badge: "ХИТ ПРОДАЖ",
    wallMm: 200,
    wallLayers: [
      { label: "Имит. бруса", w: 20, color: "#a0784a" },
      { label: "Вент. зазор", w: 8, color: "#e8e0d4" },
      { label: "Мембрана", w: 4, color: "#8ab4d4" },
      { label: "OSB", w: 9, color: "#d4b896" },
      { label: "Вата", w: 200, color: "#f5c87a" },
      { label: "Паро", w: 4, color: "#60a5fa" },
      { label: "Зазор", w: 40, color: "#f0ece4" },
      { label: "Дерево", w: 15, color: "#c9a876" },
    ] as WallLayer[],
    perks: [
      { icon: Star, text: "Имитация бруса снаружи — готовый фасад" },
      { icon: Layers, text: "Перекрёстный каркас — нет мостиков холода" },
      { icon: Flame, text: "Каменная вата 200 мм — вдвое теплее Эконом" },
      { icon: Check, text: "Водостоки и снегозадержатели в комплекте" },
    ],
    materials: [
      { label: "Фасад", value: "Имитация бруса (карельский профиль)" },
      { label: "Утепление стен", value: "Каменная вата 200 мм (перекрёстный)" },
      { label: "Утепление пола", value: "Каменная вата 200 мм" },
      { label: "Утепление кровли", value: "Каменная вата 200 мм" },
      { label: "Интерьер", value: "Имитация бруса + пол фанера 18 мм" },
    ],
  },
  max: {
    id: "max",
    name: "Максимум",
    price: "от 60 000 ₽/м²",
    tagline: "Премиум материалы",
    description: "Максимальное утепление 250 мм, негорючий фиброцементный фасад, усиленный каркас 45×190 мм. Минимальные теплопотери, максимальный ресурс.",
    badge: null as string | null,
    wallMm: 250,
    wallLayers: [
      { label: "Фиброцемент", w: 8, color: "#7a8898" },
      { label: "Вент. зазор", w: 8, color: "#e8e0d4" },
      { label: "Мембрана", w: 4, color: "#8ab4d4" },
      { label: "OSB", w: 12, color: "#d4b896" },
      { label: "Вата", w: 250, color: "#f5c87a" },
      { label: "Паро", w: 4, color: "#60a5fa" },
      { label: "Зазор", w: 50, color: "#f0ece4" },
      { label: "ГКЛ", w: 21, color: "#e8e8e8" },
    ] as WallLayer[],
    perks: [
      { icon: Flame, text: "Фиброцемент НГ — негорючий, 50+ лет службы" },
      { icon: Layers, text: "Каркас 45×190 мм — усиленная конструкция" },
      { icon: Zap, text: "Каменная вата 250 мм — рекордное утепление" },
      { icon: Star, text: "OSB + ГКЛ — идеально под любую отделку" },
    ],
    materials: [
      { label: "Фасад", value: "Фиброцементный сайдинг (НГ)" },
      { label: "Утепление стен", value: "Каменная вата 250 мм (перекрёстный)" },
      { label: "Утепление пола", value: "Каменная вата 250 мм" },
      { label: "Утепление кровли", value: "Каменная вата 250 мм" },
      { label: "Интерьер", value: "OSB + Гипсокартон (под чистовую)" },
    ],
  },
};

type PkgId = "econom" | "optimum" | "max";

export function Packages() {
  const [showTable, setShowTable] = useState(false);
  const [activeTab, setActiveTab] = useState<PkgId>("optimum");

  const pkg = packageData[activeTab];

  return (
    <section id="packages" className="py-10 md:py-14 bg-muted/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-7 md:mb-10">
          <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            Комплектации
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Выберите свой уровень
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Три варианта — от базового тёплого контура до премиального дома под ключ.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as PkgId)} className="w-full max-w-5xl mx-auto mb-12">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-card border border-border shadow-sm rounded-xl">
            {(["econom", "optimum", "max"] as PkgId[]).map((id) => {
              const p = packageData[id];
              return (
                <TabsTrigger
                  key={id}
                  value={id}
                  className="py-3 text-sm sm:text-base md:text-lg rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground relative"
                >
                  {p.name}
                  {p.badge && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] font-bold bg-primary text-white px-2 py-0.5 rounded-full shadow whitespace-nowrap">
                      {p.badge}
                    </span>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {(["econom", "optimum", "max"] as PkgId[]).map((id) => (
            <TabsContent key={id} value={id} className="mt-4">
              <AnimatePresence mode="wait">
                {activeTab === id && (
                  <motion.div
                    key={id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="bg-card rounded-2xl border border-border shadow-md overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-6 md:p-8 border-b border-border bg-gradient-to-r from-muted/30 to-transparent">
                      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                        <div className="flex-1">
                          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-1">{pkg.name}</h3>
                          <p className="text-sm font-bold text-primary mb-2">{pkg.tagline}</p>
                          <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">{pkg.description}</p>
                        </div>
                        <div className="md:text-right shrink-0">
                          <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">Стоимость</div>
                          <div className="text-3xl md:text-4xl font-bold text-primary">{pkg.price}</div>
                          <div className="text-xs text-muted-foreground mt-1">под ключ, включая все работы</div>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className="grid grid-cols-1 md:grid-cols-2">
                      {/* Left: wall visualizer + materials */}
                      <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-border">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Пирог стены в масштабе</h4>
                        <MiniWallPie layers={pkg.wallLayers}/>

                        <div className="flex items-center justify-between mt-2 mb-5 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400 inline-block"/>Улица</span>
                          <span className="font-bold text-foreground">{pkg.wallMm} мм утеплителя</span>
                          <span className="flex items-center gap-1">Жильё<span className="w-2 h-2 rounded-full bg-orange-400 inline-block"/></span>
                        </div>

                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">Материалы</h4>
                        <div className="space-y-1.5">
                          {pkg.materials.map((m) => (
                            <div key={m.label} className="flex items-center justify-between py-1.5 border-b border-border/40 last:border-0">
                              <span className="text-xs text-muted-foreground">{m.label}</span>
                              <span className="text-xs font-semibold text-foreground text-right ml-4">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: perks */}
                      <div className="p-6 md:p-8">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">Что получаете</h4>
                        <div className="space-y-3">
                          {pkg.perks.map((perk, i) => {
                            const Icon = perk.icon;
                            return (
                              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors">
                                <div className="p-1.5 rounded-lg bg-primary/10 shrink-0">
                                  <Icon className="w-4 h-4 text-primary"/>
                                </div>
                                <span className="text-sm text-foreground leading-snug">{perk.text}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Insulation thickness visual comparison */}
                        <div className="mt-5 bg-muted/30 rounded-xl p-4">
                          <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-3">
                            Толщина утеплителя стен
                          </div>
                          <div className="flex items-end gap-2 h-16">
                            {[
                              { label: "Эконом", mm: 150, active: id === "econom" },
                              { label: "Оптимум", mm: 200, active: id === "optimum" },
                              { label: "Максимум", mm: 250, active: id === "max" },
                            ].map((bar) => {
                              const pct = (bar.mm / 250) * 100;
                              return (
                                <div key={bar.label} className="flex-1 flex flex-col items-center gap-1">
                                  <div className="text-[10px] font-bold text-foreground">{bar.mm} мм</div>
                                  <motion.div
                                    className="w-full rounded-t-md"
                                    style={{
                                      height: `${pct * 0.52}px`,
                                      background: bar.active ? "#f57a00" : "#e2e8f0",
                                      opacity: bar.active ? 1 : 0.5,
                                    }}
                                    layoutId={`bar-${bar.label}`}
                                  />
                                  <div className={`text-[9px] ${bar.active ? "text-primary font-bold" : "text-muted-foreground"}`}>
                                    {bar.label}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          ))}
        </Tabs>

        <div className="text-center">
          <button
            onClick={() => setShowTable(!showTable)}
            className="text-primary font-medium hover:underline inline-flex items-center gap-2"
          >
            {showTable ? "Скрыть подробное сравнение" : "Показать полную таблицу сравнения"}
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
