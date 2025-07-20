import circleimg from '../../public/animatedHomePageImg.svg';

const AnimatedImg = () => {
  return (
    <div className="flex justify-center">
      <img
        className="animate-spin w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36"
        src={circleimg}
        alt="img"
      />
    </div>
  );
};

export default AnimatedImg;
