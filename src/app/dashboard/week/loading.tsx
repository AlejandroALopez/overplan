import '../../globals.css';

export default function Loading() {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col items-center justify-center gap-8 bg-white w-full h-full px-6 rounded-sm">
                <div className='big-loading-spinner'/>
                <p className="text-2xl font-medium">Loading Week Progress</p>
            </div>   
        </div>
    )
}