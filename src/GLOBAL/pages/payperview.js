import Header from "../components/Header"
import "../components/styles/payPerView.scss"

const PayPerView = () => {
    return (
        <div>
            <Header links={5} />
            <div className="pay-per-view-main">
                <div className="page-label">PAY-PER-VIEW</div>
            </div>
        </div>
    )
}

export default PayPerView