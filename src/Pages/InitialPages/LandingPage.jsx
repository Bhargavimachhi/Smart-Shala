import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PenTool, Send, FileCheck, Atom, Lightbulb, HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import Rightangle from "../../assets/Right-angle.svg";
import Straightline from "../../assets/Straightline.svg";
import symbol from "../../assets/symbol.svg";

const LandingPage = () => {
  return (
   

    <div className="min-h-screen bg-[url('/grid-pattern.svg')] bg-repeat">
     
      <header className="flex items-center justify-between p-4 md:p-6">
         <div className="flex items-center gap-2">
           <PenTool className="h-6 w-6" />
           <span className="text-xl font-semibold">SmartShala</span>
         </div>
         <nav className="flex items-center gap-4 md:gap-6">
           <Link
             to="/pricing"
             className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
           >
             Pricing
           </Link>
         
           <Link
             to="/login"
             className="text-sm md:text-base text-muted-foreground hover:text-foreground transition-colors"
           >
             Log In
           </Link>
           <Link to="/signup">
             <Button variant="outline" size="sm">
               Sign Up
             </Button>
           </Link>
         </nav>
       </header>

      <main className="container mx-auto px-4 py-12 md:py-24 relative">
      
        <div className="absolute left-1/4 top-0 transform -translate-x-1/2 -translate-y-1/4 rotate-[-15deg]">
   
        {/* <Send className="h-24 w-24 text-muted-foreground/50" /> */}
        <img src={symbol} className="h-24 w-24 opacity-75"/>

  

          
        </div>

        <div className="absolute right-1/4 top-1/4 transform translate-x-1/2 -translate-y-1/2">
          {/* <FileCheck className="h-20 w-20 text-muted-foreground/50" /> */}
          <img src={Rightangle} className="h-24 w-24 opacity-75"/>
        </div>

        

        <div className="absolute right-1/5 bottom-1/4">
        <img src={Straightline} className="h-24 w-24 opacity-75"/>
        </div>

        {/* Main content */}
        <div className="max-w-3xl mx-auto text-center space-y-6 mt-12 md:mt-24">
          <h1 className="text-4xl md:text-6xl lg:text-5xl font-bold tracking-tight">Transform Your Education with SmartShala</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mt-6">
          Enhance your learning journey with SmartShala
          </p>
          <div className="mt-10">
            <Button size="lg" className="rounded-full px-8">
              Login <Send className="ml-2 h-4 w-4" />
            </Button>
           

          </div>
        </div>
      </main>

      <div className="container mx-auto px-4 py-12">
        <hr className="border-t border-border" />
      </div>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-12 md:py-24 relative">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>

          <div className="absolute left-0 top-24 transform -translate-x-1/2">
            <HelpCircle className="h-12 w-12 text-muted-foreground/30" />
          </div>

          <div className="absolute right-0 top-48 transform translate-x-1/2">
            <Lightbulb className="h-12 w-12 text-muted-foreground/30" />
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-muted">
              <AccordionTrigger className="text-lg font-medium py-4">What is SmartShala?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                SmartShala is an AI-powered education platform designed to enhance your learning experience. We provide
                interactive tools, personalized learning paths, and resources to help students excel in their
                educational journey.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-muted">
              <AccordionTrigger className="text-lg font-medium py-4">
                How does the AI-powered learning work?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Our AI technology analyzes your learning patterns, strengths, and areas for improvement to create a
                personalized learning experience. It adapts to your pace and style, providing targeted resources and
                exercises to maximize your educational outcomes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-b border-muted">
              <AccordionTrigger className="text-lg font-medium py-4">
                Is SmartShala suitable for all age groups?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Yes! SmartShala offers content tailored for various age groups and educational levels, from primary
                school to higher education. Our platform adapts to the specific needs and learning objectives of each
                age group.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border-b border-muted">
              <AccordionTrigger className="text-lg font-medium py-4">
                How do I get started with SmartShala?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4">
                Simply click the "Get Started" button, create an account, and you'll be guided through a brief
                onboarding process to customize your learning experience. You can start learning immediately after
                setting up your profile.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <div className="container mx-auto px-4 py-6">
        <hr className="border-t border-border" />
        <div className="text-center text-sm text-muted-foreground py-6">© 2024 SmartShala. All rights reserved.</div>
      </div>
    </div>
  );
};

export default LandingPage;
