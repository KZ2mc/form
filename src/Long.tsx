import Base from "./Base";
import "./All.css";
import MyButton from "./MyButton";

const Long: React.FC = () => {
  return (
    <Base>
      <div className="stripe-blue">
        <div className="content-div px-5 narrow">
          <h1>Long Distance Moving</h1>

          <div className="text-start">
            <p>
              Moving interstate or long-distance can be a logistical challenge, but at KZ2, we have
              the expertise and resources to make it a smooth and stress-free experience. Our
              long-distance moving services are designed to provide you with a seamless transition
              to your new location, no matter how far you're moving.
            </p>
            <p>
              For moves over 300 miles, we offer a flat-rate price that covers all aspects of the
              move. From packing and furniture assembly to loading, driving, and unloading, we take
              care of every detail. Our comprehensive service includes all associated expenses such
              as packing materials, mileage, and gas, ensuring transparency and eliminating
              surprises along the way.
            </p>
            <p>
              For long-distance moves, we use only new trucks that are clean, well-equipped, and
              serviced regularly. Our teams include multiple drivers which allows them to change
              often during the trip and thus reduce the time on the road and risks associated with
              driver tiredness.
            </p>
            <div className="text-center">
              <img
                className="framed-image regular-image"
                src="src/img/kz2-moving-company-long-distance-moving.webp"
                alt="long distance move"
              />
            </div>

            <p>
              We understand that certain items require special attention, especially when moving
              long-distance. Excessively heavy items like pianos are handled separately and
              discussed on an individual basis to ensure their safe transportation.
            </p>
            <p>
              With our long-distance moving services, you can rest assured that your belongings are
              in capable hands. We provide dedicated trucks for long-distance moves, meaning that
              your items will not be mixed with anyone else's. Your belongings will be transported
              directly to your new place, minimizing the risk of loss or damage.
            </p>
            <p>
              We understand the importance of transparency when it comes to pricing and scheduling.
              Your relocation consultant will provide you with accurate pricing and scheduling
              information, so you know exactly what to expect. Our goal is to eliminate any
              surprises and make sure you have a clear understanding of the cost and timeline of
              your long-distance move.
            </p>
            <div className="text-center">
              <img
                className="framed-image regular-image"
                src="src/img/kz2-moving-company-interstate-moving.webp"
                alt="interstate move"
              />
            </div>
            <p>
              Prior to the move, we will send one of our experienced estimators who will have a look
              at all your stuff, take measurements, approximate weight, and assess conditions such
              as narrow doors, staircases, elevators, long walks, and the parking situation. The
              estimate is done to guarantee that there will be no surprises on the day of the move,
              all the stuff will fit in the provided truck(s), and your move is completed in a
              timely manner.
            </p>
            <p>
              We will be with you through the entire move which means that the same movers who pack
              and load your stuff will unpack and unload it. No third parties are involved. Our
              trucks are GPS-equipped which allows tracking the progress of the trip and let us know
              where your stuff is at any time.
            </p>
            <p>
              Choose KZ2 Moving Company for your long-distance relocation and experience a smooth
              and hassle-free move. Contact us today to learn more about our exceptional moving
              services and discover why we are the best choice for your long-distance moving needs.
              Let us take care of the logistics while you focus on starting the next chapter of your
              life in your new destination.
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

export default Long;
