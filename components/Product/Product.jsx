import Image from "next/image";
import clsx from "clsx";

import check from "@/public/icons/check.svg";
import circle from "@/public/icons/x-circle.svg";

export default function Product({ item }) {
  const { name, price, imageUrl, availability } = item;

  let valueAvailability = availability.toLowerCase();

  return (
    <div className="flex items-center gap-3">
      <img src={imageUrl} alt={name} width={100} height={100} />
      <div className="text-[#6a6d77]">
        <h2 className="font-bold">{name}</h2>
        <span>{price}</span>
        <div className="flex items-center gap-2">
          <span
            className={clsx("text-[#171717] text-[1rem] ", {
              "text-red-800": valueAvailability === "unavailable",
              "text-green-800": valueAvailability === "available",
            })}
          >
            {availability}
          </span>
          {valueAvailability === "available" ? (
            <button>
              <Image src={check} alt="chevrondown" width={25} height={25} />
            </button>
          ) : (
            <button>
              <Image src={circle} alt="chevrondown" width={25} height={25} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
