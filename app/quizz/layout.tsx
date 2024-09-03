"use client";

import { HamburgerIcon } from "@chakra-ui/icons";
import { IconButton, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import MenuItems from "../components/MenuItems";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<HamburgerIcon />}
            variant="outline"
            className="m-2"
          />
          <MenuList>
            <MenuItems showHome={true} />
          </MenuList>
        </Menu>
      </header>
      <main>{children}</main>
    </>
  );
}
