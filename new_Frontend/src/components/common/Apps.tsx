import AppStore from "@assets/icons/app_store.png";
import GooglePlay from "@assets/icons/play_store.png";
const Apps = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl md:text-5xl max-w-2xl mb-6 font-bold text-center">
        For Better Experience Tomato App
      </h1>
      <div className="flex gap-4">
        <img src={AppStore} alt="App Store" className="w-40 cursor-pointer" />
        <img
          src={GooglePlay}
          alt="Google Play"
          className="w-40 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default Apps;
