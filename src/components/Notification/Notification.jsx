import "./Notification.css"

const Notification = ({msg,errorColor}) => {
    return (
        <div className="notification" style={{color:`${errorColor}`,border:`2px solid ${errorColor}`}}>
            {`${msg}`}
        </div>
    )
}

export default Notification;