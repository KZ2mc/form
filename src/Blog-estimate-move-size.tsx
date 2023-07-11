import React from "react";
import Base from "./Base";
import "./All.css";
import "./Blog.css";

const Blog_estimate_move_size: React.FC = () => {
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
              <h1 className="text-center">How to estimate your move size</h1>
              <p>
                We are all unique and so are our lifestyles and homes. The size of your space is not
                always a good way of estimating the size of your move. There are Studios filled up
                to the ceiling and there are very minimalistic 4-bedrooms. To help you determine the
                appropriate category for your move, we have prepared a guide that outlines typical
                items found in each option provided on the reservation form. By comparing your
                belongings to the items listed, you can make an informed decision about the size of
                your move. Here are the categories along with their corresponding typical items
              </p>
              <div className="mx-5 px-5">
                <img
                  className="img-fluid framed-image"
                  src="src/img/how-to-estimate-move-size.jpg"
                />
              </div>

              <section className="pt-3">
                <div className="row">
                  <div className="col">
                    <h5 className="my-1">Few Items</h5>
                  </div>
                  <div className="col">
                    <p className="my-1">(Estimated time &lt; 3 hrs for 2 movers)</p>
                  </div>
                  <div className="px-5 small">
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      <li>A small number of boxes (5-10)</li>
                      <li>
                        Lightweight furniture or small appliances (e.g., a microwave, small side
                        table, folding chairs)
                      </li>
                      <li>Minimal personal belongings</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="pt-3">
                <div className="row">
                  <div className="col">
                    <h5 className="my-1">Studio</h5>
                  </div>
                  <div className="col">
                    <p className="my-1">(Estimated time 3 hrs for 2 movers)</p>
                  </div>
                  <div className="px-5 small">
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      <li>TV</li>
                      <li>Bed and mattress</li>
                      <li>Couch or loveseat</li>
                      <li>Dresser or chest of drawers</li>
                      <li>Small closet</li>
                      <li>Desk and chair</li>
                      <li>15-20 boxes</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="pt-3">
                <div className="row">
                  <div className="col">
                    <h5 className="my-1">1-Bedroom</h5>
                  </div>
                  <div className="col">
                    <p className="my-1">(Estimated time 3-4 hrs for 2 movers)</p>
                  </div>
                  <div className="px-5 small">
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      <li>TV</li>
                      <li>Bed and mattress</li>
                      <li>Sofa or sectional</li>
                      <li>Coffee table</li>
                      <li>Dining table with chairs</li>
                      <li>Dresser or chest of drawers</li>
                      <li>Medium-sized closet</li>
                      <li>Desk and chair</li>
                      <li>20-30 boxes</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="pt-3">
                <div className="row">
                  <div className="col">
                    <h5 className="my-1">2-Bedroom</h5>
                  </div>
                  <div className="col">
                    <p className="my-1">(Estimated time 4-6 hrs for 3 movers)</p>
                  </div>
                  <div className="px-5 small">
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      <li>Multiple TVs</li>
                      <li>Two beds and mattresses</li>
                      <li>Sofa or sectional</li>
                      <li>Coffee table</li>
                      <li>Dining table with chairs</li>
                      <li>Dressers or chests of drawers</li>
                      <li>Larger closets</li>
                      <li>Desk and chair</li>
                      <li>Bookshelves</li>
                      <li>Grill</li>
                      <li>Large sports equipment such as a treadmill or Peloton bike</li>
                      <li>Large appliances such as Washer, Dryer, or Fridge</li>
                      <li>30-40 boxes</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="pt-3">
                <div className="row">
                  <div className="col">
                    <h5 className="my-1">3-Bedroom</h5>
                  </div>
                  <div className="col">
                    <p className="my-1">(Estimated time 5+ hrs for 4 movers)</p>
                  </div>
                  <div className="px-5 small">
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      <li>Multiple TVs</li>
                      <li>Beds and mattresses</li>
                      <li>Sofas or sectionals</li>
                      <li>Coffee tables and side tables</li>
                      <li>Dining table with chairs</li>
                      <li>Dressers or chests of drawers</li>
                      <li>Wardrobes or larger closets</li>
                      <li>Desks and chairs</li>
                      <li>Bookshelves</li>
                      <li>Grill</li>
                      <li>Large sports equipment such as a treadmill or Peloton bike</li>
                      <li>Large appliances such as Washer, Dryer, or Fridge</li>
                      <li>40-50 boxes</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="pt-3">
                <div className="row">
                  <div className="col">
                    <h5 className="my-1">Small Storage (8x10)</h5>
                  </div>
                  <div className="col">
                    <p className="my-1">(Estimated time &lt; 3 hrs for 2 movers)</p>
                  </div>
                </div>
              </section>

              <section className="pt-3">
                <div className="row">
                  <div className="col">
                    <h5 className="my-1">Medium Storage (10x15)</h5>
                  </div>
                  <div className="col">
                    <p className="my-1">(Estimated time 3-4 hrs for 2 movers)</p>
                  </div>
                </div>
              </section>

              <section className="pt-3">
                <div className="row">
                  <div className="col">
                    <h5 className="my-1">Large Storage (10x20)</h5>
                  </div>
                  <div className="col">
                    <p className="my-1">(Estimated time 5 hrs for 3 movers)</p>
                  </div>
                </div>
              </section>

              <section className="small pt-5">
                <p>
                  If you require packing service add additional mover or expect additional 2 hours
                </p>
                <p>
                  Please note that the above list provides general guidelines, and individual
                  circumstances may vary. You may have more or fewer items depending on your
                  specific situation.
                </p>
                <p>
                  By comparing your belongings to the typical items listed for each category, you
                  can select the option that best represents the size of your move. This will help
                  you communicate your requirements to the moving company accurately and ensure a
                  smooth and efficient moving experience.
                </p>
                <p>
                  <b>
                    Remember, it's always better to overestimate than underestimate the size of your
                    move to avoid any potential complications on moving day.
                  </b>
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
                <a href="blog-what-to-expect" className="post-link">
                  <img
                    src="src/img/kz2-moving-company-residential-moving.png"
                    className="img-fluid framed-image"
                  />
                  <h6>What to expect from your movers</h6>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Blog_estimate_move_size;
