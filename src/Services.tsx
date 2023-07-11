import Base from "./Base";
import "./All.css";

const Services: React.FC = () => {
  const getListItem = (label: string, description: string, src: string) => {
    return (
      <li>
        <div className="row align-items-top">
          <div className="col-4 pr-0 m-0 ">
            <p className="pr-0 pt-0">
              <a href={src} className="link-orange">
                {label}
              </a>
            </p>
          </div>
          <div className="col-auto p-0 m-0">
            <p>-</p>
          </div>
          <div className="col">
            <p>{description}</p>
          </div>
        </div>
      </li>
    );
  };

  return (
    <Base>
      <div className="stripe-blue">
        <div className="content-div px-5 narrow">
          <h1>Our Services</h1>
          <p>
            At KZ2, we know that moving can be exciting and stressful at the same time. We are here
            to help you to make your move as smooth as possible.
          </p>
          <br />
          <div className="text-start">
            <ul style={{ listStyle: "none", padding: 0 }}>
              {getListItem(
                "Local Moving",
                "residential or commercial relocations up to 300 miles. Charged by the hour.",
                "services-local-moving"
              )}
              {getListItem(
                "Long Distance Moving",
                "residential or commercial relocations farther than 300 miles. Moving withing California and out of state moving. Charged at a flat rate.",
                "services-long-distance"
              )}
              {getListItem(
                "Residential Moving",
                "house moving, apartment moving, condo moving, and other types of households.",
                "services-residential"
              )}
              {getListItem(
                "Commercial Moving",
                "office moving, warehouse moving, restaurant, and other types of business moving.",
                "services-commercial"
              )}
              {getListItem(
                "Senior Moving",
                "relocation to and from a senior living community with special attention to senior specific needs.",
                "services-senior-moving"
              )}
              {getListItem(
                "Packing and Unpacking",
                "assistance with packing small items such as kitchenware, books, frames, and electronics into boxes.",
                "services-packing"
              )}
              {getListItem(
                "Furniture Assembly and Disassembly",
                "our movers will disassemble and reassemble beds, couches, tables, desks, shelves, and other furniture as necessary. Included with all types of moving services.",
                "services-furniture-assembly"
              )}
              {getListItem(
                "Heavy Items Moving",
                "we can help you move a piano, gun safe, pool table, and other items over 300 lbs or bulky items that require 4+ movers.",
                "services-heavy-items"
              )}
              {getListItem(
                "Short Term Storage",
                "we can store your items at our secure location for a few days in case your move-out and move-in dates do not overlap.",
                "services-storage"
              )}
            </ul>
            <br />
            <h5 className="text-center">How it works</h5>
            <p>
              On the day of your move, our movers, loaded to the teeth with all necessary tools,
              materials, and years of experience, will arrive on a huge shiny truck right to your
              door. If you need help with packing, the guys will carefully wrap fragile items in
              paper and bubble wrap and pack everything into boxes.
            </p>
            <p>
              Then they will, if necessary, disassemble and wrap your furniture and other big items
              into protective blankets, and secure them with layers of shrink-wrap and tape. After
              that, everything will be carried to the truck, carefully stacked, and secured with
              cargo belts. Now, the guys will drive to your new place.
            </p>
            <p>
              At the drop-off location, our movers will unload and unwrap everything and put the
              items where you want them to be. If you have any other items you want to be moved to
              your new place, the guys will be happy to help.
            </p>
            <br />
            <h5 className="text-center">Long Distance Moving</h5>
            <p>
              For moves over 300 miles far, we provide a flat-rate price that includes packing,
              furniture assembly, loading, driving, unloading, and all associated expenses such as
              packing materials, mileage, and gas.
            </p>
            <p>
              Excessively heavy items such as a piano aren't included in the rate and discussed
              separately.
            </p>
            <p>
              We provide individual trucks for long-distance moving. That means there won't be
              anyone else's stuff and the truck will go directly to your place.
            </p>
            <p>Moves 400 miles far and similar distances are done overnight.</p>
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

export default Services;
