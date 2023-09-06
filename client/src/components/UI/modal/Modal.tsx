import {JSX, FC, ReactNode} from 'react'
import classes from "Modal.module.scss";
import {AnimatePresence, motion} from 'framer-motion'

interface ModalProps {
    visible: boolean
    setVisible: (arg: boolean) => void
    className?: string
    children: JSX.Element | ReactNode
}

const Modal: FC<ModalProps> = ({ children, visible, setVisible, className, ...props }) => {
    const rootClasses = [classes.myModal];

    if (visible) {
        rootClasses.push(classes.active);
    }

    return (
        <AnimatePresence>
            {visible && <motion.div className={rootClasses.join(' ')} {...props}
                        onClick={() => setVisible(false)}>
                <motion.div
                    initial={{
                        opacity: 0,
                        scale: 0.75,
                    }}
                    animate={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                            ease: "easeOut",
                            duration: 0.15
                        }}
                    }
                    exit={{
                        opacity: 0,
                        scale: 0.75,
                        transition: {
                            ease: "easeIn",
                            duration: 0.15
                        },
                    }}
                    className={classes.myModalContent + " " + className}
                    onClick={(e) => e.stopPropagation()}>
                    {children}
                </motion.div>
            </motion.div>
            }
        </AnimatePresence>
    );
};

export default Modal;
