import { IoAirplane } from "react-icons/io5";
import { Card, Drawer } from 'antd';
import { useState } from "react";

function App() {
  const myObj = {
      "departure" : "PVG",
      "arrival" : "YYZ",
      "weight" :  2000,
      "etd" :  "22-11-2024",
      "eta" :  "24-11-2024",
      "price": 9.11
  }
  const [open, setOpen] = useState(false);
  
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
  
      <Drawer title="Offer's Details" onClose={onClose} open={open}>
        <div className="flex flex-col gap-2">
          <p><span className="font-bold">Notes :</span> Air freight from San Francisco International Airport to Hartsfield-Jackson Atlanta International Airport offers secure and timely cargo handling at $6.32/kg. Our professional service ensures your shipment is delivered efficiently, suitable for all clients. <br/> {'\n'}</p>
          <p><span className="font-bold">Departure : </span>{myObj.departure}</p>
          <p><span className="font-bold">Departure : </span></p>
        </div>
      </Drawer>

      <div className="flex flex-col items-center bg-red-400 h-screen justify-center gap-2">

        <Card className="w-fit hover:scale-[102%]  aria-checked:scale-[102%]" onClick={showDrawer}>
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

        <Card className="w-fit hover:scale-[102%]  aria-checked:scale-[102%]" onClick={showDrawer}>
          <div className="flex space-x-4 ">
            <div className="flex gap-1">
              <p>{myObj.arrival}</p>
              <div className="flex items-center"> <IoAirplane /> </div>
              <p>{myObj.departure}</p>
            </div>
            <p>{myObj.weight} Kg</p>
            <p>{myObj.etd}</p>
            <p>{myObj.eta}</p>
            <p>{myObj.price}€/Kg</p>
          </div>
        </Card>

        <Card className="w-fit hover:scale-[102%]  aria-checked:scale-[102%]" onClick={showDrawer}>
          <div className="flex space-x-4 ">
            <div className="flex gap-1">
              <p>{myObj.arrival}</p>
              <div className="flex items-center"> <IoAirplane /> </div>
              <p>{myObj.departure}</p>
            </div>
            <p>{myObj.weight} Kg</p>
            <p>{myObj.etd}</p>
            <p>{myObj.eta}</p>
            <p>{myObj.price}€/Kg</p>
          </div>
        </Card>

        <Card className="w-fit hover:scale-[102%]  aria-checked:scale-[102%]" onClick={showDrawer}>
          <div className="flex space-x-4 ">
            <div className="flex gap-1">
              <p>{myObj.arrival}</p>
              <div className="flex items-center"> <IoAirplane /> </div>
              <p>{myObj.departure}</p>
            </div>
            <p>{myObj.weight} Kg</p>
            <p>{myObj.etd}</p>
            <p>{myObj.eta}</p>
            <p>{myObj.price}€/Kg</p>
          </div>
        </Card>
      </div>
    </>
  )
}

export default App
