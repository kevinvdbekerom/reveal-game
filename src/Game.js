import { useContext, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import DataContext from "./context/DataContext";
import { useNavigate } from 'react-router-dom'
import Assignment from "./Assignment";
import Animals from "./Animals";

const Game = () => {
    const { animals, setAnimals, resetGame } = useContext(DataContext)
    const [searchParams] = useSearchParams();
    const [scannedAnimal, setScannedAnimal] = useState("")
    const navigate = useNavigate()

    // upon relead / scanning
    useEffect(() => {
        // sort on copy to prevent messing up original ordering.
        const correctOrder = animals.map(a => a).sort((a,b) => a.id - b.id).map(x => x.name)
        console.log(correctOrder)

        const animalFromQR = searchParams.get("animal") || "";
        const currentAnimal = animals.some((animal) => animal.name.toLowerCase() === animalFromQR.toLowerCase()) ? animalFromQR : ""
        
        // move to front
        const toFront = moveToFront(animals, currentAnimal)

        // activate scanned animal
        const updatedAnimals = toFront
        .map(animal => animal.name.toLowerCase() === currentAnimal.toLowerCase() ? { ...animal, active: true } : animal)
        
        // update ordering
        const orderedAnimals = updatedAnimals
        .map((animal, index) => correctOrder.indexOf(animal.name) === index && animal.active ? {...animal, inOrder:true} : {...animal, inOrder:false})
        
        setAnimals(orderedAnimals)
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
        console.log(`to-front: ${data.map(a => a.name)}`)
        return data;
    }

    const resetGameLocal = () => {
        setScannedAnimal("")
        resetGame()
    }

    return (
        
        <div className="card game">
            <Assignment scannedAnimal={scannedAnimal}/>
            <Animals scannedAnimal={scannedAnimal}/>

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