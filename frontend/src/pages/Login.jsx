import DocumentTitle from "../components/DocumentTitle";
import AuthLayout from "../layouts/AuthLayout";
import LoginForm from "../components/Form/LoginForm";

const Login = () => {

    return (
        <>
            <DocumentTitle title="Login" />
            <AuthLayout>
                <div className="bg-gradient-to-tr from-[#3F2B96] to-[#A8C0FF] p-[40px] rounded-lg max-w-[500px] min-w-[400px]">
                    <div className="flex flex-col gap-2.5 text-center">
                        <h1 className="text-xl font-semibold">Welcome back!</h1>
                        <p className="lg:max-w-[300px] m-auto 4xl:max-w-[unset]">
                            Etiam quis quam urna. Aliquam odio erat, accumsan eu nulla in
                        </p>
                    </div>
                    <LoginForm />
                </div>
            </AuthLayout>
        </>
    )
}

export default Login;
