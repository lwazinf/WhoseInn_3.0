interface Home_Props {}

const Home_ = ({}: Home_Props) => {
  return (
    <div
      className={`w-[360px] ml-auto h-full flex flex-col justify-center items-center`}
    >
      <div
        className={`m-auto flex flex-col items-center justify-start h-screen w-full overflow-hidden overflow-y-scroll pb-[50px] duration-200 transition-all pr-1`}
      >
        <div
          className={`w-full h-[550px] rounded-[4px] flex flex-col justify-center items-center mt-1 mb-0 bg-black/80 cursor-pointer`}
        ></div>
        {/* <div
          className={`w-full min-h-[150px] flex flex-col justify-center items-center mt-2`}
        >
          <p className={`text-black/80 text-[17px] font-black`}>
            Bookmarks: <span className={`font-normal`}>8</span>
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default Home_;
