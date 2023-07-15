import Base from "./Base";
import "./All.css";
import MyButton from "./MyButton";

const Local: React.FC = () => {
  return (
    <Base>
      <div className="stripe-blue">
        <div className="content-div px-5 narrow">
          <h1>Local Moving</h1>
          <div className="text-start">
            <p>
              Looking for reliable and efficient local moving services in the Bay Area? Look no
              further than KZ2 Moving Company. We specialize in providing top-notch local moving
              solutions for both residential and commercial customers.
            </p>
            <p>
              Whether you're planning to move your office, business, home, or apartment, we've got
              you covered. Our experienced team of movers is well-versed in handling all types of
              local moves with precision and care. We understand the unique challenges of navigating
              through the Bay Area, and our skilled drivers know the ins and outs of the local
              roads. Rest assured, they'll navigate traffic seamlessly and ensure your belongings
              arrive at their destination safely and on time.
            </p>
            <div className="text-center">
              <img
                className="framed-image regular-image"
                src="src/img/kz2-moving-company-local-move.jpg"
                alt="local move"
              />
            </div>
            <p>
              At KZ2 Moving Company, we prioritize compliance with local norms and regulations. We
              adhere to all local guidelines and regulations, ensuring a smooth and hassle-free
              moving experience for our clients. With our expertise and commitment to quality, you
              can trust us to handle your local move efficiently and professionally.
            </p>
            <p>
              As a small business deeply rooted in the community, KZ2 Moving Company takes great
              pride in serving our valued customers. We have built a strong reputation for providing
              exceptional moving services with a personal touch. Our commitment to customer
              satisfaction is unmatched, and we genuinely care about the well-being of our clients.
            </p>
            <p>
              When you choose KZ2 Moving Company, you become a part of our extended family. We
              believe in fostering long-term relationships with our customers, and it brings us joy
              to see familiar faces return time and time again. Our satisfied customers have become
              our biggest advocates, often recommending us to their friends, family, and colleagues
              who are in need of reliable moving services.
            </p>
            <div className="text-center">
              <img
                className="framed-image regular-image "
                src="src/img/kz2-moving-company-bay-area-moving-company.jpg"
                alt="bay area moving"
              />
            </div>

            <p>
              At KZ2 Moving Company, we understand that moving is not just about transporting
              belongings from one place to another; it's about creating a positive and memorable
              experience for our customers. We go the extra mile to ensure your move is stress-free
              and seamless, providing personalized attention and addressing your unique needs.
            </p>
            <p>
              Join the ever-growing community of satisfied customers who have entrusted their moves
              to KZ2 Moving Company. Discover the difference of working with a dedicated team that
              genuinely cares about your satisfaction. Experience the personalized service and
              exceptional care that sets us apart as the preferred choice for local moving services
              in the Bay Area.
            </p>
            <p>
              Don't let the stress of local moving overwhelm you. Contact KZ2 Moving Company today
              and let our dedicated team take care of every aspect of your local move. Experience
              the peace of mind that comes with hiring a trusted moving partner who understands the
              Bay Area and delivers exceptional service tailored to your needs.
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

export default Local;
