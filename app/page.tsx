"use client";

import Title from "./components/Title";
import Subtitle from "./components/Subtitle";
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import MenuItems from "./components/MenuItems";
import useGetAppRouter from "./useGetAppRouter";

export default function Page() {
  const router = useGetAppRouter();

  return (
    <div className="w-2/3 m-auto">
      <div className="flex flex-col mb-8">
        <Title text="Bienvenue" style="tracking-widest" />
        <Subtitle text="dans le quizz de " style="tracking-widest" />
        <Title text="programmation fonctionnelle !" style="tracking-widest" />
      </div>
      <div className="flex flex-row gap-4 align-baseline">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push("/quizz/1")}
        >
          Commencer le quizz
        </button>
        <Menu>
          <MenuButton as={Button}>Choisir son niveau</MenuButton>
          <MenuList>
            <MenuItems />
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
