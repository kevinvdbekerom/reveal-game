import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

const DataContext = createContext({})

export const DataProvider = ({ children }) => {

    const navigate = useNavigate()

    const defaultAnimals = [
        { id: 7, name: "cat", gif: "/gifs/cat.gif", active: false },
        { id: 4, name: "dog", gif: "/gifs/dog.gif", active: false },
        { id: 6, name: "panda", gif: "/gifs/panda.gif", active: false },
        { id: 3, name: "baby", gif: "/gifs/crane.gif", active: false },
        { id: 2, name: "monkey", gif: "/gifs/crane.gif", active: false },
        { id: 5, name: "giraffe", gif: "/gifs/crane.gif", active: false },
        { id: 1, name: "tiger", gif: "/gifs/crane.gif", active: false },
    ]

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // random ordering of specific parts in the puzzle text.
    const randomizeGame = (array) => {
        const sevKev = shuffle([1, 2])
        const stuffedAnimals = shuffle([5, 6, 7])
        const randomized = array.map(a => ["tiger", "monkey"].includes(a.name) ? { ...a, id: sevKev.pop() } :
           ["giraffe", "panda", "cat"].includes(a.name) ? { ...a, id: stuffedAnimals.pop() } : a)
        return randomized
    }

    const [progress, setProgress] = useState(() => {
        const stored = parseInt(localStorage.getItem("progress"))
        console.log(`stored: ${stored}`)
        return stored ? stored : 0
    })

    const [animals, setAnimals] = useState(() => {
        const stored = localStorage.getItem("animals")
        return stored ? JSON.parse(stored) : randomizeGame(defaultAnimals)
    });

    const resetGame = () => {
        localStorage.removeItem("animals")
        localStorage.removeItem("progress")
        setProgress(0)
        setAnimals(randomizeGame(defaultAnimals))
        navigate('/reveal-game')
    }

    useEffect(() => {
        localStorage.setItem("animals", JSON.stringify(animals))
        const animalProgress = Math.round(((animals.filter((animal) => animal.active)).length / animals.length) * 50)
        const orderingProgress = Math.round(((animals.filter(a => a.inOrder)).length / animals.length) * 50)
        setProgress(animalProgress + orderingProgress)
    }, [animals])

    useEffect(() => {
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

