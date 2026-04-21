import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Введите ваше имя"),
  phone: z.string().min(10, "Введите корректный телефон"),
  area: z.string({
    required_error: "Выберите желаемую площадь",
  }),
  package: z.string().optional(),
  comment: z.string().optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Необходимо согласие на обработку данных" }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface LeadFormProps {
  defaultPackage?: string;
  defaultComment?: string;
  onSuccess?: () => void;
}

export function LeadForm({ defaultPackage, defaultComment, onSuccess }: LeadFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      area: "",
      package: defaultPackage || "",
      comment: defaultComment || "",
      consent: true,
    },
  });

  function onSubmit(data: FormValues) {
    console.log("Form submitted:", data);
    setIsSubmitted(true);
    if (onSuccess) {
      setTimeout(onSuccess, 3000);
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center space-y-4 animate-in fade-in zoom-in duration-500">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="font-serif text-2xl text-foreground">Заявка отправлена!</h3>
        <p className="text-muted-foreground">
          Менеджер свяжется с вами в течение рабочего дня.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Имя*</FormLabel>
                <FormControl>
                  <Input placeholder="Иван Иванов" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Телефон*</FormLabel>
                <FormControl>
                  <Input placeholder="+7 (999) 000-00-00" type="tel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Желаемая площадь*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите площадь" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="до 100">до 100 м²</SelectItem>
                    <SelectItem value="100-150">100–150 м²</SelectItem>
                    <SelectItem value="150-200">150–200 м²</SelectItem>
                    <SelectItem value="200-250">200–250 м²</SelectItem>
                    <SelectItem value="250+">250+ м²</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="package"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Комплектация</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите комплектацию" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="эконом">Эконом</SelectItem>
                    <SelectItem value="оптимум">Оптимум</SelectItem>
                    <SelectItem value="максимум">Максимум</SelectItem>
                    <SelectItem value="подскажите">Подскажите вы</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Комментарий</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Опишите ваши пожелания, наличие участка и т.д." 
                  className="resize-none"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="consent"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md py-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-sm font-normal text-muted-foreground">
                  Отправляя форму, даю согласие на обработку моих персональных данных.{" "}
                  <a href="/privacy" target="_blank" rel="noreferrer" className="underline hover:text-primary transition-colors">
                    Политика конфиденциальности
                  </a>
                </FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" className="w-full text-lg h-14">
          Получить расчёт
        </Button>
      </form>
    </Form>
  );
}
