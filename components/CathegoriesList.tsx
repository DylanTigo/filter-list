"use client";

import { motion } from "motion/react";
import listClothes from "../constants/data.js";
import { useCallback, useState } from "react";
import { spring } from "motion";

type Cathegorie = {
  type: string;
  style: string;
};

const CathegoriesList = () => {
  const [selectedCathegories, setSelectedCathegories] = useState<Cathegorie[]>(
    []
  );
  
  const initiliazeCathegories = useCallback(( count : number ) => {
    if (count === 0) return;

    setTimeout(() => {
      setSelectedCathegories(arr => arr.slice(0, -1));

      initiliazeCathegories(count - 1);
    }, 5);

  }, []);

  const buttonVariants = {
    visible: {
      opacity: 1,
      scale: 1,
    },
    hidden: {
      opacity: 0,
      scale: 0,
    },
  };

  return (
    <div className="flex flex-col gap-2.5 p-4">
      <motion.div className="max-w-72 h-7 flex items-center gap-1" layout>
        <motion.button
          variants={buttonVariants}
          initial={false}
          animate={selectedCathegories.length ? "visible" : "hidden"}
          transition={spring}
          type="button"
          className="size-6 max-w-fit flex justify-center items-center rounded-sm bg-gray-200 cursor-pointer"
          onClick={() => initiliazeCathegories(selectedCathegories.length)}
          layout
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-600 size-3.5"
          >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
          </svg>
        </motion.button>

        {selectedCathegories.map((cathegorie) => (
          <motion.button
            key={cathegorie.type}
            layoutId={cathegorie.type}
            transition={spring}
            onClick={() =>
              setSelectedCathegories(
                selectedCathegories.filter(
                  (selectedCathegorie) =>
                    selectedCathegorie.type !== cathegorie.type
                )
              )
            }
            className={`text-nowrap inline-block w-fit px-3.5 py-0.5 rounded-sm text-sm font-medium cursor-pointer ${cathegorie.style}`}
          >
            {cathegorie.type}
          </motion.button>
        ))}
      </motion.div>
      <div className="w-72 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium">Select cathegories</span>
          <button
            type="button"
            className="size-6 flex justify-center items-center rounded-sm bg-gray-200 disabled:bg-gray-100 cursor-pointer group"
            onClick={() => initiliazeCathegories(selectedCathegories.length)}
            disabled={selectedCathegories.length <= 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-600 size-3.5 group-disabled:text-gray-300"
            >
              <path d="M21 6H3" />
              <path d="M7 12H3" />
              <path d="M7 18H3" />
              <path d="M12 18a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L11 14" />
              <path d="M11 10v4h4" />
            </svg>
          </button>
        </div>
        <motion.div className="flex flex-wrap gap-1">
          {listClothes
            .filter(
              (cathegorie) =>
                !selectedCathegories.find(
                  (selectedCathegorie) =>
                    selectedCathegorie.type === cathegorie.type
                )
            )
            .map((cathegorie) => (
              <motion.button
                key={cathegorie.type}
                transition={spring}
                onClick={() =>
                  setSelectedCathegories([...selectedCathegories, cathegorie])
                }
                layoutId={cathegorie.type}
                className={`text-nowrap inline-block w-fit px-3.5 py-0.5 rounded-sm text-sm font-medium cursor-pointer ${cathegorie.style}`}
              >
                {cathegorie.type}
              </motion.button>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CathegoriesList;
