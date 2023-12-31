import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { AnimatedWomen } from "./AnimatedWomen";
import { charactersAtom, socket } from "./SocketManager";
import { useAtom } from 'jotai'
import * as THREE from 'three';
import { useEffect, useState } from "react";

export const Experience = () => {
  const [characters] = useAtom(charactersAtom);
  const [onFloor, setOnFloor] = useState(false);
  useEffect(()=>
  {
    console.log(onFloor)
  }, [onFloor])
  return (
    <>
    <Environment preset="sunset" />
      <ContactShadows blur={2} />
      <OrbitControls />
      <mesh rotation-x={-Math.PI/2} position-y={-0.001} onClick={(e) => socket.emit("move", [e.point.x, 0, e.point.z])}
      onPointerEnter={()=>setOnFloor(true)}
      onPointerLeave={()=>setOnFloor(false)}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color='#f0f0f0' />
      </mesh>
      {characters.map((character) => (
        <AnimatedWomen
          key={character.id}
          position={
            new THREE.Vector3(
              character.position[0],
              character.position[1],
              character.position[2]
            )
          }
          hairColor={character.hairColor}
          topColor={character.topColor}
          bottomColor={character.bottomColor}
        />
      ))}
    </>
  );
};
