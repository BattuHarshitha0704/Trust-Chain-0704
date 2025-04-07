
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeedbackForm from "@/components/FeedbackForm";
import { MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const FeedbackPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 pb-12">
        <div className="container mx-auto px-4">
          <div className="mb-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-purple-500/15 p-3 rounded-full">
                <MessageSquare className="h-8 w-8 text-purple-500" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Provide Feedback</h1>
            <p className="text-white/70 max-w-xl mx-auto">
              Help us improve SafeSpeak by sharing your experience. Your feedback is valuable in enhancing our service.
            </p>
          </div>
          
          <motion.div 
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FeedbackForm />
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FeedbackPage;
