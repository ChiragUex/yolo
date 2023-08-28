import { useEffect,useState } from 'react';
import previousIcon from "../assets/images/previous.svg"
import nextIcon from "../assets/images/next.svg"
import firstIcon from "../assets/images/firsts.svg"
import lastIcon from "../assets/images/lastIcon.svg"

let pageLimits = 10;

const CustomPagination = (props) => {
    const[active, setActive] = useState(1);
    const[totalPages,setTotalPages] = useState(2);
    const[itemsListed,setItemListed] = useState({
        min:0,
        max:2
    });

    const {pageCount} = props;
    
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
                <li className={number === active ? "activePage" : ""}
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
        <ul className={"pagination_custom"}>
            <li style={{display:'none'}}></li>
            <li className={active === 1 ? 'paginationArrowsInActive' : 'paginationArrowsActive' } onClick={() => handler(1)}><img src={firstIcon} width="15px" height="15px" alt="pagination"/></li>
            <li className={active === 1 ? 'paginationArrowsInActive' : 'paginationArrowsActive' } onClick={() => handler(active === 1 ? 1 : active - 1)}><img src={previousIcon}  width="8px" height="14px" alt="pagination" /></li>
            {itemsListed?.max >= pageLimits && active > pageLimits ? <li onClick={() => handleDots('previous')}>...</li> : null}
            {items.slice(itemsListed?.min,itemsListed?.max)}
            {pageCount > 10 && itemsListed?.min == 0 || itemsListed?.max < pageCount && pageCount > 10 ? <li onClick={() => handleDots('')}>...</li> : null}
            <li className={active === pageCount ? 'paginationArrowsInActive' : 'paginationArrowsActive' } onClick={() => handler(active === pageCount ? pageCount : active + 1)}><img src={nextIcon} width="8px" height="14px" alt="pagination" /></li>
            <li className={active === pageCount ? 'paginationArrowsInActive' : 'paginationArrowsActive' } onClick={() => handler(pageCount)}><img src={lastIcon} width="15px" height="15px" alt="pagination" /></li>
            <li style={{display:'none'}}></li>
        </ul>
    );
}

export default CustomPagination;