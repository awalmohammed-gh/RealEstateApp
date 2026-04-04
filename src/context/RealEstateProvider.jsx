import { createContext, useContext, useEffect, useState } from "react";
import { properties } from "../assets/house_data";

const RealEstateContext = createContext();
export const RealEstateProvider = ({ children }) => {
  const [makeOffer, setMakeOffer] = useState([]);



  console.log(makeOffer);

  const realEstateData = {
    properties,
    makeOffer,
    setMakeOffer,
  };
  return (
    <RealEstateContext.Provider value={realEstateData}>
      {children}
    </RealEstateContext.Provider>
  );
};

export const useRealEstate = () => {
  return useContext(RealEstateContext);
};
