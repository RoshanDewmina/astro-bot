import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
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
          <Link
            color="foreground"
            href="https://www.linkedin.com/in/saad-humayun/"
          >
            Saad Humayun
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            href="https://www.linkedin.com/in/sahith-nulu-443905252/"
            color="foreground"
          >
            Sahith Nulu
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            color="foreground"
            href="https://www.linkedin.com/in/roshan-silva-pulle-79a688219/"
          >
            Roshan Silva
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="https://github.com/SahilSF">
            Sahil Farooqui
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            href="https://github.com/RoshanDewmina/astro-bot"
            variant="flat"
          >
            Github
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
