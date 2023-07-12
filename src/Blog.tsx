import React from "react";
import Base from "./Base";
import "./All.css";
import "./Blog.css";

const Blog: React.FC = () => {
  const Post: React.FC<{
    ref_link: string;
    img_src: string;
    img_alt: string;
    post_label: string;
    preview: string;
  }> = ({ ref_link: ref, img_src, img_alt, post_label, preview }) => {
    return (
      <section>
        <a className="post-link" href={ref}>
          <div className="row">
            <div className="col-6">
              <img src={img_src} alt={img_alt} className="img-fluid framed-image" />
            </div>
            <div className="col-6">
              <p className="reading-time">reading time: 3 min</p>
              <h4 className="py-3">{post_label}</h4>
              <p className="truncated-text small">{preview}</p>
            </div>
          </div>
        </a>
      </section>
    );
  };

  return (
    <Base>
      <div className="stripe-blue">
        <div className="content-div px-5 narrow">
          <h2 className="py-3">All About Moving</h2>
          <Post
            ref_link="blog-estimate-move-size"
            img_src="src/img/how-to-estimate-move-size.webp"
            img_alt="estimate the move size"
            post_label="How to estimate your move size"
            preview="We are all unique and so are our lifestyles and homes. The size of your space is not always a good way of estimating the size of your move. There are Studios filled up to the ceiling and there are very minimalistic 4-bedrooms. To help you determine the appropriate category for your move, we have prepared a guide that outlines typical items found in each option provided on the reservation form."
          />
          <Post
            ref_link="blog-what-to-expect"
            img_src="src/img/kz2-moving-company-residential-moving.webp"
            img_alt="what to expect from your movers"
            post_label="What to expect from your movers"
            preview="If you are moving for the first time, you probably have a lot of questions. Don't worry, you are not alone. In this article, we will try to explain what to expect from your KZ2 Moving Company team."
          />
          <Post
            ref_link="blog-how-to-prepare"
            img_src="src/img/preparing-for-moving.webp"
            img_alt="how to prepare for your move"
            post_label="How to prepare for a move"
            preview="With the right preparation, your move can be much easier to handle. In this article, we'll take a look at some tips and tricks to help you prepare for your move. If you haven't chosen a moving company yet, we recommend you start with our How to Choose a Moving Company article"
          />
          <Post
            ref_link="blog-how-to-choose-moving-company"
            img_src="src/img/kz2-moving-company-heavy-items-moving.webp"
            img_alt="how to choose a moving company"
            post_label="How to choose a moving company"
            preview="Moving can be a daunting task, but choosing the right moving company can make all the difference. Whether you are moving across town or across the country, finding an affordable and reliable moving company is crucial to a successful move. Here are some tips to help you choose the best moving company for your needs."
          />
          <Post
            ref_link="blog-hire-movers-or-rent-uhaul"
            img_src="src/img/movers-or-uhaul.webp"
            img_alt="Rent U-Haul or Hire Movers?"
            post_label="Rent U-Haul or Hire Movers?"
            preview="Let's face it, moving can be costly. Trying to be frugal, many people wonder whether they should hire professional movers or just rent a truck and move with the help of their friends."
          />
        </div>
      </div>
    </Base>
  );
};

export default Blog;
