import { useContext } from "react";
import DataContext from "./context/DataContext";


const Animals = ({ scannedAnimal }) => {
    const { animals } = useContext(DataContext)

    return (
        <div className="animal-queue">
            {animals.map((animal) => (
                animal.active ?
                    <div
                        key={animal.id}
                        className={`animal 
                ${animal.name.toLowerCase() === scannedAnimal.toLowerCase() ? "active" : ""}
            `}>
                        <img src={`${process.env.PUBLIC_URL}/img/${animal.name}.gif`} alt={animal.name} />
                    </div> : <></>
            ))}
        </div>
    )
}

export default Animals