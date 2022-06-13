import React from "react";

function Categories() {
  return (
    <div className="p-4 text-white w-auto bg-primary-light ">
      <div className="tracking-wide flex justify-center">
        <div className="flex">
          <h2 className="mr-2">Categories</h2>

          <button className="rounded-full bg-primary-turqoise w-5 h-5 text-center m-auto flex flex-col  justify-center">
            <div className="m-auto">+</div>
          </button>
        </div>
      </div>
      <div className="mt-6 text-sm">
        <ul>
          <li className="my-2">House Music</li>
          <li className="my-2">Industrial Reggae</li>
          <li className="my-2">DnB</li>
        </ul>
      </div>
    </div>
  );
}

export default Categories;
