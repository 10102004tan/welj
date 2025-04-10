import { addToast, Button, Form, Image, Input } from "@heroui/react";


const Profile = () => {
    return (
        <div className="mt-5 rounded bg-gray-100 p-4">
            <h2 className="text-lg font-semibold mb-4">Thông tin tài khoản</h2>
            <p>Cập nhật đầy đủ thông tin của bạn để có được sự hỗ trợ tốt nhất đến từ WELE bạn nhé.</p>

            <div className="mt-5">
                <div className="flex items-center gap-2">
                    <Image
                        alt="Avatar"
                        className="object-cover"
                        height={80}
                        shadow="md"
                        width={80}
                        src="https://images.unsplash.com/photo-1676142171955-3c2f1a0d9b4d?ixlib=rb-4.0.3&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
                        title="Avatar"
                        radius="full"
                    />
                    <Button className="text-sm bg-red-600 text-white rounded-3xl">
                        Tải ảnh mới
                    </Button>
                </div>

                {/* form */}
                <Form
                    className="w-full max-w-xs flex flex-col gap-4 mt-3"
                >
                    <Input
                        isRequired
                        errorMessage="Please enter a valid username"
                        name="username"
                        placeholder="Enter your username"
                        type="text"
                    />

                    <Input
                        isRequired
                        errorMessage="Please enter a valid email"
                        labelPlacement="outside"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                    />
                    <div className="flex gap-2">
                        <Button className="bg-red-600 text-white" type="submit">
                            Submit
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default Profile;