import Base from "./Base";
import "./All.css";
import MyButton from "./MyButton";

const Senior: React.FC = () => {
  return (
    <Base>
      <div className="stripe-blue">
        <div className="content-div px-5 narrow">
          <h1>Senior Moving</h1>

          <div className="text-start">
            <p>
              At KZ2 Moving Company, we understand the unique needs and challenges associated with
              senior moving. Our specialized Senior Moving service is designed to provide a seamless
              and stress-free experience for older adults who are transitioning to a new home or
              senior living community.
            </p>
            <p>
              With our Senior Moving service, we prioritize the comfort, safety, and well-being of
              our senior clients. Our team of experienced movers is trained to handle the specific
              requirements of senior relocations with care and compassion.
            </p>
            <p>
              We offer a range of tailored services to meet the diverse needs of seniors. This
              includes packing and unpacking assistance, furniture disassembly and reassembly,
              careful handling of fragile items, and organization of belongings in the new space.
              Our goal is to ensure a smooth transition and help seniors settle into their new
              living environment comfortably.
            </p>
            <div className="text-center">
              <img
                className="framed-image regular-image"
                src="src/img/kz2-moving-company-senior-moving.webp"
                alt="senior move"
              />
            </div>
            <p>
              We understand that downsizing can be an overwhelming task, which is why we provide
              guidance and support throughout the entire process. Our team can help with sorting and
              decluttering, making arrangements for item donations or storage, and ensuring that
              valuable possessions are handled with utmost care.
            </p>
            <p>
              At KZ2 Moving Company, we prioritize the physical and emotional well-being of our
              senior clients. Our friendly and professional movers are trained to provide
              personalized attention and assistance, making the moving experience as stress-free as
              possible. We strive to create a warm and comfortable atmosphere, ensuring seniors feel
              supported and confident throughout the entire moving journey.
            </p>
            <p>
              Whether it's a local senior move or a long-distance relocation, our Senior Moving
              service is tailored to meet the unique needs of older adults. Trust KZ2 Moving Company
              to provide a reliable and caring moving experience for seniors and their families.
            </p>
            <p></p>
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

export default Senior;
