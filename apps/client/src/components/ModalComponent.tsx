import { Modal } from 'antd';
interface modalTypes {
    isModalOpen: boolean
    handleOk: () => void
    handleCancel: () => void
}


export default function ModalComponent({ isModalOpen, handleOk, handleCancel }: modalTypes) {
    return (
        <>
            <Modal
                title="Enter your new offer"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div className="flex flex-col gap-2">
                    <div>
                        <p className='font-bold'>Departure : </p>
                        <input placeholder="Enter departure airport ..." />
                    </div>
                    <div>
                        <p className='font-bold'>Arrival : </p>
                        <input placeholder="Enter airport of destination ..." />
                    </div>
                    <div>
                        <p className='font-bold'>Weight : </p>
                        <input placeholder="Enter chargeable weight ..." />
                    </div>
                    <div>
                        <p className='font-bold'>ETD : </p>
                        <input placeholder="Enter ETD ..." />
                    </div>
                    <div>
                        <p className='font-bold'>ETA :</p>
                        <input placeholder="Enter ETA ..." />
                    </div>
                    <div>
                        <p className='font-bold'>Price :</p>
                        <input placeholder="Enter price of freight ..." />
                    </div>
                </div>
            </Modal>
        </>
    )
}


