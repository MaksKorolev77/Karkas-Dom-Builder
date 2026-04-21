import { LeadForm } from "@/components/LeadForm";

export function Contact() {
  return (
    <section className="py-14 md:py-20 bg-muted relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <img 
          src="/images/hero.png" 
          alt="" 
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-card text-foreground rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border border-border">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Готовы обсудить ваш будущий дом?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Оставьте заявку, и наш инженер свяжется с вами для подробной консультации и предварительного расчёта. Это бесплатно и ни к чему не обязывает.
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <LeadForm />
          </div>
        </div>
      </div>
    </section>
  );
}
