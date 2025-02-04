
**RENT MANAGEMENT SYSTEM**

This is a React-based Rent Management System designed to help property managers efficiently manage properties, tenants, and payments. The application allows users to add properties and tenants, view a list of properties, and handle basic CRUD operations via a RESTful API.

**Features**

Add Property: 
Users can add new properties by providing details such as name, address, rent, and number of bedrooms.
Add Tenant:
 Users can add new tenants by providing details such as name, email, phone, unit ID, and property ID.
Browse Properties:
 Users can view a list of properties with details such as name, address, rent, and number of bedrooms.
Pagination:
 The properties list supports pagination with "View More" and "View Less" buttons.
Toast Notifications: The application uses react-toastify to display success and error messages.

**Technologies Used**

React: A JavaScript library for building user interfaces.
React Router: For navigation within the application.
Axios: For making HTTP requests to the backend API.
React Toastify: For displaying toast notifications.
Tailwind CSS: For styling the application.
Installation

**To run this project locally, follow these steps:**

Clone the repository:
bash
Copy
git clone https://github.com/masindes/User
cd rent-management-system
Install dependencies:
bash
Copy
npm install
Start the development server:
bash
Copy
npm start
Open the application:
The application should be running at http://localhost:3000.
Usage

**Adding a Property**

Navigate to the "Add Property" form.
Fill in the details:
Name: The name of the property.
Address: The address of the property.
Rent: The monthly rent amount.
Bedrooms: The number of bedrooms in the property.
Click the "Add Property" button to submit the form.
Adding a Tenant

Navigate to the "Add Tenant" form.
Fill in the details:
Name: The name of the tenant.
Email: The email address of the tenant.
Phone: The phone number of the tenant.
Unit ID: The ID of the unit the tenant is renting.
Property ID: The ID of the property the tenant is associated with.
Click the "Add Tenant" button to submit the form.
Browsing Properties

The properties are displayed in a grid layout.
Use the "View More" button to load additional properties.
Use the "View Less" button to reduce the number of displayed properties.
API Endpoints

**The application interacts with the following API endpoints:**

Fetch Properties: GET https://rent-management-app.onrender.com/property
Add Property: POST https://rent-management-app.onrender.com/property
Fetch Tenants: GET https://rent-management-app.onrender.com/tenant
Add Tenant: POST https://rent-management-app.onrender.com/tenant
Contributing

**Contributions are welcome! If you'd like to contribute, please follow these steps:**

Fork the repository.
Create a new branch (git checkout -b feature/YourFeatureName).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature/YourFeatureName).
Open a pull request.
License

**This project is licensed under the MIT License. See the LICENSE file for details.**

Acknowledgments

React
React Router
React Toastify
Tailwind CSS
Contact

For any questions or feedback, please reach out to masinde.sylvester@yahoo.com


back end repo link https://github.com/masindes/Rent_Management_app
reployed/livelink   https://user-snowy.vercel.app/