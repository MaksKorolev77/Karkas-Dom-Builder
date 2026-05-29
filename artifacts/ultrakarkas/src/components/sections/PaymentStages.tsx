import { motion } from "framer-motion";
import { FileText, HardHat, Home, Key, ShieldCheck } from "lucide-react";

const stages = [
  {
    num: 1,
    pct: 30,
    icon: FileText,
    title: "Договор и фундамент",
    when: "Старт работ",
    color: "#f57a00",
    lightColor: "#fff7ed",
    borderColor: "#f57a00",
    includes: [
      "Подписание договора с фиксированной сметой",
      "Геологические изыскания участка",
      "Забивка ж/б свай и монтаж ростверка",
      "Нижняя обвязка из бруса 150×150 мм",
    ],
    note: "Оплата после подписания договора — начинаем сразу",
  },
  {
    num: 2,
    pct: 30,
    icon: HardHat,
    title: "Каркас и кровля",
    when: "≈ 2–3 нед от старта",
    color: "#3b82f6",
    lightColor: "#eff6ff",
    borderColor: "#3b82f6",
    includes: [
      "Монтаж несущего каркаса из сухой доски",
      "Стропильная система и обрешётка",
      "Укладка кровельного покрытия",
      "Установка окон и входной двери",
    ],
    note: "Оплачивается перед началом этапа",
  },
  {
    num: 3,
    pct: 30,
    icon: Home,
    title: "Утепление и отделка",
    when: "≈ 5–6 нед от старта",
    color: "#10b981",
    lightColor: "#f0fdf4",
    borderColor: "#10b981",
    includes: [
      "Укладка каменной ваты по всем плоскостям",
      "Монтаж паро- и ветрозащитных мембран",
      "Наружная отделка фасада",
      "Внутренняя обшивка (по комплектации)",
    ],
    note: "Оплачивается перед началом этапа",
  },
  {
    num: 4,
    pct: 10,
    icon: Key,
    title: "Сдача ключей",
    when: "≈ 7–8 нед от старта",
    color: "#8b5cf6",
    lightColor: "#faf5ff",
    borderColor: "#8b5cf6",
    includes: [
      "Финальная уборка и проверка",
      "Передача паспортов на материалы",
      "Обход с приёмкой всех работ",
      "Подписание акта и выдача ключей",
    ],
    note: "Платите только когда полностью довольны результатом",
  },
];

export function PaymentStages() {
  const total = stages.reduce((s, st) => s + st.pct, 0);

  return (
    <section className="py-10 md:py-14 bg-background overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            Удобная оплата
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Поэтапная оплата без риска
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Вы платите только за выполненный и принятый этап. Никакой предоплаты 100% — вы контролируете каждый шаг.
          </p>
        </div>

        {/* Progress bar */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="flex rounded-full overflow-hidden h-4 mb-3 shadow-inner">
            {stages.map((st, i) => (
              <motion.div
                key={st.num}
                initial={{ width: 0 }}
                whileInView={{ width: `${st.pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                className="h-full relative"
                style={{ background: st.color }}
                title={`Этап ${st.num}: ${st.pct}%`}
              >
                {i < stages.length - 1 && (
                  <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-background/30"/>
                )}
              </motion.div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            {stages.map((st) => (
              <div key={st.num} style={{ width: `${st.pct}%`, color: st.color }} className="text-center font-semibold">
                {st.pct}%
              </div>
            ))}
          </div>
        </div>

        {/* Stage cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto">
          {stages.map((st, i) => {
            const Icon = st.icon;
            return (
              <motion.div
                key={st.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Top accent */}
                <div className="h-1.5" style={{ background: st.color }}/>

                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: `${st.color}18` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: st.color }}/>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black" style={{ color: st.color }}>{st.pct}%</div>
                      <div className="text-[10px] text-muted-foreground leading-none">от суммы</div>
                    </div>
                  </div>

                  <div className="mb-1">
                    <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">
                      Этап {st.num} · {st.when}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-3 leading-tight">{st.title}</h3>

                  {/* Includes */}
                  <ul className="space-y-1.5 mb-4">
                    {st.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-muted-foreground leading-snug">
                        <div className="w-1.5 h-1.5 rounded-full mt-1 shrink-0" style={{ background: st.color }}/>
                        {item}
                      </li>
                    ))}
                  </ul>

                  {/* Note */}
                  <div
                    className="rounded-xl p-3 text-xs font-medium leading-snug"
                    style={{ background: `${st.color}12`, color: st.color }}
                  >
                    {st.note}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Guarantee banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-3xl mx-auto mt-8 bg-primary/5 border border-primary/20 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <div className="p-3 rounded-xl bg-primary/10 shrink-0">
            <ShieldCheck className="w-7 h-7 text-primary"/>
          </div>
          <div>
            <div className="font-bold text-foreground mb-1">Финальный платёж — только при приёмке</div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              Последние 10% вы платите только после того, как лично обойдёте дом, проверите каждое соединение и подпишете акт приёмки. Если что-то не устраивает — устраняем за наш счёт до вашего полного удовлетворения.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
