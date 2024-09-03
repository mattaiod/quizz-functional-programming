"use client";

import { MenuItem } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function MenuItems({ showHome }: { showHome?: boolean }) {
  const router = useRouter();
  const handleNavigation = (quizz: number) => {
    router.push("/quizz/" + quizz);
  };

  return (
    <>
      {showHome && (
        <MenuItem onClick={() => router.push("/")}>Accueil</MenuItem>
      )}
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
    </>
  );
}
