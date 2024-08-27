import React from 'react';
import './styles.scss'

const Loading = () => {
    return (
        <div className="loading">
            <div className="backdrop"/>
            <div style={{display: 'flex', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'}}>
                <div className="modal">
                    <div className="loader"/>
                </div>
            </div>
        </div>
    );
}

export default Loading;