import AnimatedImg from '../components/AnimatedImg';

const Home = () => {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[1200px] w-full">
        <div
          className="w-full bg-gradient-to-r from-[#AEAEAE]/80 via-[#AEAEAE]/40
        to-transparent rounded-xl shadow-md py-4 px-6 relative"
        >
          <div
            className="text-center flex flex-col justify-center xl:pt-20 
          xl:text-left p-[45px] min-h-[60vh]"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D2D2D] mb-4">
              Learn Web Development <br /> with{' '}
              <span className="text-[#00DBDB]">Our App</span>
            </h1>
            <p className="text-sm sm:text-base max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-6 xl:mb-8 text-[#2D2D2D]">
              Мы собрали здесь самые часто используемые <br />
              HTML тэги, CSS классы, JS..
            </p>
            <div className="flex justify-center xl:justify-start">
              <AnimatedImg />
            </div>
          </div>

          <div className="hidden xl:block absolute top-1/2 right-6 -translate-y-1/2 home-img-glow">
            <img
              src="/homeImg.png"
              alt="Home illustration"
              className="max-w-[600px] max-h-[700px] object-contain"
            />
          </div>

          <div className="hidden xl:block absolute top-85 right-55 rotate-45 -translate-y-1/2">
            <div className="absolute -top-20 -left-12 transform rotate-12">
              <img
                src="/HTMLImg.png"
                alt="HTML"
                className="w-[55px] h-[55px] object-contain"
                style={{
                  width: '55px',
                  height: '55px',
                  minWidth: '55px',
                  minHeight: '55px',
                }}
              />
            </div>
            <div className="absolute -top-5 -right-9 transform -rotate-6">
              <img
                src="/CSSImg.png"
                alt="CSS"
                className="w-[55px] h-[55px] object-contain"
                style={{
                  width: '55px',
                  height: '55px',
                  minWidth: '55px',
                  minHeight: '55px',
                }}
              />
            </div>
            <div className="absolute top-0 -left-20 transform rotate-45">
              <img
                src="/JSImg.png"
                alt="JavaScript"
                className="w-[55px] h-[55px] object-contain"
                style={{
                  width: '55px',
                  height: '55px',
                  minWidth: '55px',
                  minHeight: '55px',
                }}
              />
            </div>
            <div className="absolute top-10 -right-16 transform -rotate-15">
              <img
                src="/tsImg.png"
                alt="TypeScript"
                className="w-[55px] h-[55px] object-contain"
                style={{
                  width: '55px',
                  height: '55px',
                  minWidth: '55px',
                  minHeight: '55px',
                }}
              />
            </div>
            <div className="absolute top-20 -left-13 transform rotate-8">
              <img
                src="/tailwindImg.png"
                alt="Tailwind"
                className="w-[55px] h-[55px] object-contain"
                style={{
                  width: '55px',
                  height: '55px',
                  minWidth: '55px',
                  minHeight: '55px',
                }}
              />
            </div>
            <div className="absolute top-33 -right-13 transform -rotate-25">
              <img
                src="/ReacktImg.png"
                alt="React"
                className="w-[55px] h-[55px] object-contain"
                style={{
                  width: '55px',
                  height: '55px',
                  minWidth: '55px',
                  minHeight: '55px',
                }}
              />
            </div>
            <div className="absolute top-40 -left-16 transform rotate-30">
              <img
                src="/nextImg.png"
                alt="Next.js"
                className="w-[55px] h-[55px] object-contain"
                style={{
                  width: '55px',
                  height: '55px',
                  minWidth: '55px',
                  minHeight: '55px',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

export default Home;