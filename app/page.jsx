"use client"
import HeroSection from "@/components/hero";

import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HoverEffect } from "@/components/ui/card-hover-effect"




export default function Home() {
  return (
    <div className="pt-40  bg-black">
      <HeroSection />
      
      {/* feature-section */}
      <section className="py-20">
        <div className="container mx-auto  px-4 ">
          <h2 className="text-3xl font-bold text-center mb-12 text-white">
            Everything you need to Manage your finances
          </h2>
          <div className="max-w-5xl mx-auto px-8 ">
            <HoverEffect items={projects} />
          </div>
        </div>
      </section>
      {/* how it work section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto  px-4 bg-black ">
          <h2 className="text-3xl font-bold text-center mb-16 text-white ">How it Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorksData.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 ">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* testimonial */}
      
      {/* call-button */}
      <section className="py-20 bg-black">
        <div className="container mx-auto  px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to take Control of Your Finances?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already managing their finances
            Smarter with Coinly
          </p>
          <Link href="/dashboard">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 ">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

export const projects = [
  {
    title: "AutoCategorization",
    description:
      "Ai categorizes income and expenses in real-time.",
    link: "adn",
  },
  {
    title: "SpendAnalysis",
    description:
      "Ai analysis Spending and suggested budget changes.",
    link: "qweqe",
  },
  {
    title: "SmartBudgetAdvisor",
    description:
      "Real-time bugdet adjustment based on finacial habit.",
    link: "zxczxc",
  },
  {
    title: "InvestWise",
    description:
      "Personalized invesment recomedation .",
    link: "gdfbds",
  },
  {
    title: "Tax Estimation",
    description:
      "Automatically calculated tax for accurate and hassle-free financial planning..",
    link: "sgdfg",
  },
  {
    title: "Multi-Currency",
    description:
      "Support with multiple currencies with real time converstation.",
    link: "#",
  },
];