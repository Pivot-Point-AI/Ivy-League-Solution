"use client";

import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Float } from "@react-three/drei";
import * as THREE from "three";

const MOTIF_COLORS = ["#3b82f6", "#a78bfa", "#60a5fa", "#22d3ee"];

function MorphingBlob({ intensityRef }: { intensityRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<any>(null);
  const colorA = useMemo(() => new THREE.Color(), []);
  const colorB = useMemo(() => new THREE.Color(), []);
  const mixed = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const intensity = intensityRef.current;
    const t = (Math.sin(state.clock.elapsedTime * 0.15) + 1) / 2;
    colorA.set(MOTIF_COLORS[0]);
    colorB.set(MOTIF_COLORS[1]);
    mixed.copy(colorA).lerp(colorB, t);

    if (matRef.current) {
      matRef.current.color = mixed;
      matRef.current.distort = (0.3 + Math.sin(state.clock.elapsedTime * 0.6) * 0.08) * intensity;
    }

    meshRef.current.rotation.x += delta * 0.15 * intensity;
    meshRef.current.rotation.y += delta * 0.22 * intensity;
    const scale = 1.6 + Math.sin(state.clock.elapsedTime * 0.8) * 0.06 * intensity;
    meshRef.current.scale.setScalar(scale);
  });

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 12]} />
        <MeshDistortMaterial ref={matRef} roughness={0.15} metalness={0.6} speed={2} distort={0.35} envMapIntensity={0.8} />
      </mesh>
    </Float>
  );
}

/*
 * A single shared WebGL asset used across scenes 1, 2, and 4 instead of
 * mounting three separate R3F canvases — keeps GPU/JS cost to one instance.
 */
export default function ScrollMotif({ intensityRef }: { intensityRef: React.MutableRefObject<number> }) {
  return (
    <Canvas camera={{ position: [0, 0, 4.2], fov: 42 }} dpr={[1, 1.8]}>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={2} color="#ffffff" />
      <pointLight position={[-4, -2, -3]} intensity={1.2} color="#6c3cff" />
      <MorphingBlob intensityRef={intensityRef} />
      <Environment preset="city" />
    </Canvas>
  );
}
