import {
  Box,
  MeshWobbleMaterial,
  QuadraticBezierLine,
  Text,
} from "@react-three/drei";
import { extend, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import React, { useLayoutEffect, useRef, useState } from "react";
import { a } from "@react-spring/three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import img from ".././../textures/cubeText1.jpg";
extend({ TextGeometry });

const idForRightLine = [10, 6, 7, 8, 9];
const idForLeftLine = [2, 3, 4, 5];

const Line = ({ texture, item, type }) => {
  const planeRef = useRef();
  const [isVisible, setIsVisble] = useState(true);
  const connectingStartingPoint = (type) => {
    let startingPoint = [];
    switch (type) {
      case "left":
        startingPoint = [-0.7, 0, 0];
        return startingPoint;

      case "right":
        if (item.id === 6) {
          startingPoint = [0, 0.6, 0];
          return startingPoint;
        } else {
          startingPoint = [0.6, 0, 0];
          return startingPoint;
        }

      default:
        break;
    }
  };
  const connectingEndingPoint = (type) => {
    let EndingPoint = [];
    switch (type) {
      case "left":
        EndingPoint = [-0.05, 0, 0];
        return EndingPoint;

      case "right":
        if (item.id === 6) {
          EndingPoint = [0, -0.1, 0];
          return EndingPoint;
        } else {
          EndingPoint = [-0.1, 0, 0];
          return EndingPoint;
        }

      default:
        break;
    }
  };

  const fontProps = {
    font: "/Inter-Bold.woff",
    fontSize: 0.3,
    letterSpacing: -0.05,
    lineHeight: 1,
    "material-toneMapped": false,
    color: "white",
  };
  useFrame(() => {
    if (type === "left" && isVisible) {
      planeRef.current.position.x += 0.05;
    }
    if (type === "right" && isVisible) {
      if (item.id === 6) {
        planeRef.current.position.y -= 0.05;
        return;
      }
      planeRef.current.position.x -= 0.05;
    }
  });
  const changeState = () => {
    console.log("object");
    setIsVisble(false);
  };
  useLayoutEffect(() => {
    console.log("rendered");
    if (isVisible) {
      const showAnimation = setTimeout(changeState, 1400);

      return () => {
        clearTimeout(showAnimation);
      };
    }
  }, [isVisible]);

  return (
    <group>
      <>
        <QuadraticBezierLine
          start={connectingStartingPoint(type)} // Starting point, can be an array or a vec3
          end={connectingEndingPoint(type)} // Ending point, can be an array or a vec3
          color="BLUE" // Default
          lineWidth={5} // In pixels (default)
          dashed={false} // Default
          scale={[8, 5, 1]}
        />

        <mesh
          visible={isVisible}
          ref={planeRef}
          position={
            type === "left" ? [-5, 0, 0] : item.id === 6 ? [0, 4, 0] : [6, 0, 0]
          }
        >
          <boxGeometry args={[1, 0.5, 0.5, 6, 2]} />
          <meshBasicMaterial map={texture} />
          <Text
            position={[0, 0.5, 0]}
            {...fontProps}
            anchorX="center"
            anchorY="middle"
          >
            hash
          </Text>
        </mesh>
      </>
    </group>
  );
};

function Block({ item }) {
  const cubeRef = useRef();
  const texture = useLoader(THREE.TextureLoader, img);
  useFrame(() => {
    cubeRef.current.rotation.y += 0.007;
  });

  return (
    <>
      <group
        onClick={(e) => console.log(e)}
        key={item.id}
        position={item.position}
      >
        <a.mesh castShadow receiveShadow>
          <Box ref={cubeRef} args={[2, 2, 2]}>
            <meshBasicMaterial
              attach="material"
              map={texture}
              toneMapped={false}
            />
          </Box>
          <Box args={[3, 3, 3]}>
            <meshPhongMaterial color={"#ddddff"} transparent opacity={0.3} />
          </Box>
          <group position={[0.01, -1.5, 1.5]}>
            <Box position={[0, 2.65, 0.08]} args={[3, 0.7, 0]}>
              <MeshWobbleMaterial
                color={"blue"}
                factor={0.1}
                speed={2}
                opacity={0.1}
                transparent
              />
              <Text
                position={[0, -0.1, 0.1]}
                rotation={[0, 0, 0]}
                fontSize={0.2}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                Header
              </Text>
            </Box>
            <Box position={[0, 1.9, 0.08]} args={[3, 0.7, 0]}>
              <MeshWobbleMaterial
                color={"blue"}
                factor={0.1}
                speed={2}
                opacity={0.1}
                transparent
              />
              <Text
                position={[0, -0.1, 0.1]}
                rotation={[0, 0, 0]}
                fontSize={0.2}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                Hash
              </Text>
            </Box>
            <Box position={[0, 1.15, 0.08]} args={[3, 0.7, 0]}>
              <MeshWobbleMaterial
                color={"blue"}
                factor={0.1}
                speed={2}
                opacity={0.1}
                transparent
              />
              <Text
                position={[0, -0.1, 0.1]}
                rotation={[0, 0, 0]}
                fontSize={0.2}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                Data
              </Text>
            </Box>
            <Box position={[0, 0.4, 0.08]} args={[3, 0.7, 0]}>
              <MeshWobbleMaterial
                color={"blue"}
                factor={0.1}
                speed={2}
                opacity={0.1}
                transparent
              />
              <Text
                position={[0, -0.1, 0.1]}
                rotation={[0, 0, 0]}
                fontSize={0.2}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                Time Stamp
              </Text>
            </Box>
          </group>
          {idForLeftLine.includes(item.id) && (
            <Line type={"left"} item={item} />
          )}
          {idForRightLine.includes(item.id) && (
            <Line type={"right"} item={item} />
          )}
        </a.mesh>
      </group>
    </>
  );
}

export default Block;
