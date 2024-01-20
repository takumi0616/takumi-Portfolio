import React, { useEffect, createRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// GSAPのプラグインを登録
gsap.registerPlugin(ScrollTrigger);

type Props = {};

const ThreeJsComponentBack: React.FC<Props> = () => {
  const containerRef = createRef<HTMLDivElement>();

  // Constants
  const maxParticleCount = 200; // 最大パーティクル数。この値はシーン内に存在できるパーティクルの最大数を定義します。
  const particleCount = 70; // 実際に使用されるパーティクル数。この値は、一度に表示されるパーティクルの数を決定します。
  const r = 1600; // パーティクルが配置される空間の大きさを定義する半径。この値はパーティクルが動く範囲の大きさを決めます。
  const rHalf = r / 2; // 半径の半分の値。これは、パーティクルの位置を計算する際に使用され、中心からのオフセットを提供します。

  // effectController
  const effectController = {
    showDots: true, // パーティクル（ドット）を表示するかどうか。trueの場合、パーティクルが表示されます。
    showLines: true, // パーティクル間のラインを表示するかどうか。trueの場合、ラインが表示されます。
    minDistance: 150, // パーティクル間でラインを引く最小距離。この値以下の距離にあるパーティクル間にはラインが引かれます。
    limitConnections: false, // パーティクル間の接続数に制限を設けるかどうか。trueの場合、maxConnectionsで設定された数を超える接続は作成されません。
    maxConnections: 20, // 1つのパーティクルが持つことができる最大の接続数。limitConnectionsがtrueの場合に適用されます。
    particleCount: 50 // 使用するパーティクルの数。この数はparticleCount変数と同じです。
  };

  useEffect(() => {
    // Initial setup for Three.js
    const container = containerRef.current;
    if (!container) return;

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 4000);
    camera.position.z = 1750;

    const scene = new THREE.Scene();
    const group = new THREE.Group();
    scene.add(group);

    //四角の範囲を決める補助線
    const helper = new THREE.BoxHelper(new THREE.Mesh(new THREE.BoxGeometry(r, r, r)));
    helper.material.color.setHex(0xFFFFFF);
    helper.material.blending = THREE.AdditiveBlending;
    helper.material.transparent = true;
    group.add(helper);

    const segments = maxParticleCount * maxParticleCount;
    const positions = new Float32Array(segments * 3);
    const colors = new Float32Array(segments * 3);

    const pMaterial = new THREE.PointsMaterial({
      color: 0x000000,
      size: 3,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: false
    });

    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(maxParticleCount * 3);
    const particlesData: { velocity: THREE.Vector3; numConnections: number }[] = [];

    for (let i = 0; i < maxParticleCount; i++) {
      const x = Math.random() * r - rHalf;
      const y = Math.random() * r - rHalf;
      const z = Math.random() * r - rHalf;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particlesData.push({
        velocity: new THREE.Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
        numConnections: 0
      });
    }

    particles.setDrawRange(0, particleCount);
    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage));

    const pointCloud = new THREE.Points(particles, pMaterial);
    group.add(pointCloud);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.computeBoundingSphere();
    geometry.setDrawRange(0, 0);

    const material = new THREE.LineBasicMaterial({
      color: 0x000000, // 赤色
      blending: THREE.AdditiveBlending,
      transparent: true
    });    

    const linesMesh = new THREE.LineSegments(geometry, material);
    group.add(linesMesh);

    // レンダリング
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    


    // Resize event handling
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize, false);

    // アニメーション関数
    const animate = () => {
      requestAnimationFrame(animate);
    
      let vertexpos = 0;
      let colorpos = 0;
      let numConnected = 0;
    
      for (let i = 0; i < particleCount; i++) {
        const particleData = particlesData[i];
    
        // パーティクルの位置を更新
        particlePositions[i * 3] += particleData.velocity.x;
        particlePositions[i * 3 + 1] += particleData.velocity.y;
        particlePositions[i * 3 + 2] += particleData.velocity.z;
    
        // パーティクルが境界からはみ出した場合、反対方向に動かす
        if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf)
          particleData.velocity.y = -particleData.velocity.y;
    
        if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf)
          particleData.velocity.x = -particleData.velocity.x;
    
        if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf)
          particleData.velocity.z = -particleData.velocity.z;
    
        // 接続の上限を超えていないか確認
        if (effectController.limitConnections && particleData.numConnections >= effectController.maxConnections)
          continue;
    
        // パーティクル間の距離を計算し、接続を描画
        for (let j = i + 1; j < particleCount; j++) {
          const particleDataB = particlesData[j];
          if (effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections)
            continue;
    
          const dx = particlePositions[i * 3] - particlePositions[j * 3];
          const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
          const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    
          if (dist < effectController.minDistance) {
            particleData.numConnections++;
            particleDataB.numConnections++;
    
            const alpha = 1.0 - dist / effectController.minDistance;
    
            positions[vertexpos++] = particlePositions[i * 3];
            positions[vertexpos++] = particlePositions[i * 3 + 1];
            positions[vertexpos++] = particlePositions[i * 3 + 2];
    
            positions[vertexpos++] = particlePositions[j * 3];
            positions[vertexpos++] = particlePositions[j * 3 + 1];
            positions[vertexpos++] = particlePositions[j * 3 + 2];
    
            colors[colorpos++] = alpha;
            colors[colorpos++] = alpha;
            colors[colorpos++] = alpha;
    
            colors[colorpos++] = alpha;
            colors[colorpos++] = alpha;
            colors[colorpos++] = alpha;
    
            numConnected++;
          }
        }
      }
    
      // パーティクルの位置のジオメトリを更新
      particles.attributes.position.needsUpdate = true;
    
      // ラインのジオメトリを更新
      linesMesh.geometry.setDrawRange(0, numConnected * 2);
      linesMesh.geometry.attributes.position.needsUpdate = true;
      linesMesh.geometry.attributes.color.needsUpdate = true;
    
      // ポイントクラウドのジオメトリを更新
      pointCloud.geometry.attributes.position.needsUpdate = true;
    
      // レンダリングをトリガー
      renderer.render(scene, camera);
    };
    animate();

    // クリーンアップ関数
    return () => {
      window.removeEventListener('resize', onWindowResize, false);
      container.removeChild(renderer.domElement);

      // Three.jsのリソースをクリーンアップ
      scene.clear();
      renderer.dispose();

      // 各種バッファーのクリーンアップ
      particles.dispose();
      linesMesh.geometry.dispose();
      linesMesh.material.dispose();
      pointCloud.geometry.dispose();
      pointCloud.material.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} id="container" />
  );
};

export default ThreeJsComponentBack;
