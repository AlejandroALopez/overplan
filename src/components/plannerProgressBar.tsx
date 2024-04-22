
interface ProgressBarProps {
    step: number,
}

export default function PlannerProgressBar(props: ProgressBarProps) {

    return (
        <div className="h-4 w-1/4 bg-primary bg-opacity-25 rounded-3xl">
            <div className={`h-4 w-${props.step}/4 bg-primary rounded-3xl`}/>
        </div>
    );
}