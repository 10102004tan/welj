const Container = ({ children,className }) => {
    return (
        <div className={`mx-auto ${className} w-full px-[100px]`}>
            {children}
        </div>
    )
}

export default Container;