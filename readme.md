
## **Building a Healthcare Backend**

The goal of this assignment is to create a backend system for a healthcare application using Node, and PostgreSQL. The system should allow users to register, log in, and manage patient and doctor records securely.

**Technologies Used:** Node, Express, Neon PostgreSQL, Drizzle (ORM), JWT, and Arcjet.

#

###  Authentication APIs

| Method | Endpoint              | Description                                         | Access |
| ------ | --------------------- | --------------------------------------------------- | ------ |
| POST   | `/api/auth/register/` | Register a new user with name, email, and password. | Public |
| POST   | `/api/auth/login/`    | Log in a user and return a JWT token.               | Public |



#

###  Patient Management APIs

| Method | Endpoint              | Description                                              | Access        |
| ------ | --------------------- | -------------------------------------------------------- | ------------- |
| POST   | `/api/patients/`      | Add a new patient.                                       | Authenticated |
| GET    | `/api/patients/`      | Retrieve all patients created by the authenticated user. | Authenticated |
| GET    | `/api/patients/<id>/` | Get details of a specific patient.                       | Authenticated |
| PUT    | `/api/patients/<id>/` | Update patient details.                                  | Authenticated |
| DELETE | `/api/patients/<id>/` | Delete a patient record.                                 | Authenticated |


**Note:** For security purposes only admin can request all patients information so instead of **GET** ***/api/patients/*** - I will use **GET** ***/api/admin/patients/***

#

###  Doctor Management APIs

| Method | Endpoint             | Description                       | Access        |
| ------ | -------------------- | --------------------------------- | ------------- |
| POST   | `/api/doctors/`      | Add a new doctor.                 | Authenticated |
| GET    | `/api/doctors/`      | Retrieve all doctors.             | Authenticated |
| GET    | `/api/doctors/<id>/` | Get details of a specific doctor. | Authenticated |
| PUT    | `/api/doctors/<id>/` | Update doctor details.            | Authenticated |
| DELETE | `/api/doctors/<id>/` | Delete a doctor record.           | Authenticated |



**Note:** For security purposes only admin can request all patients information so instead of `GET /api/doctors/` - I will use `GET /api/admin/doctors/`

#

###  Patient-Doctor Mapping APIs

| Method | Endpoint                      | Description                                     | Access        |
| ------ | ----------------------------- | ----------------------------------------------- | ------------- |
| POST   | `/api/mappings/`              | Assign a doctor to a patient.                   | Authenticated |
| GET    | `/api/mappings/`              | Retrieve all patient-doctor mappings.           | Authenticated |
| GET    | `/api/mappings/<patient_id>/` | Get all doctors assigned to a specific patient. | Authenticated |
| DELETE | `/api/mappings/<id>/`         | Remove a doctor from a patient.                 | Authenticated |


**Note:** For security purposes only admin can request all patients information so instead of `GET /api/mappings/` - I will use `GET /api/admin/mappings/`

#

###  Admin Routes

#### Patients

| Method | Endpoint                   | Description            | Access |
| ------ | -------------------------- | ---------------------- | ------ |
| GET    | `/api/admin/patients`      | Retrieve all patients. | Admin  |
| GET    | `/api/admin/patients/<id>` | Get specific patient.  | Admin  |
| PUT    | `/api/admin/patients/<id>` | Update patient.        | Admin  |
| DELETE | `/api/admin/patients/<id>` | Delete patient.        | Admin  |


#### Doctors


| Method | Endpoint                  | Description           | Access |
| ------ | ------------------------- | --------------------- | ------ |
| GET    | `/api/admin/doctors`      | Retrieve all doctors. | Admin  |
| GET    | `/api/admin/doctors/<id>` | Get specific doctor.  | Admin  |
| PUT    | `/api/admin/doctors/<id>` | Update doctor.        | Admin  |
| DELETE | `/api/admin/doctors/<id>` | Delete doctor.        | Admin  |


#### Mappings


| Method | Endpoint                   | Description            | Access |
| ------ | -------------------------- | ---------------------- | ------ |
| GET    | `/api/admin/mappings`      | Retrieve all mappings. | Admin  |
| GET    | `/api/admin/mappings/<id>` | Get specific mapping.  | Admin  |
| DELETE | `/api/admin/mappings/<id>` | Delete mapping.        | Admin  |




#

**Return Json**

| Field       | Type          | Possible Values                                                                                                                                       |
| ----------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| **status**  | string        | `"failed"` \| `"success"` \| `"invalid"` \| `"not_found"` \| `"forbidden"` \| `"created"` \| `"updated"` \| `"deleted"` \| `"unknown"` \| `"missing"` \| `"conflict"` |
| **message** | string        | Explanation.                                                                                                           |
| **data**    | object / null | Returned data object, or `null` if not applicable.                                                                                                    |

#

### ENV Setup

`PORT`

`NODE_ENV`

`JWT_SECRET`

`ARCJET_KEY`

`ARCJET_ENV`

Get **Arcjet** Key from Here: *https://app.arcjet.com*

#

### Build

#### Clone

```bash
  git clone https://github.com/Prerak-Varshney/Healthcare-Backend.git
```

```bash
  cd healthcare-backend
```

#### Commands Separate

```bash
  npx drizzle-kit generate
```
 
```bash
  npx drizzle-kit push
```

```bash
  npm run start
```

#### Too lazy? Just Run

```bash
  npm run chaos
```

#

###  Expected Outcome:

 - Users should be able to register and log in.
 - Authenticated users should be able to add and manage patient and   
   doctor records.
 - Patients should be able to be assigned to doctors.
 - Data should be stored securely in PostgreSQL.
