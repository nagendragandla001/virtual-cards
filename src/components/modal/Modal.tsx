import { useEffect, useRef } from 'react';
import { COLOURS } from '../../lib/Constants';
import { CardState } from '../../lib/Context';
import './Modal.scss';
interface ModalProps {
    onClose: () => void;
    visible: boolean;
    children: any;
}

const Modal = (props: ModalProps): JSX.Element => {
    const { visible, onClose, children } = props;
    const ref = useRef(null as any);

    const {
        state: { selectedCard },
        dispatch,
    } = CardState();

    const handleStartHandler = (clr: string): void => {
        dispatch({ type: "UPDATE_CARD", payload: { colour: clr } });
    }

    const submitCard = (): void => {
        dispatch({ type: "ADD_CARD", payload: selectedCard });
        onClose();
    }

    useEffect(() => {
        if (visible) {
            ref?.current?.classList?.add("visible");
        } else {
            ref?.current?.classList?.remove("visible");
        }
    }, [visible]);



    return (
        <div ref={ref} className="modal-container">
            <div className='modal-body-content'>
                <button onClick={onClose} className="close-btn">
                    X
                </button>
                <h2>Create Virtual Card</h2>
                {children}
                <div className="color-container">
                    {COLOURS.map((clr) => (
                        <span
                            key={clr}
                            className="colour-btn"
                            style={{ background: clr }}
                            draggable
                            onDragStart={() => handleStartHandler(clr)}
                        />
                    ))}
                </div>
                <button className="submit-btn" type="button" onClick={submitCard}>
                    Confirm
                </button>
            </div>
        </div>);
};

export default Modal;
