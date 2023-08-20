import React from "react";
import RedeemItem from "./RedeemItem";

const addRewardButtonStyle =
  "ml-auto font-semibold bg-gray-300 p-2 rounded-lg hover:scale-110 transition duration-500 ease-in-out transform hover:cursor-pointer";

function Rewards() {
  return (
    <>
      <div className="bg-white shadow-lg p-4 w-[55em]">
        <div className="flex">
          <div className="font-bold text-lg">Uploaded Rewards:</div>
          <div className={addRewardButtonStyle}>Add Reward</div>
        </div>
        <div className="pt-2 flex flex-wrap justify-evenly ">
          {/* image of product */}
          <RedeemItem
            img="https://d1o7uku192uawx.cloudfront.net/mobile/media/catalog/product/3/1/312x200_flipkart.png"
            name="Flipkart Coupon"
            cost="50"
          />
          <RedeemItem
            img="https://cdn.grabon.in/gograbon/images/merchant/1611817594553.jpg"
            name="Zomato Coupon"
            cost="50"
          />
          <RedeemItem
            img="https://cdn.grabon.in/gograbon/images/merchant/1610000375685.png"
            name="Swiggy Coupon"
            cost="50"
          />
          <RedeemItem
            img="https://www.goindigo.in/content/dam/indigov2/6e-website/campaigns/sale/Landing-page-banner-mobile.jpg"
            name="Indigo Coupon"
            cost="50"
          />
          <RedeemItem
            img="https://d1o7uku192uawx.cloudfront.net/mobile/media/catalog/product/3/1/312x200_flipkart.png"
            name="Flipkart Coupon"
            cost="50"
          />
          <RedeemItem
            img="https://cdn.grabon.in/gograbon/images/merchant/1611817594553.jpg"
            name="Zomato Coupon"
            cost="50"
          />
          <RedeemItem
            img="https://cdn.grabon.in/gograbon/images/merchant/1610000375685.png"
            name="Swiggy Coupon"
            cost="50"
          />
          <RedeemItem
            img="https://www.goindigo.in/content/dam/indigov2/6e-website/campaigns/sale/Landing-page-banner-mobile.jpg"
            name="Indigo Coupon"
            cost="50"
          />
        </div>
      </div>
    </>
  );
}

export default Rewards;
