"use client";

import Link from "next/link";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/store";
import { setStartDate } from "@/lib/store/inputSlice";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { DATES_QUESTION } from "@/lib/constants/plannerConstants";

export default function SetDates() {
    const dispatch = useAppDispatch();
    const goal = useAppSelector(state => state.input.goal);
    const weeks = useAppSelector(state => state.input.numWeeks);

    // Time variables
    const [day, setDay] = useState<string>(dayjs().format('MM/DD/YYYY'));
    const [endDate, setEndDate] = useState<string>("");

    // Update start and end date
    const changeDayHandler = (date: dayjs.Dayjs | null) => {
        if (date) {
            setDay(dayjs(date).format('MM/DD/YYYY'));
            setEndDate(dayjs(date).add(7 * weeks, 'day').format('MM/DD/YYYY'));
        }
    }

    const submitDate = () => {
        dispatch(setStartDate(day));
    }

    useEffect(() => {
        setEndDate(dayjs().add(7 * weeks, 'day').format('MM/DD/YYYY'));
    }, [weeks]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <main className="flex min-h-screen flex-col items-center p-8">
                <p className="text-xl sm:text-2xl mt-8 text-center">
                    Goal: <span className="font-semibold">{goal}</span>
                </p>
                <p className="text-xl sm:text-2xl mt-4">{weeks} weeks</p>
                <p className="text-2xl sm:text-3xl text-center font-semibold mt-8">{DATES_QUESTION}</p>
                <div className="flex flex-col md:flex-row md:gap-8 xl:w-1/2 mb-8 md:mb-0 mt-8">
                    <StaticDatePicker
                        slotProps={{
                            toolbar: {
                                hidden: true,
                            },
                            actionBar: {
                                actions: []
                            }
                        }
                        }
                        onChange={(value) => changeDayHandler(value)}
                        disablePast
                        defaultValue={dayjs(day)}
                    />
                    <div className="flex flex-col items-center md:items-start gap-8 my-4">
                        <p className="text-lg sm:text-xl">Start Date: {" "}
                            <span className="font-semibold">{dayjs(day).format('dddd, MMM DD')}</span>
                        </p>
                        <p className="text-lg sm:text-xl">Weeks for this plan start every: {" "}
                            <span className="font-semibold">{dayjs(day).format('dddd')}</span>
                        </p>
                        <p className="text-lg sm:text-xl">Expected completion by: {" "}
                            <span className="font-semibold">{dayjs(endDate).format('dddd, MMM DD')}</span>
                        </p>
                    </div>
                </div>
                <div className="flex flex-row justify-between my-8 w-full lg:w-1/2">
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
