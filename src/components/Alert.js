import React, { useContext } from 'react'
import context from '../context/context'


const Alert = (props) => {
    const { alertType, alertMessage } = useContext(context)
    const alertBackgroundColor = alertType === 'sucessfull' ? 'rgb(81, 221, 81)' : 'rgb(220,0,0)';
    // Stylesheet
    const style = {
        backgroundColor: alertBackgroundColor,
        padding: '10px',
        borderRadius: '20px',
        zIndex: '5'
    }

    return (
        <div className="alert" style={style}>
            {alertMessage}
        </div>
    )
}

export default Alert
