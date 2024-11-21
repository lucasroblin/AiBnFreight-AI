import { Modal } from 'antd'
import { BaseSyntheticEvent, useState } from 'react'

interface modalTypes {
    isModalOpen: boolean
    handleOk: () => void
    handleCancel: () => void
    isTrue: () => void
}

export default function ModalComponent({
    isModalOpen,
    handleOk,
    handleCancel,
    isTrue
}: modalTypes) {
    const [departureInput, setDepartureInput] = useState('')
    const [arrivalInput, setArrivalInput] = useState('')
    const [weightInput, setWeightInput] = useState('')
    const [etdInput, setEtdInput] = useState('')
    const [etaInput, setEtaInput] = useState('')
    const [priceInput, setPriceInput] = useState('')
    const [notesInput, setNotesInput] = useState('')

    const handleChange = (e: BaseSyntheticEvent) => {
        const { name, value } = e.target
        switch (name) {
            case 'departure':
                setDepartureInput(value.toUpperCase().slice(0, 3))
                break
            case 'arrival':
                setArrivalInput(value.toUpperCase().slice(0, 3))
                break
            case 'weight':
                if (!isNaN(Number(value)) || value === '') setWeightInput(value)
                break
            case 'etd':
                setEtdInput(value)
                break
            case 'eta':
                setEtaInput(value)
                break
            case 'price':
                setPriceInput(value)
                break
            case 'notes':
                setNotesInput(value)
                break
            default:
                break
        }
    }

    const sendOffer = (event: BaseSyntheticEvent) => {
        event.preventDefault()
        handleOk()
        console.log('Entering sendOffer')
        console.log(departureInput, arrivalInput, weightInput, etdInput, etaInput, priceInput, notesInput)

        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        const raw = JSON.stringify({
            departure: departureInput,
            arrival: arrivalInput,
            weight: parseFloat(weightInput),
            etd: etdInput,
            eta: etaInput,
            price: parseFloat(priceInput),
            notes: notesInput,
        })

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        }

        fetch('http://localhost:8080/offers', requestOptions)
            .then((response) => {
                if (response.status === 201) {
                    isTrue()
                }
                return response.json()
            })
            .then((result) => console.log(result))
            .catch((error) => console.error('error', error))
    }

    return (
        <>
            <Modal
                title="Enter Your New Offer"
                open={isModalOpen}
                onOk={sendOffer}
                onCancel={handleCancel}
                centered
            >
                <form className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="departure" className="block text-sm font-medium text-gray-700">Departure</label>
                            <input
                                id="departure"
                                name="departure"
                                type="text"
                                value={departureInput}
                                onChange={handleChange}
                                placeholder="DEP"
                                className="w-full rounded-md px-4 py-2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 uppercase"
                                maxLength={3}
                            />
                        </div>
                        <div>
                            <label htmlFor="arrival" className="block text-sm font-medium text-gray-700">Arrival</label>
                            <input
                                id="arrival"
                                name="arrival"
                                type="text"
                                value={arrivalInput}
                                onChange={handleChange}
                                placeholder="ARR"
                                className="w-full rounded-md px-4 py-2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 uppercase"
                                maxLength={3}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
                            <input
                                id="weight"
                                name="weight"
                                type="text"
                                value={weightInput}
                                onChange={handleChange}
                                placeholder="Enter chargeable weight"
                                className="w-full rounded-md px-4 py-2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                id="price"
                                name="price"
                                type="text"
                                value={priceInput}
                                onChange={handleChange}
                                placeholder="Enter price (e.g., 9.33)"
                                className="w-full rounded-md px-4 py-2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="etd" className="block text-sm font-medium text-gray-700">ETD</label>
                            <input
                                id="etd"
                                name="etd"
                                type="text"
                                value={etdInput}
                                onChange={handleChange}
                                placeholder="Enter estimated time of departure"
                                className="w-full rounded-md px-4 py-2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="eta" className="block text-sm font-medium text-gray-700">ETA</label>
                            <input
                                id="eta"
                                name="eta"
                                type="text"
                                value={etaInput}
                                onChange={handleChange}
                                placeholder="Enter estimated time of arrival"
                                className="w-full rounded-md px-4 py-2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                        <textarea
                            id="notes"
                            name="notes"
                            value={notesInput}
                            onChange={handleChange}
                            placeholder="Enter any additional notes"
                            className="w-full rounded-lg px-4 py-2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </form>
            </Modal>
        </>
    )
}
