import { Link, useLocation } from "react-router-dom";
import "../../components/styles/buttons.scss";
import { selectedMovieReducer } from "../../redux/slice/moviesSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { playIcon, active } from "../../../utils/assets";

const Button = ({ label, action, page, isDisabled = false, selectedMovie, className }) => {
  const dispatch = useDispatch();
  const location = useLocation()
  if (page) dispatch(selectedMovieReducer(selectedMovie));

  if (action)
    return (
      <>
        <button disabled={isDisabled} onClick={action} className={`filled-btn  ${className}`}>
          <div>
            <p> {label}</p>
          </div>
        </button>
      </>
    );

  if (page)
    return (
      <>
        <Link to={page} className={`filled-btn  ${className} ${playIcon ? "with-icon" : ""}`}>
          <div className="align-content">
            {location.pathname !== "/" && <img src={playIcon} alt="Play Icon"></img>}
            <p> {label}</p>
          </div>
        </Link>
      </>
    );

  return <></>;
};

export default Button;
