import { MDBCarousel,MDBCarouselItem } from "mdb-react-ui-kit";

const ProductImageCarousel = ({image}) => {
  
  return (
    
    <div>
      <img src={image}
         alt="product " className="img-fluid p-5" />
        {/*<MDBCarousel showControls showIndicators>
      <MDBCarouselItem
        className="w-100 d-block"
        itemId={1}
        src="https://rukminim2.flixcart.com/image/832/832/knyxqq80/dslr-camera/r/y/x/digital-camera-eos-m50-mark-ii-eos-m50-mark-ii-canon-original-imag2gzkexzqhyhu.jpeg?q=70"
        alt="..."
      />
      <MDBCarouselItem
        className="w-100 d-block"
        itemId={2}
        src="https://rukminim2.flixcart.com/image/832/832/knyxqq80/dslr-camera/r/y/x/digital-camera-eos-m50-mark-ii-eos-m50-mark-ii-canon-original-imag2gzkexzqhyhu.jpeg?q=70"
        alt="..."
      />
      <MDBCarouselItem
        className="w-100 d-block"
        itemId={3}
        src="https://rukminim2.flixcart.com/image/832/832/knyxqq80/dslr-camera/r/y/x/digital-camera-eos-m50-mark-ii-eos-m50-mark-ii-canon-original-imag2gzkexzqhyhu.jpeg?q=70"
        alt="..."
      />
    </MDBCarousel>*/}
    </div>
    
  );
};

export default ProductImageCarousel;
