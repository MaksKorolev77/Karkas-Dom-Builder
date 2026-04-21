import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Проектирование и договор",
    description: "Согласовываем архитектуру, планировку и состав работ. Фиксируем стоимость, сроки и этапы строительства."
  },
  {
    number: "02",
    title: "Возведение фундамента",
    description: "Выполняем устройство фундамента с учётом типа грунта, нагрузок и особенностей участка."
  },
  {
    number: "03",
    title: "Каркас, кровля и инженерия",
    description: "Собираем силовой каркас, монтируем кровлю, утепляем конструкцию. Монтируем инженерные системы."
  },
  {
    number: "04",
    title: "Отделочные работы",
    description: "Выполняем внутреннюю и внешнюю отделку: от черновых работ до финишного покрытия и фасада."
  },
  {
    number: "05",
    title: "Сдача готового дома",
    description: "Проводим контроль качества, подписываем акт приёма-передачи дома и отдаём Вам ключи."
  }
];

export function Process() {
  return (
    <section className="py-14 md:py-20 bg-muted/40 overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Как мы строим
          </h2>
          <p className="text-lg text-muted-foreground">
            Прозрачный процесс от первой встречи до передачи ключей. Никаких скрытых платежей и задержек.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line for Desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-border -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => {
              const isEven = index % 2 === 1;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative md:h-48 flex flex-col md:flex-row items-center"
                >
                  {/* Number node */}
                  <div className="md:absolute left-1/2 md:-translate-x-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-background border-4 border-primary text-primary font-serif font-bold text-xl z-10 mb-6 md:mb-0 shadow-sm">
                    {step.number}
                  </div>

                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-start md:pl-16 lg:pl-24' : 'md:justify-end md:pr-16 lg:pr-24'} ${isEven ? 'md:ml-auto' : ''}`}>
                    <div className="bg-card p-6 md:p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow relative">
                      {/* Arrow pointer for desktop */}
                      <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-card border-y border-r border-border transform rotate-45 ${isEven ? '-left-2 border-l border-b border-r-0 border-t-0' : '-right-2 border-t border-r border-b-0 border-l-0'}`} />
                      
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
