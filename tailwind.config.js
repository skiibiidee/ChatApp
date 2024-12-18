/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html"],
  safelist: [
    // Background colors from 100 to 900
    "bg-blue-100",
    "bg-blue-200",
    "bg-blue-300",
    "bg-blue-400",
    "bg-blue-500",
    "bg-blue-600",
    "bg-blue-700",
    "bg-blue-800",
    "bg-blue-900",
    "bg-slate-100",
    "bg-slate-200",
    "bg-slate-300",
    "bg-slate-400",
    "bg-slate-500",
    "bg-slate-600",
    "bg-slate-700",
    "bg-slate-800",
    "bg-slate-900",
    "bg-gray-100",
    "bg-gray-200",
    "bg-gray-300",
    "bg-gray-400",
    "bg-gray-500",
    "bg-gray-600",
    "bg-gray-700",
    "bg-gray-800",
    "bg-gray-900",
    "bg-zinc-100",
    "bg-zinc-200",
    "bg-zinc-300",
    "bg-zinc-400",
    "bg-zinc-500",
    "bg-zinc-600",
    "bg-zinc-700",
    "bg-zinc-800",
    "bg-zinc-900",
    "bg-neutral-100",
    "bg-neutral-200",
    "bg-neutral-300",
    "bg-neutral-400",
    "bg-neutral-500",
    "bg-neutral-600",
    "bg-neutral-700",
    "bg-neutral-800",
    "bg-neutral-900",
    "bg-stone-100",
    "bg-stone-200",
    "bg-stone-300",
    "bg-stone-400",
    "bg-stone-500",
    "bg-stone-600",
    "bg-stone-700",
    "bg-stone-800",
    "bg-stone-900",
    "bg-red-100",
    "bg-red-200",
    "bg-red-300",
    "bg-red-400",
    "bg-red-500",
    "bg-red-600",
    "bg-red-700",
    "bg-red-800",
    "bg-red-900",
    "bg-orange-100",
    "bg-orange-200",
    "bg-orange-300",
    "bg-orange-400",
    "bg-orange-500",
    "bg-orange-600",
    "bg-orange-700",
    "bg-orange-800",
    "bg-orange-900",
    "bg-amber-100",
    "bg-amber-200",
    "bg-amber-300",
    "bg-amber-400",
    "bg-amber-500",
    "bg-amber-600",
    "bg-amber-700",
    "bg-amber-800",
    "bg-amber-900",
    "bg-yellow-100",
    "bg-yellow-200",
    "bg-yellow-300",
    "bg-yellow-400",
    "bg-yellow-500",
    "bg-yellow-600",
    "bg-yellow-700",
    "bg-yellow-800",
    "bg-yellow-900",
    "bg-lime-100",
    "bg-lime-200",
    "bg-lime-300",
    "bg-lime-400",
    "bg-lime-500",
    "bg-lime-600",
    "bg-lime-700",
    "bg-lime-800",
    "bg-lime-900",
    "bg-green-100",
    "bg-green-200",
    "bg-green-300",
    "bg-green-400",
    "bg-green-500",
    "bg-green-600",
    "bg-green-700",
    "bg-green-800",
    "bg-green-900",
    "bg-emerald-100",
    "bg-emerald-200",
    "bg-emerald-300",
    "bg-emerald-400",
    "bg-emerald-500",
    "bg-emerald-600",
    "bg-emerald-700",
    "bg-emerald-800",
    "bg-emerald-900",
    "bg-teal-100",
    "bg-teal-200",
    "bg-teal-300",
    "bg-teal-400",
    "bg-teal-500",
    "bg-teal-600",
    "bg-teal-700",
    "bg-teal-800",
    "bg-teal-900",
    "bg-cyan-100",
    "bg-cyan-200",
    "bg-cyan-300",
    "bg-cyan-400",
    "bg-cyan-500",
    "bg-cyan-600",
    "bg-cyan-700",
    "bg-cyan-800",
    "bg-cyan-900",
    "bg-sky-100",
    "bg-sky-200",
    "bg-sky-300",
    "bg-sky-400",
    "bg-sky-500",
    "bg-sky-600",
    "bg-sky-700",
    "bg-sky-800",
    "bg-sky-900",
    "bg-black-100",
    "bg-black-200",
    "bg-black-300",
    "bg-black-400",
    "bg-black-500",
    "bg-black-600",
    "bg-black-700",
    "bg-black-800",
    "bg-black-900",
    "bg-white-100",
    "bg-white-200",
    "bg-white-300",
    "bg-white-400",
    "bg-white-500",
    "bg-white-600",
    "bg-white-700",
    "bg-white-800",
    "bg-white-900",

    "text-blue-100",
    "text-blue-200",
    "text-blue-300",
    "text-blue-400",
    "text-blue-500",
    "text-blue-600",
    "text-blue-700",
    "text-blue-800",
    "text-blue-900",
    "text-slate-100",
    "text-slate-200",
    "text-slate-300",
    "text-slate-400",
    "text-slate-500",
    "text-slate-600",
    "text-slate-700",
    "text-slate-800",
    "text-slate-900",
    "text-gray-100",
    "text-gray-200",
    "text-gray-300",
    "text-gray-400",
    "text-gray-500",
    "text-gray-600",
    "text-gray-700",
    "text-gray-800",
    "text-gray-900",
    "text-zinc-100",
    "text-zinc-200",
    "text-zinc-300",
    "text-zinc-400",
    "text-zinc-500",
    "text-zinc-600",
    "text-zinc-700",
    "text-zinc-800",
    "text-zinc-900",
    "text-neutral-100",
    "text-neutral-200",
    "text-neutral-300",
    "text-neutral-400",
    "text-neutral-500",
    "text-neutral-600",
    "text-neutral-700",
    "text-neutral-800",
    "text-neutral-900",
    "text-stone-100",
    "text-stone-200",
    "text-stone-300",
    "text-stone-400",
    "text-stone-500",
    "text-stone-600",
    "text-stone-700",
    "text-stone-800",
    "text-stone-900",
    "text-red-100",
    "text-red-200",
    "text-red-300",
    "text-red-400",
    "text-red-500",
    "text-red-600",
    "text-red-700",
    "text-red-800",
    "text-red-900",
    "text-orange-100",
    "text-orange-200",
    "text-orange-300",
    "text-orange-400",
    "text-orange-500",
    "text-orange-600",
    "text-orange-700",
    "text-orange-800",
    "text-orange-900",
    "text-amber-100",
    "text-amber-200",
    "text-amber-300",
    "text-amber-400",
    "text-amber-500",
    "text-amber-600",
    "text-amber-700",
    "text-amber-800",
    "text-amber-900",
    "text-yellow-100",
    "text-yellow-200",
    "text-yellow-300",
    "text-yellow-400",
    "text-yellow-500",
    "text-yellow-600",
    "text-yellow-700",
    "text-yellow-800",
    "text-yellow-900",
    "text-lime-100",
    "text-lime-200",
    "text-lime-300",
    "text-lime-400",
    "text-lime-500",
    "text-lime-600",
    "text-lime-700",
    "text-lime-800",
    "text-lime-900",
    "text-green-100",
    "text-green-200",
    "text-green-300",
    "text-green-400",
    "text-green-500",
    "text-green-600",
    "text-green-700",
    "text-green-800",
    "text-green-900",
    "text-emerald-100",
    "text-emerald-200",
    "text-emerald-300",
    "text-emerald-400",
    "text-emerald-500",
    "text-emerald-600",
    "text-emerald-700",
    "text-emerald-800",
    "text-emerald-900",
    "text-teal-100",
    "text-teal-200",
    "text-teal-300",
    "text-teal-400",
    "text-teal-500",
    "text-teal-600",
    "text-teal-700",
    "text-teal-800",
    "text-teal-900",
    "text-cyan-100",
    "text-cyan-200",
    "text-cyan-300",
    "text-cyan-400",
    "text-cyan-500",
    "text-cyan-600",
    "text-cyan-700",
    "text-cyan-800",
    "text-cyan-900",
    "text-sky-100",
    "text-sky-200",
    "text-sky-300",
    "text-sky-400",
    "text-sky-500",
    "text-sky-600",
    "text-sky-700",
    "text-sky-800",
    "text-sky-900",
    "text-black-100",
    "text-black-200",
    "text-black-300",
    "text-black-400",
    "text-black-500",
    "text-black-600",
    "text-black-700",
    "text-black-800",
    "text-black-900",
    "text-white-100",
    "text-white-200",
    "text-white-300",
    "text-white-400",
    "text-white-500",
    "text-white-600",
    "text-white-700",
    "text-white-800",
    "text-white-900",

    // Border colors from 100 to 900
    "border-blue-100",
    "border-blue-200",
    "border-blue-300",
    "border-blue-400",
    "border-blue-500",
    "border-blue-600",
    "border-blue-700",
    "border-blue-800",
    "border-blue-900",
    "border-slate-100",
    "border-slate-200",
    "border-slate-300",
    "border-slate-400",
    "border-slate-500",
    "border-slate-600",
    "border-slate-700",
    "border-slate-800",
    "border-slate-900",
    "border-gray-100",
    "border-gray-200",
    "border-gray-300",
    "border-gray-400",
    "border-gray-500",
    "border-gray-600",
    "border-gray-700",
    "border-gray-800",
    "border-gray-900",
    "border-zinc-100",
    "border-zinc-200",
    "border-zinc-300",
    "border-zinc-400",
    "border-zinc-500",
    "border-zinc-600",
    "border-zinc-700",
    "border-zinc-800",
    "border-zinc-900",
    "border-neutral-100",
    "border-neutral-200",
    "border-neutral-300",
    "border-neutral-400",
    "border-neutral-500",
    "border-neutral-600",
    "border-neutral-700",
    "border-neutral-800",
    "border-neutral-900",
    "border-stone-100",
    "border-stone-200",
    "border-stone-300",
    "border-stone-400",
    "border-stone-500",
    "border-stone-600",
    "border-stone-700",
    "border-stone-800",
    "border-stone-900",
    "border-red-100",
    "border-red-200",
    "border-red-300",
    "border-red-400",
    "border-red-500",
    "border-red-600",
    "border-red-700",
    "border-red-800",
    "border-red-900",
    "border-orange-100",
    "border-orange-200",
    "border-orange-300",
    "border-orange-400",
    "border-orange-500",
    "border-orange-600",
    "border-orange-700",
    "border-orange-800",
    "border-orange-900",
    "border-amber-100",
    "border-amber-200",
    "border-amber-300",
    "border-amber-400",
    "border-amber-500",
    "border-amber-600",
    "border-amber-700",
    "border-amber-800",
    "border-amber-900",
    "border-yellow-100",
    "border-yellow-200",
    "border-yellow-300",
    "border-yellow-400",
    "border-yellow-500",
    "border-yellow-600",
    "border-yellow-700",
    "border-yellow-800",
    "border-yellow-900",
    "border-lime-100",
    "border-lime-200",
    "border-lime-300",
    "border-lime-400",
    "border-lime-500",
    "border-lime-600",
    "border-lime-700",
    "border-lime-800",
    "border-lime-900",
    "border-green-100",
    "border-green-200",
    "border-green-300",
    "border-green-400",
    "border-green-500",
    "border-green-600",
    "border-green-700",
    "border-green-800",
    "border-green-900",
    "border-emerald-100",
    "border-emerald-200",
    "border-emerald-300",
    "border-emerald-400",
    "border-emerald-500",
    "border-emerald-600",
    "border-emerald-700",
    "border-emerald-800",
    "border-emerald-900",
    "border-teal-100",
    "border-teal-200",
    "border-teal-300",
    "border-teal-400",
    "border-teal-500",
    "border-teal-600",
    "border-teal-700",
    "border-teal-800",
    "border-teal-900",
    "border-cyan-100",
    "border-cyan-200",
    "border-cyan-300",
    "border-cyan-400",
    "border-cyan-500",
    "border-cyan-600",
    "border-cyan-700",
    "border-cyan-800",
    "border-cyan-900",
    "border-sky-100",
    "border-sky-200",
    "border-sky-300",
    "border-sky-400",
    "border-sky-500",
    "border-sky-600",
    "border-sky-700",
    "border-sky-800",
    "border-sky-900",
    "border-black-100",
    "border-black-200",
    "border-black-300",
    "border-black-400",
    "border-black-500",
    "border-black-600",
    "border-black-700",
    "border-black-800",
    "border-black-900",
    "border-white-100",
    "border-white-200",
    "border-white-300",
    "border-white-400",
    "border-white-500",
    "border-white-600",
    "border-white-700",
    "border-white-800",
    "border-white-900",
    "bg-opacity-100",
    "bg-opacity-95",
    "bg-opacity-90",
    "bg-opacity-85",
    "bg-opacity-80",
    "bg-opacity-75",
    "bg-opacity-70",
    "bg-opacity-65",
    "bg-opacity-60",
    "bg-opacity-55",
    "bg-opacity-50",
    "bg-opacity-45",
    "bg-opacity-40",
    "bg-opacity-35",
    "bg-opacity-30",
    "bg-opacity-25",
    "bg-opacity-20",
    "bg-opacity-15",
    "bg-opacity-10",
  ],
  theme: {
    extend: {
      colors: {
        "white": {
          "900": "#ffffff",
          "800": "#efefef",
          "700": "#dfdfdf",
          "600": "#cfcfcf",
          "500": "#bfbfbf",
          "400": "#afafaf",
          "300": "#9f9f9f",
          "200": "#8f8f8f",
          "100": "#7f7f7f",
        },
        "black": {
          "100": "#808080",
          "200": "#707070",
          "300": "#606060",
          "400": "#505050",
          "500": "#404040",
          "600": "#303030",
          "700": "#202020",
          "800": "#101010",
          "900": "#000000",
        },
      },
    },
  },
  plugins: [],
};
