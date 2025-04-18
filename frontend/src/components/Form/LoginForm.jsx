import { Controller, useForm } from "react-hook-form";
import PasswordInput from "../PasswordInput";
import { Button, Form, Input } from "@heroui/react";
import {login} from "../../services/authService";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../../store/useStoreAuth";
const LoginForm = () => {
    const { register, handleSubmit, formState: { errors }, control, setError } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    });
    const {setIsAuthenticated} = useAuthStore()
    const navigate = useNavigate();
    // const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async(data) => {
        setIsLoading(true);
        setError('root', { message: '' });
        try {
            const response = await login(data);
            if (response) {
                setIsAuthenticated(true);
                navigate('/');
            }
        } catch (error) {
            setError('root', { message: error.message || 'Lỗi không xác định' });
        }finally {
            setIsLoading(false);
        }
    };
    return <>

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
            <Button className="w-full border" type="submit" isLoading={isLoading}>
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
    </>
}

export default LoginForm