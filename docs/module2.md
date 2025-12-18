---
sidebar_position: 3
---

# Module 2: The Digital Twin (Gazebo & Unity)

In this module, we'll explore the concept of digital twins and how simulation environments like Gazebo and Unity play a crucial role in robotics development. Simulation allows us to test algorithms, validate designs, and train robots in a safe, controlled, and cost-effective manner.

## Learning Objectives

By the end of this module, you will be able to:
- Understand the concept of digital twins in robotics
- Set up and use Gazebo for physics-based simulation
- Create environments and scenarios in Gazebo
- Work with Unity for high-fidelity rendering
- Simulate various sensors including LiDAR, depth cameras, and IMUs

## What is a Digital Twin?

A digital twin is a virtual representation of a physical object or system. In robotics, digital twins allow us to create virtual replicas of robots and their environments, enabling us to test and validate behaviors before deploying to physical hardware.

### Benefits of Digital Twins in Robotics

1. **Risk Reduction**: Test algorithms and behaviors in simulation before deploying to real robots
2. **Cost Efficiency**: Reduce hardware costs by testing in simulation
3. **Speed**: Iterate quickly on designs and algorithms
4. **Safety**: Test dangerous scenarios without risk to humans or equipment
5. **Data Generation**: Generate synthetic data for training machine learning models

## Gazebo: Physics-Based Simulation

Gazebo is a powerful 3D simulation environment that provides realistic physics simulation for robotics applications. It's widely used in the robotics community and integrates well with ROS.

### Installing Gazebo

For Ubuntu systems with ROS 2 Humble:

```bash
sudo apt update
sudo apt install ros-humble-gazebo-ros-pkgs
```

### Basic Gazebo Concepts

#### Worlds

A world in Gazebo defines the entire simulation environment, including:
- Terrain and static objects
- Lighting conditions
- Physics properties (gravity, etc.)
- Models (robots, objects)

#### Models

Models represent entities in the simulation, such as:
- Robots
- Objects in the environment
- Sensors

Models are defined using SDF (Simulation Description Format).

#### Plugins

Plugins extend Gazebo's functionality by adding:
- Sensor simulation
- Controller logic
- Custom physics behaviors

### Creating a Simple World

Here's an example of a simple SDF world file:

```xml
<?xml version="1.0"?>
<sdf version="1.6">
  <world name="default">
    <!-- Ground plane -->
    <include>
      <uri>model://ground_plane</uri>
    </include>
    
    <!-- Sun light -->
    <include>
      <uri>model://sun</uri>
    </include>
    
    <!-- Simple box -->
    <model name="box">
      <pose>0 0 0.5 0 0 0</pose>
      <link name="link">
        <collision name="collision">
          <geometry>
            <box>
              <size>1 1 1</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>1 1 1</size>
            </box>
          </geometry>
        </visual>
      </link>
    </model>
  </world>
</sdf>
```

### Simulating Sensors

Gazebo can simulate various types of sensors commonly used in robotics:

#### LiDAR (Light Detection and Ranging)

LiDAR sensors measure distances using laser light. In Gazebo, we can simulate these with the GPU Lidar plugin:

```xml
<sensor name="gpu_lidar" type="gpu_lidar">
  <topic>scan</topic>
  <gz:imu>
    <gz:topic>imu</gz:topic>
  </gz:imu>
  <ray>
    <scan>
      <horizontal>
        <samples>640</samples>
        <resolution>1</resolution>
        <min_angle>-3.14159</min_angle>
        <max_angle>3.14159</max_angle>
      </horizontal>
      <vertical>
        <samples>1</samples>
        <resolution>1</resolution>
        <min_angle>0</min_angle>
        <max_angle>0</max_angle>
      </vertical>
    </scan>
    <range>
      <min>0.08</min>
      <max>10.0</max>
      <resolution>0.01</resolution>
    </range>
  </ray>
</sensor>
```

#### Depth Cameras

Depth cameras provide 3D information about the scene. Gazebo can simulate these with the depth camera sensor:

```xml
<sensor name="depth_camera" type="depth_camera">
  <camera>
    <horizontal_fov>1.047</horizontal_fov>
    <image>
      <width>640</width>
      <height>480</height>
      <format>R8G8B8</format>
    </image>
    <clip>
      <near>0.1</near>
      <far>100</far>
    </clip>
  </camera>
</sensor>
```

#### IMU (Inertial Measurement Unit)

IMUs measure acceleration and angular velocity. In Gazebo:

```xml
<sensor name="imu_sensor" type="imu">
  <topic>imu</topic>
  <gz:imu>
    <gz:topic>imu</gz:topic>
  </gz:imu>
  <imu>
    <noise>
      <type>gaussian</type>
      <rate>
        <mean>0.0</mean>
        <stddev>2e-4</stddev>
        <bias_mean>0.0000075</bias_mean>
        <bias_stddev>0.0000008</bias_stddev>
      </rate>
      <accel>
        <mean>0.0</mean>
        <stddev>1.7e-2</stddev>
        <bias_mean>0.1</bias_mean>
        <bias_stddev>0.001</bias_stddev>
      </accel>
    </noise>
  </imu>
</sensor>
```

## Unity: High-Fidelity Rendering

Unity is a powerful game engine that can be used for robotics simulation, particularly when high-fidelity visual rendering is required.

### Unity Robotics Hub

Unity provides the Unity Robotics Hub, which includes tools and packages for robotics simulation:

1. **ROS Integration**: Direct communication with ROS nodes
2. **URDF Importer**: Import robot models defined in URDF
3. **Perception Package**: Synthetic data generation for computer vision tasks

### Setting Up Unity for Robotics

1. Install Unity Hub
2. Install Unity Editor (2020.3 LTS recommended)
3. Clone the Unity Robotics Hub repository
4. Import the necessary packages

### Advantages of Unity for Robotics

1. **Photorealistic Rendering**: High-quality graphics for realistic simulation
2. **Physics Engine**: Accurate physics simulation with NVIDIA PhysX
3. **Cross-Platform**: Deploy simulations to various platforms
4. **Asset Store**: Extensive library of 3D models and assets
5. **VR/AR Support**: Easy integration with virtual and augmented reality

## Summary

In this module, we've explored the concept of digital twins and how simulation environments like Gazebo and Unity are essential tools in robotics development. We've covered how to set up simulations, create worlds and models, and simulate various sensors. In the next module, we'll dive into the AI aspects with NVIDIA Isaac.