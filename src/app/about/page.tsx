"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Download, MapPin, Calendar } from "lucide-react";
import { SectionErrorBoundary, ComponentErrorBoundary } from "@/components/error-boundaries";

export default function About() {
  const skills = [
    { name: "React/Next.js", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Node.js", level: 85 },
    { name: "Figma", level: 80 },
    { name: "UI/UX Design", level: 85 },
  ];

  const experiences = [
    {
      company: "Tech Innovation Co.",
      position: "Senior Frontend Developer",
      duration: "2022 - Present",
      description: "Led the development of modern web applications using React and Next.js, improving user engagement by 40%.",
    },
    {
      company: "Creative Agency",
      position: "Web Designer & Developer",
      duration: "2020 - 2022",
      description: "Designed and developed responsive websites for clients, focusing on user experience and conversion optimization.",
    },
    {
      company: "Startup Inc.",
      position: "Frontend Developer",
      duration: "2019 - 2020",
      description: "Built and maintained React applications, collaborated with design team to implement pixel-perfect interfaces.",
    },
  ];

  return (
    <div className="pt-16 min-h-screen">
      {/* Hero Section */}
      <SectionErrorBoundary sectionName="About Hero">
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <ComponentErrorBoundary componentName="About Content">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                    About Me
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    I&apos;m a passionate web designer and developer with over 5 years of experience
                    creating beautiful, functional, and user-centered digital experiences.
                    I specialize in modern frontend technologies and have a keen eye for design.
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>Available for projects</span>
                    </div>
                  </div>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                    <Download className="h-4 w-4 mr-2" />
                    Download CV
                  </button>
                </motion.div>
              </ComponentErrorBoundary>

              <ComponentErrorBoundary componentName="About Image">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative"
                >
                  <div className="relative w-full aspect-square max-w-md mx-auto">
                    <Image
                      src="/api/placeholder/400/400"
                      alt="Alex Johnson"
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                </motion.div>
              </ComponentErrorBoundary>
            </div>
          </div>
        </section>
      </SectionErrorBoundary>

      {/* Skills Section */}
      <SectionErrorBoundary sectionName="Skills Section">
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Skills & Expertise
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Here are some of the technologies and tools I work with to bring ideas to life.
              </p>
            </motion.div>
            <ComponentErrorBoundary componentName="Skills Grid">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </ComponentErrorBoundary>
          </div>
        </section>
      </SectionErrorBoundary>

      {/* Experience Section */}
      <SectionErrorBoundary sectionName="Experience Section">
        <section className="py-20 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center space-y-4 mb-12"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Experience
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                My professional journey and the companies I&apos;ve had the privilege to work with.
              </p>
            </motion.div>
            <ComponentErrorBoundary componentName="Experience Timeline">
              <div className="max-w-4xl mx-auto space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card rounded-lg p-6 border"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-card-foreground">
                          {exp.position}
                        </h3>
                        <p className="text-primary font-medium">{exp.company}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-muted-foreground mt-2 md:mt-0">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">{exp.duration}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{exp.description}</p>
                  </motion.div>
                ))}
              </div>
            </ComponentErrorBoundary>
          </div>
        </section>
      </SectionErrorBoundary>
    </div>
  );
}
