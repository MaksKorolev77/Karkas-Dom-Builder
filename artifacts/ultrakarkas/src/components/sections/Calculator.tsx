import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";

const prices = {
  econom: 40000,
  optimum: 50000,
  max: 60000
};

export function Calculator() {
  const [area, setArea] = useState<number>(100);
  const [pkg, setPkg] = useState<"econom" | "optimum" | "max">("optimum");

  const price = area * prices[pkg];
  const formattedPrice = new Intl.NumberFormat('ru-RU').format(price);

  return (
    <section id="calculator" className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-card rounded-3xl border border-border shadow-xl overflow-hidden max-w-5xl mx-auto flex flex-col md:flex-row">
          
          <div className="p-8 md:p-12 w-full md:w-3/5">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
              Калькулятор стоимости
            </h2>
            <p className="text-muted-foreground mb-10">
              Выберите площадь и комплектацию, чтобы узнать примерную стоимость строительства вашего будущего дома.
            </p>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="font-semibold text-lg">Площадь дома: <span className="text-primary">{area} м²</span></label>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="300" 
                  step="5"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>50 м²</span>
                  <span>300 м²</span>
                </div>
              </div>

              <div>
                <label className="font-semibold text-lg mb-4 block">Комплектация</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(["econom", "optimum", "max"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPkg(p)}
                      className={`py-3 px-4 rounded-xl border transition-all ${
                        pkg === p 
                          ? "border-primary bg-primary/5 text-primary font-medium" 
                          : "border-border bg-background hover:border-primary/30"
                      }`}
                    >
                      {p === "econom" ? "Эконом" : p === "optimum" ? "Оптимум" : "Максимум"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-muted/40 border-l border-border p-8 md:p-12 w-full md:w-2/5 flex flex-col justify-center">
            <div className="text-muted-foreground mb-2 font-medium text-sm md:text-base">Примерная стоимость:</div>
            <div className="text-4xl md:text-5xl font-bold font-serif mb-2 text-primary leading-none">
              ~ {formattedPrice} ₽
            </div>
            <div className="text-sm text-muted-foreground mb-8">
              {prices[pkg].toLocaleString('ru-RU')} ₽ за квадратный метр
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full text-base md:text-lg h-14">
                  Получить точный расчёт
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] w-[95vw]">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl">Обсудить проект</DialogTitle>
                  <DialogDescription>
                    Вы выбрали комплектацию «{pkg === "econom" ? "Эконом" : pkg === "optimum" ? "Оптимум" : "Максимум"}» на {area} м². Оставьте контакты для уточнения деталей.
                  </DialogDescription>
                </DialogHeader>
                <LeadForm 
                  defaultPackage={pkg === "econom" ? "эконом" : pkg === "optimum" ? "оптимум" : "максимум"} 
                  defaultComment={`Интересует дом площадью ${area} м².`} 
                />
              </DialogContent>
            </Dialog>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              Не является публичной офертой. Итоговая стоимость зависит от особенностей проекта и участка.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
