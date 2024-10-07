"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import PreviewCard from "./PreviewCard"; // Import the PreviewCard component
//import { slider } from "@nextui-org/theme";
import { Button, ButtonGroup } from "@nextui-org/button";
import { CameraIcon } from "lucide-react";
//import { Input } from "@nextui-org/input";
import App from "./header";

const orbitScaleFactor = 175; // Adjusted for better spacing in scene

const loadTexture = (path) => {
  return new THREE.TextureLoader().load(path);
};

const Orrery = () => {
  const mountRef = useRef(null);
  const cameraRef = useRef(); // Added ref for camera
  const controlsRef = useRef();
  const [orbitalData, setOrbitalData] = useState([]);
  const [selectedPlanet, setSelectedPlanet] = useState(null); // Manage the selected planet
  const [isCardVisible, setCardVisible] = useState(false); // Control card visibility
  const [sliderValue, setSliderValue] = useState(5); // Initial slider value
  var isZoomed = false;

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

  const planetInitalPositions = {
    planet_Mercury: new THREE.Vector3(
      45.0369029274415,
      50.22568014824859,
      6.171387226757411
    ),
    planet_Venus: new THREE.Vector3(
      29.162073445225456,
      122.956059716119,
      7.293543671083093
    ),
    planet_Earth: new THREE.Vector3(175.00142378866093, 0, 0),
    planet_Mars: new THREE.Vector3(
      172.93904782907615,
      202.79540212264922,
      6.550254316235355
    ),
    planet_Jupiter: new THREE.Vector3(
      -166.94927289342442,
      895.3112973560005,
      20.364358165369453
    ),
    planet_Saturn: new THREE.Vector3(
      -673.5884382514352,
      1535.9421874032234,
      66.76524477389832
    ),
    planet_Uranus: new THREE.Vector3(
      953.8811252606614,
      3392.552638746703,
      45.53615756332551
    ),
    planet_Neptune: new THREE.Vector3(
      -3418.032699164064,
      3827.756947210635,
      118.21908204933882
    ),
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
      .then((data) => setOrbitalData(data))
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
    cameraRef.current = camera;
    camera.position.set(0, -400, 100);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

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
    controls.minDistance = 25; // Minimum zoom distance (how close you can zoom in)
    controls.maxDistance = 2500; // Maximum zoom distance (how far you can zoom out)
    controlsRef.current = controls;

    camera.position.set(0, -400, 100);
    controls.update();

    const planets = [];

    const createPlanets = (dataToDisplay) => {
      dataToDisplay.forEach((obj) => {
        const {
          e,
          q_au_1,
          i_deg,
          node_deg,
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
            const randomIndex = Math.floor(
              Math.random() * cometTextures.length
            );
            texture = loadTexture(cometTextures[randomIndex]);
            break;
        }

        const sizeFactor = planetSizes[object_name] || 1;

        let planetGeometry;
        if (object_name.includes("planet_")) {
          planetGeometry = new THREE.SphereGeometry(5 * sizeFactor, 32, 32);
        } else {
          planetGeometry = new THREE.SphereGeometry(5 * sizeFactor, 32, 32);
          planetGeometry.scale(1.5, 1, 1);
        }

        const planetMaterial = new THREE.MeshStandardMaterial({
          map: texture,
          metalness: 0.5,
          roughness: 0.3,
        });

        const planet = new THREE.Mesh(planetGeometry, planetMaterial);
        scene.add(planet);

        // Add Moon for Earth
        let moon;
        if (object_name.includes("Earth")) {
          const moonTexture = loadTexture("/textures/moon.jpg");
          const moonGeometry = new THREE.SphereGeometry(
            5 * planetSizes["moon"],
            32,
            32
          );
          const moonMaterial = new THREE.MeshStandardMaterial({
            map: moonTexture,
            metalness: 0.1,
            roughness: 0.7, // Adjust for a more realistic surface
          });
          moon = new THREE.Mesh(moonGeometry, moonMaterial);
          planet.add(moon);
        }

        let saturnRings;
        if (object_name.includes("planet_Saturn")) {
          const ringRadius = 100; // Radius of the torus
          const tubeRadius = 35; // Thickness of the torus

          // Create the torus geometry
          const ringGeometry = new THREE.TorusGeometry(
            ringRadius,
            tubeRadius,
            2,
            50000
          );
          const ringMaterial = new THREE.MeshStandardMaterial({
            map: loadTexture("/textures/saturn-rings.png"),
            side: THREE.DoubleSide,
            transparent: true, // Allow for transparency if needed
          });

          saturnRings = new THREE.Mesh(ringGeometry, ringMaterial);
          saturnRings.rotation.x = Math.PI / 1.7; // Rotate the ring to lie in the XZ plane
          planet.add(saturnRings); // Attach the torus
        }

        const rotationSpeed = (2 * Math.PI) / (rotation_period * 60);

        // Add planet click event
        planet.userData = obj;
        planet.onClick = () => {
          setSelectedPlanet(obj);
          setCardVisible(true);
        };

        planets.push({
          planet,
          moon,
          saturnRings,
          orbitGroup,
          points,
          speed: ((2 * Math.PI) / Math.abs(parseFloat(p_yr))) * 0.05,
          currentIndex: 0,
          object_name,
          rotationSpeed,
        });
      });
    };

    createPlanets(orbitalData.slice(0, sliderValue + 8));

    const getCurrentPlanetPosition = (planetData) => {
      const { points, currentIndex, orbitGroup } = planetData;

      // Get current point and next point in the orbit
      const point1 = points[Math.floor(currentIndex)];
      const point2 = points[Math.ceil(currentIndex) % points.length];

      // Interpolation factor between the two points
      const t = currentIndex % 1;

      // Interpolate between the two points to get the current position
      const interpolatedPosition = new THREE.Vector3().lerpVectors(
        point1,
        point2,
        t
      );

      // Apply the orbitGroup's transformation to get the final world position
      interpolatedPosition.applyMatrix4(orbitGroup.matrixWorld);

      return interpolatedPosition;
    };

    // Detect mouse clicks on planets
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onMouseClick = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(
        planets.map((p) => p.planet)
      );

      if (intersects.length > 0) {
        const clickedPlanet = intersects[0].object;

        // Set selected planet and display card
        clickedPlanet.onClick();
        setSelectedPlanet(clickedPlanet.userData);
        setCardVisible(true);

        // Find planet index and adjust camera
        planets.forEach((planetData) => {
          if (planetData.planet === clickedPlanet) {
            const { object_name } = planetData;

            // Log the clicked planet
            console.log(`${object_name} clicked`);

            // Get the planet's current interpolated position
            const planetCurrentPosition = getCurrentPlanetPosition(planetData);

            // Calculate the offset direction based on the planet's position relative to the origin (sun)
            const offsetDirection = planetCurrentPosition.clone().normalize();

            // Use the planet size to adjust the zoom level
            const planetSize = planetSizes[object_name] || 1; // Default to 1 if size not found
            const baseDistanceFactor = 50; // Base distance factor (adjust as needed)
            const distanceFactor = baseDistanceFactor * planetSize + 10; // Scale distance by planet size

            // Adjust the camera position by moving away from the planet along the offset direction
            const cameraPosition = planetCurrentPosition
              .clone()
              .addScaledVector(offsetDirection, distanceFactor);

            // Move the camera to the calculated position and look at the planet
            cameraRef.current.position.copy(cameraPosition);
            cameraRef.current.lookAt(planetCurrentPosition);

            isZoomed = true; // Flag zoom state
          }
        });
      } else {
        // Clicked outside of planets: reset zoom and hide the card
        isZoomed = false;
        setCardVisible(false);
        setSelectedPlanet(null);
      }
    };

    window.addEventListener("click", onMouseClick);

    const animate = () => {
      requestAnimationFrame(animate);

      planets.forEach((data) => {
        const { planet, points, orbitGroup, speed, moon, object_name } = data;
        if (!isZoomed) {
          data.currentIndex = (data.currentIndex + speed) % points.length;
          const point1 = points[Math.floor(data.currentIndex)];
          const point2 = points[Math.ceil(data.currentIndex) % points.length];
          const t = data.currentIndex % 1;

          // Smooth position interpolation
          const interpolatedPosition = new THREE.Vector3().lerpVectors(
            point1,
            point2,
            t
          );
          planet.position.copy(interpolatedPosition);
          planet.position.applyMatrix4(orbitGroup.matrixWorld); // Apply orbital transformations
        }

        planet.rotation.x = 190;

        if (object_name.includes("planet_Saturn")) {
          planet.rotation.y = 0;
        }
        planet.rotation.y += 0.01; // Rotate the planet

        // Moon orbit around Earth
        if (moon) {
          const moonOrbitRadius = 30; // Approximate distance between Earth and Moon
          const moonSpeed = 0.25; // Speed of Moon orbiting Earth
          moon.position.set(
            Math.cos(data.currentIndex * moonSpeed) * moonOrbitRadius,
            Math.sin(data.currentIndex * moonSpeed) * moonOrbitRadius,
            0
          );
        }
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      controls.dispose();
      window.removeEventListener("click", onMouseClick);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [orbitalData, sliderValue]);

  const handleSliderChange = (event) => {
    percentValue = setSliderValue(Number(event.target.value));
    const updatedPlanets = orbitalData.slice(
      planets.length,
      Math.floor((Number(event.target.value) / 100) * 160)
    );
    const planets = [];
    createPlanets(updatedPlanets);
    setSliderValue(percentValue); // Update slider value state
  };

  const resetCamera = () => {
    console.log("Camera Reset");
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, -400, 100); // Reset to your default position
      cameraRef.current.lookAt(0, 0, 0);
      controlsRef.current.reset();
    }
  };
  const getPlanetDataForCard = (planet) => {
    if (!planet) return null;

    if (planet.object_name.startsWith("planet_")) {
      return planet;
    } else {
      const randomIndex = Math.floor(Math.random() * cometTextures.length);
      const cometTexture = cometTextures[randomIndex];
      return {
        ...planet,
        texture: cometTexture,
      };
    }
  };

  return (
    <div className="overflow-hidden h-screen">
      <div ref={mountRef} style={{ width: "100%", height: "100vh" }}></div>

      <div style={{ position: "absolute", bottom: 20, left: 20, zIndex: 10 }}>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Button
            onClick={resetCamera}
            color="primary"
            variant="shadow"
            endContent={<CameraIcon />}
          >
            Reset Camera
          </Button>

          <Button isDisabled variant="flat" className="flex">
            Object Count: {sliderValue}%
          </Button>
          <div style={{ padding: "10px" }}>
            <input
              type="range"
              min="0"
              max="100"
              step="25" // Step between 0, 25, 50, 75, and 100
              value={sliderValue}
              onChange={handleSliderChange}
              style={{
                appearance: "none",
                width: "100%",
                height: "15px",
                borderRadius: "5px",
                background: "#d3d3d3",
                outline: "none",
                opacity: "0.7",
                transition: ".2s",
                hover: "opacity: 1",
              }}
            />
          </div>
        </div>
        <App />
      </div>

      {isCardVisible && selectedPlanet && (
        <PreviewCard planet={getPlanetDataForCard(selectedPlanet)} />
      )}
    </div>
  );
};

export default Orrery;
