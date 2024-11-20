
import Button from '@mui/joy/Button';

export function SearchBar() {
    return (
        <>
            <div className="mt-12 mb-8 flex justify-center">
                <form
                    className="flex items-center gap-4 bg-gray-100 p-4 rounded-md shadow-md"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSearch();
                        document.querySelectorAll("form input").forEach((input) => (input.value = ""));
                    }}
                >
                    <input
                        placeholder="DEP"
                        className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 uppercase"
                        maxLength={3}
                        onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                    />
                    <input
                        placeholder="ARR"
                        className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 uppercase"
                        maxLength={3}
                        onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                    />
                    <input
                        placeholder="Weight ..."
                        className="border rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500"
                        pattern="\d*"
                    />
                    <Button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Search
                    </Button>
                </form>
            </div>
        </>
    )
}