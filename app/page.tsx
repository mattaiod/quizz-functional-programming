'use client';

import Title from './components/Title';
import Subtitle from './components/Subtitle';
import { useRouter } from 'next/navigation';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';

export default function Page() {
  const router = useRouter();

  const handleNavigation = (quizz: number) => {
    router.push('/quizz/' + quizz);
  };

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
          onClick={() => router.push('/dashboard')}
        >
          Commencer le quizz
        </button>
        <Menu>
          <MenuButton as={Button}>Choisir son niveau</MenuButton>
          <MenuList>
            <MenuItem onClick={() => handleNavigation(1)}>
              1. Introduction à la Programmation Fonctionnelle
            </MenuItem>
            <MenuItem onClick={() => handleNavigation(2)}>
              2. Concepts Fondamentaux
            </MenuItem>
            <MenuItem onClick={() => handleNavigation(3)}>
              3. Fonctions d'Ordre Supérieur et Fonctions Pures
            </MenuItem>
            <MenuItem onClick={() => handleNavigation(4)}>
              4. Typage et Immutabilité
            </MenuItem>
            <MenuItem onClick={() => handleNavigation(5)}>
              5. Programmation Réactive
            </MenuItem>
            <MenuItem onClick={() => handleNavigation(6)}>
              6. Rescript et Bibliothèques Fonctionnelles
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
}
