# ACE Global Logistics – Complete Architecture & Learning Guide

Welcome to the **ACE Global Logistics** enterprise web platform. This document explains the full architecture across **Stage 1 (Frontend)**, **Stage 2 (REST API)**, and **Stage 3 (Supabase Database & Security)**.

---

## Stage 1 – Frontend Architecture (Next.js 16 + React 19 + Tailwind CSS)

### 1. Pixel-Matched Landing Page
- **Hero Section**: Replicates the reference design featuring multimodal logistics (white semi-truck driving on the dock road, docked container cargo ship at port, and a cargo jet ascending into sunset clouds).
- **Navigation (`Navbar.tsx`)**:
  - ACE Global Logistics vector brand logo with speed wing.
  - Active navigation indicator (blue underline on current link).
  - Dark mode toggle with crescent moon/sun states.
  - Interactive **Role Switcher** allowing instant preview across **Customer**, **Staff**, and **Admin** personas.
- **Services Strip (`ServicesBar.tsx`)**:
  - 4 quick cards for Air Freight, Sea Freight, Road Transport, and Warehousing with circular accent badges.
- **Live Tracking Bar (`TrackingWidget.tsx`)**:
  - Input field for waybill lookup (e.g. `ACE123456`, `ACE789012`, `ACE456789`).
  - Launches the interactive **Tracking Modal** showing transit progress, checkpoint audit trails, and waybill printing.
- **Why Choose ACE (`WhyChooseUs.tsx`)**:
  - Highlights the 4 pillars: Safe & Secure, On Time, Global Reach, and 24/7 Support.
  - Container terminal operations supervisor photograph with floating glass card and interactive "Watch Our Story" video showcase.
- **Interactive Rate Calculator (`RateCalculator.tsx`)**:
  - Instant pricing estimates and quote submission.

### 2. Role-Based Dashboards
- **Customer Portal (`/portal`)**: Waybill monitoring, new shipment booking wizard, quotations history.
- **Staff / Dispatch Console (`/staff`)**: Real-time fleet queue, checkpoint status updater, inquiry resolution.
- **Admin Control Center (`/admin`)**: Revenue analytics, performance metrics, and RBAC user permissions management.

---

## Stage 2 – Backend / REST API Architecture

### 1. HTTP Protocol Concepts
Every interaction follows the **Request-Response** cycle:
- **Client (Frontend)** initiates an HTTP Request with a **Method** (GET, POST, PATCH, DELETE), **Headers** (`Content-Type: application/json`), and an optional **Body**.
- **Server (Route Handlers)** processes the payload, performs validation, queries the database, and returns an **HTTP Response** with a **Status Code** and JSON payload.

### 2. HTTP Verbs & Status Codes
| Verb | Purpose | Expected Status |
| :--- | :--- | :--- |
| `GET` | Retrieve resource(s) | `200 OK` (or `404 Not Found`) |
| `POST` | Create a new resource | `201 Created` (or `400 Bad Request`) |
| `PATCH` | Update existing fields | `200 OK` |
| `DELETE` | Remove a resource | `200 OK` |

### 3. API Endpoints Built
- `POST /api/auth` – User authentication & token simulation
- `GET /api/shipments` – List shipments with query filters (`?status=...&service=...`)
- `POST /api/shipments` – Create shipment and generate `ACE...` waybill
- `GET /api/shipments/[id]` – Retrieve individual shipment
- `PATCH /api/shipments/[id]` – Dispatcher status update & checkpoint logging
- `DELETE /api/shipments/[id]` – Delete shipment (Admin)
- `GET /api/tracking/[trackingNumber]` – Public waybill tracking
- `GET / POST / PATCH /api/quotations` – Freight quotations management
- `GET / POST / PATCH /api/inquiries` – Customer support CRM tickets
- `POST /api/payments` – Payment authorization & invoice generation

---

## Stage 3 – Supabase PostgreSQL, Auth & Row Level Security (RLS)

### 1. Relational Database Schema (`supabase/schema.sql`)
- `profiles` – Linked directly to `auth.users(id)` with `role: 'customer' | 'staff' | 'admin'`.
- `shipments` – Relational model storing consignments, user foreign key, weights, prices, and status constraints.
- `shipment_checkpoints` – Child table linked via `shipment_id REFERENCES shipments(id) ON DELETE CASCADE`.
- `quotations` – Freight quote requests with pricing calculations.
- `inquiries` – Contact and support inquiries.

### 2. Row Level Security (RLS)
PostgreSQL Row Level Security ensures that even if a malicious client queries the database directly, the database engine itself enforces permissions:
- **Public Tracking**: `CREATE POLICY "Public tracking lookup" ON public.shipments FOR SELECT USING (true);` allows anyone with a valid waybill number to view their tracking status.
- **Customer Isolation**: Customers can only view and edit their own shipments: `USING (auth.uid() = user_id)`.
- **Staff Access**: Staff members can update shipment statuses and insert checkpoints across all shipments.
- **Admin Supremacy**: Admins have unrestricted access to all tables.

### 3. Connecting to Your Live Supabase Project
1. Log in to [Supabase](https://supabase.com) and create a new project.
2. Go to the **SQL Editor** tab in your Supabase dashboard.
3. Open `supabase/schema.sql` from this repository, copy all contents, and click **Run**.
4. Copy your project URL and Anon Key from **Project Settings -> API**.
5. Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
6. The app will immediately switch from the mock data layer to your live PostgreSQL database!

---

## Pushing to Your GitHub Repository

To push all atomic commits to your GitHub:
```bash
# Add your GitHub repository remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

# Push main branch
git push -u origin main
```
