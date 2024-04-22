"use client";

import Link from "next/link";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setStartDate } from "@/lib/store/inputSlice";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function SetDates() {
    const dispatch = useAppDispatch();
    const goal = useAppSelector(state => state.input.goal);
    const weeks = useAppSelector(state => state.input.numWeeks);

    const question = "When do you want to start?";

    // Time variables
    const [day, setDay] = useState<string>(dayjs().format('YYYY-MM-DD'));
    const [endDate, setEndDate] = useState<string>("");

    // Update start and end date
    const changeDayHandler = (date: dayjs.Dayjs | null) => {
        if (date) {
            setDay(dayjs(date).format('YYYY-MM-DD'));
            setEndDate(dayjs(date).add(7 * weeks, 'day').format('dddd, MMM DD'));
        }
    }

    const submitDate = () => {
        dispatch(setStartDate(day));
    }

    useEffect(() => {
        setEndDate(dayjs().add(7 * weeks, 'day').format('dddd, MMM DD'));
    }, [weeks]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <main className="flex min-h-screen flex-col items-center p-8">
                <div className="h-4 w-1/4 bg-primary bg-opacity-25 rounded-3xl">
                    <div className={`h-4 w-3/4 bg-primary rounded-3xl`} />
                </div>
                <p className="text-2xl mt-12">
                    Goal: <span className="font-semibold">{goal}</span>
                </p>
                <p className="text-2xl mt-4">{weeks} weeks</p>
                <p className="text-3xl font-semibold mt-8">{question}</p>
                <div className="flex flex-row gap-8 w-1/2 mt-8">
                    <StaticDatePicker
                        slotProps={{
                            toolbar: {
                                hidden: true,
                            },
                            actionBar: {
                                hidden: true,
                            }
                        }}
                        onChange={(value) => changeDayHandler(value)}
                        disablePast
                        defaultValue={dayjs(day)}
                    />
                    <div className="flex flex-col gap-8 my-4">
                        <p className="text-xl">Start Date: {" "}
                            <span className="font-semibold">{dayjs(day).format('dddd, MMM DD')}</span>
                        </p>
                        <p className="text-xl">Weeks for this plan start every: {" "}
                            <span className="font-semibold">{dayjs(day).format('dddd')}</span>
                        </p>
                        <p className="text-xl">Expected completion by: {" "}
                            <span className="font-semibold">{endDate}</span>
                        </p>
                    </div>
                </div>
                <div className="flex flex-row justify-between my-8 w-1/2">
                    <Link href="/planner/weeks">
                        <button
                            className={`py-4 px-6 border-none rounded-md bg-primary 
                        text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300`}
                        >
                            &lt; Back
                        </button>
                    </Link>
                    <Link href="/planner/review">
                        <button
                            className={`py-4 px-6 border-none rounded-md bg-primary
                        text-white text-xl drop-shadow-lg transition hover:scale-110 duration-300`}
                            onClick={() => submitDate()}
                        >
                            Next &gt;
                        </button>
                    </Link>
                </div>
            </main>
        </LocalizationProvider>

    );
}
