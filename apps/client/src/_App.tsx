import { IoAirplane } from "react-icons/io5";
import { Card, Drawer, Button, FloatButton, Modal } from 'antd';
import { useState } from "react";

function App() {
  const myObj = {
    "departure": "PVG",
    "arrival": "YYZ",
    "weight": 2000,
    "etd": "22-11-2024",
    "eta": "24-11-2024",
    "price": 9.11
  }
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };



  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };



  return (
    <>

      <Drawer title="Offer's Details" onClose={onClose} open={open}>
        <div className="flex flex-col gap-2">
          <p><span className="font-bold">Notes :</span> Air freight from San Francisco International Airport to Hartsfield-Jackson Atlanta International Airport offers secure and timely cargo handling at $6.32/kg. Our professional service ensures your shipment is delivered efficiently, suitable for all clients. <br /> {'\n'}</p>
          <p><span className="font-bold">Departure : </span>{myObj.departure}</p>
          <p><span className="font-bold">Arrival : </span>{myObj.arrival}</p>
          <p><span className="font-bold">Offer's weight : </span>{myObj.weight}</p>
          <p><span className="font-bold">ETD : </span>{myObj.etd}</p>
          <p><span className="font-bold">ETA : </span>{myObj.eta}</p>
          <p><span className="font-bold">Price : </span>{myObj.price}€/Kg</p>
          <p><span className="font-bold">Available weight : </span></p>
        </div>
        <div className="flex justify-center ">
          <Button type="primary" color="danger">Book Offer</Button>
        </div>
      </Drawer>

      <div className="flex flex-col items-center bg-red-400 h-screen justify-center gap-2">

        <Card className="w-fit hover:scale-[102%] text-xl" onClick={showDrawer}>
          <div className="flex space-x-4 ">
            <div className="flex gap-1">
              <p>{myObj.departure}</p>
              <div className="flex items-center"> <IoAirplane /> </div>
              <p>{myObj.arrival}</p>
            </div>
            <p>{myObj.weight} Kg</p>
            <p>{myObj.etd}</p>
            <p>{myObj.eta}</p>
            <p>{myObj.price}€/Kg</p>
          </div>
        </Card>

        <Card className="w-fit hover:scale-[102%] text-xl" onClick={showDrawer}>
          <div className="flex space-x-4 ">
            <div className="flex gap-1">
              <p>{myObj.departure}</p>
              <div className="flex items-center"> <IoAirplane /> </div>
              <p>{myObj.arrival}</p>
            </div>
            <p>{myObj.weight} Kg</p>
            <p>{myObj.etd}</p>
            <p>{myObj.eta}</p>
            <p>{myObj.price}€/Kg</p>
          </div>
        </Card>

        <Card className="w-fit hover:scale-[102%] text-xl" onClick={showDrawer}>
          <div className="flex space-x-4 ">
            <div className="flex gap-1">
              <p>{myObj.departure}</p>
              <div className="flex items-center"> <IoAirplane /> </div>
              <p>{myObj.arrival}</p>
            </div>
            <p>{myObj.weight} Kg</p>
            <p>{myObj.etd}</p>
            <p>{myObj.eta}</p>
            <p>{myObj.price}€/Kg</p>
          </div>
        </Card>

        <Card className="w-fit hover:scale-[102%] text-xl" onClick={showDrawer}>
          <div className="flex space-x-4 ">
            <div className="flex gap-1">
              <p>{myObj.departure}</p>
              <div className="flex items-center"> <IoAirplane /> </div>
              <p>{myObj.arrival}</p>
            </div>
            <p>{myObj.weight} Kg</p>
            <p>{myObj.etd}</p>
            <p>{myObj.eta}</p>
            <p>{myObj.price}€/Kg</p>
          </div>
        </Card>

        <Card className="w-fit hover:scale-[102%] text-xl" onClick={showDrawer}>
          <div className="flex space-x-4 ">
            <div className="flex gap-1">
              <p>{myObj.departure}</p>
              <div className="flex items-center"> <IoAirplane /> </div>
              <p>{myObj.arrival}</p>
            </div>
            <p>{myObj.weight} Kg</p>
            <p>{myObj.etd}</p>
            <p>{myObj.eta}</p>
            <p>{myObj.price}€/Kg</p>
          </div>
        </Card>
      </div>

      <FloatButton className="hover:scale-[120%] font-bold" tooltip={<div>Create a new offer</div>} description="New Offer" shape="circle" style={{ insetInlineEnd: 94 }} onClick={showModal} />
      <Modal title="Enter your new offer" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className="flex flex-col gap-">
          <div>
            <p>Departure : </p>
            <input placeholder="Enter departure airport ..."></input>
          </div>
          <div>
            <p>Arrival : </p>
            <input placeholder="Enter airport of destination ..."></input>
          </div>
          <div>
            <p>Weight : </p>
            <input placeholder="Enter chargeable weigth ..."></input>
          </div>
          <div>
            <p>ETD : </p>
            <input placeholder="Enter ETD ..."></input>
          </div>
          <div>
            <p>ETA :</p>
            <input placeholder="Enter ETA ..."></input>
          </div>
          <div>
            <p>Price :</p>
            <input placeholder="Enter price of freight ..."></input>
          </div>
        </div>

      </Modal>

    </>
  )
}

export default App
