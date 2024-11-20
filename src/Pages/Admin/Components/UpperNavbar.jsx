const UpperNav = () => {
    return (
      <div className="w-9/12 fixed ">
        {/* Search Bar */}
        <div className="w-full bg-white shadow-sm rounded-sm h-12 mr-3 mt-3 ml-2">
          <div className="h-full flex justify-between" id="SearchBar">
            <div id="SearchBar-container" className="w-1/2 h-full">
              <input
                type="text"
                className="w-full h-10 shadow-md pl-3 rounded-md mt-1 ml-2 focus:outline-none border border-gray-300"
                placeholder="Search student, Teachers"
              />
            </div>
  
            <div id="icon-container" className="flex gap-4 items-center mr-2">
              {/* Notification Icons */}
              <div className="relative flex items-center">
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    3
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
  
              <div className="relative flex items-center">
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    3
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25a.75.75 0 00.75-.75h-1.5a.75.75 0 00.75.75zm4.5 0a.75.75 0 00.75-.75h-1.5a.75.75 0 00.75.75zM6 20.25a.75.75 0 00.75-.75H4.5a.75.75 0 00.75.75z"
                  />
                </svg>
              </div>
  
              <div className="relative flex items-center">
                <div className="absolute -top-1 -right-1">
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    3
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M20.25 8.25v-3a3 3 0 00-3-3h-9a3 3 0 00-3 3v3"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  export default UpperNav;
  