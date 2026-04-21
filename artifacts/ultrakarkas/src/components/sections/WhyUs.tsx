import { motion } from "framer-motion";
import { ShieldCheck, Zap, Maximize, Key, Clock, CheckCircle } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Прочный несущий каркас",
    description: "Используем только сухую строганную доску камерной сушки. Каркас не ведёт и не крутит со временем."
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Энергоэффективность",
    description: "Перекрестное утепление от 200 мм исключает мостики холода. Зимой тепло, летом прохладно."
  },
  {
    icon: <Maximize className="w-8 h-8 text-primary" />,
    title: "Продуманные планировки",
    description: "Каждый квадратный метр используется с пользой. Никаких темных коридоров и тесных комнат."
  },
  {
    icon: <Key className="w-8 h-8 text-primary" />,
    title: "Строительство под ключ",
    description: "От фундамента до розеток. Вы получаете готовый дом, в который можно заезжать и жить."
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "Фиксированные сроки",
    description: "Точный график работ прописан в договоре. Строим в среднем от 2 до 6 месяцев."
  },
  {
    icon: <CheckCircle className="w-8 h-8 text-primary" />,
    title: "Контроль качества",
    description: "Технадзор принимает каждый скрытый этап работ с фотоотчетом для заказчика."
  }
];

export function WhyUs() {
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Почему выбирают нас
          </h2>
          <p className="text-lg text-muted-foreground">
            Строим дома, в которых хочется жить. Без компромиссов в качестве материалов и соблюдении технологий.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
