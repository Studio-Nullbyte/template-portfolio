"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Avatar } from "./ui/SafeImage";
import type { TestimonialsSectionProps, Testimonial } from "@/types";

const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechCorp Inc.",
    content: "Alex delivered an outstanding website that exceeded our expectations. The attention to detail and user experience is remarkable. Our conversion rate increased by 40% after the redesign.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah&backgroundColor=b6e3f4&radius=50",
    date: "2024-03-15",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "CEO",
    company: "StartupXYZ",
    content: "Working with Alex was a game-changer for our business. The mobile app they developed is intuitive, fast, and our users love it. Highly recommend for any development project.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael&backgroundColor=c084fc&radius=50",
    date: "2024-02-28",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    role: "Marketing Director",
    company: "Creative Agency",
    content: "Alex's design skills are exceptional. They transformed our brand identity and created a cohesive visual language that perfectly represents our company. Professional and creative.",
    rating: 5,
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily&backgroundColor=fbbf24&radius=50",
    date: "2024-01-20",
  },
];

export function TestimonialsSection({
  variant,
  title = "What Clients Say",
  description = "Hear from some of the amazing clients I've had the pleasure of working with.",
  ...props
}: TestimonialsSectionProps) {
  // Default testimonials and columns based on variant
  const testimonials = 'testimonials' in props ? props.testimonials || defaultTestimonials :
                     'testimonial' in props ? [props.testimonial] : defaultTestimonials;
  const columns = variant === 'grid' && 'columns' in props ? props.columns || 3 : 3;
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial: Testimonial, index: number) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 hover:shadow-lg transition-all duration-300 relative"
            >
              <div className="absolute top-6 right-6 text-primary/20">
                <Quote className="h-8 w-8" />
              </div>

              <div className="space-y-4">
                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-card-foreground leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4 pt-4 border-t">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Avatar
                      src={testimonial.avatar}
                      name={testimonial.name}
                      size={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-card-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
