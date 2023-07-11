import Base from "./Base";
import "./All.css";

const Storage: React.FC = () => {
  return (
    <Base>
      <div className="stripe-blue">
        <div className="content-div px-5 narrow">
          <h1>Short Term Storage</h1>

          <div className="text-start">
            <p>
              At KZ2 Moving Company, we understand that sometimes your moving timelines don't align
              perfectly. That's why we offer reliable and convenient short-term storage solutions to
              bridge the gap during your transition. Whether you need a few days or a couple of
              weeks, we have you covered.
            </p>
            <p>
              Our short-term storage service provides flexible options to meet your specific needs.
              You can choose to have your belongings unloaded into a secure storage units or keep
              them safely stored in a truck to avoid unnecessary moving of the items. Our location
              on Treasure Island is safe and secure.
            </p>
            <p>
              When you store your belongings with us, you can rest assured that they are in a well
              protected environment. The facility is equipped with 24/7 video surveillance to ensure
              the protection of your valuable possessions. We prioritize the security of your items
              and maintain a clean and organized storage.
            </p>
            <div className="text-center">
              <img
                className="framed-image regular-image"
                src="src/img/kz2-moving-company-storage.jpg"
                alt="short term storage"
              />
            </div>
            <p>
              As a gesture of our commitment to customer satisfaction, we offer complimentary
              overnight storage services for large moves or long-distance moves. This additional
              convenience allows you to have peace of mind knowing that your belongings are
              safeguarded overnight before reaching their final destination.
            </p>
            <p>
              Many storage companies primarily focus on long-term storage and storing your
              belongings for just a few days can come too costly. We recognize the unique needs of
              our customers and provide short-term storage solutions to accommodate those situations
              when your move-out and move-in dates do not perfectly align. Our goal is to alleviate
              the stress and challenges of transitional periods by offering flexible storage options
              tailored to your specific time frame.
            </p>
            <p>
              Experience the convenience and peace of mind of our short-term storage service at KZ2
              Moving Company. Trust us to keep your belongings secure during those in-between
              moments, allowing you to focus on the other aspects of your move with confidence.
            </p>
            <p></p>
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

export default Storage;
