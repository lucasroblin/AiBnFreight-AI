import { Modal } from 'antd';
import { BaseSyntheticEvent, useState } from 'react';

interface modalTypes {
    isModalOpen: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    isTrue: () => void

}

export default function ModalComponent({
    isModalOpen,
    handleOk,
    handleCancel,
    isTrue
}: modalTypes) {
    const [departureInput, setDepartureInput] = useState('');
    const [arrivalInput, setArrivalInput] = useState('');
    const [weightInput, setWeightInput] = useState(0);
    const [etdInput, setEtdInput] = useState('');
    const [etaInput, setEtaInput] = useState('');
    const [priceInput, setPriceInput] = useState(0);
    const [notesInput, setNotesInput] = useState('');

    // Handle input changes
    const handleChange = (e: BaseSyntheticEvent) => {
        const { name, value } = e.target;
        switch (name) {
            case 'departure':
                setDepartureInput(value);
                break;
            case 'arrival':
                setArrivalInput(value);
                break;
            case 'weight':
                setWeightInput(Number(value)); // Ensure it's a number
                break;
            case 'etd':
                setEtdInput(value);
                break;
            case 'eta':
                setEtaInput(value);
                break;
            case 'price':
                setPriceInput(Number(value)); // Ensure it's a number
                break;
            case 'notes':
                setNotesInput(value);
                break;
            default:
                break;
        }
    };

    function sendOffer(event: BaseSyntheticEvent) {
        event.preventDefault();
        handleOk();
        console.log('Entering sendOffer');
        console.log(departureInput, arrivalInput, weightInput, etdInput, etaInput, priceInput, notesInput);

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        const raw = JSON.stringify({
            departure: departureInput,
            arrival: arrivalInput,
            weight: weightInput,
            etd: etdInput,
            eta: etaInput,
            price: priceInput,
            notes: notesInput,
        });

        const requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('http://localhost:8080/offers', requestOptions)
            .then((response) => {
                if (response.status === 201) {
                    isTrue()
                }
                return response.json()
            })
            .then((result) => console.log(result))
            .catch((error) => console.error('error', error));

    }

    return (
        <>
            <Modal
                title="Enter your new offer"
                open={isModalOpen}
                onOk={sendOffer}
                onCancel={handleCancel}
            >
                <form>
                    <div className="flex flex-col gap-2">
                        <div>
                            <p className="font-bold">Departure : </p>
                            <input
                                value={departureInput}
                                onChange={handleChange}
                                placeholder="Enter departure airport ..."
                                name="departure"
                            />
                        </div>
                        <div>
                            <p className="font-bold">Arrival : </p>
                            <input
                                value={arrivalInput}
                                onChange={handleChange}
                                placeholder="Enter airport of destination ..."
                                name="arrival"
                            />
                        </div>
                        <div>
                            <p className="font-bold">Weight : </p>
                            <input
                                value={weightInput}
                                onChange={handleChange}
                                placeholder="Enter chargeable weight ..."
                                name="weight"
                            />
                        </div>
                        <div>
                            <p className="font-bold">ETD : </p>
                            <input
                                value={etdInput}
                                onChange={handleChange}
                                placeholder="Enter ETD ..."
                                name="etd"
                            />
                        </div>
                        <div>
                            <p className="font-bold">ETA :</p>
                            <input
                                value={etaInput}
                                onChange={handleChange}
                                placeholder="Enter ETA ..."
                                name="eta"
                            />
                        </div>
                        <div>
                            <p className="font-bold">Price :</p>
                            <input
                                value={priceInput}
                                onChange={handleChange}
                                placeholder="Enter price of freight ..."
                                name="price"
                            />
                        </div>
                    </div>
                    <div>
                        <p className="font-bold">Notes :</p>
                        <input
                            value={notesInput}
                            onChange={handleChange}
                            placeholder="Enter a note ..."
                            name="notes"
                        />
                    </div>
                </form>
            </Modal>
        </>
    );
}
