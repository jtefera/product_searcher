import React from 'react';
const style = {
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
    position: 'fixed',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1600,
    width: '100%',
    height: '100%',
    margin: 0,
    backgroundColor: 'white',
    padding: '0 24px 24px',
    overflowY: 'scroll',    
};

const FullWidth = (props) => {
    return (
        <div style={style}>
            {props.children}
        </div>
    );
}

export default FullWidth;
