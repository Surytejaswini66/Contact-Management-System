import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Toast = () => {
    const notify = () => toast("Default Notification!");

    return (
        <>
            <ToastContainer />
            <button onClick={notify}>Notify!</button>
        </>
    );
};

export default Toast;
