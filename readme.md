
## **Building a Healthcare Backend**

The goal of this assignment is to create a backend system for a healthcare application using Node, Express, and PostgreSQL. The system should allow users to register, log in, and manage patient and doctor records securely.

#

###  Authentication APIs

**POST** `/api/auth/register/` - Register a new user with name, email, and password.

**POST** `/api/auth/login/` - Log in a user and return a JWT token.

#

###  Patient Management APIs

**POST** `/api/patients/` - Add a new patient (Authenticated users only).

**GET** `/api/patients/` - Retrieve all patients created by the authenticated user.

**GET** `/api/patients/<id>/` - Get details of a specific patient.

**PUT** `/api/patients/<id>/` - Update patient details.

**DELETE** `/api/patients/<id>/` - Delete a patient record.

**Note:** For security purposes only admin can request all patients information so instead of **GET** ***/api/patients/*** - I will use **GET** ***/api/admin/patients/***

#

###  Doctor Management APIs

**POST** `/api/doctors/` - Add a new doctor (Authenticated users only).

**GET** `/api/doctors/` - Retrieve all doctors.

**GET** `/api/doctors/<id>/` - Get details of a specific doctor.

**PUT** `/api/doctors/<id>/` - Update doctor details.

**DELETE** `/api/doctors/<id>/` - Delete a doctor record.


**Note:** For security purposes only admin can request all patients information so instead of `GET /api/doctors/` - I will use `GET /api/admin/doctors/`

#

###  Patient-Doctor Mapping APIs

**POST** `/api/mappings/` - Assign a doctor to a patient.

**GET** `/api/mappings/` - Retrieve all patient-doctor mappings.

**GET** `/api/mappings/<patient_id>/` - Get all doctors assigned to a specific patient.

**DELETE** `/api/mappings/<id>/` - Remove a doctor from a patient.

#

###  Admin Routes


**GET** `/api/admin/patients`

**GET** `/api/admin/patients/<id>`

**PUT** `/api/admin/patients/<id>`

**DELETE** `/api/admin/patients/<id>`


**GET** `/api/admin/doctors`

**GET** `/api/admin/doctors/<id>`

**PUT** `/api/admin/doctors/<id>`

**DELETE** `/api/admin/doctors/<id>`



#

**Return Json**

**status:** `"failed" | "success" | "invalid" | "incomplete" | "forbidden" | "created" | "updated" | "deleted"`

**message:** `string`

**data:** `data | null`

#

###  Expected Outcome:

 - Users should be able to register and log in.
 - Authenticated users should be able to add and manage patient and   
   doctor records.
 - Patients should be able to be assigned to doctors.
 - Data should be stored securely in PostgreSQL.
