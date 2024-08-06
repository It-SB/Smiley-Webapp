import React from 'react'

const About = () => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">About Us</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
          <p className="text-gray-600 leading-relaxed">
            At SmileyJobs, our mission is to connect talented individuals with their dream jobs while helping companies find the perfect candidates to grow their businesses. We aim to create a seamless and efficient job search experience for all our users.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            Our vision is to revolutionize the job market by leveraging technology to create a platform that not only matches candidates with job openings but also provides career development resources to help individuals achieve their full potential.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600 leading-relaxed">
            <li>Integrity: We conduct our business with the highest standards of professionalism and ethical behavior.</li>
            <li>Innovation: We continuously seek new and creative solutions to improve our platform and services.</li>
            <li>Excellence: We strive for excellence in everything we do, ensuring our users receive the best possible experience.</li>
            <li>Community: We foster a supportive community that encourages growth, collaboration, and mutual respect.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Team</h2>
          <p className="text-gray-600 leading-relaxed">
            Our team is composed of dedicated professionals with diverse backgrounds and expertise. We are passionate about helping job seekers and employers navigate the job market with confidence and ease.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            Have questions or need assistance? Reach out to us at <a href="mailto:support@smileyjobs.com" className="text-blue-600 underline">support@smileyjobs.com</a> or call us at (123) 456-7890. We are here to help!
          </p>
        </section>
      </div>
    </div>
  )
}

export default About
