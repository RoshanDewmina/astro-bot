import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

export default function PreviewCard({ planet }:any) {
  return (
    <Card className="max-w-[400px] fixed bottom-4 right-4">
      <CardHeader className="flex gap-3">
        <Image
          alt={`${planet.object_name} image`}
          height={40}
          radius="sm"
          src={`/textures/${planet.object_name.toLowerCase().replace("planet_", "")}.jpg`} // Assuming you have planet textures with appropriate names
          // src = "../favicon.ico"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{planet.object_name}</p>
          <p className="text-small text-default-500">Orbital Info</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>Details about {planet.object_name}:</p>
        <p>Eccentricity: {planet.e}</p>
        <p>Perihelion: {planet.q_au_1} AU</p>
        <p>Inclination: {planet.i_deg}°</p>
        <p>Orbital Period: {planet.p_yr} years</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href={`https://en.wikipedia.org/wiki/${planet.object_name.replace("planet_", "")}`}
        >
          Learn more about {planet.object_name.replace("planet_", "")}
        </Link>
      </CardFooter>
    </Card>
  );
}
