import { Link } from "react-router-dom"
import '../../components/styles/buttons.scss'

const Button = ({ label, action, page, isDisabled = false }) => {
    if (action) return (
        <>
            <button disabled={isDisabled} onClick={action} >
                <div className="filled-btn">
                    <div><p>{label}</p></div>
                </div>
            </button>
        </>
    )

    if (page) return (
        <>
            <Link to={page} className="filled-btn">
                <div>
                    <p>{label}</p>
                </div>
            </Link>
        </>
    )

    return <></>
}

export default Button