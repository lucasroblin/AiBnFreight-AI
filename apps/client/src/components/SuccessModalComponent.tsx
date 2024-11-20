import { Modal } from 'antd';
import ConfettiEffect from "./confetti";


interface modalTypes {
    isSuccessModalOpen: boolean;
    handleSuccessOk: () => void;
    handleCancel: () => void;
}

export default function SuccessModalComponent({
    isSuccessModalOpen,
    handleSuccessOk,
    handleCancel,
}: modalTypes) {
    return (
        <>

            <Modal
                title="Great Success"
                open={isSuccessModalOpen}
                onOk={handleSuccessOk}
                onCancel={handleCancel}
            >
                <ConfettiEffect />
                <p>All Gucci big man well played, this offer is about to make some cash #CashIsKing #LiquideAsset #GucciFlipFlop</p>
            </Modal>

        </>
    );
}
