import React from "react";
import Base from "./Base";
import "./All.css";
import "./Blog.css";

const Blog_what_to_expect: React.FC = () => {
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
              <h1 className="text-center">What to Expect from Your Movers</h1>
              <p>
                If you are moving for the first time, you probably have a lot of questions. Don't
                worry, you are not alone. In this article, we will try to explain what to expect
                from your KZ2 Moving Company team.
              </p>
              <div className="mx-5 px-5">
                <img
                  className="img-fluid framed-image"
                  src="src/img/kz2-moving-company-what-to-expect.jpg"
                />
              </div>

              <section className="pt-3">
                <h5 className="pb-0">The day before</h5>
                <p>
                  The day before your move, we will contact you to confirm that your plans haven't
                  changed and that you will be waiting for our team at the assigned time. We work
                  rain or shine and never cancel moves due to bad weather. Rest assured your stuff
                  won't be damaged on a rainy day.
                </p>
              </section>
              <section className="pt-3">
                <h5 className="pb-0">On the day of your move</h5>
                <p>
                  Your team will contact you and let know their Estimated Time of Arrival (ETA). If
                  you have any special instructions regarding parking, this is a good time to
                  discuss it with the team.
                </p>
              </section>
              <section className="pt-3">
                <h5 className="pb-0">Contract</h5>
                <p>
                  Upon arrival, the team will greet you, introduce themselves, and ask you to show
                  them around your property to get an understanding of the task and how to better
                  stack the truck. If not all items are going, let the team know in advance. Also if
                  you have multiple pickups/dropoffs, make sure to explain to the movers what will
                  go where. Once this is done, your foreman, the lead of the team, will bring a
                  contract, walk you through it, and explain all the details. Once the contract is
                  signed, the clock starts.
                </p>
              </section>
              <section className="pt-3">
                <h5 className="pb-0">During the move</h5>
                <p>
                  The team will disassemble your bed and reassemble it in the new place. Your
                  mattress will be wrapped in many layers of shrink wrap, so it won't get dirty
                  during the move. The movers will carefully dismount your TV and wrap it properly.
                  Your large mirror will be treated the same. Your couch of white, beige, or any
                  other color will be protected with layers of shrink wrap and moving blankets to
                  prevent any possible damage. The same goes for all your furniture pieces. Your
                  clothes will be transferred to the wardrobe boxes where they can remain on the
                  hangers and not be folded or wrinkled. Each of our teams is equipped with 5+
                  wardrobe boxes - enough to move a 4 bedroom. Let us know in advance if you need
                  more. If you need full or partial packing, our movers will wrap fragile items in
                  bubble wrap and paper and professionally pack them into boxes. When the truck is
                  loaded, double-check that nothing was forgotten. If you notice any new damage to
                  the floor, doors, or walls, tell your movers right away.
                </p>
              </section>
              <section className="pt-3">
                <h5 className="pb-0">In the new place</h5>
                <p>
                  Once everything is in its place, take a few minutes to walk around. Look for any
                  new scratches or chips on your items, floors, doors, or walls. Plug in your TV and
                  monitors and make sure the screens are intact. If you have items of special value,
                  such as art or glass pieces, check them now. This is a very important step as our
                  insurance company won't accept any claims found after the contract is closed.
                  Discuss any issues directly with your team. If everything looks good, sign the
                  contract. That's when the clock stops. Remember that we round your time to the
                  nearest 15 minutes and usually in your favor :)
                </p>
              </section>
              <section className="pt-3">
                <h5 className="pb-0">After the move</h5>
                <p>
                  If you liked your team, you may decide to give them a tip. How much? It is totally
                  up to you. Our movers are strictly prohibited from tip-begging. On average, our
                  customers choose to tip about $15/hr each mover which can be more or less
                  depending on the difficulty of the job and your personal situation.
                </p>
                <p>
                  If we made your move nice and smooth, please write us a review on{" "}
                  <a
                    className="post-link"
                    href="https://www.yelp.com/biz/kz2-moving-company-san-francisco"
                    style={{ color: "#FFB600" }}>
                    Yelp
                  </a>
                  ,{" "}
                  <a
                    className="post-link"
                    href="https://g.page/r/CWi7fO1tDM-LEBI/review"
                    style={{ color: "#FFB600" }}>
                    Google
                  </a>
                  ,{" "}
                  <a
                    className="post-link"
                    href="https://www.facebook.com/profile.php?id=100067439095233&sk=reviews"
                    style={{ color: "#FFB600" }}>
                    Facebook
                  </a>
                  , or anywhere else you can find us :) If something went wrong, please send us an
                  email at{" "}
                  <a
                    className="link-white"
                    href="mailto:info@kz2movingcompany.com"
                    style={{ color: "#FFB600" }}>
                    info@kz2movingcompany.com
                  </a>{" "}
                  and we will do our best to make it right.
                </p>
              </section>
            </article>
          </div>

          <Divider />

          <div className="p-4">
            <h4>Related posts</h4>
            <div className="row pb-3">
              <div className="col pb-2 mx-2 post-mini-card">
                <a href="" className="post-link">
                  <img
                    src="src/img/kz2-moving-company-heavy-items-moving.png"
                    className="img-fluid framed-image"
                  />
                  <h6>How to choose a moving company</h6>
                </a>
              </div>
              <div className="col pb-2 mx-2 post-mini-card">
                <a href="" className="post-link">
                  <img src="src/img/preparing-for-moving.jpg" className="img-fluid framed-image" />
                  <h6>How to prepare for a move</h6>
                </a>
              </div>
              <div className="col pb-2 mx-2 post-mini-card">
                <a href="blog-estimate-move-size" className="post-link">
                  <img
                    src="src/img/how-to-estimate-your-move-size.jpg"
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

export default Blog_what_to_expect;
