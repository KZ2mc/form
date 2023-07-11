import Base from "./Base";
import "./All.css";
import "./Prices.css";

const Prices: React.FC = () => {
  const Divider: React.FC = () => {
    return (
      <div className="py-3">
        <hr />
      </div>
    );
  };

  return (
    <Base>
      <div className="stripe-blue">
        <div className="content-div px-5 narrow">
          <h1>Our Prices</h1>
          <div className="text-start">
            <section>
              <div>
                <h5>All our moving rates include:</h5>
                <ul style={{ paddingLeft: "60px" }}>
                  <li>
                    <p className="m-1 py-0 px-5">Experienced movers</p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">
                      Fully equipped truck (No extra charge for miles, tolls, or gas)
                    </p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">Packing and Unpacking service</p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">Boxes and materials</p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">Floor protection</p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">Use of wardrobe boxes</p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">Furniture disassembly and reassembly service</p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">
                      Liability Insurance with $1'000'000 coverage and a COI upon request
                    </p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">Taxes</p>
                  </li>
                </ul>
              </div>
              <div>
                <h5>Extra charges:</h5>
                <ul style={{ paddingLeft: "60px" }}>
                  <li>
                    <p className="m-1 py-0 px-5">
                      Extra heavy items (300+ lbs) such as piano or gun safe and extra-large items
                      that would require 4 movers to handle (this is uncommon)
                    </p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">Double-Drive Time (Local Moves Only)</p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">Additional truck(s)</p>
                  </li>
                </ul>
              </div>
            </section>

            <Divider />

            <section>
              <h3 className="text-center pb-3">Local Moving</h3>
              <div>
                <h5>Low-season rates (October - April):</h5>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>
                    <p className="m-1 py-0 px-5">2 movers - $109/129 per hour (cash/card)</p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">3 movers - $149/169 per hour (cash/card)</p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">4 movers - $189/209 per hour (cash/card)</p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">Every additional mover + $40/hr</p>
                  </li>
                </ul>
              </div>
              <div>
                <h5>High-season rates (May - September):</h5>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>
                    <p className="m-1 py-0 px-5">2 movers - $119/139 per hour (cash/card)</p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">3 movers - $159/179 per hour (cash/card)</p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">4 movers - $199/219 per hour (cash/card)</p>
                  </li>
                  <li>
                    <p className="m-1 py-0 px-5">Every additional mover + $40/hr</p>
                  </li>
                </ul>
                <p>
                  <b>Minimum time charged: 3 hours</b>
                </p>
              </div>
              <div className="pt-3">
                <h5>Double-Drive-Time policy:</h5>
                <p className="m-1 py-0 px-5">
                  California law requires moving companies to charge double-drive time if the
                  distance from the origin to the destination exceeds 10 miles. If we spend 1 hour
                  driving from your pick-up to drop-off, we multiply that time by 2 and apply your
                  current rate. We don't charge for driving before pick-up or after drop-off.
                </p>
              </div>

              <p className="pt-5">
                <a href="services-packing" className="link-white">
                  Packing/Unpacking
                </a>{" "}
                and{" "}
                <a href="services-furniture-assembly" className="link-white">
                  Furniture assembly/disassembly
                </a>{" "}
                as stand-alone services are charged at the same hourly rates.
              </p>

              <div className="pt-3">
                <h5 className="text-center">Recommendations</h5>
                <div className="table mx-auto">
                  <div className="row table-row top-row">
                    <div className="col table-col">Move Size</div>
                    <div className="col table-col">Team Size</div>
                    <div className="col table-col">Estimated Time</div>
                  </div>
                  <div className="row table-row">
                    <div className="col table-col">Studio or 1 bedroom</div>
                    <div className="col table-col">2 movers</div>
                    <div className="col table-col">3-5 hours</div>
                  </div>
                  <div className="row table-row">
                    <div className="col table-col">2 bedroom</div>
                    <div className="col table-col">3 movers</div>
                    <div className="col table-col">4-6 hours</div>
                  </div>
                  <div className="row table-row">
                    <div className="col table-col">3 bedroom</div>
                    <div className="col table-col">4 movers</div>
                    <div className="col table-col">7-9 hours</div>
                  </div>
                </div>
                <p>Add another 2 hours if you need a full packing service</p>
                <p className="small">
                  Provided time is an approximation based on the average time that similar jobs
                  take. The actual time will depend on many different factors such as long walkways,
                  stairs, elevators, amount of stuff, heavy items, your preparedness for the move,
                  etc.
                </p>
              </div>
              <div className="text-center">
                <button className="custom-button-light">
                  <span className="button-text">Get Quote</span>
                </button>
              </div>
            </section>

            <Divider />

            <section>
              <h3 className="text-center pb-3">Long Distance Moving</h3>
              <p>
                Moves over 300 miles far are considered Long-Distance and charged at a flat price
              </p>
              <p>The flat price includes everything else you might need for your move</p>
              <p>
                Please note that automated quotes give a rate for one truck of up to 26 ft and do
                not consider extra-heavy and extra-large items which are charged separately. There
                will be an extra charge for any additional trucks or a 36 ft trailer. The automated
                quote's purpose is to provide you with a general idea of how much your move might
                cost. The final flat price is determined after an on-site or virtual estimate.
              </p>
              <div className="text-center">
                <button className="custom-button-light">
                  <span className="button-text">Get Quote</span>
                </button>
              </div>
            </section>

            <Divider />

            <section>
              <h3 className="text-center pb-3">Extra Heavy and Extra Large Items Moving</h3>
              <p className="m-1 py-0">
                An item is considered extra heavy if it weighs over 300 lbs
              </p>
              <p className="m-1 py-0">
                An item is considered extra large if it requires 4 movers to be moved
              </p>
              <p className="m-1 py-0">
                Couches, sofas, mattresses, TVs up to 100", regular dining tables, and dressers are
                NOT charged extra
              </p>
              <p className="m-1 pt-3 px-5">Piano moving - $400 + $10/stairstep</p>
              <p className="m-1 py-0 px-5">
                Large gun safe moving - $200 if can be rolled or $500 + $10/stairstep if has to be
                carried
              </p>
              <p className="m-1 py-0 px-5">
                Heavy treadmill moving - $100 + $10/stairstep. Can be waived if item can be rolled
              </p>
              <p className="m-1 py-0 px-5">
                Other extra heavy and extra large items discussed individually
              </p>
              <p className="m-1 pt-3">
                To get a quote, please email us at{" "}
                <a className="link-white" href="mailto:info@kz2movingcompany.com">
                  info@kz2movingcompany.com
                </a>{" "}
                or give us a call at{" "}
                <a className="link-white" href="tel:+14152282226">
                  415-228-2228
                </a>
              </p>
            </section>

            <Divider />

            <section>
              <h3 className="text-center pb-3">Payment</h3>
              <p>Your payment is due at the end of your move</p>
              <p>
                We accept cash, credit/debit cards, Zelle, Venmo, and wire transfers. We DO NOT
                accept checks
              </p>
            </section>
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

export default Prices;
