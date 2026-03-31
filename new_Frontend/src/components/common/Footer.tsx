import FaceBookIcon from "@assets/icons/facebook_icon.png";
import TwitterIcon from "@assets/icons/twitter_icon.png";
import Logo from "@assets/images/logo.png";
const Footer = () => {
  return (
    <div className="flex flex-col items-center gap-5 bg-[#323232] px-[8vw] pt-20 pb-5 text-[#d9d9d9]">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-20 sm:gap-8.75">
        <div className="flex flex-col items-start gap-5 col-span-2">
          <img src={Logo} alt="logo" className="w-32" />
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum in,
            beatae dolorem non optio cupiditate, quam sunt dicta dolores minima
            exercitationem ducimus totam aut asperiores inventore harum
            laudantium. Distinctio, libero.
          </p>
          <div className="flex">
            <img src={FaceBookIcon} alt="facebook" className="w-10 mr-3.75" />
            <img src={TwitterIcon} alt="twitter" className="w-10 mr-3.75" />
          </div>
        </div>

        {/* Center */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white">COMPANY</h2>
          <ul>
            {["Home", "About us", "Delivery", "Privacy Policy"].map((item) => (
              <li
                key={item}
                className="mb-2.5 list-none cursor-pointer hover:text-white transition-colors"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Right */}
        <div className="flex flex-col items-start gap-5">
          <h2 className="text-white">GET IN TOUCH</h2>
          <ul>
            {["+94 765489545", "dulanjalisenarathna93@gmail.com"].map(
              (item) => (
                <li
                  key={item}
                  className="mb-2.5 list-none cursor-pointer hover:text-white transition-colors"
                >
                  {item}
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <hr className="w-full h-0.5 my-5 bg-gray-500 border-none" />

      <p className="sm:text-center">
        Copyright 2024 &copy; Dulanjali - All Right Reserved.
      </p>
    </div>
  );
};

export default Footer;
