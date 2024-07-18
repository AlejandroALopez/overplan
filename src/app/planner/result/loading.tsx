import '../../globals.css';

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[80vh] bg-white">
            <div className="flex flex-col items-center justify-center gap-12 bg-white w-full px-6 rounded-sm">
                <div className='big-loading-spinner'/>
                <p className="text-3xl font-medium">Loading Plan</p>
            </div>   
        </div>
    )
}