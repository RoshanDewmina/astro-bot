// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import PreviewCard from "./PreviewCard";

// const orbitScaleFactor = 175; // Adjusted for better spacing in scene

// const loadTexture = (path) => {
//   return new THREE.TextureLoader().load(path);
// };

// const Orrery = () => {
//   const mountRef = useRef(null);
//   const [orbitalData, setOrbitalData] = useState([]);
//   const [selectedPlanet, setSelectedPlanet] = useState(null);
//   const [isCardVisible, setCardVisible] = useState(false);

//   const planetSizes = {
//     planet_Mercury: 0.38,
//     planet_Venus: 0.95,
//     planet_Earth: 1,
//     planet_Mars: 0.53,
//     planet_Jupiter: 11.21,
//     planet_Saturn: 9.45,
//     planet_Uranus: 4.01,
//     planet_Neptune: 3.88,
//     moon: 0.27, // Moon size relative to EarthM
//   };

//   const cometTextures = [
//     "/textures/comet1.jpg",
//     "/textures/comet2.jpg",
//     "/textures/comet3.jpg",
//     "/textures/comet4.jpg",
//   ];
//   const slider = 5; // Number of planets to show

//   useEffect(() => {
//     fetch("/orbitalData.json")
//       .then((response) => response.json())
//       .then((data) => setOrbitalData(data.slice(0, slider + 8)))
//       //.then((data) => setOrbitalData(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   useEffect(() => {
//     if (orbitalData.length === 0) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       10000
//     );
//     const renderer = new THREE.WebGLRenderer({ antialias: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     camera.position.set(0, -400, 100);

//     const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//     directionalLight.position.set(0, 0, 10).normalize();
//     scene.add(directionalLight);

//     const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1); // Sky color, ground color
//     scene.add(hemisphereLight);

//     // Background: Starfield
//     const createStarfieldBackground = () => {
//       const starGeometry = new THREE.SphereGeometry(7500, 64, 64);
//       const starMaterial = new THREE.MeshBasicMaterial({
//         map: new THREE.TextureLoader().load("/textures/8k_stars.jpg"),
//         side: THREE.BackSide, // Render inside of the sphere
//       });
//       const starfield = new THREE.Mesh(starGeometry, starMaterial);
//       return starfield;
//     };

//     const starfield = createStarfieldBackground();
//     scene.add(starfield);

//     // Create the sun
//     const sunTexture = loadTexture("/textures/sun.jpg"); // Load the sun texture
//     const sunGeometry = new THREE.SphereGeometry(50, 64, 64); // Create a sphere geometry for the sun

//     // Create the sun material with emissive properties
//     const sunMaterial = new THREE.MeshStandardMaterial({
//       map: sunTexture,
//       emissive: 0xffff00,
//       emissiveIntensity: 0.5,
//       metalness: 0.1, // Slightly metallic
//       roughness: 0.5, // Adjust for a smoother surface
//       transparent: true,
//       depthWrite: false,
//     });

//     // Create the sun mesh
//     const sun = new THREE.Mesh(sunGeometry, sunMaterial);
//     sun.position.set(0, 0, 0); // Set position to the origin
//     scene.add(sun); // Add the sun to the scene
//     const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Softer global light
//     scene.add(ambientLight);

//     // Create a PointLight for the sun
//     const sunLight = new THREE.PointLight(0xffff00, 2, 1000); // Color, intensity, and distance
//     sunLight.position.set(0, 0, 0); // Position at the center
//     scene.add(sunLight); // Add the light to the scene

//     // Create controls
//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.25;
//     controls.enableZoom = true;
//     controls.minDistance = 25; // Minimum zoom distance (how close you can zoom in) 75
//     controls.maxDistance = 2500; // Maximum zoom distance (how far you can zoom out)

//     const planets = [];

//     orbitalData.forEach((obj, index) => {
//       const {
//         e,
//         q_au_1,
//         i_deg,
//         longitudeOfAscendingNode,
//         object_name,
//         p_yr,
//         rotation_period,
//       } = obj;

//       // Calculate orbit points
//       const a = (parseFloat(q_au_1) / (1 - e)) * orbitScaleFactor;
//       const b = a * Math.sqrt(1 - e * e);
//       const points = [];
//       for (let i = 0; i <= 1000; i++) {
//         const theta = (i / 1000) * Math.PI * 2;
//         const x = a * Math.cos(theta);
//         const y = b * Math.sin(theta);
//         points.push(new THREE.Vector3(x, y, 0));
//       }

//       // Orbit Line
//       const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
//       const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x888888 });
//       const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);

//       // Orbit Group
//       const orbitGroup = new THREE.Group();
//       orbitGroup.add(orbitLine);
//       orbitGroup.rotation.z = THREE.MathUtils.degToRad(
//         longitudeOfAscendingNode || 0
//       );
//       orbitGroup.rotation.x = THREE.MathUtils.degToRad(i_deg || 0);
//       scene.add(orbitGroup);

//       let texture;
//       if (object_name.includes("Earth"))
//         texture = loadTexture("/textures/earth.jpg");
//       else if (object_name.includes("Mars"))
//         texture = loadTexture("/textures/mars.jpg");
//       else if (object_name.includes("Jupiter"))
//         texture = loadTexture("/textures/jupiter.jpg");
//       else if (object_name.includes("Mercury"))
//         texture = loadTexture("/textures/mercury.jpg");
//       else if (object_name.includes("Venus"))
//         texture = loadTexture("/textures/venus.jpg");
//       else if (object_name.includes("Uranus"))
//         texture = loadTexture("/textures/uranus.jpg");
//       else if (object_name.includes("Neptune"))
//         texture = loadTexture("/textures/neptune.jpg");
//       else if (object_name.includes("Saturn"))
//         texture = loadTexture("/textures/saturn.jpg");
//       else {
//         const randomIndex = Math.floor(Math.random() * cometTextures.length);
//         texture = loadTexture(cometTextures[randomIndex]);
//       }

//       const sizeFactor = planetSizes[object_name] || 1;
//       const planetGeometry = new THREE.SphereGeometry(5 * sizeFactor, 32, 32);
//       const planetMaterial = new THREE.MeshStandardMaterial({
//         map: texture,
//         metalness: 0.5,
//         roughness: 0.3,
//       });

//       const planet = new THREE.Mesh(planetGeometry, planetMaterial);

//       scene.add(planet);

//       // Add Moon for Earth
//       let moon;
//       if (object_name.includes("Earth")) {
//         const moonTexture = loadTexture("/textures/moon.jpg");
//         const moonGeometry = new THREE.SphereGeometry(
//           5 * planetSizes["moon"],
//           32,
//           32
//         );
//         const moonMaterial = new THREE.MeshStandardMaterial({
//           map: moonTexture,
//           metalness: 0.1,
//           roughness: 0.7, // Adjust for a more realistic surface
//         });
//         moon = new THREE.Mesh(moonGeometry, moonMaterial);
//         planet.add(moon);
//       }

//       let saturnRings;
//       if (object_name.includes("planet_Saturn")) {
//         const ringRadius = 100; // Radius of the torus
//         const tubeRadius = 35; // Thickness of the torus

//         // Create the torus geometry
//         const ringGeometry = new THREE.TorusGeometry(
//           ringRadius,
//           tubeRadius,
//           2,
//           50000
//         );

//         const ringMaterial = new THREE.MeshStandardMaterial({
//           map: loadTexture("/textures/saturn-rings.png"),
//           side: THREE.DoubleSide,
//           transparent: true, // Allow for transparency if needed
//         });

//         saturnRings = new THREE.Mesh(ringGeometry, ringMaterial);
//         saturnRings.rotation.x = Math.PI / 1.7; // Rotate the ring to lie in the XZ plane
//         planet.add(saturnRings); // Attach the torus to Saturn
//       }

//       const rotationSpeed = (2 * Math.PI) / (rotation_period * 60);

//       planets.push({
//         planet,
//         moon,
//         saturnRings,
//         orbitGroup,
//         points,
//         speed: ((2 * Math.PI) / Math.abs(parseFloat(p_yr))) * 0.05,
//         // speed: 0,
//         currentIndex: 0,
//         object_name,
//         rotationSpeed,
//       });
//     });

//     const animate = () => {
//       requestAnimationFrame(animate);

//       planets.forEach((data) => {
//         const {
//           planet,
//           points,
//           orbitGroup,
//           speed,
//           moon,
//           saturnRings,
//           object_name,
//           rotationSpeed,
//         } = data;
//         data.currentIndex = (data.currentIndex + speed) % points.length;
//         const point1 = points[Math.floor(data.currentIndex)];
//         const point2 = points[Math.ceil(data.currentIndex) % points.length];
//         const t = data.currentIndex % 1;

//         // Smooth position interpolation
//         const interpolatedPosition = new THREE.Vector3().lerpVectors(
//           point1,
//           point2,
//           t
//         );
//         planet.position.copy(interpolatedPosition);
//         planet.position.applyMatrix4(orbitGroup.matrixWorld); // Apply orbital transformations

//         planet.rotation.x = 190;

//         if (object_name.includes("planet_Saturn")) {
//           planet.rotation.y = 0;
//         }
//         planet.rotation.y += 0.01; // Rotate the planet

//         // Moon orbit around Earth
//         if (moon) {
//           const moonOrbitRadius = 30; // Approximate distance between Earth and Moon
//           const moonSpeed = 0.25; // Speed of Moon orbiting Earth
//           moon.position.set(
//             Math.cos(data.currentIndex * moonSpeed) * moonOrbitRadius,
//             Math.sin(data.currentIndex * moonSpeed) * moonOrbitRadius,
//             0
//           );
//         }
//       });

//       controls.update();
//       renderer.render(scene, camera);
//     };

//     animate();

//     return () => {
//       mountRef.current.removeChild(renderer.domElement);
//     };
//   }, [orbitalData]);

//   return <div ref={mountRef} />;
// };

// export default Orrery;


"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import PreviewCard from "./PreviewCard"; // Import the PreviewCard component

const orbitScaleFactor = 175; // Adjusted for better spacing in scene

const loadTexture = (path) => {
  return new THREE.TextureLoader().load(path);
};

const Orrery = () => {
  const mountRef = useRef(null);
  const [orbitalData, setOrbitalData] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null); // Manage the selected planet
  const [isCardVisible, setCardVisible] = useState(false); // Control card visibility

  const planetSizes = {
    planet_Mercury: 0.38,
    planet_Venus: 0.95,
    planet_Earth: 1,
    planet_Mars: 0.53,
    planet_Jupiter: 11.21,
    planet_Saturn: 9.45,
    planet_Uranus: 4.01,
    planet_Neptune: 3.88,
    moon: 0.27,
  };

  const cometTextures = [
    "/textures/comet1.jpg",
    "/textures/comet2.jpg",
    "/textures/comet3.jpg",
    "/textures/comet4.jpg",
  ];

  useEffect(() => {
    fetch("/orbitalData.json")
      .then((response) => response.json())
      .then((data) => setOrbitalData(data.slice(0, 13)))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (orbitalData.length === 0) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    camera.position.set(0, -400, 100);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 10).normalize();
    scene.add(directionalLight);

    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    scene.add(hemisphereLight);

    // Starfield background
    const createStarfieldBackground = () => {
      const starGeometry = new THREE.SphereGeometry(7500, 64, 64);
      const starMaterial = new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("/textures/8k_stars.jpg"),
        side: THREE.BackSide,
      });
      const starfield = new THREE.Mesh(starGeometry, starMaterial);
      return starfield;
    };

    const starfield = createStarfieldBackground();
    scene.add(starfield);

    // Create the Sun
    const sunTexture = loadTexture("/textures/sun.jpg");
    const sunGeometry = new THREE.SphereGeometry(50, 64, 64);
    const sunMaterial = new THREE.MeshStandardMaterial({
      map: sunTexture,
      emissive: 0xffff00,
      emissiveIntensity: 0.5,
      metalness: 0.1,
      roughness: 0.5,
      transparent: true,
      depthWrite: false,
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const sunLight = new THREE.PointLight(0xffff00, 2, 1000);
    scene.add(sunLight);

    // Create controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.minDistance = 25;
    controls.maxDistance = 2500;

    const planets = [];

    orbitalData.forEach((obj) => {
      const {
        e,
        q_au_1,
        i_deg,
        node_deg, // Adjusting from "longitudeOfAscendingNode" to "node_deg"
        object_name,
        p_yr,
        rotation_period,
      } = obj;

      const a = (parseFloat(q_au_1) / (1 - e)) * orbitScaleFactor;
      const b = a * Math.sqrt(1 - e * e);
      const points = [];
      for (let i = 0; i <= 1000; i++) {
        const theta = (i / 1000) * Math.PI * 2;
        const x = a * Math.cos(theta);
        const y = b * Math.sin(theta);
        points.push(new THREE.Vector3(x, y, 0));
      }

      const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const orbitMaterial = new THREE.LineBasicMaterial({ color: 0x888888 });
      const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);

      const orbitGroup = new THREE.Group();
      orbitGroup.add(orbitLine);
      orbitGroup.rotation.z = THREE.MathUtils.degToRad(node_deg || 0);
      orbitGroup.rotation.x = THREE.MathUtils.degToRad(i_deg || 0);
      scene.add(orbitGroup);

      let texture;
      switch (object_name) {
        case "planet_Mercury":
          texture = loadTexture("/textures/mercury.jpg");
          break;
        case "planet_Venus":
          texture = loadTexture("/textures/venus.jpg");
          break;
        case "planet_Earth":
          texture = loadTexture("/textures/earth.jpg");
          break;
        case "planet_Mars":
          texture = loadTexture("/textures/mars.jpg");
          break;
        case "planet_Jupiter":
          texture = loadTexture("/textures/jupiter.jpg");
          break;
        case "planet_Saturn":
          texture = loadTexture("/textures/saturn.jpg");
          break;
        case "planet_Uranus":
          texture = loadTexture("/textures/uranus.jpg");
          break;
        case "planet_Neptune":
          texture = loadTexture("/textures/neptune.jpg");
          break;
        default:
          const randomIndex = Math.floor(Math.random() * cometTextures.length);
          texture = loadTexture(cometTextures[randomIndex]);
          break;
      }

      const sizeFactor = planetSizes[object_name] || 1;
      const planetGeometry = new THREE.SphereGeometry(5 * sizeFactor, 32, 32);
      const planetMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        metalness: 0.5,
        roughness: 0.3,
      });

      const planet = new THREE.Mesh(planetGeometry, planetMaterial);
      scene.add(planet);

      // Add planet click event
      planet.userData = obj;
      planet.onClick = () => {
        setSelectedPlanet(obj);
        setCardVisible(true);
      };

      planets.push({
        planet,
        orbitGroup,
        points,
        speed: ((2 * Math.PI) / Math.abs(parseFloat(p_yr))) * 0.05,
        currentIndex: 0,
      });
    });

    // Detect mouse clicks on planets
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(planets.map((p) => p.planet));

      if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object;
        clickedPlanet.onClick();
      } else {
        setCardVisible(false);
        setSelectedPlanet(null);
      }
    };

    window.addEventListener("click", onMouseClick);

    const animate = () => {
      requestAnimationFrame(animate);
      planets.forEach((data) => {
        const { planet, points, orbitGroup, speed } = data;
        data.currentIndex = (data.currentIndex + speed) % points.length;
        const point1 = points[Math.floor(data.currentIndex)];
        const point2 = points[Math.ceil(data.currentIndex) % points.length];
        const t = data.currentIndex % 1;
        const interpolatedPosition = new THREE.Vector3().lerpVectors(
          point1,
          point2,
          t
        );
        planet.position.copy(interpolatedPosition);
        planet.position.applyMatrix4(orbitGroup.matrixWorld);
        planet.rotation.y += 0.01;
      });
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("click", onMouseClick);
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [orbitalData]);

  return (
    <div>
      <div ref={mountRef} style={{ width: "100%", height: "100vh" }}></div>
      {isCardVisible && selectedPlanet && <PreviewCard planet={selectedPlanet} />}
    </div>
  );
};

export default Orrery;
