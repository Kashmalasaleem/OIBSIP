Login Authentication System
Overview
A client-side access control application engineered to support user registration, secure authentication, and a restricted dashboard view. The system incorporates robust input verification, existing account checking, and local session handling powered by the browser's storage capabilities.

Key Features
Account Registration: Sign up functionality utilizing unique identifiers (username or email) paired with a secure password.

Password Policy Enforcement: Built-in validation requiring passwords to be at least 8 characters long and contain a minimum of 1 numeric digit.

Duplicate Prevention: Automated checks to detect and prevent the creation of duplicate accounts.

Credential Verification: Login validation featuring precise and helpful error messaging.

Restricted Dashboard: Protected user interface accessible only upon successful authentication.

Session Termination: Functional logout mechanism to securely end the current session.

Input Integrity: Form validation rules designed to block blank or incomplete submissions.

Client-Side Hashing: Basic security measures implementing front-end password hashing techniques.

Persistent Storage: Local data preservation handled through browser localStorage.

Technologies Used
HTML5: Core page structure and form markup

CSS3: Interface styling and responsive design layout

Vanilla JavaScript: Form validation, event handling, and authentication flow

Browser Storage: localStorage for managing user states locally

Getting Started
To test and run this project locally, complete the following steps:

Open the project workspace directory in Visual Studio Code (VS Code).

Launch the index.html file in your preferred web browser.

Sign up for a new profile using the registration interface.

Sign in with your registered credentials to view the protected dashboard.

Click the Logout button to close your active session.

Security Notice
Disclaimer: This project serves as an educational demonstration of front-end authentication concepts. Because credential management and access controls reside entirely within the browser, this implementation is not production-ready. Real-world applications require secure backend servers, databases, and proper server-side password hashing (such as bcrypt).

Internship Details

Organization: Oasis Infobyte

Track: Web Development

Project: Login Authentication System
