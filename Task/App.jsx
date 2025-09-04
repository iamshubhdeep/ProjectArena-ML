import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Users, Star, ChevronDown, ChevronUp, Menu, X, Mail, Phone, Twitter, Linkedin, Github, Award, Play, Download, Share2, Heart, Eye, Zap, Target, TrendingUp, BookOpen, Coffee, Mic, Camera, Globe, Shield } from 'lucide-react';

const EventWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedScheduleItem, setExpandedScheduleItem] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ days: 30, hours: 12, minutes: 45, seconds: 30 });
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    company: '',
    experience: '', 
    interests: [],
    dietary: '',
    newsletter: false 
  });
  const [registeredCount, setRegisteredCount] = useState(847);
  const [showModal, setShowModal] = useState(false);
  const [likedSpeakers, setLikedSpeakers] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const speakers = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      role: "Chief Data Scientist at Google",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      bio: "Leading expert in machine learning with 10+ years experience. Published 50+ papers and holds 12 patents in AI.",
      expertise: ["Machine Learning", "AI Research", "Deep Learning"],
      rating: 4.9,
      talks: 45
    },
    {
      id: 2,
      name: "Alex Rodriguez",
      role: "Senior ML Engineer at Netflix",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      bio: "Creator of ML recommendation systems serving 200M+ users. Author of 'Modern ML Practices'.",
      expertise: ["Deep Learning", "Recommendation Systems", "MLOps"],
      rating: 4.8,
      talks: 32
    },
    {
      id: 3,
      name: "Maya Patel",
      role: "VP Data at Spotify",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      bio: "Expert in business intelligence and data visualization. Led data transformation for 100+ companies.",
      expertise: ["Data Visualization", "Business Intelligence", "Analytics"],
      rating: 4.9,
      talks: 67
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      role: "AI Research Scientist at OpenAI",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      bio: "Former Stanford professor, pioneer in NLP and computer vision. Leading GPT research at OpenAI.",
      expertise: ["NLP", "Computer Vision", "LLMs"],
      rating: 5.0,
      talks: 89
    },
    {
      id: 5,
      name: "Lisa Zhang",
      role: "Head of ML at Tesla",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
      bio: "Leading autonomous driving ML systems. Expert in computer vision and robotics AI.",
      expertise: ["Autonomous Systems", "Computer Vision", "Robotics"],
      rating: 4.7,
      talks: 28
    },
    {
      id: 6,
      name: "Dr. Michael Brown",
      role: "Founder & CEO of DataVision AI",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=face",
      bio: "Serial entrepreneur. Built and sold 3 AI startups valued at $500M+. Mentor to 100+ professionals.",
      expertise: ["AI Strategy", "Startups", "Leadership"],
      rating: 4.8,
      talks: 156
    }
  ];

  const schedule = [
    {
      time: "8:30 AM - 9:00 AM",
      title: "Registration & Welcome Coffee",
      description: "Check-in, networking breakfast, welcome bags, and morning refreshments.",
      speaker: "Event Team",
      type: "registration",
      location: "Main Lobby"
    },
    {
      time: "9:00 AM - 9:15 AM",
      title: "Opening Ceremony",
      description: "Official welcome and event overview with exciting announcements.",
      speaker: "Event Organizers",
      type: "ceremony",
      location: "Main Auditorium"
    },
    {
      time: "9:15 AM - 10:15 AM",
      title: "Keynote: The Future of AI",
      description: "Exploring cutting-edge AI developments and industry impact for the next decade.",
      speaker: "Dr. James Wilson",
      type: "keynote",
      location: "Main Auditorium"
    },
    {
      time: "10:30 AM - 12:00 PM",
      title: "Workshop: Building ML Models",
      description: "Interactive session building end-to-end ML models with Python and MLOps.",
      speaker: "Alex Rodriguez",
      type: "workshop",
      location: "Tech Lab A"
    },
    {
      time: "10:30 AM - 12:00 PM",
      title: "Masterclass: Data Visualization",
      description: "Advanced techniques for creating compelling data stories and dashboards.",
      speaker: "Maya Patel",
      type: "masterclass",
      location: "Design Studio"
    },
    {
      time: "12:00 PM - 1:00 PM",
      title: "Networking Lunch",
      description: "Connect with professionals and explore sponsor technologies.",
      speaker: "All Attendees",
      type: "break",
      location: "Exhibition Hall"
    },
    {
      time: "1:00 PM - 2:00 PM",
      title: "Fireside Chat: Scaling AI at Tesla",
      description: "Insights into autonomous driving AI and scaling ML systems.",
      speaker: "Lisa Zhang",
      type: "fireside",
      location: "Lounge Area"
    },
    {
      time: "2:15 PM - 3:15 PM",
      title: "Panel: Career Paths in Data Science",
      description: "Industry experts discuss career trajectories and advancement strategies.",
      speaker: "All Speakers",
      type: "panel",
      location: "Main Auditorium"
    },
    {
      time: "3:30 PM - 4:30 PM",
      title: "Startup Pitch Session",
      description: "Innovative AI startups pitch to investors and learn entrepreneurship.",
      speaker: "Dr. Michael Brown",
      type: "pitch",
      location: "Startup Arena"
    },
    {
      time: "4:45 PM - 5:30 PM",
      title: "Closing Keynote: Your Data Career",
      description: "Practical advice and actionable steps to accelerate your data science career.",
      speaker: "Dr. Sarah Chen",
      type: "keynote",
      location: "Main Auditorium"
    },
    {
      time: "5:30 PM - 7:00 PM",
      title: "Happy Hour & Networking",
      description: "Unwind with drinks, snacks, and continued professional networking.",
      speaker: "All Attendees",
      type: "social",
      location: "Rooftop Terrace"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Data Analyst at Microsoft",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=80&h=80&fit=crop&crop=face",
      quote: "This event transformed my ML understanding. Got my dream job 2 weeks after attending!",
      rating: 5
    },
    {
      name: "David Chen",
      role: "ML Engineer at Spotify",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face",
      quote: "Best data science event ever. Amazing speakers and practical skills I use daily!",
      rating: 5
    },
    {
      name: "Emily Rodriguez",
      role: "Senior Data Scientist at Uber",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
      quote: "Exceptional content quality. Learned cutting-edge techniques immediately applicable at work.",
      rating: 5
    }
  ];

  const sponsors = [
    { name: "Google", logo: "🔍", tier: "Platinum" },
    { name: "Microsoft", logo: "⊞", tier: "Platinum" },
    { name: "Netflix", logo: "📺", tier: "Gold" },
    { name: "Tesla", logo: "⚡", tier: "Gold" },
    { name: "Spotify", logo: "🎵", tier: "Silver" },
    { name: "Uber", logo: "🚗", tier: "Silver" },
    { name: "OpenAI", logo: "🤖", tier: "Silver" },
    { name: "Airbnb", logo: "🏠", tier: "Bronze" }
  ];

  const features = [
    { icon: Award, title: "Official Certificate", description: "Industry-recognized completion certificate" },
    { icon: Coffee, title: "Premium Networking", description: "Connect with 2000+ top professionals" },
    { icon: Download, title: "Exclusive Resources", description: "Code samples, slides, and materials" },
    { icon: Camera, title: "Recorded Sessions", description: "6-month access to all recordings" },
    { icon: Shield, title: "Career Support", description: "Job placement and career counseling" },
    { icon: Heart, title: "Private Community", description: "Join 10,000+ data professionals" }
  ];

  const handleSubmit = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name required";
    if (!formData.email.trim()) errors.email = "Email required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid email";
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      setRegisteredCount(prev => prev + 1);
      setShowModal(true);
      setFormData({ name: '', email: '', phone: '', company: '', experience: '', interests: [], dietary: '', newsletter: false });
    }
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const getSessionTypeColor = (type) => {
    const colors = {
      keynote: 'bg-purple-100 text-purple-800',
      workshop: 'bg-green-100 text-green-800',
      masterclass: 'bg-blue-100 text-blue-800',
      panel: 'bg-orange-100 text-orange-800',
      fireside: 'bg-red-100 text-red-800',
      pitch: 'bg-yellow-100 text-yellow-800',
      social: 'bg-pink-100 text-pink-800',
      break: 'bg-gray-100 text-gray-800',
      ceremony: 'bg-indigo-100 text-indigo-800',
      registration: 'bg-cyan-100 text-cyan-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful! 🎉</h3>
              <p className="text-gray-600 mb-4">Welcome to DataSci Summit 2025!</p>
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <p className="text-sm text-blue-800">
                  ✅ Confirmation email sent<br />
                  ✅ Calendar invite included<br />
                  ✅ Community access granted
                </p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Amazing!
              </button>
            </div>
          </div>
        </div>
      )}

      {}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-lg shadow-lg z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">DataSci Summit 2025</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <button onClick={() => scrollToSection('hero')} className="text-gray-700 hover:text-blue-600 px-3 py-2">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 px-3 py-2">About</button>
              <button onClick={() => scrollToSection('speakers')} className="text-gray-700 hover:text-blue-600 px-3 py-2">Speakers</button>
              <button onClick={() => scrollToSection('schedule')} className="text-gray-700 hover:text-blue-600 px-3 py-2">Schedule</button>
              <button onClick={() => scrollToSection('register')} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all">Register Free</button>
            </div>

            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-white border-t shadow-lg">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button onClick={() => scrollToSection('hero')} className="block px-3 py-2 w-full text-left">Home</button>
                <button onClick={() => scrollToSection('about')} className="block px-3 py-2 w-full text-left">About</button>
                <button onClick={() => scrollToSection('speakers')} className="block px-3 py-2 w-full text-left">Speakers</button>
                <button onClick={() => scrollToSection('schedule')} className="block px-3 py-2 w-full text-left">Schedule</button>
                <button onClick={() => scrollToSection('register')} className="block px-3 py-2 bg-blue-600 text-white rounded-lg mx-3 my-2">Register</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {}
      <section id="hero" className="pt-16 bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="mb-6">
              <span className="bg-yellow-400/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-yellow-400/30">
                🔥 Early Bird: Save 40% • {registeredCount} Registered
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              DataSci Summit
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400">2025</span>
            </h1>
            
            <p className="text-xl sm:text-2xl mb-4 text-blue-100 max-w-3xl mx-auto">
              The World's Largest Data Science & AI Conference
            </p>
            
            <p className="text-lg mb-8 text-blue-200 max-w-2xl mx-auto">
              Join 2000+ professionals, 50+ industry experts, and discover the future of data science
            </p>
            
            {/* Countdown Timer */}
            <div className="mb-12">
              <p className="text-lg mb-6 text-blue-100">Event starts in:</p>
              <div className="flex justify-center space-x-4 sm:space-x-8">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 sm:p-6 min-w-[80px] border border-white/20">
                      <div className="text-3xl sm:text-4xl font-bold text-white">{value}</div>
                      <div className="text-sm text-blue-200 capitalize">{unit}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => scrollToSection('register')}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                🎯 Register Now - FREE
              </button>
              <button 
                onClick={() => scrollToSection('schedule')}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all border border-white/30"
              >
                <Play className="w-5 h-5 inline mr-2" />
                View Schedule
              </button>
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">2000+</div>
              <div className="text-gray-600">Attendees</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <Mic className="w-8 h-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Speakers</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">25+</div>
              <div className="text-gray-600">Workshops</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Globe className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">100+</div>
              <div className="text-gray-600">Companies</div>
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why DataSci Summit 2025?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The premier event for data science professionals, featuring world-class speakers, hands-on workshops, and unparalleled networking opportunities.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">What Makes Us Special</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Industry-Leading Content</h4>
                    <p className="text-gray-600">Cutting-edge insights from top practitioners at Google, Netflix, Tesla, and more.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Career Acceleration</h4>
                    <p className="text-gray-600">90% of attendees report career advancement within 6 months of attending.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">Premium Networking</h4>
                    <p className="text-gray-600">Connect with 2000+ professionals, hiring managers, and industry leaders.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                    <feature.icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {}
      <section id="speakers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">World-Class Speakers</h2>
            <p className="text-xl text-gray-600">Learn from the best minds in data science and AI</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {speakers.map((speaker) => (
              <div key={speaker.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-gray-100">
                <div className="relative">
                  <img 
                    src={speaker.image} 
                    alt={speaker.name}
                    className="w-full h-64 object-cover"
                  />
                  <button 
                    onClick={() => setLikedSpeakers(prev => 
                      prev.includes(speaker.id) ? prev.filter(id => id !== speaker.id) : [...prev, speaker.id]
                    )}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${likedSpeakers.includes(speaker.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{speaker.name}</h3>
                  <p className="text-blue-600 font-semibold mb-3">{speaker.role}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{speaker.bio}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {speaker.expertise.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{speaker.rating}</span>
                    </div>
                    <div>{speaker.talks} talks</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="schedule" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Event Schedule</h2>
            <p className="text-xl text-gray-600">A full day packed with learning, networking, and innovation</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {schedule.map((item, index) => (
              <div key={index} className="bg-white border rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setExpandedScheduleItem(expandedScheduleItem === index ? null : index)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <div className="flex items-center text-blue-600 font-semibold">
                          <Clock className="w-4 h-4 mr-2" />
                          {item.time}
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSessionTypeColor(item.type)}`}>
                          {item.type.toUpperCase()}
                        </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <Users className="w-4 h-4 mr-2" />
                        <span className="font-medium">{item.speaker}</span>
                        <MapPin className="w-4 h-4 ml-4 mr-2" />
                        <span>{item.location}</span>
                      </div>
                    </div>
                    
                    <button className="ml-4 p-2 rounded-full hover:bg-gray-100">
                      {expandedScheduleItem === index ? 
                        <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      }
                    </button>
                  </div>
                  
                  {expandedScheduleItem === index && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Attendees Say</h2>
            <p className="text-xl text-gray-600">Join thousands of satisfied professionals</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 md:p-12">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl text-gray-900 font-medium mb-8">
                  "{testimonials[activeTestimonial].quote}"
                </blockquote>
                
                <div className="flex items-center justify-center">
                  <img 
                    src={testimonials[activeTestimonial].image}
                    alt={testimonials[activeTestimonial].name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-bold text-gray-900">{testimonials[activeTestimonial].name}</div>
                    <div className="text-gray-600">{testimonials[activeTestimonial].role}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeTestimonial === index ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-xl text-gray-600">Our partners and sponsors</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{sponsor.logo}</div>
                <h3 className="font-bold text-gray-900 mb-2">{sponsor.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  sponsor.tier === 'Platinum' ? 'bg-gray-800 text-white' :
                  sponsor.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                  sponsor.tier === 'Silver' ? 'bg-gray-100 text-gray-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {sponsor.tier}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {}
      <section id="register" className="py-20 bg-gradient-to-br from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Secure Your Spot Today</h2>
            <p className="text-xl text-blue-100 mb-2">Free registration • Limited seats available</p>
            <p className="text-lg text-blue-200">{registeredCount} professionals already registered</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-6">Registration Form</h3>
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full p-4 rounded-lg bg-white/20 placeholder-white/70 text-white border border-white/30 focus:border-white/50 focus:outline-none"
                    />
                    {formErrors.name && <p className="text-red-300 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-4 rounded-lg bg-white/20 placeholder-white/70 text-white border border-white/30 focus:border-white/50 focus:outline-none"
                    />
                    {formErrors.email && <p className="text-red-300 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                  
                  <input
                    type="tel"
                    placeholder="Phone Number (Optional)"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full p-4 rounded-lg bg-white/20 placeholder-white/70 text-white border border-white/30 focus:border-white/50 focus:outline-none"
                  />
                  
                  <input
                    type="text"
                    placeholder="Company/Organization"
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full p-4 rounded-lg bg-white/20 placeholder-white/70 text-white border border-white/30 focus:border-white/50 focus:outline-none"
                  />
                  
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    className="w-full p-4 rounded-lg bg-white/20 text-white border border-white/30 focus:border-white/50 focus:outline-none"
                  >
                    <option value="" className="text-gray-900">Experience Level</option>
                    <option value="beginner" className="text-gray-900">Beginner (0-2 years)</option>
                    <option value="intermediate" className="text-gray-900">Intermediate (2-5 years)</option>
                    <option value="advanced" className="text-gray-900">Advanced (5+ years)</option>
                    <option value="expert" className="text-gray-900">Expert/Leadership</option>
                  </select>
                  
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="newsletter"
                      checked={formData.newsletter}
                      onChange={(e) => setFormData({...formData, newsletter: e.target.checked})}
                      className="mr-3 h-4 w-4"
                    />
                    <label htmlFor="newsletter" className="text-sm text-white/90">
                      Subscribe to our newsletter for updates and exclusive content
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-6">What You Get</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <span>Official completion certificate</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                      <Download className="w-4 h-4 text-white" />
                    </div>
                    <span>All presentation slides & code samples</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                      <Camera className="w-4 h-4 text-white" />
                    </div>
                    <span>6-month access to recorded sessions</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center mr-4">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <span>Private community access</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-4">
                      <Coffee className="w-4 h-4 text-white" />
                    </div>
                    <span>Networking lunch & happy hour</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center mr-4">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <span>Career support & job placement help</span>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-300">FREE</div>
                    <div className="text-sm text-white/70">Regular Price: $299</div>
                    <div className="text-xs text-white/60 mt-1">Limited time offer</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-12 py-4 rounded-full text-xl font-bold hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                🎯 Register Free Now
              </button>
              <p className="text-sm text-white/70 mt-4">
                By registering, you agree to our terms and privacy policy
              </p>
            </div>
          </div>
        </div>
      </section>

      {}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">DataSci Summit 2025</h3>
              </div>
              <p className="text-gray-400 mb-4">
                The world's largest data science and AI conference. Join us for an unforgettable learning experience.
              </p>
              <div className="flex space-x-4">
                <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700">
                  <Github className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Event Info</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>March 15, 2025</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>8:30 AM - 7:00 PM</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>San Francisco Convention Center</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <div className="space-y-2 text-gray-400">
                <button onClick={() => scrollToSection('about')} className="block hover:text-white">About</button>
                <button onClick={() => scrollToSection('speakers')} className="block hover:text-white">Speakers</button>
                <button onClick={() => scrollToSection('schedule')} className="block hover:text-white">Schedule</button>
                <button onClick={() => scrollToSection('register')} className="block hover:text-white">Register</button>
                <a href="#" className="block hover:text-white">Code of Conduct</a>
                <a href="#" className="block hover:text-white">Sponsorship</a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>info@datascisummit.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 DataSci Summit. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventWebsite;
