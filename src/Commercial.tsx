import Base from "./Base";
import "./All.css";

const Commercial: React.FC = () => {
  return (
    <Base>
      <div className="stripe-blue">
        <div className="content-div px-5 narrow">
          <h1>Commercial Moving</h1>

          <div className="text-start">
            <p>
              Relocating a business can be a complex process that requires meticulous planning and
              execution. At KZ2, we understand the unique challenges that come with commercial
              moves, and our comprehensive commercial moving services are designed to make your
              transition smooth and hassle-free.
            </p>
            <p>
              From the moment you reach out to us, we will assign a dedicated moving coordinator who
              will work closely with your company's point person to oversee every aspect of the
              move. Our experienced coordinators are well-versed in office relocations and will
              provide valuable insights and guidance throughout the process.
            </p>
            <p>
              To ensure a successful commercial move, we follow a structured approach that includes
              several key steps. First, we conduct a free onsite estimate to understand the specific
              requirements of your business relocation. Our knowledgeable coordinators will provide
              detailed information on what is needed to ensure a safe and secure move for your
              company.
            </p>
            <div className="text-center">
              <img
                className="framed-image regular-image"
                src="src/img/kz2-moving-company-commercial-move.png"
                alt="commercial move"
              />
            </div>

            <p>
              Next, our coordinators will perform a thorough walkthrough of both the origin and
              destination locations with your designated manager. This walkthrough allows us to
              identify any potential challenges, such as egress or ingress routes, elevators or
              stairways, and traffic patterns. Together, we will develop the most efficient plan to
              minimize disruptions to your business operations.
            </p>

            <p>
              Advance labeling is an essential part of our pre-planning process for commercial
              moves. Whether you choose to use your own boxes and crates or rely on ours, our team
              will help you connect spots on your current floor plan with the appropriate locations
              at your new site. By labeling everything ahead of time, we ensure that each box,
              crate, or bin is placed precisely where it needs to be during the unpacking process.
            </p>

            <p>
              When it comes to packing, we offer flexible options to suit your needs. For larger
              moves, packing, moving, and unpacking can be done over several days. For smaller
              moves, our team should be able to do everything in one day. Our team will handle the
              disassembly, packing, transportation, and reassembly of all office furniture and
              equipment, ensuring their safe arrival at the new location.
            </p>
            <div className="text-center">
              <img
                className="framed-image regular-image"
                src="src/img/kz2-moving-company-commercial-moving.png"
                alt="office moving"
              />
            </div>
            <p>
              At KZ2 Moving Company, our professional staff uses only high-quality equipment,
              materials, and tools. During the move itself, our expert movers will handle your
              boxes, crates, furniture, fixtures, and electronics with the utmost care and
              precision. We can accommodate overnight or weekend moves to ensure minimal disruption
              to your business operations, allowing you to reopen at your new location as soon as
              possible.
            </p>

            <p>
              Once we arrive at your new place of business, our team will handle the unpacking,
              reassembly, and arrangement of your large office fixtures. Our goal is to minimize
              downtime and ensure that your staff can quickly resume their work without any hassle.
            </p>

            <p>
              Our commercial moving services encompass a wide range of comprehensive solutions
              tailored to meet your specific needs. From a dedicated moving coordinator to fully
              trained, insured moving teams and clean, spacious, fully equipped trucks, we provide
              all the necessary resources for a successful move. We offer packing services, advance
              labeling, disassembly, and reassembly of furniture, and can even assist in finding
              appropriate storage facilities if needed.
            </p>

            <p>
              When it comes to packing and moving, our experienced teams have expertise in handling
              all standard office fixtures. From office furniture, storage structures, and marketing
              materials to IT equipment, physical documents, and break-room supplies, we ensure the
              safe and secure transport of your valuable assets. We also have movers experienced in
              handling larger equipment such as vending machines, massage chairs, commercial
              refrigerators, stands, and stoves.
            </p>

            <p>
              Choose KZ2 Moving Company for your commercial moving needs and experience a
              stress-free relocation that is tailored to your business requirements. Our dedicated
              team is committed to providing exceptional service and ensuring a seamless transition
              for your company. Contact us well in advance to allow ample time for detailed
              planning, and let us help you engineer a successful move that minimizes disruption to
              your business operations.
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

export default Commercial;
