import { Avatar, Button, Card, CardBody,Image } from "@heroui/react"
import { Link } from "react-router-dom"

const CardPodcast = ({ podcast }) => {
    const { title, published_at, thumbnail, description, authorId: { fullname, email }, _id } = podcast
    return (
        <Card
            isBlurred
            className="border-none bg-background/60"
            shadow="sm"
        >
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4">
                        <Image
                            className="w-full max-h-[120px] object-cover rounded-md"
                            src={thumbnail}
                            alt="Album cover"
                        />
                    </div>

                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-0">
                                <Link to={`/podcasts/${_id}`} className="text-foreground/90 hover:text-foreground/100 transition-all duration-200 ease-in-out">
                                    <h3 className="font-semibold text-foreground/90">{title}</h3>
                                </Link>
                                <p className="text-sm font-medium mt-2">{description.substring(0, 100)}...</p>
                                <div className="text-small text-foreground/80 flex items-center gap-2 mt-2">
                                    <Avatar
                                        alt="Avatar"
                                        className="object-cover"
                                        size="sm"
                                        src={thumbnail}
                                        title="Avatar"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-sm text-foreground/90">{fullname}</h4>
                                        <h5 className="text-sm">{email}</h5>
                                    </div>
                                </div>
                            </div>
                            <Button
                                isIconOnly
                                className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"
                                radius="full"
                                variant="light"
                                onPress={() => setLiked((v) => !v)}
                            >
                            </Button>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default CardPodcast