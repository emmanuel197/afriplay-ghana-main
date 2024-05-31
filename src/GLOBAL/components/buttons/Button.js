import { Link } from "react-router-dom";
import "../../components/styles/buttons.scss";
import { selectedMovieReducer } from "../../redux/slice/moviesSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { playIcon } from "../../../utils/assets";

const Button = ({ label, action, page, isDisabled = false, selectedMovie }) => {
  const dispatch = useDispatch();

  if (page) dispatch(selectedMovieReducer(selectedMovie));

  if (action)
    return (
      <>
        <button disabled={isDisabled} onClick={action} className="filled-btn">
          <div>
            <p> {label}</p>
          </div>
        </button>
      </>
    );

  if (page)
    return (
      <>
        <Link to={page} className={`filled-btn ${playIcon ? "with-icon" : ""}`}>
          <div className="align-content">
            <img src={playIcon} alt="Play Icon"></img>
            <p> {label}</p>
          </div>
        </Link>
      </>
    );

  return <></>;
};

export default Button;
