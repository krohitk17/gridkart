import React from "react";

const methodStyle =
  "bg-gray-100 rounded-lg h-30 w-full p-4 hover:bg-gray-300 mb-2 font-semibold";
const valueStyleGreen = "ml-auto text-green-500 font-bold";
const valueStyleRed = "ml-auto text-red-500 font-bold";

function Transactions() {
  return (
    <>
      <div className="bg-white shadow-lg p-4 min-w-[55em]">
        <div className="font-bold text-lg pb-5">Your Transaction History:</div>

        <div className="pt-2 flex-row">
          <div>
            <button className={methodStyle}>
              <div className="flex">
                <a
                  href="https://etherscan.io/tx/0xf02f1febc87c90676766fa90009b81fade30b6fbced567b0017ba81735a70557"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    0xf02f1febc87c90676766fa90009b81fade30b6fbced567b0017ba81735a70557
                  </div>
                </a>
                <div className={valueStyleGreen}>+10</div>
              </div>
            </button>
          </div>
          <div>
            <button className={methodStyle}>
              <div className="flex">
                <a
                  href="https://etherscan.io/tx/0xf02f1febc87c90676766fa90009b81fade30b6fbced567b0017ba81735a70557"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    0xf02f1febc87c90676766fa90009b81fade30b6fbced567b0017ba812ve3d623h
                  </div>
                </a>
                <div className={valueStyleGreen}>+20</div>
              </div>
            </button>
          </div>
          <div>
            <button className={methodStyle}>
              <div className="flex">
                <a
                  href="https://etherscan.io/tx/0xf02f1febc87c90676766fa90009b81fade30b6fbced567b0017ba81735a70557"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div>
                    0xf02f1febc87c90676766fa90009b81fade30b6fbced567b0017ba812ve3d6665
                  </div>
                </a>
                <div className={valueStyleRed}>-10</div>
              </div>
            </button>
          </div>
          <div>
            <button className={methodStyle}>
              <div className="flex">
                <div>
                  0xf02f1febc87c90676766fa90009b81fade30b6fbced567b0017ba812ve3d6665
                </div>
                <div className={valueStyleGreen}>+30</div>
              </div>
            </button>
          </div>
          <div>
            <button className={methodStyle}>
              <div className="flex">
                <div>
                  0xf02f1febc87c90676766fa90009b81fade30b6fbced567b0017ba812ve3d623h
                </div>
                <div className={valueStyleRed}>-20</div>
              </div>
            </button>
          </div>
          <div>
            <button className={methodStyle}>
              <div className="flex">
                <div>
                  0xf02f1febc87c90676766fa90009b81fade30b6fbced567b0017ba812ve3d6665
                </div>
                <div className={valueStyleRed}>-10</div>
              </div>
            </button>
          </div>
          <div>
            <button className={methodStyle}>
              <div className="flex">
                <div>
                  0xf02f1febc87c90676766fa90009b81fade30b6fbced567b0017ba812ve3d6665
                </div>
                <div className={valueStyleGreen}>+30</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Transactions;
