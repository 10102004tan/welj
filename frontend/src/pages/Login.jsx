import DocumentTitle from "../components/DocumentTitle";
import { Controller, useForm } from "react-hook-form";
import PasswordInput from "../components/PasswordInput";
import { Button, Form, Input } from "@heroui/react";
import {login} from "../services/authService";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import AuthLayout from "../layouts/AuthLayout";

const Login = () => {
    const { register, handleSubmit, formState: { errors }, control, setError } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const navigate = useNavigate();
    // const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async(data) => {
        setIsLoading(true);
        setError('root', { message: '' });
        try {
            const response = await login(data);
            if (response) {
                navigate('/');
            }
        } catch (error) {
            setError('root', { message: error.message || 'Lỗi không xác định' });
        }finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <DocumentTitle title="Login" />
            <AuthLayout>
                <div className="flex flex-col gap-2.5 text-center">
                    <h1 className="text-xl font-semibold">Welcome back!</h1>
                    <p className="lg:max-w-[300px] m-auto 4xl:max-w-[unset]">
                        Etiam quis quam urna. Aliquam odio erat, accumsan eu nulla in
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
                    <div className="mb-3">
                        <Controller name="email"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    id="email"
                                    type="email"
                                    label="Email"
                                />
                            )} />
                    </div>
                    <div className="mb-3">
                        <Controller
                            name="password"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <PasswordInput
                                    {...field}
                                    id="password"
                                    label="Password"
                                    isInvalid={errors.password}
                                    error={errors.password}
                                    innerRef={field.ref}
                                    />
                            )} />
                    </div>
                    <Button className="w-full" type="submit" isLoading={isLoading}>
                        Login
                    </Button>
                </form>

                <div>
                    <div className="relative mt-5 mb-5">
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[1px] bg-slate-100" />
                        <span className="flex items-center justify-center relative z-10 w-11 h-[23px] m-auto bg-widget">
                            or
                        </span>
                    </div>
                    <div className="grid grid-cols-1 gap-4 2xs:grid-cols-2 xs:gap-[30px] mt-[30px] mb-9">
                        <Button className="btn btn--social"
                            onPress={() => console.log("Google login")}>
                            Google
                        </Button>
                        <Button className="btn btn--social"
                            onPress={() => console.log("Facebook login")}>
                            Facebook
                        </Button>
                    </div>
                    <div className="flex justify-center gap-2.5 leading-none">
                        <p>Don’t have an account?</p>
                        <button className="text-btn">Sign Up</button>
                    </div>
                </div>

            </AuthLayout>
        </>
    )
}

export default Login;
