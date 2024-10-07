import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import { RocketIcon } from "lucide-react";

export default function App() {
    return (
<Navbar>
            <NavbarBrand>
              <RocketIcon size={24} />
              <p className="font-bold text-inherit text-2xl text-pretty">Astro-Bot</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
              <NavbarItem>
                <Link color="foreground" href="#">
                  Saad Humayun
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="#" aria-current="page">
                  Sahith Nulu
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="#">
                  Roshan Silva
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link color="foreground" href="#">
                  Sahil Farooqui
                </Link>
              </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
              <NavbarItem>
                <Button as={Link} color="primary" href="https://github.com/RoshanDewmina/astro-bot" variant="flat">
                  Github
                </Button>
              </NavbarItem>
            </NavbarContent>
          </Navbar>
    );
}