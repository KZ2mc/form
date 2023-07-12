import React from "react";
import Base from "./Base";
import "./All.css";
import "./Blog.css";

const Blog_prepare_for_move: React.FC = () => {
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
          <div className="d-flex justify-content-center align-items-center text-start">
            <article>
              <h2 className="text-center py-3">How to prepare for a Move</h2>
              <p>
                With the right preparation, your move can be much easier to handle. In this article,
                we'll take a look at some tips and tricks to help you prepare for your move. If you
                haven't chosen a moving company yet, we recommend you start with our{" "}
                <a
                  className="link-white"
                  href="blog-how-to-choose-moving-company"
                  style={{ color: "#FFB600" }}>
                  How to Choose a Moving Company
                </a>{" "}
                article.
              </p>
              <div className="mx-5 px-5">
                <img className="img-fluid framed-image" src="src/img/preparing-for-moving.webp" />
              </div>

              <section className="pt-3">
                <h5 className="pb-0">Create a Moving Timeline</h5>
                <p>
                  One of the first things you should do is create a timeline for your move. Start by
                  setting a moving date and work backwards from there, noting important deadlines
                  such as the date you need to vacate your current residence, when to hire movers,
                  and when to start packing. If your move involves an apartment building, you might
                  have to reserve a loading dock and elevator. If your building require a
                  certificate of insurance (COI), make sure to request that in advance as it
                  typically takes our insurance company one business day to sign and issue a COI.
                  Moving from one apartment building to another can be especially tricky as you
                  would have to carefully plan the arrival of movers and the reservation of
                  elevators in both locations. Having a timeline will help keep you organized and
                  ensure that you don't forget any important details.
                </p>
              </section>
              <section className="pt-3">
                <h5 className="pb-0">Declutter and Downsize</h5>
                <p>
                  Moving is a great opportunity to get rid of any items you no longer need or want.
                  Take some time to declutter and downsize your belongings before you start packing.
                  This will not only make packing easier but can also help reduce your moving
                  expenses by requiring fewer boxes and less space on the moving truck. Many
                  counties have Big Item Recycling (BIR) programs that allow residents to dispose of
                  large items such as couches, mattresses, or dresses for free. Check with your city
                  to schedule a BIR pickup.
                </p>
              </section>
              <section className="pt-3">
                <h5 className="pb-0">Prepare your Stuff</h5>
                <p>
                  Empty the dressers, desks, and nightstands. Not only this will prevent any
                  possible loss of your items, but will also make the pieces easier for movers to
                  carry reducing the risk of damage to the furniture, walls, floor, and injuries to
                  the movers themselves. Moving companies are not permitted to carry any flammable,
                  explosive, or poisonous materials. Plan for propane tanks and large amounts of
                  alcohol accordingly.
                </p>
              </section>
              <section className="pt-3">
                <h5 className="pb-0">Label Boxes</h5>
                <p>
                  If you're packing yourself, be sure to label each box with its contents and which
                  room it belongs in. This will make it easier for you to unpack and can also help
                  your movers know where to place each box in your new home. Alway pack cups and
                  glasses uprigth otherwise they will likely break. Be sure to mark with arrows
                  pointing at the top any boxes containing glass or other fragile items, so that
                  movers treat them with extra care and don't put anything on top. Secure the
                  bottoms with quality tape. Don't overload boxes with heavy items. Never put books
                  in boxes larger than a Small size, otherwise, the box will be very heavy and might
                  break during the move.
                </p>
              </section>
              <section className="pt-3">
                <h5 className="pb-0">Prepare the way for movers</h5>
                <p>
                  Doors, elevators, buzzers, and long walks slow down your move and cost you money.
                  Think of any ways you could make it easier for your team. Can you get door
                  stoppers, reserve an elevator, or cooperate with your neighbors to secure a
                  parking spot right in front of your door?
                </p>
              </section>
              <section className="pt-3">
                <h5 className="pb-0">Pack a Moving Day Essentials Box</h5>
                <p>
                  On a moving day, you'll want to have easy access to some essential items, such as
                  toiletries, a change of clothes, a phone charger, and any important documents or
                  medications. Pack a separate box with these items and keep it with you in your car
                  or ask movers to put it as close as possible so that it would be unloaded first
                  when they arrive.
                </p>
              </section>
              <section className="pt-3">
                <h5 className="pb-0">Notify Utilities and Change Addresses</h5>
                <p>
                  Before you move, be sure to notify your utilities, deliveries, and other important
                  services of your change of address. This can include your internet provider, cable
                  or satellite TV provider, Amazon, and electricity and gas companies. You should
                  also update your address with the post office and any other relevant
                  organizations, such as your bank or credit card companies.
                </p>
                <p>
                  Moving can be a stressful experience, but with some careful planning and
                  preparation, you can make the process much easier. By following these tips, you'll
                  be well on your way to a successful move.
                </p>
              </section>
            </article>
          </div>

          <Divider />

          <div className="p-4">
            <h4>Related posts</h4>
            <div className="row pb-3">
              <div className="col pb-2 mx-2 post-mini-card">
                <a href="blog-how-to-choose-moving-company" className="post-link">
                  <img
                    src="src/img/kz2-moving-company-heavy-items-moving.webp"
                    className="img-fluid framed-image"
                  />
                  <h6>How to choose a moving company</h6>
                </a>
              </div>
              <div className="col pb-2 mx-2 post-mini-card">
                <a href="blog-what-to-expect" className="post-link">
                  <img
                    src="src/img/kz2-moving-company-residential-moving.webp"
                    className="img-fluid framed-image"
                  />
                  <h6>What to expect from your movers</h6>
                </a>
              </div>
              <div className="col pb-2 mx-2 post-mini-card">
                <a href="blog-estimate-move-size" className="post-link">
                  <img
                    src="src/img/how-to-estimate-move-size.webp"
                    className="img-fluid framed-image"
                  />
                  <h6>How to estimate your move size</h6>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Blog_prepare_for_move;
