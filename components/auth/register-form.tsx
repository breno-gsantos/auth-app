'use client'

import { RegisterFormData, registerSchema } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { registerFormData } from "@/constants/data"
import { registerAction } from "@/actions/register"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "../ui/alert"
import { AlertCircleIcon } from "lucide-react"

export function RegisterForm(){
    const { 
        nameLabel, 
        namePlaceholder, 
        emailLabel, 
        emailPlaceholder, 
        passwordLabel, 
        passwordPlaceholder} = registerFormData

    const router = useRouter();

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const { control, handleSubmit, formState, reset, setError, clearErrors, resetField } = form;

    async function onSubmit(values: RegisterFormData){
        try {
            const response = await registerAction(values);

            if(!response.success){
                setError('root', {
                    type: 'manual',
                    message: response.error || 'Erro ao criar conta'
                })

                resetField('email')
                resetField('password')

                return;
            }

            clearErrors('root')

            toast.success(response.success)
            reset()
            router.push('/login')

        } catch (error) {
            setError('root', {
                type: 'manual',
                message: 'Erro inesperado no servidor'
            })

            resetField('password')
        }
    }

    return (
        <CardWrapper header="Criar uma conta" backButtonLabel="Já tem uma conta?" backButtonHref="/login" showSocial>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <FormField control={control} name='name' render={({field}) => (
                        <FormItem>
                            <FormLabel>{nameLabel}</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder={namePlaceholder} {...field} disabled={formState.isSubmitting} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={control} name='email' render={({field}) => (
                        <FormItem>
                            <FormLabel>{emailLabel}</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder={emailPlaceholder} {...field} disabled={formState.isSubmitting} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    <FormField control={control} name='password' render={({field}) => (
                        <FormItem>
                            <FormLabel>{passwordLabel}</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder={passwordPlaceholder} {...field} disabled={formState.isSubmitting} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />

                    {formState.errors.root && (
                        <Alert variant='destructive' className="bg-rose-200">
                            <AlertCircleIcon />
                            <AlertDescription>
                                {formState.errors.root.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
                        {formState.isSubmitting ? 'Criando conta...' : 'Criar Conta'}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}