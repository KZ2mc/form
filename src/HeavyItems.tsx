import Base from "./Base";
import "./All.css";
import MyButton from "./MyButton";

const HeavyItems: React.FC = () => {
  return (
    <Base>
      <div className="stripe-blue">
        <div className="content-div px-5 narrow">
          <h1>Heavy Items Moving</h1>
          <div className="text-start">
            <p>
              Moving extra-heavy items can pose unique challenges that require specialized expertise
              and equipment. At KZ2 Moving Company, we have the knowledge and experience to handle
              even the heaviest items with precision and care. Whether it's a piano, gun safe, pool
              table, spa, heavy treadmill, or other bulky possessions, our team is equipped to
              tackle the task safely and efficiently.
            </p>
            <div className="text-center">
              <img
                className="framed-image regular-image"
                src="src/img/kz2-moving-company-piano-moving.webp"
                alt="piano move"
              />
            </div>
            <p>
              When it comes to extra-heavy items, we understand that a one-size-fits-all approach
              doesn't work. That's why we treat each item individually, assessing its specific
              requirements and developing a tailored plan for its transportation. Our team utilizes
              specialized equipment, such as dollies, straps, and lifting tools, to ensure the
              proper handling and secure transport of these items.
            </p>

            <div className="text-center">
              <img
                className="framed-image regular-image"
                src="src/img/kz2-moving-company-item-protection.webp"
                alt="heavy items move"
              />
            </div>
            <p>
              Our movers are creative, inventive, and aren't afraid of unconventional tasks. We are
              familiar with the difficulties associated with moving from or to a hilly neighborhood.
              You'd love to keep your favorite couch but it doesn't fit through the door? We might
              be able to hoist it from the balcony. You'd like to move that large chicken coop from
              your backyard? We've got you covered!
            </p>
            <p>
              When you choose our heavy item moving service, you can trust that your valuable
              possessions will be handled with the utmost care and attention. We prioritize safety
              at every step, taking measures to protect both your items and your property during the
              moving process. No matter how heavy or cumbersome your items may be, we have the
              expertise and equipment to get the job done efficiently and effectively. Trust KZ2
              Moving Company for all your heavy-item moving needs.
            </p>
          </div>
          <div className="pt-2 pb-5">
            <MyButton link="get-quote" text="Get Quote" />
            <MyButton link="book" text="Book Now" />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default HeavyItems;
