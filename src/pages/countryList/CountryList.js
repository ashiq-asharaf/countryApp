import React, { useEffect, useMemo } from 'react'
import style from './CountryList.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Cards from '../../components/cards/Cards';
import { fetchCountries, loadMore } from '../../features/myCountries/MycountriesSlice';
import CustomSlider from '../../components/customSlider/CustomSlider';


const CountryList = () => {

    const dispatch = useDispatch();
    const { displayedData, status, hasMore  } = useSelector(state => state.countries);

    useEffect(() => {
          dispatch(fetchCountries());
      }, [dispatch]);

      const handleLoadMore = () => {
        dispatch(loadMore());
      };

      const renderedCards = useMemo(() => {
        return displayedData.map((a, index) => (
            <Cards image={a.flag} title={a.name} country={a.region} />
        ));
    }, [displayedData]);


  return (
    <div className={style.mainWrapper}>
        <div className={style.imgContainer}>
        <CustomSlider />
        <div className={style.secondImgContainer} style={{ backgroundImage: `url("https://via.placeholder.com/800x400?text=Image+1")` }} />
        </div>
        <div className={style.cardsWrapper}>
            {renderedCards}
            
        </div>
        {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && 
        <div className={style.btnWrapper}>
            <Button className={style.loadMoreBtn} onClick={handleLoadMore} disabled={!hasMore}>
                Load more
            </Button>
            {status === 'succeeded' && !hasMore && displayedData.length > 0 && (
                <p>No more data to load</p>
            )}
        </div> }

        
    </div>
  )
}

export default CountryList