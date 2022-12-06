import { useEffect } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from "react-router-dom"
import { COOKIES } from "../../utils/constants"
import { toggleDrawer } from '../redux/slice/drawerSlice'
import './styles/Drawer.scss'

const Drawer = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { showDrawer } = useSelector(state => state.drawer)
    const _hideDrawer = (state) => dispatch(toggleDrawer(state))
    const user_info = COOKIES.get("user_info")

    useEffect(() => {
        console.warn('location changed!')
        _hideDrawer()
    }, [location])

    if (showDrawer) return (<>
        <section className="drawer">
            <div className="drawer-wrapper">
                <span className='close-btn' onClick={() => _hideDrawer(false)}>&times;</span>

                {user_info ? <ul>
                    <li><Link to='/home'>Featured</Link></li>
                    <li><Link to='/movies'>Movies</Link></li>
                    <li><Link to='/series'>Series</Link></li>
                    <li><Link to='/livetv'>Live TV</Link></li>
                    <li><Link to='/afripremiere'>AfriPremiere</Link></li>
                    <li><Link to='/afriplaylive'>Afrilive</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                </ul> : <></>}

                <div className='drawer-content'>
                    <Link to='/select-network'>
                        <button className='btn-filled'>Subscribe</button>
                    </Link>
                    <Link to='/select-network'>
                        <button className='btn-ghost'>Sign In</button>
                    </Link>
                </div>
            </div>
        </section>
    </>
    )

    return <></>
}

export default Drawer