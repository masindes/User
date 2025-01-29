import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

const App = () => {
  return (
    <>
    <Navbar />
    <Hero />
    

      {/* properties and Tenants */}
      <section className="py-4">
        <div className="container-xl lg:container m-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">For Tenants</h2>
              <p className="mt-2 mb-4">Browse our rental properties and find your perfect home today</p>
              <a href="/properties.html" className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-sky-700">
                Browse properties
              </a>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold">For Landlords</h2>
              <p className="mt-2 mb-4">List your property to find the perfect tenant for your home</p>
              <a href="/add-property.html" className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-sky-700">
                Add Property
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Browse Properties */}
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">Browse Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Property Listing 1 */}
            <JobCard
              type="456 Ocean Drive"
              location="5"
              title="1"
              description="Oceanview Villas"
              salary="$70K - $80K / Monthly"
            />
            {/* PropertyListing 2 */}
            <JobCard
              type="Remote"
              title="Front-End Engineer (React)"
              location="Miami, FL"
              description="Join our team as a Front-End Developer in sunny Miami..."
              salary="$70K - $80K / Year"
            />
            {/* Property Listing 3 */}
            <JobCard
              type="Remote"
              title="React.js Developer"
              location="Brooklyn, NY"
              description="Are you passionate about front-end development?"
              salary="$70K - $80K / Year"
            />
          </div>
        </div>
      </section>
    </>
  );
};

// propertCard Component for reuse
const JobCard = ({ type, title, location, description, salary }) => {
  return (
    <div className="bg-white rounded-xl shadow-md relative">
      <div className="p-4">
        <div className="mb-6">
          <div className="text-gray-600 my-2">{type}</div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
        <div className="mb-5">{description}</div>
        <h3 className="text-indigo-500 mb-2">{salary}</h3>
        <div className="border border-gray-100 mb-5"></div>
        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="text-orange-700 mb-3">
            <i className="fa-solid fa-location-dot text-lg"></i> {location}
          </div>
          <a href="job.html" className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm">
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
