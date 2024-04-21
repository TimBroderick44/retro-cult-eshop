import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import style from "./Stars.module.scss";

const Stars = (props) => {

    // Create a reference to the mesh
    // Need useRef so that we can access the mesh in the useFrame hook
    const ref = useRef();

    // Generate a sphere of 5000 random points
    const [sphere] = useState(() =>
    // Generates coordinates for 5000 points in a sphere with a radius of 1.2
        random.inSphere(new Float32Array(5000), { radius: 1.2 })
    );

    // Rotate the mesh every frame
    // useFrame is a hook that updates animation frames.
    // ref.current.rotation.x and ref.current.rotation.y are the x and y rotation of the mesh
    // Delta time is used to make the rotation the same regardless of the frame rate (faster computers, etc.)
    // -= is used to rotate the mesh anti-clockwise, if += was used, the mesh would rotate in a clockwise direction
    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    });

    return (
        // The group component is used to group objects together
        // The rotation prop is used to rotate the group
        // The Points component is used to render the points
        // The ref prop is used to reference the mesh
        // The positions prop is used to set the positions of the points
        // The stride prop is used to set the number of values per point (3 for x, y, z)
        // The frustumCulled prop is used to cull points outside the camera view
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points
                ref={ref}
                positions={sphere}
                stride={3}
                frustumCulled
                {...props}
            >
                {/* // The PointMaterial component is used to set the material of the points
                // The transparent prop is used to make the material transparent
                // The color prop is used to set the color of the material
                // The size prop is used to set the size of the points
                // The sizeAttenuation prop is used to make the points smaller as they move away from the camera
                // depthWrite = false can be used to make the points render in front of other objects */}
                <PointMaterial
                    transparent
                    color="#f272c8"
                    size={0.0029}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

// The StarsCanvas component is used to render the stars
// The Canvas component renders a screen and a WebGL context
// The camera prop is used to set the position of the camera
// The Suspense component is used to handle loading states (fallback = null means nothing is shown while loading)
// The Stars component is used to render the stars
// The Preload component is used to preload ALL assets (so no stuttering or pauses)
const StarsCanvas = () => {
    return (
        <div className={style.stars}>
            <Canvas camera={{ position: [0, 0, 1] }}>
                <Suspense fallback={null}>
                    <Stars />
                </Suspense>

                <Preload all />
            </Canvas>
        </div>
    );
};

export default StarsCanvas;
