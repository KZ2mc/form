import Base from "./Base";
import "./All.css";

const Residential: React.FC = () => {
  return (
    <Base>
      <div className="stripe-blue">
        <div className="content-div px-5 narrow">
          <h1>Residential Moving</h1>

          <div className="text-start">
            <div className="text-center">
              <img
                className="framed-image regular-image"
                src="src/img/kz2-moving-company-local-moving.png"
                alt="residential move"
              />
            </div>

            <p>
              Moving to a new home is an exciting milestone, but it can also be overwhelming. At
              KZ2, we specialize in residential moving services to ensure a seamless transition to
              your new space. Our experienced team of movers is equipped with all the necessary
              tools and materials to handle your move with utmost care and efficiency.
            </p>
            <p>
              When moving day comes, our dedicated movers will arrive at your doorstep in a large,
              shiny truck ready to tackle the task at hand. If you require assistance with packing,
              our skilled professionals will delicately wrap your fragile items in protective paper
              and bubble wrap, ensuring their safety throughout the journey. They will then expertly
              pack everything into sturdy boxes, taking the stress out of organizing your
              belongings.
            </p>
            <p>
              Our team is also well-versed in handling furniture and other bulky items. If needed,
              we will disassemble and wrap your furniture in protective blankets, securing them with
              shrink-film and tape. With the utmost precision, we will carefully load everything
              onto the truck, using cargo belts to secure the items in place.
            </p>
            <p>
              Upon arrival at your new home, our dedicated movers will unload and unwrap your
              belongings, placing them exactly where you want them to be. Should you have any
              additional items that need to be moved, our team is always ready to lend a hand.
            </p>
          </div>
          <div className="pt-2 pb-5">
            <button className="custom-button-light">
              <span className="button-text">Get Quote</span>
            </button>
            <button className="custom-button-light">
              <span className="button-text">Book Now</span>
            </button>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Residential;
