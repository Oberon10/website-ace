# 🚢 ACE Global Logistics – Enterprise Logistics Platform

> **Fast / Reliable / Secure** multimodal shipping and freight forwarding web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS**, **REST API architecture**, and **Supabase PostgreSQL** with Row Level Security (RLS).

---

## 📸 Overview & Design Matching

This project features a pixel-accurate implementation of the **ACE Global Logistics** portal:

1. **Brand Identity & Header**:
   - Custom ACE vector brand identity with high-speed aero wing icon.
   - Active route indicator with smooth underline transitions.
   - Crescent moon & sun theme switcher (Light / Dark mode).
   - Dynamic **Role Switcher** pill enabling 1-click preview across **Customer**, **Staff**, and **Admin** portals.
2. **Multimodal Hero Banner**:
   - High-resolution photographic composite featuring a modern white logistics semi-truck, an ocean harbor container ship at berth, and a climbing cargo airplane in dusk twilight.
   - High-contrast typography: `"Your Cargo, Our Priority"`.
   - Dual action CTAs: `Book a Shipment →` and `📍 Track Your Shipment`.
3. **Quick Services Strip**:
   - 4 rounded cards for **Air Freight**, **Sea Freight**, **Road Transport**, and **Warehousing** with circular light-blue icon badges.
4. **Live Tracking Widget**:
   - Interactive waybill tracking with demo quick-presets (`ACE123456`, `ACE789012`, `ACE456789`).
   - Modal drawer showing transit percentage, origin/destination route, cargo specs, and step-by-step checkpoint audit logs.
5. **Why Choose ACE**:
   - Value pillars: *Safe & Secure*, *On Time*, *Global Reach*, and *24/7 Support*.
   - Container port supervisor photography with interactive `Watch Our Story` video modal.
6. **Instant Freight Cost Calculator**:
   - Dynamic rate calculation based on weight (kg), volume (CBM), and freight mode.
   - Real-time quotation request dispatcher.

---

## 🏛️ Project Architecture (3 Stages)

```
website-ace/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # SEO metadata, font definitions, AppProvider context
│   │   ├── page.tsx                # Pixel-matched ACE landing page
│   │   ├── portal/page.tsx         # Customer Portal (My shipments, book shipment wizard)
│   │   ├── staff/page.tsx          # Staff / Dispatcher Console (Live fleet queue, status updater)
│   │   ├── admin/page.tsx          # Admin Control Center (Revenue KPIs, RBAC permissions)
│   │   └── api/                    # Stage 2: REST API Endpoints
│   │       ├── auth/route.ts       # POST/GET authentication & JWT token simulation
│   │       ├── shipments/route.ts  # GET (filtered list) & POST (create waybill)
│   │       ├── shipments/[id]/     # GET, PATCH (update status & checkpoint), DELETE
│   │       ├── tracking/[id]/      # High-speed public tracking endpoint
│   │       ├── quotations/route.ts # Freight quote requests & approvals
│   │       ├── inquiries/route.ts  # Customer support tickets CRM
│   │       └── payments/route.ts   # Payment processing & invoice generation
│   ├── components/
│   │   ├── Logo.tsx                # Stylized vector brand symbol & typography
│   │   ├── Navbar.tsx              # Navigation bar with role switcher & theme toggle
│   │   ├── HeroSection.tsx         # Multimodal hero banner
│   │   ├── ServicesBar.tsx         # 4 service cards strip
│   │   ├── TrackingWidget.tsx      # Waybill lookup form
│   │   ├── WhyChooseUs.tsx         # Core values & terminal supervisor visual
│   │   ├── RateCalculator.tsx      # Interactive shipping cost estimator
│   │   ├── ContactSection.tsx      # Global helpdesk & support inquiry form
│   │   ├── TrackingModal.tsx       # Real-time checkpoint timeline drawer
│   │   ├── BookingModal.tsx        # Multi-step consignment booking wizard
│   │   ├── AuthModal.tsx           # Authentication modal with 1-click test logins
│   │   ├── VideoModal.tsx          # Video showcase modal
│   │   └── Footer.tsx              # Navigation links, social icons, and copyright
│   └── lib/
│       ├── types.ts                # TypeScript domain models
│       ├── mockData.ts             # Seed logistics consignments & test profiles
│       ├── store.tsx               # Client state context, CRUD operations & theme
│       └── supabase.ts             # Supabase client with offline fallback resilience
└── supabase/
    └── schema.sql                  # PostgreSQL tables, triggers, RLS policies & seed data
```

---

## ⚡ Stage 2: REST API Reference

All endpoints return standard JSON responses and status codes:

| Endpoint | Method | Description | Status Code |
| :--- | :---: | :--- | :---: |
| `/api/tracking/[trackingNumber]` | `GET` | Public shipment tracking with full checkpoint audit log | `200 OK` / `404` |
| `/api/shipments` | `GET` | List consignments with query filtering (`?status=...&service=...`) | `200 OK` |
| `/api/shipments` | `POST` | Create new consignment & generate `ACE...` waybill | `201 Created` |
| `/api/shipments/[id]` | `PATCH` | Dispatcher updates status & appends checkpoint location | `200 OK` |
| `/api/shipments/[id]` | `DELETE` | Admin removes shipment | `200 OK` |
| `/api/quotations` | `POST` | Customer submits freight quote request | `201 Created` |
| `/api/quotations` | `PATCH` | Staff approves and sets formal rate | `200 OK` |
| `/api/inquiries` | `POST` | Submit customer support or charter inquiry | `201 Created` |
| `/api/payments` | `POST` | Authorize payment and generate invoice receipt | `200 OK` |
| `/api/auth` | `POST` | Sign in with email or simulate role authorization | `200 OK` |

---

## 🛡️ Stage 3: Supabase PostgreSQL & Row Level Security (RLS)

The [`supabase/schema.sql`](./supabase/schema.sql) file provides a production-grade relational database:

1. **Tables**:
   - `profiles`: Linked to `auth.users(id)` via foreign key with auto-trigger on signup. Roles: `customer`, `staff`, `admin`.
   - `shipments`: Multimodal consignments table with tracking numbers, origins, destinations, weights, prices, and status checks.
   - `shipment_checkpoints`: Child table linked via `shipment_id REFERENCES shipments(id) ON DELETE CASCADE`.
   - `quotations`: Freight quote requests with pricing calculations.
   - `inquiries`: Support and charter inquiries.

2. **Row Level Security (RLS) Policies**:
   - **Public Access**: Anyone can look up a shipment using their exact waybill number (`ACE123456`).
   - **Customer Isolation**: Customers can only view and insert their own shipments (`auth.uid() = user_id`).
   - **Staff & Admin**: Staff can update statuses and insert checkpoints across all shipments. Admins possess full management authority.

### Connecting to Your Supabase Instance
1. In your [Supabase Dashboard](https://supabase.com), navigate to the **SQL Editor**.
2. Copy and paste the contents of [`supabase/schema.sql`](./supabase/schema.sql) and click **Run**.
3. Create a `.env.local` file with your project keys:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
4. The application will instantly connect to your live PostgreSQL database!

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 👥 Demo Credentials & Personas

Use the **Role Switcher** pill in the top navbar or click **Login** to test any persona with 1 click:

- **Customer**: Sarah Jenkins (`client@globaltrading.com`) – Full booking, tracking, and quotes view.
- **Staff / Dispatcher**: Mark Henderson (`dispatcher.mark@ace-logistics.com`) – Live dispatch board, checkpoint logging, and quote reviews.
- **Administrator**: Alexander Cross (`director@ace-logistics.com`) – Executive KPI metrics and RBAC role assignments.
