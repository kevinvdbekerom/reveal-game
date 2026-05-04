import { useContext } from 'react'
import DataContext from './context/DataContext'
import Character from './Character'

const Assignment = ({ scannedAnimal }) => {
    const { animals } = useContext(DataContext)

    return (
        <>
            <p><Character name={animals.find(a => a.id === 1).name} /> &
                <Character name={animals.find(a => a.id === 2).name} /> hebben een
                <Character name={animals.find(a => a.id === 3).name} /> besteld.
                Daar is <Character name={animals.find(a => a.id === 4).name} /> erg blij mee!
                Welke knuffel zou het beste bij de kleine passen;
                <Character name={animals.find(a => a.id === 5).name} />,
                <Character name={animals.find(a => a.id === 6).name} /> of
                <Character name={animals.find(a => a.id === 7).name} />?</p>
            <div className="qr-codes">
                {animals.some(a => a.name === "monkey" && a.active) &&
                    <img src={`${process.env.PUBLIC_URL}/img/qr-code-giraffe.png`} alt="qr-code-giraffe" />
                }
                {scannedAnimal === "giraffe" &&
                    <img src={`${process.env.PUBLIC_URL}/img/qr-code-baby.png`} alt="qr-code-giraffe" />
                }
            </div>
        </>
    )
}

export default Assignment