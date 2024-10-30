import Image from "next/image";

import Title from "../Title/Title";
import Product from "../Product/Product";

import chevronUp from "@/public/icons/chevron-up.svg";
import chevronDown from "@/public/icons/chevron-down.svg";

export default function Panel({ title, item, onClick, isVisible, totalItems }) {
  return (
    <section className="pl-5 pr-5 border-b-[1px]">
      <button
        onClick={onClick}
        className="flex justify-between w-full pt-2 pb-2 sm:pt-4 sm:pb-4"
      >
        <Title title={title} subtitle={totalItems} />
        {isVisible ? (
          <Image src={chevronDown} alt="chevrondown" width={25} height={25} />
        ) : (
          <Image src={chevronUp} alt="chevronup" width={25} height={25} />
        )}
      </button>
      {isVisible && (
        <div className="pl-8 sm:pl-40 pb-9 flex flex-col gap-5">
          {item.map((item, index) => {
            console.log(item);
            return <Product key={index} item={item} />;
          })}
        </div>
      )}
    </section>
  );
}
