import { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DataContext from "./context/DataContext";
import { useNavigate } from 'react-router-dom'

const Game = () => {
    const { animals, setAnimals, resetGame } = useContext(DataContext)
    const [searchParams] = useSearchParams();
    const [scannedAnimal, setScannedAnimal] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        const animalFromQR = searchParams.get("animal") || "";
        const currentAnimal = animals.some((animal) => animal.name.toLowerCase() === animalFromQR.toLowerCase()) ? animalFromQR : ""
        const updatedAnimals = animals.map(animal => animal.name.toLowerCase() === currentAnimal.toLowerCase() ? { ...animal, active: true } : animal)
        const newAnimals = moveToFront(updatedAnimals, currentAnimal)
        setAnimals(newAnimals)
        setScannedAnimal(animals[0].name)
        navigate('/')
    }, [searchParams])

    const moveToFront = (data, matchingName) => {
        //find the index of the element in the array
        const index = data.findIndex(({name}) => name === matchingName);
        if(index !== -1) {
            //if the matching element is found, 
            const updatedData = [...data];
            //then remove that element and use `unshift`
            updatedData.unshift(...updatedData.splice(index, 1));
            return updatedData;
        }
        //if the matching element is not found, then return the same array
        return data;
    }

    const resetGameLocal = () => {
        setScannedAnimal("")
        resetGame()
    }

    return (
        <div className="card game">
            <p><b>Sev</b> & <b>Kev</b> hebben een <b>baby besteld</b>. Daar is <b>Nala</b> erg blij mee! Welke knuffel zou het beste bij de kleine passen; <b>Giraf</b>, <b>Panda</b> of <b>Poes</b>?</p>
            <div className="animal-queue">
                {animals.map((animal, index) => (
                    animal.active ?
                    <div
                        key={animal.id}
                        className={`animal 
                ${animal.name.toLowerCase() === scannedAnimal.toLowerCase() ? "active" : ""}
            `}
                    >
                        <img src={`img/${animal.name}.gif`} alt={animal.name} />
                    </div> : <></>
                ))}
            </div>

            <div className="active-animal">
                <span>Currently scanned</span>
                <strong>{scannedAnimal}</strong>
            </div>

            <button
                onClick={resetGameLocal}
                className="new-game-btn"
            >
                New Game
            </button>
        </div>
    );
}


export default Game