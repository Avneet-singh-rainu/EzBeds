import React from 'react'
import { BarLoader } from "react-spinners";
export const Spinner = () => {
 return (
   <div className="loader">
     <BarLoader height={5} width={500} />
   </div>
 );
}
