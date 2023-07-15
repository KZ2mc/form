import Base from "./Base";
import "./All.css";
import MyButton from "./MyButton";

const FurnitureAssembly: React.FC = () => {
  return (
    <Base>
      <div className="stripe-blue">
        <div className="content-div px-5 narrow">
          <h1>Furniture Assembly and Disassembly</h1>

          <div className="text-start">
            <p>
              At KZ2 Moving Company, we offer a comprehensive furniture assembly and disassembly
              service that takes the hassle out of your moving experience. Our skilled team of
              professionals is equipped with all the necessary tools and expertise to handle the
              disassembly and reassembly of your furniture with precision and care.
            </p>
            <p>
              Whether you're moving to a new home or office, our furniture assembly and disassembly
              service ensures a seamless transition. We can dismount and mount back TVs, hang
              shelves, decorations, pictures, and mirrors, making sure every item is securely and
              safely installed in its designated place. Worried about disassembling your sports
              equipment or breaking down a bed? Our experienced team can handle it all, efficiently
              and swiftly.
            </p>
            <p>
              One of the key advantages of choosing our service is our meticulous attention to
              detail. We take extra precautions to ensure that no parts are lost during the moving
              process. Our team carefully organizes and labels each component, guaranteeing a smooth
              reassembly at your new location.
            </p>
            <div className="text-center">
              <img
                className="framed-image regular-image"
                src="src/img/kz2-moving-company-furniture-assembly.webp"
                alt="furniture assembly and disassembly"
              />
            </div>
            <p>
              In addition to assisting with the assembly and disassembly process, we can also
              tighten up screws on furniture that may have become loose over time or during
              transportation. This attention to detail ensures that your furniture remains sturdy
              and stable, giving you peace of mind.
            </p>
            <p>
              Whether you require our furniture assembly and disassembly service as a stand-alone
              option or as part of your overall move, our dedicated team is committed to delivering
              exceptional service and exceeding your expectations. We understand that proper
              assembly is crucial to the functionality and aesthetics of your space, and we take
              pride in our ability to complete the task efficiently and professionally.
            </p>
            <p>
              Choose KZ2 Moving Company for reliable furniture assembly and disassembly services
              that make your move hassle-free. Let us handle the intricate task of setting up your
              furniture so that you can focus on settling into your new space. Contact us today to
              discuss your specific needs and discover how we can make your moving experience
              seamless and stress-free.
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

export default FurnitureAssembly;
