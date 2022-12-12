import { Link } from "react-router-dom"
import '../../components/styles/buttons.scss'

const Button = ({ label, action, page, isDisabled = false }) => {
    if (action) return (
        <>
            <button disabled={isDisabled} onClick={action} className="filled-btn">
                <div>
                    <p>{label}</p>
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