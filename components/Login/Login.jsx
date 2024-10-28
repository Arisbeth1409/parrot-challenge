import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { AppContext } from "@/context/AppContext";

import Link from "next/link";
import clsx from "clsx";
import Image from "next/image";

import show from "@/public/icons/show.svg";
import hide from "@/public/icons/hide.svg";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { state, login } = useContext(AppContext);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm();

  useEffect(() => {
    if (state.isAuthenticated) {
      router.push("/store");
    } else {
      router.push("/");
    }
  }, [state.isAuthenticated]);

  async function onSubmit(data) {
    login(data.email, data.password);
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
        <input
          {...register("checkbox", {
            required: {
              value: true,
            },
          })}
          type="checkbox"
        />
        <span
          className={clsx("ml-2", {
            "text-red-700": errors.checkbox,
          })}
        >
          He leído y acepto los{" "}
          <Link
            className={clsx("text-[#44AEC9]", {
              "text-red-700": errors.checkbox,
            })}
            href="https://docs.google.com/document/d/e/2PACX-1vS0_C-Wv8LejXzwH-nolsw9fEggVOTZcoaPUP3l8VKqrKh80sUBgKvTS9mJB7qL9w/pub"
          >
            Términos y condiciones.
          </Link>
        </span>
      </label>
      <button
        className={clsx(
          "h-[48px] flex justify-center items-center bg-[#D9D9D9] w-full sm:w-[8.5rem] mt-2 text-white rounded-[5px]",
          {
            "bg-black": isValid,
          }
        )}
        type="submit"
        disabled={!isValid}
      >
        {state.isLoaging ? (
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="#ffffff"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        ) : (
          "Iniciar sesión"
        )}
      </button>
    </form>
  );
}
