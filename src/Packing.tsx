import Base from "./Base";
import "./All.css";
import MyButton from "./MyButton";

const Packing: React.FC = () => {
  return (
    <Base>
      <div className="stripe-blue">
        <div className="content-div px-5 narrow">
          <h1>Packing</h1>
          <div className="text-start">
            <p>
              Preparing for a move requires time, effort, and attention to detail. At KZ2 Moving
              Company, we offer comprehensive packing services to alleviate the stress of packing
              your belongings. Our team of expert packers is equipped with the necessary materials
              and techniques to ensure that your items are protected during transit.
            </p>
            <p>
              When you choose our packing services, our skilled professionals will carefully wrap
              your fragile items using high-quality paper and bubble wrap, providing an extra layer
              of cushioning. They will meticulously pack everything into sturdy boxes, optimizing
              space while maintaining organization. Our packers are well-versed in handling a wide
              range of items, from delicate china to bulky electronics.
            </p>
            <p>
              With our packing services, you can trust that your belongings will be handled with the
              utmost care and attention to detail. Our goal is to provide you with peace of mind,
              knowing that your items are packed securely and ready for a safe journey to your new
              home.
            </p>
            <div className="text-center">
              <img
                className="framed-image regular-image"
                src="src/img/kz2-moving-company-packing-service.webp"
                alt="full packing service"
              />
            </div>
            <p>
              Unpacking after a large relocation can be an incredibly daunting and time-consuming
              task. At KZ2 Moving Company, we understand the challenges you may face during this
              process, which is why we offer comprehensive unpacking services to make your
              transition smoother and stress-free.
            </p>
            <p>
              Our team of skilled professionals is ready to assist you every step of the way. We'll
              carefully unpack your belongings, ensuring they are handled with the utmost care and
              attention. Not only will we place your items in their designated spots, but we can
              also assemble furniture, hang pictures and mirrors, and even mount your TVs, saving
              you the hassle of dealing with these tasks on your own.
            </p>
            <p>
              By taking advantage of our unpacking services, you can focus on settling into your new
              space and enjoying the excitement of a fresh start. Whether you're relocating your
              home or office, our dedicated team is committed to providing efficient, reliable, and
              personalized assistance tailored to your specific needs.
            </p>
            <p>
              Let us alleviate the stress of packing and unpacking, so you can quickly transform
              your new place into a comfortable and functional environment. Contact us today to
              learn more about our packing and unpacking services and how we can make your
              relocation experience a seamless one.
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

export default Packing;
