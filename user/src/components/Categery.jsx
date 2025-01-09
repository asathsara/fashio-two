import React from "react";

const Categery = ({ className, categeryName }) => {
  return (
    <div className={`${className} flex flex-col`}>
      <div className="flex flex-row">
        <p className="font-bold text-lg">{`${categeryName}'s`}</p>
        <p className="ml-4 text-lg font-bold text-transparent stroke-current">
          Collection
        </p>
      </div>
    </div>
  );
};

export default Categery;
