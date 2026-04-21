import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, Minus } from "lucide-react";
import { motion } from "framer-motion";

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

export function Packages() {
  const [showTable, setShowTable] = useState(false);

  return (
    <section id="packages" className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Комплектации
          </h2>
          <p className="text-lg text-muted-foreground">
            Три тщательно продуманных варианта. От базового теплого контура до премиального дома, готового к финишной отделке.
          </p>
        </div>

        <Tabs defaultValue="optimum" className="w-full max-w-4xl mx-auto mb-12">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1 bg-card border border-border shadow-sm rounded-xl">
            <TabsTrigger value="econom" className="py-3 text-sm sm:text-base md:text-lg rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Эконом</TabsTrigger>
            <TabsTrigger value="optimum" className="py-3 text-sm sm:text-base md:text-lg rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Оптимум</TabsTrigger>
            <TabsTrigger value="max" className="py-3 text-sm sm:text-base md:text-lg rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Максимум</TabsTrigger>
          </TabsList>
          
          <div className="mt-8 bg-card rounded-2xl border border-border shadow-md overflow-hidden">
            <TabsContent value="econom" className="p-0 m-0">
              <div className="p-6 sm:p-8 md:p-10 border-b border-border">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold mb-2">Эконом</h3>
                    <p className="text-muted-foreground">Базовый тёплый контур. Идеально для тех, кто хочет завершить отделку самостоятельно.</p>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-sm text-muted-foreground mb-1">Стоимость</div>
                    <div className="text-3xl font-bold text-primary">от 40 000 ₽/м²</div>
                  </div>
                </div>
              </div>
              <div className="bg-muted/40 p-6 sm:p-8 md:p-10">
                <h4 className="font-semibold mb-4">Ключевые особенности:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Наружная отделка: <strong>OSB 12 мм</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Утепление стен: <strong>150 мм</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Каркас: <strong>45x145 мм</strong></span>
                  </li>
                  <li className="flex items-start gap-3 text-muted-foreground">
                    <Minus className="w-5 h-5 shrink-0 mt-0.5" />
                    <span>Без внутренней отделки и покрытия пола</span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="optimum" className="p-0 m-0">
              <div className="p-6 sm:p-8 md:p-10 border-b border-border relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1 rounded-bl-lg">
                  ХИТ ПРОДАЖ
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold mb-2">Оптимум</h3>
                    <p className="text-muted-foreground">Золотая середина цены и набора опций. Улучшенное утепление и готовый фасад.</p>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-sm text-muted-foreground mb-1">Стоимость</div>
                    <div className="text-3xl font-bold text-primary">от 50 000 ₽/м²</div>
                  </div>
                </div>
              </div>
              <div className="bg-muted/40 p-6 sm:p-8 md:p-10">
                <h4 className="font-semibold mb-4">Отличия от комплектации Эконом:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Готовый фасад: <strong>Имитация бруса</strong> (карельский профиль)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Внутренняя отделка: <strong>Имитация бруса</strong> + пол <strong>Фанера 18 мм</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Усиленное утепление: <strong>Перекрестное 150+50=200 мм</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Дополнительно: <strong>Водостоки, снегозадержатели, софиты</strong></span>
                  </li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="max" className="p-0 m-0">
              <div className="p-6 sm:p-8 md:p-10 border-b border-border">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold mb-2">Максимум</h3>
                    <p className="text-muted-foreground">Премиальные материалы и усиленный каркас. Максимальная энергоэффективность.</p>
                  </div>
                  <div className="text-left md:text-right">
                    <div className="text-sm text-muted-foreground mb-1">Стоимость</div>
                    <div className="text-3xl font-bold text-primary">от 60 000 ₽/м²</div>
                  </div>
                </div>
              </div>
              <div className="bg-muted/40 p-6 sm:p-8 md:p-10">
                <h4 className="font-semibold mb-4">Отличия от комплектации Оптимум:</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Премиум фасад: <strong>Фиброцементный сайдинг</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Отделка под чистовую: <strong>OSB + Гипсокартон</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Максимальное утепление: Стены <strong>250 мм</strong>, пол/кровля <strong>250 мм</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span>Усиленный каркас стен: <strong>Доска 45x190 мм</strong></span>
                  </li>
                </ul>
              </div>
            </TabsContent>
          </div>
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
                      
                      <TableCell className={`text-center text-sm ${f.econom === false ? 'text-muted-foreground' : ''}`}>
                        {f.econom === false ? <Minus className="w-4 h-4 mx-auto opacity-50" /> : 
                         f.econom === true ? <Check className="w-4 h-4 mx-auto text-primary" /> : 
                         f.econom}
                      </TableCell>
                      
                      <TableCell className={`text-center text-sm bg-primary/5 ${f.highlight === 'optimum' || f.highlight === 'all' ? 'font-medium text-primary' : ''}`}>
                        {f.optimum === false ? <Minus className="w-4 h-4 mx-auto opacity-50" /> : 
                         f.optimum === true ? <Check className="w-4 h-4 mx-auto text-primary" /> : 
                         f.optimum}
                      </TableCell>
                      
                      <TableCell className={`text-center text-sm ${f.highlight === 'max' || f.highlight === 'all' ? 'font-medium text-primary' : ''}`}>
                        {f.max === false ? <Minus className="w-4 h-4 mx-auto opacity-50" /> : 
                         f.max === true ? <Check className="w-4 h-4 mx-auto text-primary" /> : 
                         f.max}
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
