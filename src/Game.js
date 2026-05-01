import { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DataContext from "./context/DataContext";
import { useNavigate } from 'react-router-dom'

const Game = () => {
    const { animals, setAnimals, resetGame } = useContext(DataContext)
    const [searchParams] = useSearchParams();
    const [scannedAnimal, setScannedAnimal] = useState("")
    const navigate = useNavigate()
    const unlockMap = { tiger: "Sev", monkey: "Kev", baby: "" }

    useEffect(() => {
        const animalFromQR = searchParams.get("animal") || "";
        const currentAnimal = animals.some((animal) => animal.name.toLowerCase() === animalFromQR.toLowerCase()) ? animalFromQR : ""
        const updatedAnimals = animals.map(animal => animal.name.toLowerCase() === currentAnimal.toLowerCase() ? { ...animal, active: true } : animal)
        const newAnimals = moveToFront(updatedAnimals, currentAnimal)
        setAnimals(newAnimals)
        setScannedAnimal(animals[0].name)
        navigate('/reveal-game')
    }, [searchParams])

    const moveToFront = (data, matchingName) => {
        //find the index of the element in the array
        const index = data.findIndex(({ name }) => name === matchingName);
        if (index !== -1) {
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

    const unlocked = (name) => {
        return animals.some((animal) => animal.name.toLowerCase() === name && animal.active) ? "unlocked" : ""
    }

    return (
        <div className="card game">
            <p><b className={unlocked("tiger")}>Sev</b> & <b className={unlocked("monkey")}>Kev</b> hebben een <b className={unlocked("baby")}>baby besteld</b>.
                Daar is <b className={unlocked("dog")}>Nala</b> erg blij mee!
                Welke knuffel zou het beste bij de kleine passen;
                <b className={unlocked("giraffe")}>Giraf</b>,
                <b className={unlocked("panda")}>Panda</b>
                of <b className={unlocked("cat")}>Poes</b>?</p>
            <div className="qr-codes">
                {animals.some(a => a.name === "monkey" && a.active) &&
                    <img src={`${process.env.PUBLIC_URL}/img/qr-code-giraffe.png`} alt="qr-code-giraffe" />
                }
                {scannedAnimal === "giraffe" &&
                    <img src={`${process.env.PUBLIC_URL}/img/qr-code-baby.png`} alt="qr-code-giraffe" />
                }
            </div>

            <div className="animal-queue">
                {animals.map((animal, index) => (
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