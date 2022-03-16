import { useAppDispatch, useAppSelector } from "../store/hooks/redux";
import { changeTheme } from "../store/reducers/ActionCreators";

export const ToggleButton = () => {
    const dispatch = useAppDispatch();
    const { toggle } = useAppSelector(state => state.appReducer)

    const handleToggle = () => {
        dispatch(changeTheme(!toggle))
    }

    return (
        <div onClick={handleToggle} className={`toggle ${toggle ? '_checked' : ''}`}>
            <div className="toggle__line"></div>
            <div className="toggle__circle"></div>
        </div>
    )
}

