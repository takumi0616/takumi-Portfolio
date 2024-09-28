import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MainCubeProps } from '@/app/types'

gsap.registerPlugin(ScrollTrigger)

const MainCube: React.FC<MainCubeProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [canvasSize, setCanvasSize] = useState({
    width: 0,
    height: 0,
  })
  const { onResize } = props

  const updateCanvasSize = () => {
    const isLandscape = window.innerWidth < window.innerHeight
    const width = isLandscape
      ? window.innerWidth * 0.8
      : window.innerWidth * 0.5
    const height = width
    setCanvasSize({ width, height })
    onResize(width, height)
  }

  const MAX_PARTICLE_COUNT = 450
  const PARTICLE_COUNT = 350
  const R = 500
  const R_HALF = R / 2

  const effectController = {
    showDots: true,
    showLines: true,
    minDistance: 100,
    limitConnections: false,
    maxConnections: 20,
    particleCount: 50,
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    updateCanvasSize()

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      4000,
    )
    camera.position.z = 1300

    const scene = new THREE.Scene()
    const group = new THREE.Group()
    scene.add(group)

    const helper = new THREE.BoxHelper(
      new THREE.Mesh(new THREE.BoxGeometry(R, R, R)),
    )
    helper.material.color.setHex(0x000000)
    helper.material.blending = THREE.AdditiveBlending
    helper.material.transparent = true
    group.add(helper)

    group.rotation.y = Math.PI / 10
    group.rotation.x = Math.PI / 6

    const segments = MAX_PARTICLE_COUNT * MAX_PARTICLE_COUNT
    const positions = new Float32Array(segments * 3)
    const colors = new Float32Array(segments * 3)

    const pMaterial = new THREE.PointsMaterial({
      color: 0x000000,
      size: 3,
      blending: THREE.AdditiveBlending,
      transparent: true,
      sizeAttenuation: false,
    })

    const particles = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(MAX_PARTICLE_COUNT * 3)
    const particlesData: { velocity: THREE.Vector3; numConnections: number }[] =
      []

    for (let i = 0; i < MAX_PARTICLE_COUNT; i++) {
      const x = Math.random() * R - R_HALF
      const y = Math.random() * R - R_HALF
      const z = Math.random() * R - R_HALF

      particlePositions[i * 3] = x
      particlePositions[i * 3 + 1] = y
      particlePositions[i * 3 + 2] = z

      particlesData.push({
        velocity: new THREE.Vector3(
          -1 + Math.random() * 2,
          -1 + Math.random() * 2,
          -1 + Math.random() * 2,
        ),
        numConnections: 0,
      })
    }

    particles.setDrawRange(0, PARTICLE_COUNT)
    particles.setAttribute(
      'position',
      new THREE.BufferAttribute(particlePositions, 3).setUsage(
        THREE.DynamicDrawUsage,
      ),
    )

    const pointCloud = new THREE.Points(particles, pMaterial)
    group.add(pointCloud)

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage),
    )
    geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage),
    )
    geometry.computeBoundingSphere()
    geometry.setDrawRange(0, 0)

    const material = new THREE.LineBasicMaterial({
      color: 0x000000,
      blending: THREE.AdditiveBlending,
      transparent: true,
      linewidth: 1,
    })

    const linesMesh = new THREE.LineSegments(geometry, material)
    group.add(linesMesh)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(window.devicePixelRatio)

    const canvasWidth = canvasSize.width
    const canvasHeight = canvasSize.height
    renderer.setSize(canvasWidth, canvasHeight)

    container.appendChild(renderer.domElement)

    const onWindowResize = () => {
      updateCanvasSize()
      camera.aspect = canvasSize.width / canvasSize.height
      camera.updateProjectionMatrix()
      renderer.setSize(canvasSize.width, canvasSize.height)
    }
    window.addEventListener('resize', onWindowResize, false)

    const animate = () => {
      requestAnimationFrame(animate)
      if (
        containerRef.current &&
        (containerRef.current.clientWidth !== canvasSize.width ||
          containerRef.current.clientHeight !== canvasSize.height)
      ) {
        const width = containerRef.current.clientWidth
        const height = containerRef.current.clientHeight
        setCanvasSize({ width, height })
        renderer.setSize(width, height)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
      }
      group.rotation.y -= 0.001
      let vertexpos = 0
      let colorpos = 0
      let numConnected = 0

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const particleData = particlesData[i]

        particlePositions[i * 3] += particleData.velocity.x
        particlePositions[i * 3 + 1] += particleData.velocity.y
        particlePositions[i * 3 + 2] += particleData.velocity.z

        if (
          particlePositions[i * 3 + 1] < -R_HALF ||
          particlePositions[i * 3 + 1] > R_HALF
        )
          particleData.velocity.y = -particleData.velocity.y

        if (
          particlePositions[i * 3] < -R_HALF ||
          particlePositions[i * 3] > R_HALF
        )
          particleData.velocity.x = -particleData.velocity.x

        if (
          particlePositions[i * 3 + 2] < -R_HALF ||
          particlePositions[i * 3 + 2] > R_HALF
        )
          particleData.velocity.z = -particleData.velocity.z

        if (
          effectController.limitConnections &&
          particleData.numConnections >= effectController.maxConnections
        )
          continue

        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
          const particleDataB = particlesData[j]
          if (
            effectController.limitConnections &&
            particleDataB.numConnections >= effectController.maxConnections
          )
            continue

          const dx = particlePositions[i * 3] - particlePositions[j * 3]
          const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1]
          const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (dist < effectController.minDistance) {
            particleData.numConnections++
            particleDataB.numConnections++

            const alpha = 1.0 - dist / effectController.minDistance

            positions[vertexpos++] = particlePositions[i * 3]
            positions[vertexpos++] = particlePositions[i * 3 + 1]
            positions[vertexpos++] = particlePositions[i * 3 + 2]

            positions[vertexpos++] = particlePositions[j * 3]
            positions[vertexpos++] = particlePositions[j * 3 + 1]
            positions[vertexpos++] = particlePositions[j * 3 + 2]

            colors[colorpos++] = alpha
            colors[colorpos++] = alpha
            colors[colorpos++] = alpha

            colors[colorpos++] = alpha
            colors[colorpos++] = alpha
            colors[colorpos++] = alpha

            numConnected++
          }
        }
      }

      particles.attributes.position.needsUpdate = true
      linesMesh.geometry.setDrawRange(0, numConnected * 2)
      linesMesh.geometry.attributes.position.needsUpdate = true
      linesMesh.geometry.attributes.color.needsUpdate = true
      pointCloud.geometry.attributes.position.needsUpdate = true
      renderer.render(scene, camera)
    }
    animate()

    gsap.to(group.rotation, {
      y: '+=20',
      ease: 'none',
      scrollTrigger: {
        trigger: 'window',
        scrub: true,
      },
    })

    return () => {
      scene.clear()
      renderer.dispose()
      window.removeEventListener('resize', onWindowResize, false)
      container.removeChild(renderer.domElement)
      scene.clear()
      renderer.dispose()
      particles.dispose()
      linesMesh.geometry.dispose()
      linesMesh.material.dispose()
      pointCloud.geometry.dispose()
      pointCloud.material.dispose()
    }
  }, [])

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
  )
}

export default MainCube
