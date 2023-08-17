import React from 'react';
import classes from "./Modal.module.scss";

function Modal({ children, visible, setVisible, className, ...props }) {
    const rootClasses = [classes.myModal];

    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <div className={rootClasses.join(' ')}
             {...props}
            onClick={() => setVisible(false)}
        >
            <div
                className={classes.myModalContent + " " + className}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};

export default Modal;
