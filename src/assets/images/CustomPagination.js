import { useEffect, useMemo, useState } from 'react';
import TranTableStyles from "../styles/Transactiontable.module.css";
import Image from 'next/image';
import previousIcon from "../public/images/image_png/previous.svg"
import nextIcon from "../public/images/image_png/next.svg"
import firstIcon from "../public/images/image_png/firsts.svg"
import lastIcon from "../public/images/image_png/lastIcon.svg"

let pageLimits = 10;

const CustomPagination = (props) => {
    const [active, setActive] = useState(1);
    const[totalPages,setTotalPages] = useState(15);
    const[itemsListed,setItemListed] = useState({
        min:0,
        max:10
    });

    const {gameRecord ,pageCount, transactionRecord} = props;
    
    useEffect(()=>{
        setTotalPages(pageCount);
    },[pageCount])


    const handler = (value) => {
        setActive(value)
        props.handler(value)
    }

    let items = [];
    if(pageCount){
        for (let number = 1; number <= pageCount; number++) {
            items.push(
                <li className={number === active ? TranTableStyles.active : ""}
                    key={number}
                    onClick={() => handler(number)}>
                    {number}
                </li>
            );
        }
    }

    const handleDots = (type) => {
        if(type === 'previous'){
            setActive(itemsListed?.min - 9);
        }
        else{
            setActive(itemsListed?.max + 1);
        }
    }

      useEffect(() => {
        props.handler(active)
        if(active > itemsListed?.max){
            setItemListed({min: itemsListed?.max,max: itemsListed?.max + pageLimits })
        }
        else if(active <= itemsListed?.min){ 
            setItemListed({min: itemsListed?.min - pageLimits,max: itemsListed?.min })
        }
      },[active,itemsListed])


    return (
        <ul className={TranTableStyles.pagination_custom}>
            <li style={{display:'none'}}></li>
            <li className={active === 1 ? 'paginationArrowsInActive' : 'paginationArrowsActive' } onClick={() => handler(1)}><Image src={firstIcon} width="15px" height="15px" alt="pagination"/></li>
            <li className={active === 1 ? 'paginationArrowsInActive' : 'paginationArrowsActive' } onClick={() => handler(active === 1 ? 1 : active - 1)}><Image src={previousIcon}  width="8px" height="14px" alt="pagination" /></li>
            {itemsListed?.max >= pageLimits && active > pageLimits ? <li onClick={() => handleDots('previous')}>...</li> : null}
            {items.slice(itemsListed?.min,itemsListed?.max)}
            {pageCount > 10 && itemsListed?.min == 0 || itemsListed?.max < pageCount && pageCount > 10 ? <li onClick={() => handleDots('')}>...</li> : null}
            <li className={active === pageCount ? 'paginationArrowsInActive' : 'paginationArrowsActive' } onClick={() => handler(active === pageCount ? pageCount : active + 1)}><Image src={nextIcon} width="8px" height="14px" alt="pagination" /></li>
            <li className={active === pageCount ? 'paginationArrowsInActive' : 'paginationArrowsActive' } onClick={() => handler(pageCount)}><Image src={lastIcon} width="15px" height="15px" alt="pagination" /></li>
            <li style={{display:'none'}}></li>
        </ul>
    );
}

export default CustomPagination;