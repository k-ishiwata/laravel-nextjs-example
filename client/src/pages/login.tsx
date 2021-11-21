import React from 'react'
import type { NextPage } from 'next'
import { Button, Input, InputWrapper, Space, PasswordInput, Container } from '@mantine/core'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAuth } from '@/hooks/auth'
import Head from 'next/head'

const LoginPage: NextPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { login } = useAuth()

    const onSubmit: SubmitHandler<{
        email: string,
        password: string
    }> = data => {
        login(data)
    }

    return (
        <Container size="xs">
            <Head>
                <title>ログイン</title>
            </Head>
            <header>
                <h1>ログイン</h1>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper
                    required
                    label="メールアドレス"
                    error={errors.email?.message}
                >
                    <Input
                        {...register('email', {
                            required: '必ず入力してください。'
                        })}
                        invalid={errors.email !== undefined}
                        defaultValue="admin@example.com"
                    />
                </InputWrapper>
                <Space />
                <PasswordInput
                    {...register('password', {
                        required: '必ず入力してください。'
                    })}
                    label="パスワード"
                    error={errors.password?.message}
                    required
                    defaultValue="123456789"
                />
                <Space />
                <Button type="submit">ログイン</Button>
            </form>
        </Container>
    )
}

export default LoginPage
