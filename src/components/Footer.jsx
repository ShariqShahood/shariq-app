import 'animate.css';

function Footer() {
  return (
    <footer className="bg-indigo-600 text-white py-8 mt-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center animate__animated animate__fadeInUp">
          {/* Logo or Brand Name */}
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl font-bold hover:text-gray-300 transition-all duration-300 ease-in-out">
            Welome To TeamTalk
            </h2>
          </div>
          {/* Social Media Icons */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-white hover:text-gray-300 transition-all duration-300 ease-in-out"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              className="text-white hover:text-gray-300 transition-all duration-300 ease-in-out"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              className="text-white hover:text-gray-300 transition-all duration-300 ease-in-out"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://aedin.com"
              className="text-white hover:text-gray-300 transition-all duration-300 ease-in-out"
              aria-label="aedIn"
            >
              <i className="fab fa-aedin-in"></i>
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center text-gray-300 mt-8 animate__animated animate__fadeInUp">
          <p>© 2024 MyDashboard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

