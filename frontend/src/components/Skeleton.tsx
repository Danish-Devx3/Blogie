export const Skeleton = () => {
    return <div role="status" className="max-w-xl w-screen animate-pulse p-4 border-b border-slate-200 pb-4">
        <div className="flex">
            <div className="h-4 w-4 bg-gray-200 rounded-full mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            <div className="pl-2 flex justify-center flex-col">
                <div className="h-2 w-20 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[330px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[300px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
        <span className="sr-only">Loading...</span>
    </div>
}