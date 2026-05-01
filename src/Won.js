import { useContext } from "react"
import DataContext from "./context/DataContext";

const Won = () => {
    const {progress} = useContext(DataContext)
    return (
        <>
         { progress === 100 &&
        <div className="card won">
            <h2>Hoera! Je hebt het mysterie opgelost.</h2>
            <p>Maar was het een mannelijk of vrouwelijk mysterie?
                Dat is uiteindelijke de vraag.
                Scan onderstaande QR code voor een hint!
            </p>
            <img src='img/qr-code-won.svg' className="animal"></img>
        </div>}
        </>
    )
}

export default Won
