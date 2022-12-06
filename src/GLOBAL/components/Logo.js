import '../../GLOBAL/components/styles/LogoSection.scss'
import { logoTextSrc } from "../../utils/assets"

const Logo = (props) => {
    const { w, h } = props
    return (
        <>
            <section className='logo-wrapper'>
                <img
                    src={logoTextSrc}
                    alt="afriplay-logo"
                    style={{ width: w, height: h }}
                />
            </section>
        </>
    )
}

export default Logo