'use client'

import { LoginFormData, loginSchema } from "@/lib/validations/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CardWrapper } from "@/components/ui/card-wrapper"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { loginFormData } from "@/constants/data"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { loginAction } from "@/actions/login"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription } from "../ui/alert"
import { AlertCircleIcon } from "lucide-react"

export function LoginForm(){
    const {emailLabel, emailPlaceholder, passwordLabel, passwordPlaceholder} = loginFormData

    const router = useRouter()

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const { control, handleSubmit, formState, setError, clearErrors, resetField, reset } = form;

    async function onSubmit(values: LoginFormData){
        try {
            const response = await loginAction(values);

            if(!response.success){
                setError('root', {
                    type: 'manual',
                    message: response.error || 'Erro ao entrar'
                })

                resetField('password')

                return;
            }

            clearErrors('root')

            toast.success(response.success)
            reset()
            router.push('/dashboard')
        } catch (error) {
            setError('root', {
                type: 'manual',
                message: 'Erro inesperado no servidor'
            })

            resetField('password')
        }
    }

    return (
        <CardWrapper header="Bem-Vindo de volta!" backButtonLabel="Não tem uma conta?" backButtonHref="/register">
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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
                        <Alert variant='destructive'>
                            <AlertCircleIcon />
                            <AlertDescription>
                                {formState.errors.root.message}
                            </AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
                        {formState.isSubmitting ? 'Entrando...' : 'Entrar'}
                    </Button>
                </form>
            </Form>
        </CardWrapper>
    )
}