import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { AnimatedWomen } from "./AnimatedWomen";
import { charactersAtom, socket } from "./SocketManager";
import { useAtom } from 'jotai'
import * as THREE from 'three';
import { useEffect, useState } from "react";

import { But } from './But'

import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three/src/loaders/TextureLoader';

import { Fog, PointLight } from 'three';
import { Pine } from "./Pine Trees";
import { House } from './House'
import { Rock1 } from './Rock1'
import { Rock2 } from './Rock2'

import { useThree } from "@react-three/fiber";

export const Experience = ({action}) => {
  const [characters] = useAtom(charactersAtom);
  const [onFloor, setOnFloor] = useState(false);
  const [color1, setColor] = useState("#f0f0f0");
  const { camera } = useThree();
  useEffect(()=>
  {

    console.log(camera.position, camera.rotation);
  }, [onFloor, color1])


  const aoMap = useLoader(TextureLoader, '/ao.jpg'); 
  const baseColorMap = useLoader(TextureLoader, '/baseColor.jpg');
  const normalMap = useLoader(TextureLoader, '/normal.jpg');
  const roughnessMap = useLoader(TextureLoader, '/roughness.jpg');
  const heightMap = useLoader(TextureLoader, '/height.png');



  return (
    <>
    <Environment preset="night" />
    <pointLight args={['brown', 10000, 10]} 
        position={[1, 10,-9]} castShadow
        shadow-mapSize={[512, 512]}
    />
    <pointLight args={['#ffe692 ', 1000, 10]} 
        position={[1, 10,-8]} castShadow
        shadow-mapSize={[512, 512]}
    />

    <fogExp2 attach="fog" args={[0xcccccc, .02]} />
    {/* <spotLight
        position={[10, 10, 10]}
        angle={3}
        penumbra={10}
        castShadow
        shadow-mapSize={[512, 512]} 
      /> */}
      <ContactShadows blur={2} />
      <OrbitControls />
      {/* <But s={setColor} /> */}
      <mesh rotation-x={-Math.PI/2} position-y={-0.1} onClick={(e) => socket.emit("move", [e.point.x, 0, e.point.z])}
      onPointerEnter={()=>setOnFloor(true)}
      onPointerLeave={()=>setOnFloor(false)} receiveShadow
      >
        <circleGeometry args={[20, 50]} />
        <meshStandardMaterial aoMap={aoMap}
        map={baseColorMap}
        normalMap={normalMap}
        roughnessMap={roughnessMap}
        displacementMap={heightMap}
        displacementScale={0.2} receiveShadow
 />
      </mesh>
      {/* <House position={[-10,1,-1]} rotation={[0,-Math.PI/2,0]}/> */}
      <House position={[1,2.5,-9]} rotation={[0,-Math.PI/2,0]} />

      <Pine position={[2, 0, 5]}/>
      <Pine position={[5, 0, 5]}/>
      <Pine position={[-1, 0, 5]}/>
      <Pine position={[-7, 0, 5]}/>
      <Pine position={[5, 0, -5]}/>
      <Pine position={[-5, 0, -5]}/>

      <Rock2 position={[0,0,-17]} />



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
          action={action} castShadow
        />
      ))}
    </>
  );
};
