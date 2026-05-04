import { useContext } from 'react'
import DataContext from './context/DataContext'


const Character = ({name}) => {
    const { animals } = useContext(DataContext)

    const unlocked = (name) => {
        return animals.some((animal) => animal.name.toLowerCase() === name && animal.active)
            ? "unlocked" : ""
    }
    
    const inOrder = (name) => {
        return animals.some(a => a.name.toLowerCase() === name && a.inOrder)
            ? "inOrder" : ""
    }

    const map = {"tiger": "Sev", "monkey": "Kev", "dog": "Nala", "baby": "Baby", "giraffe": "Giraf", "panda": "Panda", "cat": "Poes"}

    return (
        <b className={`${unlocked(name)} ${inOrder(name)}`}> {map[name]}</b>
    )
}

export default Character
