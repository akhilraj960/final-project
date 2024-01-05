import React from "react";
import styled from "styled-components";
import { shorttenText } from "../../utils";
import { motion } from "framer-motion";

const ProductCard = ({ image, title, description, price, discountPrice }) => {
  return (
    <CardContainer>
      <CardImage
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: .5 }}
        whileHover={{
          scale: 1.2,
          transition: { duration: .5 },
        }}
        src={image}
        alt={title}
      />
      <OfferTag>-10%</OfferTag>

      <CardContent>
        <Title>{title}</Title>
        <Description>{shorttenText(description, 18)}</Description>
        <PriceContainer>
          {discountPrice ? (
            <>
              <Price>
                <s>${price}</s>
              </Price>
              <DiscountPrice>${discountPrice}</DiscountPrice>
            </>
          ) : (
            <Price>${price}</Price>
          )}
        </PriceContainer>
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  width: 200px;
  margin: 16px;
  position: relative;
`;

const CardImage = styled(motion.img)`
  width: 100%;
  height: 150px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 5px;
`;

const CardContent = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.p`
  margin: 0 0 2px 0;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  color: #334155;
`;

const Description = styled.p`
  font-family: 600;
  text-transform: capitalize;
  font-size: 1.1rem;
  color: black;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Price = styled.p`
  margin: 8px 0;
  font-size: 16px;
  text-align: center;
`;

const DiscountPrice = styled.p`
  margin: 8px 0;
  font-size: 16px;
  color: red;
  text-align: center;
`;

const OfferTag = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 1px 10px;
  color: white;
  border-radius: 15px;
  background-color: #09097c;
`;

export default ProductCard;
