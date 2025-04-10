const Temp = () => {
    return (

        <div className="mt-5 bg-gradient-to-tr from-[#FFB457] to-[#FF705B] p-4 rounded">
            <h2 className="text-lg font-semibold mb-4">Chỉnh sửa podcast scripts</h2>
            <div className="h-full relative overflow-y-auto p-5">
                {
                    data?.scripts.map((script, index) => {
                        const { text, timestamp, idx_hidden = [] } = script
                        return <div data-timestamp={timestamp} key={index} className="flex gap-2 mb-3">
                            <span className="px-2 py-1 bg-white/75 rounded inline-block">{timestamp}</span> :
                            <HighlightMultipleRanges timestamp={timestamp} text={text} ranges={idx_hidden} />
                        </div>
                    })
                }

                {/* <div style={{
                                left: possition.x,
                                top: possition.y,
                                transition: "all 0.3s ease-in-out",
                                display: isMouseUp ? "flex" : "none",
                            }} className="absolute z-[999] gap-2 bg-white px-3 py-1 shadow">
                                <Button className="text-sm" onPress={handleHighlight}>
                                    Đánh dấu
                                </Button>
                                <Button className="text-sm bg-red-600 text-white" onPress={handleHighlight}>
                                    Bỏ đánh dấu
                                </Button>
                            </div> */}
            </div>
        </div>
    )
}