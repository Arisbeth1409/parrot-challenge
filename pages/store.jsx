import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import MainLayout from "@/Layouts/MainLayout";
import { useRouter } from "next/router";

import Collapse from "@/components/Collapse/Collapse";

export default function Stores({ store, productsData }) {
  const [visible, setIsVisible] = useState(null);
  const { state, dispatch } = useContext(AppContext);
  const router = useRouter();

  const handleCollapse = (index) => {
    setIsVisible(visible === index ? null : index);
  };

  useEffect(() => {
    if (state.isAuthenticated) {
      router.push("/store");
    } else {
      router.push("/");
    }
  }, [state.isAuthenticated]);

  useEffect(() => {
    dispatch({ type: "SET_STORE", payload: store.result.stores[0] });
    dispatch({ type: "SET_PRODUCTS", payload: productsData.results });
  }, [store, productsData, dispatch]);

  const categoryIds = [
    ...new Set(state.products.map((item) => item.category.uuid)),
  ];

  const itemsGroup = categoryIds.map((uuid) => {
    return state.products.filter((item) => item.category.uuid === uuid);
  });

  return (
    <MainLayout>
      <main className="w-full pt-[6rem] max-w-[1440px] mx-auto">
        {itemsGroup.map((item, index) => {
          return (
            <Collapse
              onClick={() => handleCollapse(index)}
              isVisible={visible === index}
              title={item[0].category.name}
              item={item}
              key={index}
              totalItems={item.length}
            />
          );
        })}
      </main>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;

  const res = await fetch("https://api-staging.parrot.rest/api/v1/users/me", {
    headers: {
      Authorization: `Bearer ${req.cookies.token}`,
    },
  });
  const store = await res.json();
  const idStore = store?.result?.stores[0]?.uuid;
  if (!idStore) {
    return {
      notFound: true,
    };
  }
  const productsResponse = await fetch(
    `https://api-staging.parrot.rest/api/v1/products/?store=${idStore}`,
    {
      headers: { Authorization: `Bearer ${req.cookies.token}` },
    }
  );
  const productsData = await productsResponse.json();
  return {
    props: {
      store,
      productsData,
    },
  };
}
