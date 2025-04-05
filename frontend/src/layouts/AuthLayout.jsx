const AuthLayout = ({children}) => {
    return <>
        <div className="flex items-center justify-center w-full">
            <div className="w-full max-w-[450px] px-4 py-8 mx-auto bg-white rounded-lg shadow-md">
                {children}
            </div>
        </div>
    </>
}

export default AuthLayout