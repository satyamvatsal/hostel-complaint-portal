# 🏠 Hostel Complaint Portal

A **full-stack web application** built using **Node.js**, **Express**, **MongoDB**, and **EJS** that allows hostel students to easily raise complaints and track their resolution status, while enabling wardens and assistants to manage and resolve reported issues efficiently.

---

## 📋 Features

### 🧑‍🎓 For Students
- **Easy Registration** using Scholar No, Hostel No, Room No, Email, and Phone.
- **Raise Complaints** about:
  - Electricity
  - Water
  - Network
  - Mess
  - Washrooms
  - General issues
- **My Complaints Section** to view and manage your own complaints.
- **Mark Complaints as Resolved** when the problem is solved.

### 🛠️ For Admins (Wardens/Care-takers)
- **Admin Login** for hostel management staff.
- **View All Complaints** submitted by students.
- **Filter Complaints** by category (e.g., Water, Electricity).
- **Mark Complaints as Resolved** directly from the admin panel.

---

## 🏗️ Tech Stack

| Technology | Usage |
|------------|-------|
| **Node.js** | Backend server |
| **Express.js** | Web framework |
| **MongoDB** | Database |
| **EJS** | Template rendering |
| **Nginx** | Reverse proxy |
| **Azure VM** | Hosting environment |

---

## ⚙️ Architecture & Deployment

- **Stateless Backend** – Designed for **horizontal scalability** in the future.
- Hosted on **Azure Virtual Machine** with **Nginx reverse proxy**.
- **Full TLS encryption** for secure data transfer.
- MongoDB used as the primary database with **Mongoose ORM**.
- Modular route and controller structure for maintainability.

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/hostel-complaint-portal.git
cd hostel-complaint-portal
