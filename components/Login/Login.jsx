import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

import show from "@/public/icons/show.svg";
import hide from "@/public/icons/hide.svg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-6"
    >
      <h3 className="text-[1.5rem]">Iniciar sesión</h3>
      <div className="flex flex-col">
        <label
          className={clsx("text-[#171717] text-[1rem]", {
            "text-red-700": errors.email,
          })}
        >
          Correo electrónico
        </label>
        <input
          className={clsx(
            "bg-white p-[0.5rem] h-[2.5rem] rounded-[5px] border border-[#d4d4d4] focus:border-black focus:outline-none",
            {
              "border-red-700": errors.email,
            }
          )}
          type="text"
          placeholder="Ingresa tu correo electrónico"
          {...register("email", {
            required: {
              value: true,
              message: "Ingresa un correo electrónico",
            },
          })}
        />
        {errors.email && (
          <span className="text-[14px] text-red-700">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label
          className={clsx("text-[#171717] text-[1rem] ", {
            "text-red-700": errors.email,
          })}
        >
          Contraseña
        </label>
        <div className="relative">
          <input
            className={clsx(
              "bg-white w-full  p-[0.5rem] h-[2.5rem] rounded-[5px] border border-[#d4d4d4] focus:border-black focus:outline-none",
              {
                "border-red-700 ": errors.password,
              }
            )}
            type={showPassword ? "text" : "password"}
            placeholder="Ingresa tu contraseña"
            {...register("password", {
              required: {
                value: true,
                message: "Ingresa tu contraseña",
              },
            })}
          />
          <button
            className="absolute right-2 top-2"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Image
              src={showPassword ? show : hide}
              alt="parrot"
              width={25}
              height={25}
            />
          </button>
        </div>

        {errors.password && (
          <span className="text-[14px] text-red-700">
            {errors.password.message}
          </span>
        )}
      </div>
      <label className="flex text-[0.75rem]">
        <input type="checkbox" />
        <span className="ml-2">
          He leído y acepto los{" "}
          <Link
            className="text-[#44AEC9]"
            href="https://docs.google.com/document/d/e/2PACX-1vS0_C-Wv8LejXzwH-nolsw9fEggVOTZcoaPUP3l8VKqrKh80sUBgKvTS9mJB7qL9w/pub"
          >
            Términos y condiciones.
          </Link>
        </span>
      </label>
      <button
        className="h-[48px] bg-[#D9D9D9] w-full sm:w-[8.5rem] mt-2 text-white rounded-[5px]"
        type="submit"
      >
        Iniciar sesión
      </button>
    </form>
  );
}
