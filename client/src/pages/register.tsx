import React, { useState } from 'react'
import type { NextPage } from 'next'
import { Button, Input, InputWrapper, Space, PasswordInput, Container, Group } from '@mantine/core'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useAuth } from '@/hooks/auth'
import Head from 'next/head'

type RegisterSubmit = {
    name: string,
    email: string,
    password: string,
    password_confirmation: string
}

const RegisterPage: NextPage = () => {
    const { register, handleSubmit, formState: { errors }, getValues } = useForm<RegisterSubmit>()
    const [ isButtonLoading, setIsButtonLoading ] = useState(false)
    const { register: userRegister } = useAuth()

    const onSubmit: SubmitHandler<RegisterSubmit> = data => {
        setIsButtonLoading(true)
        userRegister(data)
        window.setTimeout(() => {
            setIsButtonLoading(false)
        }, 1500)
    }

    return (
        <Container size="xs">
            <Head>
                <title>新規ユーザー登録</title>
            </Head>
            <header>
                <h1>新規ユーザー登録</h1>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputWrapper
                    required
                    label="ユーザー名"
                    error={errors.name?.message}
                >
                    <Input
                        {...register('name', {
                            required: '必ず入力してください。'
                        })}
                        invalid={errors.name !== undefined}
                    />
                </InputWrapper>
                <Space h="md" />
                <InputWrapper
                    required
                    label="メールアドレス"
                    error={errors.email?.message}
                >
                    <Input
                        {...register('email', {
                            required: '必ず入力してください。',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'メールアドレスを入力してください。'
                            }
                        })}
                        invalid={errors.email !== undefined}
                    />
                </InputWrapper>
                <Space h="md" />
                <PasswordInput
                    {...register('password', {
                        required: '必ず入力してください。',
                        minLength: {
                            value: 8,
                            message: '8文字以上入力してください。'
                        }
                    })}
                    label="パスワード"
                    error={errors.password?.message}
                    required
                />
                <Space h="md" />
                <PasswordInput
                    {...register('password_confirmation', {
                        required: '必ず入力してください。',
                        min: 8,
                        validate: {
                            match: (value) => getValues('password') === value || '入力したパスワードと一致していません'
                        },
                    })}
                    label="パスワード確認"
                    error={errors.password_confirmation?.message}
                    required
                />
                <Space h="xl" />
                <Group spacing="xs">
                    <Button type="submit" loading={isButtonLoading}>新規登録</Button>
                    <Button component="a" variant="light" color="gray" href="/login">キャンセル</Button>
                </Group>
            </form>
        </Container>
    )
}

export default RegisterPage
