import React, { useCallback, useState, useMemo } from 'react';
import style from './Header.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setFilter } from '../../features/myCountries/MycountriesSlice';

const Header = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.countries.filter);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleFilterClick = (filterType) => {
        dispatch(setFilter(filterType));
        setMenuOpen(false);
    };

    const toggleMenu = useCallback(() => {
        setMenuOpen(prevMenuOpen => !prevMenuOpen);
    }, []);

    const filterClassNames = useMemo(() => ({
        all: filter === "All" ? style.activeType : "",
        asia: filter === "Asia" ? style.activeType : "",
        europe: filter === "Europe" ? style.activeType : ""
    }), [filter]);

    return (
        <div className={style.container}>
            <div className={style.Wrapper}>
                <div>
                    <span className={style.countryTxt}>Countries</span>
                </div>
                <div className={style.headerMenu}>
                    <button className={style.menuIcon} onClick={toggleMenu}>
                        &#9776;
                    </button>
                    <div className={`${style.menu} ${menuOpen ? style.menuOpen : ''}`}>
                        <span
                            className={`${style.cTypeTxt} ${filterClassNames.all}`}
                            onClick={() => handleFilterClick("All")}
                        >
                            All
                        </span>
                        <span
                            className={`${style.cTypeTxt} ${filterClassNames.asia}`}
                            onClick={() => handleFilterClick("Asia")}
                        >
                            Asia
                        </span>
                        <span
                            className={`${style.cTypeTxt} ${filterClassNames.europe}`}
                            onClick={() => handleFilterClick("Europe")}
                        >
                            Europe
                        </span>
                    </div>
                </div>
            </div>
            <div className={style.headerTitleWrapper}>
                <div className={style.borderTop} />
                <div className={style.innerTitleWrapper}>
                    <span className={style.welcomeTxt}>WELCOME</span>
                </div>
                <div className={style.borderBottom} />
            </div>
        </div>
    );
};

export default Header;
