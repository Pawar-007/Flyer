import React from "react";
import "./spinner.css"
const Spinner = () => {
   return (
     <div className="spinner-container">
       <div className="spinner-grow" role="status">
         <span className="visually-hidden">Loading...</span>
       </div>
     </div>
   );
 };
 
 const SkeletonLoader = () => (
   <div className="skeleton-loader">
     <div className="skeleton-card"></div>
     <div className="skeleton-card"></div>
     <div className="skeleton-card"></div>
   </div>
 );
 
 const LoadingOverlay = () => (
   <div className="loading-overlay">
     <p>Loading...</p>
   </div>
 );

 const AnimatedLoader = () => (
   <div className="animated-loader">
     <div className="loading-icon"></div>
   </div>
 );
 
export {Spinner,SkeletonLoader,LoadingOverlay,AnimatedLoader};