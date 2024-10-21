import React from 'react';
import 'animate.css';
import Navbar from './Navbar';
import a from '../assets/a.png'
import b from '../assets/b.png'
import c from '../assets/2.jpeg'
import d from '../assets/7.jpeg'
import e from '../assets/9.jpeg'

const AboutUs = () => {

    const handleLogout = () => {
        logout();
        navigate('/');
    };  
  return (
    <>
    <Navbar handleLogout={handleLogout}/>
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-10">
      <div className="max-w-7xl mx-auto p-8">
        {/* Animated Header */}
        <div className="text-center animate__animated animate__fadeInUp">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-700 mb-4">
            About Us
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            We are committed to building innovative solutions that transform the way people work and live.
          </p>
        </div>

        {/* Section 1: Mission */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="animate__animated animate__fadeInLeft">
            <img
              src={a}
              alt="Our Mission"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center animate__animated animate__fadeInRight">
            <h2 className="text-3xl font-bold text-purple-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Our mission is to deliver cutting-edge technology solutions that
              empower businesses to succeed. We strive to create seamless,
              user-friendly platforms that enhance productivity and foster
              growth.
            </p>
          </div>
        </div>

        {/* Section 2: Our Values */}
        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col justify-center animate__animated animate__fadeInLeft">
            <h2 className="text-3xl font-bold text-purple-600 mb-4">
              Our Values
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              We believe in innovation, collaboration, and customer-centric
              development. These core values guide our approach to problem-solving and drive our pursuit of excellence in every project.
            </p>
          </div>
          <div className="animate__animated animate__fadeInRight">
            <img
              src={b}
              alt="Our Values"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Section 3: Our Team */}
        <div className="mt-16 md:mt-20">
          <h2 className="text-3xl font-bold text-purple-600 mb-8 text-center animate__animated animate__fadeInUp">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {/* Team Member 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 animate__animated animate__fadeInUp">
              <img
                src={d}
                alt="Team Member 1"
                className="w-50 h-42 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-700 text-center">
                Shariq Shahood
              </h3>
              <p className="text-purple-500 text-center">CEO</p>
              <p className="text-gray-600 text-center mt-2">
                John leads the vision and strategy behind all projects, ensuring we deliver excellence.
              </p>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 animate__animated animate__fadeInUp delay-1s">
              <img
                src={c}
                alt="Team Member 2"
                className="w-50 h-42 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-700 text-center">
              Shariq Shahood
              </h3>
              <p className="text-purple-500 text-center">CTO</p>
              <p className="text-gray-600 text-center mt-2">
                Jane oversees the technology and development process to ensure the best results.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 animate__animated animate__fadeInUp delay-2s">
              <img
                src={e}
                alt="Team Member 3"
                className="w-50 h-42 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-bold text-gray-700 text-center">
              Shariq Shahood
              </h3>
              <p className="text-purple-500 text-center">COO</p>
              <p className="text-gray-600 text-center mt-2">
                Alex manages operations and ensures smooth project delivery and client satisfaction.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center text-gray-500">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutUs;
