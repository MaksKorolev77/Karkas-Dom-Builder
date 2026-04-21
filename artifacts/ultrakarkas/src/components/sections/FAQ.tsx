import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "Какой фундамент нужен для каркасного дома?",
    a: "В большинстве случаев подбирается свайный или свайно-ростверковый фундамент. Конкретное решение зависит от геологии участка и параметров дома."
  },
  {
    q: "Можно ли строить зимой?",
    a: "Да. Каркасная технология позволяет вести большинство работ круглый год при соблюдении технологии монтажа. Отсутствие мокрых процессов делает зимнюю стройку безопасной."
  },
  {
    q: "Сколько времени занимает строительство?",
    a: "Срок зависит от площади, архитектуры и комплектации. В среднем строительство занимает от 2 до 6 месяцев от забивки первой сваи до сдачи ключей."
  },
  {
    q: "Можно ли изменить планировку под себя?",
    a: "Да, мы можем адаптировать любой типовой проект или разработать индивидуальное решение с нуля, учитывая ваши пожелания и особенности участка."
  }
];

export function FAQ() {
  return (
    <section className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 max-w-6xl mx-auto">
          <div className="w-full md:w-1/3">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
              Частые<br/>вопросы
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Собрали ответы на самые популярные вопросы о строительстве каркасных домов.
            </p>
          </div>
          
          <div className="w-full md:w-2/3">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-border">
                  <AccordionTrigger className="text-lg font-semibold text-left hover:text-primary py-6">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
