const Loader = () => {
  return (
    <>
    <div className="fixed top-0 left-0 w-full h-full z-[999] ">
      <div className="w-full h-full  flex items-center justify-center relative">
        <div className="absolute top-0 left-0 w-full h-full bg-gray-400 opacity-50"></div>
        <div className="loadingio-spinner-ripple-2by998twmg8">
          <div className="ldio-yzaezf3dcmj">
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
      <style type="text/css">
        {`
        @keyframes ldio-yzaezf3dcmj {
          0% {
            top: 96px;
            left: 96px;
            width: 0;
            height: 0;
            opacity: 1;
          }
          100% {
            top: 18px;
            left: 18px;
            width: 156px;
            height: 156px;
            opacity: 0;
          }
        }
        .ldio-yzaezf3dcmj div {
          position: absolute;
          border-width: 4px;
          border-style: solid;
          opacity: 1;
          border-radius: 50%;
          animation: ldio-yzaezf3dcmj 1.47s cubic-bezier(0, 0.2, 0.8, 1) infinite;
        }
        .ldio-yzaezf3dcmj div:nth-child(1) {
          border-color: #e90c59;
          animation-delay: 0s;
        }
        .ldio-yzaezf3dcmj div:nth-child(2) {
          border-color: #46dff0;
          animation-delay: -0.735s;
        }
        .loadingio-spinner-ripple-2by998twmg8 {
          width: 200px;
          height: 200px;
          display: inline-block;
          overflow: hidden;
          background: transparent;
        }
        .ldio-yzaezf3dcmj {
          width: 100%;
          height: 100%;
          position: relative;
          transform: translateZ(0) scale(1);
          backface-visibility: hidden;
          transform-origin: 0 0;
        }
        .ldio-yzaezf3dcmj div {
          box-sizing: content-box;
        }
        `}
      </style>
    </>
  );
};

export default Loader;
