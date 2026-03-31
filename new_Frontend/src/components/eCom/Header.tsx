import HeaderImg from "@assets/images/header_img.png";
const Header = () => {
  return (
    <div className="relative">
      <img
        src={HeaderImg}
        className="object-cover overflow-hidden"
        alt="Header Image"
      />
      <div className="h-full md:h-auto absolute left-0 bottom-0 p-4 md:p-10 text-white max-w-3/4 md:max-w-1/2">
        <h2 className="text-xl md:text-6xl font-bold mb-4">
          Order your favourite food here
        </h2>
        <p className="text-2xl hidden md:block">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          dolorem, dicta itaque iure fugiat architecto.
        </p>
        <button className="bg-white text-primary text-sm md:text-base px-6 py-2 md:py-3 rounded-full md:mt-6 cursor-pointer font-semibold">
          View Menu
        </button>
      </div>
    </div>
  );
};

export default Header;
