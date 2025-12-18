---
sidebar_position: 2
---

# Module 1: The Robotic Nervous System (ROS 2)

In this module, we'll explore ROS 2 (Robot Operating System 2), the middleware that acts as the nervous system for robots. ROS 2 provides a flexible framework for writing robotic applications, offering tools, libraries, and conventions that aim to simplify the complexity of creating robot behavior.

## Learning Objectives

By the end of this module, you will be able to:
- Understand the fundamental concepts of ROS 2
- Create and manage ROS 2 nodes
- Work with topics and services for communication
- Bridge Python agents to ROS controllers using rclpy
- Define robot models using URDF

## What is ROS 2?

ROS 2 is a set of software libraries and tools that help you build robot applications. From drivers to state-of-the-art algorithms, and with powerful developer tools, ROS 2 has what you need for your next robotics project. And it's all open source.

### Key Features of ROS 2

1. **Distributed Communication**: ROS 2 uses DDS (Data Distribution Service) for communication between nodes, providing reliable and scalable messaging.

2. **Real-time Support**: ROS 2 offers better real-time capabilities compared to ROS 1, making it suitable for time-critical applications.

3. **Multi-platform Support**: ROS 2 supports multiple operating systems including Linux, Windows, and macOS.

4. **Enhanced Security**: Built-in security features including authentication, encryption, and access control.

## ROS 2 Core Concepts

### Nodes

Nodes are the fundamental building blocks of ROS 2. A node is an entity that uses ROS 2 to communicate with other nodes. Nodes can publish data to topics, subscribe to topics, provide or use services, and manage parameters.

### Topics

Topics are named buses over which nodes exchange messages. Publishers send messages to topics, and subscribers receive messages from topics. Communication is many-to-many, meaning multiple publishers and subscribers can use the same topic.

### Services

Services provide a request/response communication model. Unlike topics which are asynchronous, services are synchronous. A service server waits for requests and responds to them.

### Messages

Messages are the data structures that are exchanged between nodes. Each message type is defined in a `.msg` file that specifies the data structure.

## Setting Up ROS 2

Before we dive into development, let's set up ROS 2 on your system.

### Installation

For Ubuntu 22.04 (Jammy):

```bash
# Add the ROS 2 GPG key
sudo apt update && sudo apt install curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

# Add the repository to your sources list
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Install ROS 2
sudo apt update
sudo apt install ros-humble-desktop
```

### Environment Setup

Source the setup script:

```bash
source /opt/ros/humble/setup.bash
```

To automatically source this script in every terminal, add it to your shell configuration:

```bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
```

## Creating Your First ROS 2 Node

Let's create a simple publisher node that publishes messages to a topic:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class SimplePublisher(Node):
    def __init__(self):
        super().__init__('simple_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello ROS 2: {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    simple_publisher = SimplePublisher()
    rclpy.spin(simple_publisher)
    simple_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Working with URDF

URDF (Unified Robot Description Format) is an XML format for representing a robot model. It describes the robot's kinematic and dynamic properties, visual appearance, and collision characteristics.

Here's a simple example of a URDF for a two-link arm:

```xml
<?xml version="1.0"?>
<robot name="two_link_arm">
  <link name="base_link">
    <visual>
      <geometry>
        <cylinder length="0.01" radius="0.1"/>
      </geometry>
      <material name="grey">
        <color rgba="0.5 0.5 0.5 1"/>
      </material>
    </visual>
  </link>

  <joint name="joint1" type="revolute">
    <parent link="base_link"/>
    <child link="link1"/>
    <origin xyz="0 0 0.005" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit effort="1000.0" lower="-3.1416" upper="3.1416" velocity="0.5"/>
  </joint>

  <link name="link1">
    <visual>
      <geometry>
        <cylinder length="0.5" radius="0.02"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1"/>
      </material>
    </visual>
  </link>
</robot>
```

## Summary

In this module, we've covered the fundamentals of ROS 2, including nodes, topics, services, and URDF. These concepts form the foundation for building more complex robotic systems. In the next module, we'll explore how to simulate robots using Gazebo and Unity.