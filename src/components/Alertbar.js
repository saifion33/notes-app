import React, { useContext } from 'react'
import context from '../context/context'
import Alert from './Alert'
const Alertbar = () => {
    const { isAlertOpen } = useContext(context)
    const style = {
        width: '100%',
        height: '3rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: ' 2rem 0',
        position: 'sticky',
        top: '5rem',
        zIndex: 4,
    }

    return (
        <div className="alertbar" style={style}>
            {
                isAlertOpen && <Alert />
            }
        </div>
    )
}

export default Alertbar

