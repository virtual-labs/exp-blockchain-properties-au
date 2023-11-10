import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import Block from "./Block";

const BlockChain = ({ arr }) => {
  return (
    <Canvas
      camera={{ position: [-10, 5, 12], rotation: [0, 90, 70] }}
      style={{
        background: "#212529",
        height: "43vh",
        marginTop: 19,
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight intensity={0.5} castShadow position={[-8, 16, -8]} />
        <pointLight intensity={0.1} />

        <group position={[-2, 3, 4]}>
          {arr.map((item, index) => {
            return <Block item={item} />;
          })}
        </group>

        <OrbitControls target={[0, 1, 0]} />
        <color args={["#212529"]} attach="background" />
      </Suspense>
    </Canvas>
  );
};

export default BlockChain;
