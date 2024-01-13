// import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
// import { AnimatedWomen } from "./AnimatedWomen";
// import { charactersAtom, socket } from "./SocketManager";
// import { useAtom } from 'jotai'
// import * as THREE from 'three';
import { useEffect, useState } from "react";
import { useThree, useFrame } from 'react-three-fiber';

export const But = ({s}) => {
    const { camera } = useThree();
    const { viewport } = useThree();


    const [position, setPosition] = useState([0, 0, 0]);
    const [rotation, setRotation] = useState([0, 0, 0]);
    useFrame(()=>
    {
        const viewportWidth = viewport.width;
        const viewportHeight = viewport.height;
      
        // Update position
        const x = viewportWidth * 0.25;  
        const y = viewportHeight * 0.5;
      
        // console.log(camera);
        // console.log("Yo")
        setRotation([camera.rotation.x, camera.rotation.y, camera.rotation.z])
        setPosition([x, y, Math.sqrt((x*x) + (y*y))]);
    })
    // const relativeZ = camera.position.z - 3;
    
  
  
    return (
      <>
        <mesh rotation={rotation} position={position} onPointerEnter={()=>{s("black");console.log("LOLOL")}} onClick={()=>console.log("ASDASDASDASDSD")}>
          <planeGeometry args={[1.5, 1]} />
          <meshStandardMaterial color='#f0f0f0' />
        </mesh>
      </>
    );
  };
  