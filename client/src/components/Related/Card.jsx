import React, { useState, useEffect, createContext, useContext } from 'react';
import RelatedItemsAndComp from './RelatedItemsAndComp.jsx';
import styles from '../../styles/Related/related.css';
import RelatedProductsList from './RelatedProductsList.jsx';
import YourOutfitList from './YourOutfitList.jsx';
import axios from 'axios';
import ComparisonModal from './ComparisonModal.jsx'
import CardStarRating from './CardStarRating.jsx'
import CardPictureDisplay from './CardPictureDisplay.jsx';
import { ProductContext } from '../../contexts/product-info.context.jsx';

const Card = ({relatedProduct, deleteOutfit}) => {
  const { productID: PID, setProductID } = useContext(ProductContext);
  const [productStyle, setStyle] = useState([]);
  const [isOpen, setIsOpen] = useState(false)
  const [ratings, setRatings] = useState({})
  const [isHover, setIsHover] = useState(false)

  //API Call Data
  const productID = relatedProduct.id
  const baseURI = process.env.BASE_URI;
  const config =  {
    headers: {
    'Authorization': process.env.GITHUB_TOKEN
    }
  }

  useEffect(()=>{
    getProductStyles();
    getReviews();
  },[relatedProduct])

  const getProductStyles = async () => {
    if (productID) {
      return await axios.get(`${baseURI}products/${productID}/styles`, config)
      .then(styles => {
        setStyle(styles.data.results)
      })
    }
  }

  const getReviews = async () => {
    if (productID) {
      return await axios.get(`${baseURI}reviews/meta/?product_id=${productID}`, config)
      .then(rating => {
        setRatings(rating.data.ratings)
      })
    }
  }

  // const changeCurrProd = () => {
  //   setProductID(productID);
  //   window.scroll({
  //     top: 0,
  //     left: 0,
  //     behavior: 'smooth',
  //   })
  // }

  if (productStyle[0]) {
    return (
      <div className='card-container' onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <div className='card-media'>
            <CardPictureDisplay productStyle={productStyle}
                                onOpen={() => setIsOpen(true)}
                                open={isOpen}
                                deleteOutfit={deleteOutfit}
                                relatedProduct={relatedProduct}
                                hover={isHover}/>
          <ComparisonModal open={isOpen}
                           onClose={() => setIsOpen(false)}
                           relatedProduct={relatedProduct}/>
        </div>
          <div className='card-content'>
            <div className='card-prod-name'>{relatedProduct.name}</div>
            <div className='card-price'>${relatedProduct.default_price}</div>
            <div className='card-category'>{relatedProduct.category}</div>
            <CardStarRating ratings={ratings}/>
          </div>
      </div>
    )
  }
}

export default Card;