import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { SocketManager } from "./components/SocketManager";
import { useState } from 'react';


function App() {
  const [ action, setAction ] = useState("CharacterArmature|Idle");
  return (
    <>
    
      <SocketManager />
      <button Style="height:200px;width:300px;background-color:black;border-radius:20px;position:absolute;color:white;font-size:40px;z-index:100;right:0;bottom:0;margin-right:100px" onClick={(e)=>{console.log("Hello clicked");action=="CharacterArmature|Punch_Right"?setAction("CharacterArmature|Idle"):setAction("CharacterArmature|Punch_Right")}}>FIGHT!!!!</button>
      <Canvas shadows camera={{ position: [8, 8, 8], fov: 30 }} shadowMap shadows="soft">
        {/* <color attach="background" args={["#ececec"]} /> */}
        <color attach="background" args={['black']}/>
        <Experience action={action} />
      </Canvas>
    </>
  );
}

export default App;
