import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@heroui/react";


const PasswordInput = ({ innerRef, id, label = 'Password', className, isInvalid, ...props }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = e => {
        e.preventDefault();
        setIsPasswordVisible(!isPasswordVisible);
    }

    useEffect(() => {
        props.value === '' && setIsPasswordVisible(false);
    }, [props.value]);

    return (
        <Input
            className={className}
            endContent={
                <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={togglePasswordVisibility}
                >
                    {isPasswordVisible ? (
                        <Eye />
                    ) : (
                        <EyeOff />
                    )}
                </button>
            }
            {...props}
            id={id}
            type={isPasswordVisible ? "text" : "password"}
            label={label}
            ref={innerRef}
        />
    )
}

export default PasswordInput