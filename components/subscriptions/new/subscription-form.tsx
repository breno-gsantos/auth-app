'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BillingCycle } from "@/lib/generated/prisma/enums"
import { cn } from "@/lib/utils"
import { SubscriptionFormData, subscriptionSchema } from "@/lib/validations/subscription"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { AlertCircleIcon, Calculator, CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar";
import { useForm } from "react-hook-form"
import Link from "next/link"
import { createSubscription } from "@/actions/subscriptions/create-subscription"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

export function SubscriptionForm() {
  const router = useRouter();

  const form = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      name: '',
      price: 0,
      billingCycle: 'MONTHLY',
      category: '',
      renewalDate: new Date(),
      isActive: true
    }
  })

  const { control, handleSubmit, formState, setError, clearErrors, reset } = form;

  const price = form.watch('price');

  const billingCycle = form.watch('billingCycle');
  
  const monthlyCost = billingCycle === 'YEARLY' ? price / 12 : price;
  
  const annualCost = billingCycle === 'MONTHLY' ? price * 12 : price;

  if (price < 0) return null;

  async function onSubmit(values: SubscriptionFormData) {
    try {
      const response = await createSubscription(values);

      if (!response.success) {
        setError('root', {
          type: 'manual',
          message: response.error
        })

        return;
      }

      clearErrors('root')

      toast.success(response.message)
      reset()
      router.push('/subscriptions')
    } catch (error) {
      setError('root', {
        type: 'manual',
        message: 'Erro inesperado no servidor'
      })
    }
  }

  const categories = [
  "Streaming",
  "Música",
  "Produtividade",
  "Jogos",
  "Educação",
];

  return (
    <>
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg">Detalhes da Assinatura</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <FormField control={control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Serviço</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex.: Netflix, Spotify, Youtube Premium..." className="border-border/50 bg-secondary/50" {...field} disabled={formState.isSubmitting} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <FormField control={control} name="price" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preço (R$)</FormLabel>
                          <FormControl>
                            <Input type="number" step='0.01' min='1' placeholder="1,00" className="border-border/50 bg-secondary/50 [appearance:textfield][&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" value={field.value} onChange={(e) => field.onChange(e.target.valueAsNumber)} disabled={formState.isSubmitting} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="space-y-2">
                      <FormField control={control} name="billingCycle" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ciclo de cobrança</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange} disabled={formState.isSubmitting}>
                            <FormControl>
                              <SelectTrigger className="border-border/50 bg-secondary/50">
                                <SelectValue placeholder='Selecione o ciclo' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={BillingCycle.MONTHLY}>
                                Mensal
                              </SelectItem>
                              <SelectItem value={BillingCycle.YEARLY}>
                                Anual
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <FormField control={control} name="category" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <Select value={field.value} onValueChange={field.onChange} disabled={formState.isSubmitting}>
                            <FormControl>
                              <SelectTrigger className="border-border/50 bg-secondary/50">
                                <SelectValue placeholder='Selecione a categoria' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="space-y-2">
                      <FormField control={control} name="renewalDate" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data de Renovação</FormLabel>

                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button variant='outline' className={cn('pl-3 text-left font-normal border-border/50 bg-secondary/50', !field.value && 'text-muted-foreground')} disabled={formState.isSubmitting}>
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Selecione uma Data</span>
                                  )}

                                  <CalendarIcon className="ml-auto size-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>

                            <PopoverContent align="start" className="w-auto p-0">
                              <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={formState.isSubmitting} />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </div>
                </div>
              </div>

              {formState.errors.root && (
                <Alert variant='destructive'>
                  <AlertCircleIcon />
                  <AlertDescription>{formState.errors.root.message}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end gap-3 border-t border-border/50 pt-6">
                <Button variant='outline' type="button" asChild disabled={formState.isSubmitting}>
                  <Link href='/subscriptions'>Cancelar</Link>
                </Button>

                <Button type="submit" disabled={formState.isSubmitting}>
                  {formState.isSubmitting ? 'Criando...' : 'Criar Assinatura'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-linear-to-br from-accent/5 to-transparent backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-accent/10">
              <Calculator className="size-5 text-accent" />
            </div>
            <div>
              <p className="text-sm font-medium">Prévia de Gastos</p>
              <p className="text-sm text-muted-foreground">
                Você pagará aproximadamente {" "}
                <span className="font-semibold text-foreground">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(monthlyCost)}/mês
                </span>{" "} ou {" "}
                <span className="font-semibold text-foreground">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                  }).format(annualCost)}/ano
                </span>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}