import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const navigate = useNavigate()

    const defaultAnimals = [
        { id: 1, name: "cat", gif: "/gifs/cat.gif", active: false },
        { id: 2, name: "dog", gif: "/gifs/dog.gif", active: false },
        { id: 3, name: "panda", gif: "/gifs/panda.gif", active: false },
        { id: 4, name: "baby", gif: "/gifs/crane.gif", active: false },
        { id: 5, name: "monkey", gif: "/gifs/crane.gif", active: false },
        { id: 6, name: "giraffe", gif: "/gifs/crane.gif", active: false },
        { id: 7, name: "tiger", gif: "/gifs/crane.gif", active: false },
    ]

    const [progress, setProgress] = useState(() => {
        const stored = parseInt(localStorage.getItem("progress"))
        console.log(`stored: ${stored}`)
        return stored ? stored : 0
    })

    const [animals, setAnimals] = useState(() => {
        const stored = localStorage.getItem("animals")
        return stored ? JSON.parse(stored) : defaultAnimals
    });

    const resetGame = () => {
        localStorage.removeItem("animals")
        localStorage.removeItem("progress")
        setProgress(0)
        setAnimals(defaultAnimals)
        navigate('/')
    }


    function countCorrectPositions(objects, orderedList, key = "name") {
        const unlocked = objects.filter((animal) => animal.active)
        console.log(unlocked)
        const length = Math.min(unlocked.length, orderedList.length);

        let count = 0;

        for (let i = 0; i < length; i++) {
            if (unlocked[i][key] === orderedList[i]) {
                count++;
            }
        }

        return count;
    }

    useEffect(() => {
        const correctOrder = ["tiger", "monkey", "baby", "dog", "giraffe", "panda", "cat"]

        localStorage.setItem("animals", JSON.stringify(animals))
        const animalProgress = Math.round(((animals.filter((animal) => animal.active)).length / animals.length) * 50)
        const orderingProgress = Math.round((countCorrectPositions(animals, correctOrder) / correctOrder.length) * 50)
        console.log(animalProgress)
        console.log(`ordering: ${orderingProgress}`)
        setProgress(animalProgress + orderingProgress)
    }, [animals])

    useEffect(() => {
        console.log(progress)
        localStorage.setItem("progress", progress.toString())
    }, [progress])

    return (
        <DataContext.Provider value={{
            progress,
            setProgress,
            animals,
            setAnimals,
            navigate,
            resetGame,
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext

