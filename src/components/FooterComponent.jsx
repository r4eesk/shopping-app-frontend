import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

export default function FooterComponent() {
  return (
    <MDBFooter bgColor='dark' className='text-center text-lg-left text-white mt-auto'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; 2023 Copyright : 
        
          Raees K
        
      </div>
    </MDBFooter>
  );
}