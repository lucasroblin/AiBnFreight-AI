
import Button from '@mui/joy/Button';
import { useRef } from 'react';

interface SearchBarType {
    filterFlights: (departure: string, arrival: string, weight: string) => void
}
export function SearchBar({ filterFlights }: SearchBarType) {
    const departureRef = useRef<HTMLInputElement>(null)
    const arrivalRef = useRef<HTMLInputElement>(null)
    const weightRef = useRef<HTMLInputElement>(null)

    return (
        <>
            <div className="mt-12 mb-8 flex justify-center">
                <div
                    className="flex items-center gap-4 bg-gray-100 p-4 rounded-md shadow-md"
                >
                    <input
                        ref={departureRef}
                        placeholder="DEP"
                        className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 uppercase"
                        maxLength={3}
                        onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                    />
                    <input
                        ref={arrivalRef}
                        placeholder="ARR"
                        className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 uppercase"
                        maxLength={3}
                        onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                    />
                    <input
                        ref={weightRef}
                        placeholder="Weight ..."
                        className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        pattern="\d*"
                    />
                    <Button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                        onClick={async () => {
                            filterFlights(
                                departureRef.current?.value || "",
                                arrivalRef.current?.value || "",
                                weightRef.current?.value || "",
                            )
                        }}
                    >
                        Search
                    </Button>
                </div>
            </div>
        </>
    )
}