import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Modern e-commerce platform with React and Node.js",
    longDescription: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, payment integration with Stripe, order management, and admin dashboard. The platform is designed to handle high traffic with optimized performance and includes real-time inventory management, email notifications, and comprehensive analytics.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop&crop=center"
    ],
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express", "JWT", "Tailwind CSS", "Redis"],
    category: "fullstack",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: true,
    completedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication",
    longDescription: "A React Native mobile banking application featuring biometric authentication, account management, transaction history, bill payments, and real-time notifications. Built with security and user experience as top priorities, featuring end-to-end encryption, fraud detection, and seamless integration with banking APIs.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=400&fit=crop&crop=center"
    ],
    technologies: ["React Native", "Firebase", "TypeScript", "Expo", "Plaid API", "Biometric Auth"],
    category: "mobile",
    liveUrl: "https://example.com",
    featured: true,
    completedAt: "2024-02-20",
  },
  {
    id: "3",
    title: "Portfolio Website",
    description: "Personal portfolio website for a photographer",
    longDescription: "A stunning portfolio website for a professional photographer, featuring a gallery with lightbox functionality, client testimonials, booking system, and blog. Built with performance and visual appeal in mind.",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop&crop=center"
    ],
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion", "Sanity CMS"],
    category: "web",
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: false,
    completedAt: "2024-03-10",
  },
  {
    id: "4",
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates",
    longDescription: "A comprehensive task management application built with modern web technologies. Features include project organization, team collaboration, real-time updates, file attachments, and detailed reporting. The app includes drag-and-drop functionality, customizable workflows, and integrations with popular tools.",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop&crop=center"
    ],
    technologies: ["Vue.js", "Node.js", "Socket.io", "PostgreSQL", "Docker"],
    category: "fullstack",
    githubUrl: "https://github.com",
    featured: false,
    completedAt: "2024-04-05",
  },
  {
    id: "5",
    title: "Weather Dashboard",
    description: "Real-time weather monitoring dashboard with forecasting",
    longDescription: "A comprehensive weather dashboard that provides real-time weather data, 7-day forecasts, and interactive maps. Built with React and integrated with multiple weather APIs for accurate and reliable data. Features include location-based weather, severe weather alerts, and customizable widgets.",
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600&h=400&fit=crop&crop=center"
    ],
    technologies: ["React", "TypeScript", "Chart.js", "OpenWeather API", "Tailwind CSS"],
    category: "web",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    featured: false,
    completedAt: "2024-05-12",
  },
  {
    id: "6",
    title: "Fitness Tracking App",
    description: "Mobile app for tracking workouts and fitness goals",
    longDescription: "A comprehensive fitness tracking application that helps users monitor their workouts, set fitness goals, and track progress over time. Features include exercise library, workout planning, progress analytics, and social sharing. Built with React Native for cross-platform compatibility.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1549476464-37392f717541?w=600&h=400&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop&crop=center"
    ],
    technologies: ["React Native", "SQLite", "Redux", "Chart.js", "Firebase Auth"],
    category: "mobile",
    githubUrl: "https://github.com",
    featured: true,
    completedAt: "2024-06-08",
  }
];
