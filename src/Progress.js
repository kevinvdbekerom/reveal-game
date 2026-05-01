import { useContext } from 'react'
import DataContext from './context/DataContext'

const Progress = () => {
    const { progress } = useContext(DataContext)
    return (

        <div className="card progress-container">
            <h2>The Big Reveal Game!</h2>
            <div className="progress-bar">


                <div className="progress-fill"
                    style={
                        {
                            width: `${progress}%`
                        }}>
                    <span className="progress-text">
                        {progress > 0 ? `${progress}%` : ""}
                    </span>

                </div>


            </div>
        </div>

    )
}

export default Progress