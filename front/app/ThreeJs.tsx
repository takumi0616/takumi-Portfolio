import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// GSAPのプラグインを登録
gsap.registerPlugin(ScrollTrigger);

interface ThreeJsComponentProps {
  className?: string;
  onResize: (width: number, height: number) => void; // サイズ変更時のコールバック
}

const ThreeJsComponent: React.FC<ThreeJsComponentProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  });

  const { onResize } = props;

  // ウィンドウサイズに応じてキャンバスサイズを更新する関数
  const updateCanvasSize = () => {
    // 縦横比がスマホなどのような時にウィンドウ幅の大きさにする
    const isLandscape = window.innerWidth < window.innerHeight;
    const width = isLandscape ? window.innerWidth : window.innerWidth * 0.5;
    const height = width;
    setCanvasSize({ width, height });
    onResize(width, height); // 親コンポーネントにサイズを通知
  };

  // Constants
  const MAX_PARTICLE_COUNT = 450; // 最大パーティクル数。この値はシーン内に存在できるパーティクルの最大数を定義します。
  const PARTICLE_COUNT = 350; // 実際に使用されるパーティクル数。この値は、一度に表示されるパーティクルの数を決定します。
  const R = 500; // パーティクルが配置される空間の大きさを定義する半径。この値はパーティクルが動く範囲の大きさを決めます。
  const R_HALF = R / 2; // 半径の半分の値。これは、パーティクルの位置を計算する際に使用され、中心からのオフセットを提供します。

  // effectController
  const effectController = {
    showDots: true, // パーティクル（ドット）を表示するかどうか。trueの場合、パーティクルが表示されます。
    showLines: true, // パーティクル間のラインを表示するかどうか。trueの場合、ラインが表示されます。
    minDistance: 100, // パーティクル間でラインを引く最小距離。この値以下の距離にあるパーティクル間にはラインが引かれます。
    limitConnections: false, // パーティクル間の接続数に制限を設けるかどうか。trueの場合、maxConnectionsで設定された数を超える接続は作成されません。
    maxConnections: 20, // 1つのパーティクルが持つことができる最大の接続数。limitConnectionsがtrueの場合に適用されます。
    particleCount: 50, // 使用するパーティクルの数。この数はparticleCount変数と同じです。
  };

  useEffect(() => {
    // Initial setup for Three.js
    const container = containerRef.current;
    if (!container) return;
    updateCanvasSize();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      4000
    );
    camera.position.z = 1300;

    const scene = new THREE.Scene();
    const group = new THREE.Group();
    scene.add(group);

    //四角の範囲を決める補助線
    const helper = new THREE.BoxHelper(
      new THREE.Mesh(new THREE.BoxGeometry(R, R, R))
    );
    helper.material.color.setHex(0x000000);
    helper.material.blending = THREE.AdditiveBlending;
    helper.material.transparent = true;
    group.add(helper);

    // groupをY軸を中心に45度、X軸を中心に30度回転
    group.rotation.y = Math.PI / 10; // Y軸周りに45度回転
    group.rotation.x = Math.PI / 6; // X軸周りに30度回転

    const segments = MAX_PARTICLE_COUNT * MAX_PARTICLE_COUNT;
    const positions = new Float32Array(segments * 3);
    const colors = new Float32Array(segments * 3);

    const pMaterial = new THREE.PointsMaterial({
      color: 0x000000,
      size: 3,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: false,
    });

    const particles = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(MAX_PARTICLE_COUNT * 3);
    const particlesData: { velocity: THREE.Vector3; numConnections: number }[] =
      [];

    for (let i = 0; i < MAX_PARTICLE_COUNT; i++) {
      const x = Math.random() * R - R_HALF;
      const y = Math.random() * R - R_HALF;
      const z = Math.random() * R - R_HALF;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particlesData.push({
        velocity: new THREE.Vector3(
          -1 + Math.random() * 2,
          -1 + Math.random() * 2,
          -1 + Math.random() * 2
        ),
        numConnections: 0,
      });
    }

    particles.setDrawRange(0, PARTICLE_COUNT);
    particles.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3).setUsage(
        THREE.DynamicDrawUsage
      )
    );

    const pointCloud = new THREE.Points(particles, pMaterial);
    group.add(pointCloud);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage)
    );
    geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage)
    );
    geometry.computeBoundingSphere();
    geometry.setDrawRange(0, 0);

    const material = new THREE.LineBasicMaterial({
      color: 0x000000,
      blending: THREE.AdditiveBlending,
      transparent: true,
      linewidth: 1, // ここで線の太さを調整
    });

    const linesMesh = new THREE.LineSegments(geometry, material);
    group.add(linesMesh);

    // レンダリング
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    // キャンバスのサイズを指定
    const canvasWidth = canvasSize.width; // ここで幅を指定
    const canvasHeight = canvasSize.height; // ここで高さを指定
    renderer.setSize(canvasWidth, canvasHeight);

    container.appendChild(renderer.domElement);

    // Resize event handling
    const onWindowResize = () => {
      updateCanvasSize(); // Update canvas size on window resize
      camera.aspect = canvasSize.width / canvasSize.height;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasSize.width, canvasSize.height);
    };
    window.addEventListener('resize', onWindowResize, false);

    // アニメーション関数
    const animate = () => {
      requestAnimationFrame(animate);

      // レンダラーとカメラのサイズを更新
      if (
        containerRef.current &&
        (containerRef.current.clientWidth !== canvasSize.width ||
          containerRef.current.clientHeight !== canvasSize.height)
      ) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        setCanvasSize({ width, height }); // キャンバスサイズの状態を更新
        renderer.setSize(width, height); // レンダラーのサイズを更新
        camera.aspect = width / height; // カメラのアスペクト比を更新
        camera.updateProjectionMatrix(); // カメラの投影行列を更新
      }

      // 常に左回転するアニメーションを追加
      group.rotation.y -= 0.001; // ここで回転速度を調整

      let vertexpos = 0;
      let colorpos = 0;
      let numConnected = 0;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const particleData = particlesData[i];

        // パーティクルの位置を更新
        particlePositions[i * 3] += particleData.velocity.x;
        particlePositions[i * 3 + 1] += particleData.velocity.y;
        particlePositions[i * 3 + 2] += particleData.velocity.z;

        // パーティクルが境界からはみ出した場合、反対方向に動かす
        if (
          particlePositions[i * 3 + 1] < -R_HALF ||
          particlePositions[i * 3 + 1] > R_HALF
        )
          particleData.velocity.y = -particleData.velocity.y;

        if (
          particlePositions[i * 3] < -R_HALF ||
          particlePositions[i * 3] > R_HALF
        )
          particleData.velocity.x = -particleData.velocity.x;

        if (
          particlePositions[i * 3 + 2] < -R_HALF ||
          particlePositions[i * 3 + 2] > R_HALF
        )
          particleData.velocity.z = -particleData.velocity.z;

        // 接続の上限を超えていないか確認
        if (
          effectController.limitConnections &&
          particleData.numConnections >= effectController.maxConnections
        )
          continue;

        // パーティクル間の距離を計算し、接続を描画
        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const particleDataB = particlesData[j];
          if (
            effectController.limitConnections &&
            particleDataB.numConnections >= effectController.maxConnections
          )
            continue;

          const dx = particlePositions[i * 3] - particlePositions[j * 3];
          const dy =
            particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
          const dz =
            particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
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

    gsap.to(group.rotation, {
      y: '+=30', // y軸を中心に10ラジアン回転
      ease: 'none',
      scrollTrigger: {
        trigger: 'body', // トリガーとなる要素のクラス
        scrub: true, // スクロール位置に応じてアニメーション
      },
    });

    // クリーンアップ関数
    return () => {
      // Three.jsと関連リソースのクリーンアップ
      scene.clear();
      renderer.dispose();
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
    <div
      ref={containerRef}
      id="container"
      style={{
        position: 'absolute',
        width: `${canvasSize.width}px`,
        height: `${canvasSize.height}px`,
      }}
    />
  );
};

export default ThreeJsComponent;
