# تقرير تحليل المشروع الشامل
## ClinicPro / MediCare — نظام إدارة العيادات
### وثيقة رسمية للتحليل التقني والتجاري

**تاريخ التقرير:** 2026-06-27  
**إعداد:** تحليل تلقائي شامل  
**حالة المشروع:** نشط — قيد التطوير

---

## 1. هيكل المشروع بالكامل

### 1.1 الهيكل العام للمجلدات

```
/
├── client/                    # الواجهة الأمامية (React + Vite)
│   ├── index.html
│   ├── requirements.md
│   └── src/
│       ├── App.tsx            # نقطة الدخول الرئيسية للتطبيق
│       ├── main.tsx           # تهيئة React
│       ├── index.css          # الأنماط العامة
│       ├── components/        # مكونات واجهة المستخدم المشتركة
│       │   ├── Sidebar.tsx         # شريط التنقل العلوي
│       │   ├── NotificationBell.tsx # مكون جرس الإشعارات
│       │   ├── StatCard.tsx        # بطاقات الإحصائيات
│       │   └── ui/                 # مكونات Shadcn UI (40+ مكون)
│       ├── hooks/             # Custom React Hooks
│       │   ├── use-auth.ts
│       │   ├── use-patients.ts
│       │   ├── use-appointments.ts
│       │   ├── use-billing.ts
│       │   ├── use-inventory.ts
│       │   ├── use-prescriptions.ts
│       │   ├── use-users.ts
│       │   ├── use-mobile.tsx
│       │   └── use-toast.ts
│       ├── pages/             # صفحات التطبيق
│       │   ├── Dashboard.tsx       # لوحة التحكم الرئيسية
│       │   ├── Login.tsx           # صفحة تسجيل الدخول
│       │   ├── Patients.tsx        # إدارة المرضى
│       │   ├── Appointments.tsx    # إدارة المواعيد
│       │   ├── Billing.tsx         # الفواتير والمدفوعات
│       │   ├── Prescriptions.tsx   # الوصفات الطبية
│       │   ├── Inventory.tsx       # المخزون والأدوية
│       │   ├── Insurance.tsx       # التأمين الصحي
│       │   ├── Reports.tsx         # التقارير والإحصائيات
│       │   ├── Admin.tsx           # لوحة الإدارة
│       │   ├── Visitors.tsx        # صفحة الزوار العامة
│       │   └── not-found.tsx       # صفحة 404
│       ├── lib/
│       │   ├── queryClient.ts      # إعداد TanStack Query
│       │   └── utils.ts            # أدوات مساعدة (cn utility)
│       ├── core/              # محركات الجانب الأمامي (JS خام - غير مستخدم فعلياً)
│       └── modules/           # وحدات Frontend (هيكل فارغ جزئياً)
│
├── server/                    # الخادم الخلفي (Node.js + Express)
│   ├── index.ts               # نقطة دخول الخادم
│   ├── routes.ts              # جميع مسارات API
│   ├── storage.ts             # طبقة الوصول لقاعدة البيانات (Repository Pattern)
│   ├── db.ts                  # اتصال قاعدة البيانات (Drizzle + PostgreSQL)
│   ├── static.ts              # خدمة الملفات الثابتة في الإنتاج
│   └── vite.ts                # تكامل Vite في التطوير
│
├── shared/                    # كود مشترك بين Frontend و Backend
│   ├── schema.ts              # تعريفات جداول قاعدة البيانات + أنواع TypeScript
│   └── routes.ts              # تعريف API contracts المشتركة
│
├── modules/                   # وحدات JavaScript خارجية (غير مدمجة بالكامل)
│   ├── auth/
│   ├── appointments/
│   ├── billing/
│   ├── inventory/
│   ├── patients/
│   └── prescriptions/
│
├── core/                      # محركات JavaScript المستقلة (غير مدمجة)
├── ui/                        # مكونات UI خارجية (غير مدمجة)
├── utils/                     # أدوات مساعدة JS خارجية
├── styles/                    # أنماط CSS إضافية
├── database/                  # مجلد migrations/seeds (فارغ)
├── tests/                     # مجلد الاختبارات (فارغ)
├── docs/                      # وثائق المشروع
├── public/                    # أصول عامة
├── script/build.ts            # سكريبت البناء
├── drizzle.config.ts          # إعداد Drizzle ORM
├── vite.config.ts             # إعداد Vite
├── tailwind.config.ts         # إعداد Tailwind CSS
├── tsconfig.json              # إعداد TypeScript
├── package.json               # التبعيات والسكريبتات
└── replit.md                  # وثيقة المشروع
```

### 1.2 ملاحظة مهمة حول هيكل المشروع

يحتوي المشروع على **طبقتين متوازيتين** من الكود:
- **الطبقة الفعلية المُشغَّلة:** `client/src/` + `server/` + `shared/` — هذه هي الكود النشط فعلياً.
- **وحدات JS الخارجية:** `modules/`, `core/`, `ui/`, `utils/` — هذه ملفات JavaScript مستقلة غير مدمجة في تطبيق React/Express الرئيسي، وتمثل ديناً تقنياً.

---

## 2. التقنيات المستخدمة

### 2.1 لغة البرمجة
- **TypeScript 5.6.3** — المستخدمة في كل من Frontend و Backend و Shared layer
- **JavaScript (ES Modules)** — في وحدات `modules/` و`core/` الخارجية

### 2.2 Frontend Framework
- **React 18.3.1** — مكتبة واجهة المستخدم
- **Vite 7.3.0** — أداة البناء وخادم التطوير
- **Wouter 3.3.5** — التوجيه (بديل خفيف لـ React Router)

### 2.3 Backend Framework
- **Node.js 20** — بيئة التشغيل
- **Express.js 4.22.1** — إطار عمل الخادم

### 2.4 قاعدة البيانات
- **PostgreSQL** — قاعدة البيانات الرئيسية (Neon PostgreSQL عبر Replit)
- **Drizzle ORM 0.39.3** — طبقة التعامل مع قاعدة البيانات

### 2.5 المصادقة والجلسات
- **Passport.js 0.7.0** — إطار المصادقة
- **passport-local** — استراتيجية المصادقة المحلية (اسم مستخدم/كلمة مرور)
- **express-session** — إدارة الجلسات
- **memorystore** — تخزين الجلسات في الذاكرة (development-suitable)

### 2.6 مكتبة واجهة المستخدم
- **Shadcn UI** — مكونات UI (مبنية فوق Radix UI)
- **Radix UI** — المكونات الأولية للوصول وإمكانية الاستخدام
- **Tailwind CSS 3.4.17** — نظام التصميم
- **Lucide React** — مكتبة الأيقونات
- **Framer Motion** — الحركات والانتقالات

### 2.7 إدارة البيانات والحالة
- **TanStack Query (React Query) 5.60.5** — إدارة حالة الخادم وطلبات API
- **React Hook Form 7.55.0** — إدارة نماذج الإدخال
- **Zod 3.25.76** — التحقق من صحة البيانات

### 2.8 التقارير والتصدير
- **Recharts 2.15.4** — الرسوم البيانية التفاعلية
- **jsPDF 3.0.4 + jspdf-autotable** — تصدير PDF
- **XLSX 0.18.5** — تصدير Excel
- **date-fns 3.6.0** — معالجة التواريخ (مع دعم اللغة العربية)

### 2.9 أدوات البناء والنشر
- **esbuild** — تجميع الكود للإنتاج
- **tsx** — تشغيل TypeScript مباشرة في Node.js
- **drizzle-kit** — هجرات قاعدة البيانات

### 2.10 مكتبات أخرى
- **ws 8.18.0** — WebSocket (مُضمَّن لكن غير مُفعَّل)
- **input-otp** — مكون OTP (مضمَّن لكن غير مُفعَّل في Auth)
- **react-day-picker** — منتقي التواريخ

---

## 3. معمارية النظام

### 3.1 نمط المعمارية
**Monolithic Full-Stack SPA (Single Page Application)**
- تطبيق واحد يجمع Frontend و Backend
- Express يخدم React app مع API على نفس الخادم والمنفذ (5000)

### 3.2 طبقات المشروع

```
┌─────────────────────────────────────────┐
│           Presentation Layer            │
│    React SPA (Vite + TypeScript)        │
│  Pages → Components → Hooks            │
└──────────────┬──────────────────────────┘
               │ HTTP API (REST) + Sessions
┌──────────────▼──────────────────────────┐
│           Application Layer             │
│       Express.js + Passport.js          │
│   routes.ts → Middleware → Auth        │
└──────────────┬──────────────────────────┘
               │ Drizzle ORM
┌──────────────▼──────────────────────────┐
│           Data Access Layer             │
│   storage.ts (Repository Pattern)      │
│   DatabaseStorage implements IStorage  │
└──────────────┬──────────────────────────┘
               │ node-postgres (pg)
┌──────────────▼──────────────────────────┐
│           Database Layer                │
│       PostgreSQL (Neon Cloud)           │
└─────────────────────────────────────────┘
```

### 3.3 تدفق البيانات

```
المستخدم → React Component
         → TanStack Query (useQuery/useMutation)
         → apiRequest() في queryClient.ts
         → Fetch API → POST/GET /api/...
         → Express Route Handler
         → storage.METHOD() [Repository]
         → Drizzle ORM → PostgreSQL
         → بيانات ← إعادة بناء الكاش ← TanStack Query
```

### 3.4 إدارة الحالة
- **Server State:** TanStack Query — يُخزِّن بيانات الخادم في كاش ويُدير إعادة التحميل
- **Form State:** React Hook Form — يُدير حالة نماذج الإدخال محلياً
- **Auth State:** TanStack Query + `useUser()` hook — يستعلم `/api/user` للتحقق من الجلسة
- **UI State:** useState محلي في كل مكون

### 3.5 نظام المصادقة (Authentication Flow)
```
POST /api/login
    → Passport LocalStrategy
    → التحقق من اسم المستخدم وكلمة المرور
    → [نجح] req.login() → حفظ الجلسة في MemoryStore
    → إعادة بيانات المستخدم
    
GET /api/user
    → Passport deserializeUser
    → استرداد بيانات المستخدم من DB
    → إعادة بيانات المستخدم أو 401
    
POST /api/logout
    → req.logout()
    → مسح الجلسة
```

### 3.6 Middleware المستخدم
1. `express.json()` — تحليل JSON مع الاحتفاظ بـ rawBody
2. `express.urlencoded()` — تحليل بيانات النموذج
3. `express-session` — إدارة الجلسات
4. `passport.initialize()` + `passport.session()` — تهيئة المصادقة
5. Logger Middleware مخصص — يسجّل كل طلب API مع الوقت والحالة

---

## 4. قاعدة البيانات

### 4.1 الجداول الكاملة

#### جدول `users` — المستخدمون
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | SERIAL | PRIMARY KEY | معرف فريد |
| username | TEXT | NOT NULL, UNIQUE | اسم المستخدم |
| password | TEXT | NOT NULL | كلمة المرور (نص صريح ⚠️) |
| role | TEXT | NOT NULL, DEFAULT 'staff' | الدور: admin/doctor/nurse/receptionist |
| full_name | TEXT | NOT NULL | الاسم الكامل |
| created_at | TIMESTAMP | DEFAULT NOW() | تاريخ الإنشاء |

#### جدول `patients` — المرضى
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | SERIAL | PRIMARY KEY | معرف فريد |
| first_name | TEXT | NOT NULL | الاسم الأول |
| last_name | TEXT | NOT NULL | اسم العائلة |
| date_of_birth | DATE | NOT NULL | تاريخ الميلاد |
| gender | TEXT | NOT NULL | الجنس |
| phone | TEXT | - | رقم الهاتف |
| address | TEXT | - | العنوان |
| medical_history | TEXT | - | تاريخ طبي (للتوافق القديم) |
| created_at | TIMESTAMP | DEFAULT NOW() | تاريخ التسجيل |

#### جدول `medical_records` — السجلات الطبية
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | SERIAL | PRIMARY KEY | معرف فريد |
| patient_id | INTEGER | FK → patients.id | معرف المريض |
| doctor_id | INTEGER | FK → users.id | معرف الطبيب |
| type | TEXT | NOT NULL | النوع: visit/surgery/allergy/chronic/note |
| title | TEXT | NOT NULL | عنوان السجل |
| description | TEXT | - | وصف تفصيلي |
| date | TIMESTAMP | DEFAULT NOW() | تاريخ السجل |
| created_at | TIMESTAMP | DEFAULT NOW() | تاريخ الإنشاء |

#### جدول `appointments` — المواعيد
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | SERIAL | PRIMARY KEY | معرف فريد |
| patient_id | INTEGER | FK → patients.id | معرف المريض |
| doctor_id | INTEGER | FK → users.id | معرف الطبيب |
| appointment_date | TIMESTAMP | NOT NULL | تاريخ ووقت الموعد |
| status | TEXT | NOT NULL, DEFAULT 'scheduled' | الحالة: scheduled/completed/cancelled |
| reason | TEXT | - | سبب الموعد |
| created_at | TIMESTAMP | DEFAULT NOW() | تاريخ الإنشاء |

#### جدول `medications` — الأدوية والمخزون
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | SERIAL | PRIMARY KEY | معرف فريد |
| name | TEXT | NOT NULL | اسم الدواء |
| quantity | INTEGER | NOT NULL, DEFAULT 0 | الكمية المتاحة |
| min_stock | INTEGER | NOT NULL, DEFAULT 5 | الحد الأدنى للمخزون |
| expiry_date | DATE | - | تاريخ انتهاء الصلاحية |
| price | INTEGER | - | السعر (بالهللات/أصغر وحدة) |
| supplier_id | INTEGER | FK → suppliers.id | معرف المورد |

#### جدول `suppliers` — الموردون
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | SERIAL | PRIMARY KEY | معرف فريد |
| name | TEXT | NOT NULL | اسم المورد |
| contact_name | TEXT | - | اسم جهة الاتصال |
| phone | TEXT | - | رقم الهاتف |
| email | TEXT | - | البريد الإلكتروني |
| address | TEXT | - | العنوان |
| created_at | TIMESTAMP | DEFAULT NOW() | تاريخ الإنشاء |

#### جدول `invoices` — الفواتير
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | SERIAL | PRIMARY KEY | معرف فريد |
| patient_id | INTEGER | FK → patients.id | معرف المريض |
| appointment_id | INTEGER | FK → appointments.id | معرف الموعد (اختياري) |
| insurance_id | INTEGER | FK → insurance_companies.id | معرف شركة التأمين |
| insurance_discount | INTEGER | NOT NULL, DEFAULT 0 | مبلغ خصم التأمين (هللات) |
| amount | INTEGER | NOT NULL | المبلغ الإجمالي (هللات) |
| net_amount | INTEGER | NOT NULL, DEFAULT 0 | المبلغ الصافي بعد الخصم |
| status | TEXT | NOT NULL, DEFAULT 'unpaid' | الحالة: unpaid/paid/partial |
| issued_date | TIMESTAMP | DEFAULT NOW() | تاريخ الإصدار |
| due_date | TEXT | - | تاريخ الاستحقاق |

#### جدول `payments` — المدفوعات
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | SERIAL | PRIMARY KEY | معرف فريد |
| invoice_id | INTEGER | FK → invoices.id | معرف الفاتورة |
| amount | INTEGER | NOT NULL | المبلغ المدفوع (هللات) |
| method | TEXT | NOT NULL | طريقة الدفع: cash/card/insurance |
| payment_date | TIMESTAMP | DEFAULT NOW() | تاريخ الدفع |

#### جدول `prescriptions` — الوصفات الطبية
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | SERIAL | PRIMARY KEY | معرف فريد |
| patient_id | INTEGER | FK → patients.id | معرف المريض |
| doctor_id | INTEGER | FK → users.id | معرف الطبيب |
| date | TIMESTAMP | DEFAULT NOW() | تاريخ الوصفة |
| notes | TEXT | - | ملاحظات الوصفة |

#### جدول `prescription_items` — عناصر الوصفات
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | SERIAL | PRIMARY KEY | معرف فريد |
| prescription_id | INTEGER | FK → prescriptions.id | معرف الوصفة |
| medication_id | INTEGER | FK → medications.id | معرف الدواء |
| dosage | TEXT | NOT NULL | الجرعة |
| duration | TEXT | - | مدة العلاج |

#### جدول `insurance_companies` — شركات التأمين
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | SERIAL | PRIMARY KEY | معرف فريد |
| code | TEXT | NOT NULL, UNIQUE | رمز الشركة |
| name | TEXT | NOT NULL | اسم الشركة |
| discount_rate | INTEGER | NOT NULL, DEFAULT 0 | نسبة الخصم (%) |
| phone | TEXT | - | رقم الهاتف |
| email | TEXT | - | البريد الإلكتروني |
| active | BOOLEAN | NOT NULL, DEFAULT true | حالة النشاط |
| created_at | TIMESTAMP | DEFAULT NOW() | تاريخ الإنشاء |

#### جدول `system_settings` — إعدادات النظام
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | SERIAL | PRIMARY KEY | معرف فريد |
| clinic_name | TEXT | NOT NULL, DEFAULT 'عيادة بروكير' | اسم العيادة |
| clinic_phone | TEXT | - | هاتف العيادة |
| clinic_address | TEXT | - | عنوان العيادة |
| clinic_email | TEXT | - | بريد العيادة |
| show_logo | BOOLEAN | NOT NULL, DEFAULT true | إظهار الشعار |
| show_footer | BOOLEAN | NOT NULL, DEFAULT true | إظهار التذييل |
| updated_at | TIMESTAMP | DEFAULT NOW() | تاريخ التحديث |

#### جدول `notifications` — الإشعارات
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | SERIAL | PRIMARY KEY | معرف فريد |
| user_id | INTEGER | FK → users.id | معرف المستخدم |
| type | TEXT | NOT NULL | النوع: info/success/warning/error |
| title | TEXT | NOT NULL | عنوان الإشعار |
| message | TEXT | NOT NULL | نص الإشعار |
| read | BOOLEAN | NOT NULL, DEFAULT false | حالة القراءة |
| created_at | TIMESTAMP | DEFAULT NOW() | تاريخ الإنشاء |

#### جدول `audit_logs` — سجلات المراجعة
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | SERIAL | PRIMARY KEY | معرف فريد |
| user_id | INTEGER | FK → users.id | معرف المستخدم |
| action | TEXT | NOT NULL | الإجراء: create_invoice, delete_appointment... |
| entity_type | TEXT | NOT NULL | نوع الكيان: invoice/appointment/medication |
| entity_id | INTEGER | - | معرف الكيان |
| details | TEXT | - | تفاصيل إضافية |
| created_at | TIMESTAMP | DEFAULT NOW() | تاريخ السجل |

#### جدول `prescription_templates` — قوالب الوصفات
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | SERIAL | PRIMARY KEY | معرف فريد |
| name | TEXT | NOT NULL | اسم القالب |
| description | TEXT | - | وصف القالب |
| medications | JSONB | NOT NULL | مصفوفة عناصر الأدوية |
| created_at | TIMESTAMP | DEFAULT NOW() | تاريخ الإنشاء |

### 4.2 خريطة العلاقات بين الجداول

```
users ────────────────────────────────────────────────────┐
  │                                                        │
  ├──[1:N]──► medical_records (doctor_id)                  │
  ├──[1:N]──► appointments (doctor_id)                     │
  ├──[1:N]──► prescriptions (doctor_id)                    │
  ├──[1:N]──► notifications (user_id)                      │
  └──[1:N]──► audit_logs (user_id)                         │
                                                           │
patients ───────────────────────────────────────────────── │
  │                                                        │
  ├──[1:N]──► medical_records (patient_id)                 │
  ├──[1:N]──► appointments (patient_id)                    │
  ├──[1:N]──► invoices (patient_id)                        │
  └──[1:N]──► prescriptions (patient_id)                   │
                                                           │
appointments ──────────────────────────────────────────── │
  └──[1:N]──► invoices (appointment_id)                    │
                                                           │
medications ──────────────────────────────────────────────┤
  └──[1:N]──► prescription_items (medication_id)           │
                                                           │
suppliers ──────────────────────────────────────────────── │
  └──[1:N]──► medications (supplier_id)                    │
                                                           │
prescriptions ─────────────────────────────────────────── │
  └──[1:N]──► prescription_items (prescription_id)         │
                                                           │
insurance_companies ──────────────────────────────────────┘
  └──[1:N]──► invoices (insurance_id)
```

---

## 5. المستخدمون داخل النظام

### 5.1 أنواع المستخدمين

#### 1. Admin (مدير النظام)
**وصول كامل لجميع الوظائف:**
- ✅ إدارة المستخدمين (إنشاء، تعديل، حذف، تغيير الأدوار)
- ✅ الوصول لجميع صفحات التطبيق
- ✅ إعدادات النظام (اسم العيادة، العنوان، الهاتف، الشعار)
- ✅ عرض سجلات المراجعة (Audit Logs)
- ✅ إنشاء قوالب الوصفات الطبية
- ✅ إدارة شركات التأمين
- ✅ إدارة الموردين
- ✅ تصدير النسخ الاحتياطية (Backup JSON)
- ✅ عرض التقارير والإحصائيات
- ✅ إدارة الفواتير والمدفوعات

#### 2. Doctor (طبيب)
**وصول يناسب الكوادر الطبية:**
- ✅ عرض وإدارة المرضى
- ✅ عرض وإدارة المواعيد
- ✅ إنشاء وعرض الوصفات الطبية
- ✅ إضافة السجلات الطبية للمرضى
- ✅ عرض المخزون
- ✅ عرض الفواتير
- ✅ عرض التقارير
- ❌ لا يستطيع إدارة المستخدمين أو الإعدادات

#### 3. Nurse (ممرضة)
**نفس صلاحيات الطبيب حالياً** (لا يوجد تمييز في الكود بين nurse وdoctor وstaff بالكامل)

#### 4. Receptionist (موظف الاستقبال)
**وصول مقيَّد:**
- ✅ عرض المرضى وإضافتهم
- ✅ إدارة المواعيد
- ✅ عرض المخزون
- ✅ عرض التأمين
- ✅ عرض الوصفات
- ❌ **لا يرى صفحة الفواتير**
- ❌ **لا يرى صفحة التقارير**
- ❌ لا يصل لبيانات الإيرادات المالية في Dashboard

#### 5. Staff (موظف عام — الدور الافتراضي)
نفس صلاحيات Receptionist تقريباً.

**ملاحظة:** لا يوجد نظام صلاحيات دقيق (RBAC) — التمييز يتم عبر فحوصات بسيطة `role === "admin"` أو `role === "receptionist"`.

---

## 6. جميع خصائص النظام الحالية

### 6.1 الخصائص الموجودة (مُنجزة أو جزئياً)

| الخاصية | الحالة | الوصف |
|---------|--------|-------|
| **Authentication** | ✅ مكتملة | تسجيل دخول بالجلسات عبر Passport.js |
| **User Management** | ✅ مكتمل | إنشاء/تعديل/حذف المستخدمين وتغيير الأدوار |
| **Patient Registration** | ✅ مكتمل | تسجيل المرضى مع بياناتهم الأساسية |
| **Patient Search** | ✅ مكتمل | بحث نصي في أسماء المرضى |
| **Medical Records** | ✅ مكتمل | إضافة وعرض السجلات الطبية (5 أنواع) |
| **Patient Barcode** | ⚠️ جزئي | زر باركود موجود في UI لكن غير مكتمل التنفيذ |
| **Appointments** | ✅ مكتمل | حجز مواعيد مع المرضى والأطباء |
| **Appointment Calendar** | ✅ مكتمل | عرض التقويم الشهري |
| **Appointment Status** | ⚠️ جزئي | حالات scheduled/completed/cancelled موجودة بالـ schema لكن لا يوجد تعديل حالة في UI |
| **Inventory** | ✅ مكتمل | إضافة وعرض الأدوية مع تتبع المخزون |
| **Low Stock Alerts** | ✅ مكتمل | تنبيهات في Dashboard عند نقص المخزون |
| **Suppliers** | ✅ مكتمل | إدارة الموردين |
| **Invoices** | ✅ مكتمل | إنشاء الفواتير مع ربطها بالمرضى والمواعيد |
| **Payments** | ✅ مكتمل | تسجيل المدفوعات (كاش/بطاقة/تأمين) |
| **Insurance** | ✅ مكتمل | إدارة شركات التأمين ونسب الخصم |
| **Prescriptions** | ✅ مكتمل | إنشاء وصفات طبية مع عناصر الأدوية |
| **Prescription Templates** | ✅ مكتمل | قوالب جاهزة للوصفات الشائعة |
| **Reports** | ✅ مكتمل | تقارير الدخل والمخزون والمرضى |
| **PDF Export** | ✅ مكتمل | تصدير التقارير بصيغة PDF |
| **Excel Export** | ✅ مكتمل | تصدير التقارير بصيغة Excel |
| **Notifications** | ✅ مكتمل | نظام إشعارات داخلي مع جرس الإشعارات |
| **Audit Logs** | ✅ مكتمل | سجل المراجعة للأحداث (إنشاء الفواتير حالياً) |
| **System Settings** | ✅ مكتمل | تخصيص اسم العيادة وبياناتها |
| **Data Backup** | ⚠️ جزئي | تصدير بيانات المرضى والمواعيد والمخزون كـ JSON |
| **Visitor Booking Page** | ✅ مكتمل | صفحة عامة للزوار لحجز المواعيد بدون تسجيل دخول |
| **Dashboard Analytics** | ✅ مكتمل | رسوم بيانية حية لنمو المرضى والإيرادات |
| **RTL Arabic UI** | ✅ مكتمل | واجهة عربية بالكامل مع دعم RTL |
| **Responsive Design** | ✅ مكتمل | تصميم متجاوب (desktop + mobile) |

### 6.2 الخصائص الغائبة

| الخاصية | الأولوية |
|---------|---------|
| تشفير كلمات المرور (bcrypt) | 🔴 حرجة |
| OTP / 2FA | 🟡 متوسطة |
| تصدير الفاتورة/الوصفة كـ PDF مستقل | 🟡 متوسطة |
| تعديل/حذف المرضى والمواعيد والفواتير | 🟡 متوسطة |
| فلترة وترتيب القوائم | 🟡 متوسطة |
| إدارة جدول الأطباء | 🟠 عالية |
| نظام صلاحيات متقدم (RBAC كامل) | 🟠 عالية |
| Push Notifications | 🟢 منخفضة |
| دعم متعدد العيادات (Multi-Clinic) | 🟢 منخفضة |
| تطبيق موبايل | 🟢 منخفضة |

---

## 7. دورة الموعد بالكامل

### 7.1 مسار الموعد في النظام الحالي

```
1. [الحجز]
   ├── عبر صفحة الزوار (بدون تسجيل دخول) → إنشاء مريض مؤقت + موعد
   └── عبر لوحة الاستقبال (بعد تسجيل الدخول) → اختيار مريض موجود + موعد
         ↓
2. [الإشعار]
   └── إنشاء إشعار تلقائي للـ admin و receptionist
         ↓
3. [تسجيل الموعد]
   └── status = "scheduled" → يظهر في قائمة المواعيد وعلى Dashboard
         ↓
4. [الفحص الطبي]
   └── الطبيب يضيف سجل طبي للمريض (زيارة، تشخيص، ملاحظات)
         ↓
5. [الوصفة الطبية]
   └── إنشاء وصفة طبية مرتبطة بالمريض والطبيب مع الأدوية والجرعات
         ↓
6. [الفاتورة]
   └── إنشاء فاتورة مرتبطة بالمريض والموعد مع مبلغ وخصم تأمين
         ↓
7. [الدفع]
   └── تسجيل دفع مرتبط بالفاتورة (كاش/بطاقة/تأمين)
         ↓
8. [الإغلاق] — غير مكتمل في UI
   └── ❌ لا يوجد تحديث لحالة الموعد إلى "completed" من الواجهة
```

**الفجوات في الدورة:**
- لا يوجد زر "إنهاء الموعد" أو تغيير الحالة من scheduled → completed
- لا يوجد ربط تلقائي بين الدفع وتحديث حالة الفاتورة
- لا يوجد إلغاء للمواعيد من الواجهة

---

## 8. لوحة التحكم — الشاشات الموجودة

### 8.1 شاشة Dashboard (لوحة التحكم)
**المحتوى:**
- 4 بطاقات إحصائية: إجمالي المرضى، مواعيد اليوم، الإيرادات، تنبيه المخزون
- رسم بياني: نمو المرضى (آخر 7 أشهر) — Area Chart
- رسم بياني: الإيرادات الأسبوعية — Bar Chart
- التاريخ الحالي بالعربية

**العمليات:** عرض فقط (لا تعديل)

### 8.2 شاشة المرضى (Patients)
**المحتوى:**
- جدول المرضى مع بحث فوري
- إضافة مريض جديد (نموذج)
- عرض تفاصيل المريض مع السجلات الطبية
- إضافة سجل طبي جديد (5 أنواع: زيارة/جراحة/حساسية/مزمن/ملاحظة)
- زر طباعة الباركود (غير مكتمل)

**العمليات:** إضافة مريض، إضافة سجل طبي، عرض تفاصيل، بحث

### 8.3 شاشة المواعيد (Appointments)
**المحتوى:**
- تقويم شهري تفاعلي مع عرض المواعيد على الأيام
- جدول جميع المواعيد مع الحالة
- نموذج حجز موعد جديد

**العمليات:** حجز موعد جديد، عرض التقويم، عرض قائمة المواعيد

### 8.4 شاشة الفواتير (Billing)
**المحتوى:**
- Tabs: الفواتير — المدفوعات — سجل التأمين
- جدول الفواتير مع الحالة والمبلغ
- نموذج إنشاء فاتورة (مريض، موعد، تأمين، مبلغ)
- نموذج تسجيل دفع
- عرض مدفوعات الفاتورة وتاريخها

**العمليات:** إنشاء فاتورة، تسجيل دفع، عرض تاريخ مدفوعات

### 8.5 شاشة الوصفات الطبية (Prescriptions)
**المحتوى:**
- جدول الوصفات مع بحث
- نموذج إنشاء وصفة جديدة (مريض، أدوية متعددة، جرعات)
- دعم قوالب الوصفات الجاهزة
- طباعة/تصدير الوصفة (زر موجود)

**العمليات:** إنشاء وصفة، إضافة أدوية متعددة، استخدام قالب

### 8.6 شاشة المخزون (Inventory)
**المحتوى:**
- جدول الأدوية مع الكمية والحد الأدنى
- مؤشرات بصرية (أخضر/أحمر) لمستوى المخزون
- فلترة: الكل — نقص — متوفر
- نموذج إضافة دواء جديد

**العمليات:** إضافة دواء، عرض المخزون، فلترة

### 8.7 شاشة التأمين الصحي (Insurance)
**المحتوى:**
- جدول شركات التأمين مع الرمز ونسبة الخصم
- نموذج إضافة شركة تأمين جديدة
- تعديل بيانات الشركة
- تفعيل/إيقاف شركة

**العمليات:** إضافة، تعديل، تفعيل/إيقاف شركات التأمين

### 8.8 شاشة التقارير (Reports)
**المحتوى:**
- 4 بطاقات ملخص: الدخل الكلي، المرضى، أصناف المخزون، مرضى الشهر
- رسم بياني: تحليل الدخل الشهري — Bar Chart
- رسم بياني: حالة المخزون — Pie Chart
- أزرار تصدير PDF و Excel لكل تقرير

**العمليات:** عرض إحصائيات، تصدير PDF، تصدير Excel

### 8.9 شاشة الإدارة (Admin)
**المحتوى:**
- Tabs: المستخدمون — الإعدادات — سجل المراجعة — القوالب — النسخ الاحتياطي
- إدارة المستخدمين (إضافة، تغيير الدور، حذف)
- إعدادات العيادة (الاسم، الهاتف، العنوان، الشعار)
- سجل المراجعة (Audit Logs) لجميع الأحداث
- قوالب الوصفات الطبية
- تحميل نسخة احتياطية JSON

**العمليات:** إدارة المستخدمين، تخصيص العيادة، عرض سجل المراجعة، النسخ الاحتياطي

### 8.10 صفحة الزوار (Visitors) — عامة
**المحتوى:**
- صفحة تسويقية للعيادة مع صور مؤسسية
- نموذج حجز موعد بدون تسجيل دخول
- بيانات الاتصال بالعيادة (من الإعدادات)

**العمليات:** حجز موعد جديد بدون حساب

---

## 9. تطبيق العميل — الصفحات

لا يوجد تطبيق عميل منفصل (Client App). النظام موجَّه للكوادر الطبية فقط. صفحة الزوار (`/visitors`) هي الوجه العام الوحيد.

**صفحات النظام الإجمالية:**

| الصفحة | المسار | الوصول |
|-------|--------|--------|
| صفحة تسجيل الدخول | /login | عام |
| صفحة الزوار | /visitors | عام |
| لوحة التحكم | / | مصادقة |
| المرضى | /patients | مصادقة |
| المواعيد | /appointments | مصادقة |
| المخزون | /inventory | مصادقة |
| التأمين | /insurance | مصادقة |
| الفواتير | /billing | admin/doctor/nurse |
| الوصفات | /prescriptions | مصادقة |
| التقارير | /reports | admin/doctor/nurse |
| الإدارة | /admin | admin (يوصله جميع الأدوار لكن القيود في API) |

---

## 10. تطبيق السائق / تطبيق المتجر

**غير موجودان** — المشروع هو نظام إدارة عيادات طبية فقط ولا يشمل توصيل أو متاجر.

---

## 11. نظام الإشعارات

### 11.1 آلية العمل
- **التخزين:** قاعدة البيانات (جدول `notifications`)
- **التسليم:** عند استعلام المستخدم (`GET /api/notifications`)
- **المستقبل:** مستخدم محدد بـ `user_id`

### 11.2 أنواع الإشعارات المدعومة
- `info` — معلوماتي (الأكثر استخداماً: إشعار موعد جديد)
- `success` — نجاح
- `warning` — تحذير
- `error` — خطأ

### 11.3 متى تُرسَل الإشعارات؟
- عند إنشاء موعد جديد → جميع مستخدمي admin و receptionist يتلقون إشعاراً

### 11.4 مكون عرض الإشعارات
- `NotificationBell.tsx` — جرس في شريط التنقل يعرض عدد الإشعارات غير المقروءة
- يعرض قائمة الإشعارات عند النقر
- إمكانية تعليم الإشعار كمقروء

### 11.5 القيود
- ❌ لا يوجد إشعارات فورية (Real-time) — يعتمد على Polling (إعادة التحميل)
- ❌ لا يوجد Push Notifications
- ❌ لا يوجد إشعارات SMS أو Email

---

## 12. نظام الدفع

### 12.1 طرق الدفع المدعومة
| الطريقة | الوصف | الحالة |
|---------|-------|--------|
| Cash (نقد) | دفع نقدي مسجَّل يدوياً | ✅ مدعومة |
| Card (بطاقة) | تسجيل يدوي (لا integration فعلي) | ⚠️ تسجيل فقط |
| Insurance (تأمين) | خصم تأمين مرتبط بشركة | ✅ مدعومة |

### 12.2 ملاحظات
- **لا توجد بوابة دفع إلكتروني مدمجة** (لا Stripe، لا PayPal، لا بوابات محلية)
- المبالغ مخزَّنة بـ **Cents/Halalas** (أصغر وحدة نقدية) لتجنب أخطاء الأرقام العشرية
- نظام التأمين يحسب: `netAmount = amount - insuranceDiscount`
- يمكن تسجيل مدفوعات جزئية متعددة لنفس الفاتورة

---

## 13. نظام الخرائط

**غير موجود** — لا يستخدم المشروع خرائط من أي نوع.
لا Google Maps، لا OpenStreetMap، لا Mapbox، لا حساب مسافات.

---

## 14. جميع API Endpoints

### Auth
| Method | Path | الوصف | المصادقة |
|--------|------|-------|---------|
| POST | /api/login | تسجيل الدخول | عام |
| POST | /api/logout | تسجيل الخروج | مصادق |
| GET | /api/user | بيانات المستخدم الحالي | مصادق |

### Patients
| Method | Path | الوصف | المصادقة |
|--------|------|-------|---------|
| GET | /api/patients | جلب جميع المرضى | مصادق |
| POST | /api/patients | إنشاء مريض جديد | مصادق |
| GET | /api/patients/:id | جلب مريض بمعرفه | مصادق |
| GET | /api/patients/:id/medical-records | سجلات طبية للمريض | مصادق |
| POST | /api/medical-records | إضافة سجل طبي | مصادق |

### Appointments
| Method | Path | الوصف | المصادقة |
|--------|------|-------|---------|
| GET | /api/appointments | جلب جميع المواعيد | مصادق |
| POST | /api/appointments | حجز موعد جديد | مصادق |

### Inventory
| Method | Path | الوصف | المصادقة |
|--------|------|-------|---------|
| GET | /api/inventory | جلب جميع الأدوية | مصادق |
| POST | /api/inventory | إضافة دواء جديد | مصادق |

### Billing
| Method | Path | الوصف | المصادقة |
|--------|------|-------|---------|
| GET | /api/billing/invoices | جلب جميع الفواتير | مصادق |
| POST | /api/billing/invoices | إنشاء فاتورة جديدة | مصادق |
| POST | /api/billing/payments | تسجيل دفع | مصادق |

### Prescriptions
| Method | Path | الوصف | المصادقة |
|--------|------|-------|---------|
| GET | /api/prescriptions | جلب جميع الوصفات | مصادق |
| POST | /api/prescriptions | إنشاء وصفة جديدة | مصادق |

### Insurance
| Method | Path | الوصف | المصادقة |
|--------|------|-------|---------|
| GET | /api/insurance | جلب شركات التأمين | مصادق |
| POST | /api/insurance | إضافة شركة تأمين | admin فقط |
| PATCH | /api/insurance/:id | تعديل شركة تأمين | admin فقط |

### Suppliers
| Method | Path | الوصف | المصادقة |
|--------|------|-------|---------|
| GET | /api/suppliers | جلب الموردين | مصادق |
| POST | /api/suppliers | إضافة مورد | admin فقط |

### Notifications
| Method | Path | الوصف | المصادقة |
|--------|------|-------|---------|
| GET | /api/notifications | إشعارات المستخدم | مصادق |
| PATCH | /api/notifications/:id/read | تعليم إشعار كمقروء | مصادق |

### Admin
| Method | Path | الوصف | المصادقة |
|--------|------|-------|---------|
| GET | /api/admin/users | جلب جميع المستخدمين | admin فقط |
| POST | /api/admin/users | إنشاء مستخدم | admin فقط |
| PATCH | /api/admin/users/:id/role | تغيير دور المستخدم | admin فقط |
| DELETE | /api/admin/users/:id | حذف مستخدم | admin فقط |
| GET | /api/admin/settings | جلب إعدادات النظام | admin فقط |
| PATCH | /api/admin/settings | تحديث الإعدادات | admin فقط |
| GET | /api/admin/audit-logs | سجلات المراجعة | admin فقط |
| GET | /api/admin/backup | تنزيل نسخة احتياطية | admin فقط |

### Prescription Templates
| Method | Path | الوصف | المصادقة |
|--------|------|-------|---------|
| GET | /api/prescription-templates | جلب القوالب | مصادق |
| POST | /api/prescription-templates | إنشاء قالب | admin فقط |

### Reports
| Method | Path | الوصف | المصادقة |
|--------|------|-------|---------|
| GET | /api/reports/stats | إحصائيات التقارير | مصادق |

**المجموع: 27 Endpoint**

---

## 15. الأمان

### 15.1 نقاط القوة
- ✅ JWT-less Session-based Authentication (أقل تعقيداً)
- ✅ التحقق من الجلسة في كل طلب API محمي
- ✅ فحص الدور في نقاط API الحساسة
- ✅ Zod validation للمدخلات في routes.ts
- ✅ `saveUninitialized: false` في إعدادات الجلسة

### 15.2 نقاط الضعف الحرجة 🔴

#### 1. كلمات المرور مخزَّنة كنص صريح (Critical)
```typescript
// routes.ts - سطر 33
if (!user || user.password !== password) { // In production, use bcrypt!
```
**الخطر:** أي اختراق لقاعدة البيانات يكشف كلمات مرور جميع المستخدمين.

#### 2. مفتاح الجلسة الافتراضي
```typescript
secret: process.env.SESSION_SECRET || "default_secret"
```
**الخطر:** إذا لم يُعيَّن `SESSION_SECRET`، يُستخدم "default_secret" الذي يعرض الجلسات للاختراق.

#### 3. MemoryStore للجلسات
**الخطر:** عند إعادة تشغيل الخادم، تُفقد جميع الجلسات. غير مناسب للإنتاج.

### 15.3 نقاط تحتاج تحسين
- ⚠️ لا يوجد Rate Limiting على API
- ⚠️ لا يوجد CSRF Protection
- ⚠️ لا يوجد Security Headers (Helmet.js)
- ⚠️ لا يوجد فلترة في GET Requests (يُرجع جميع البيانات دون pagination)
- ⚠️ Audit Logs تتتبع إنشاء الفواتير فقط، لا الأحداث الأخرى
- ⚠️ لا توجد Authorization حقيقية على GET endpoints (أي مصادق يرى كل شيء)

---

## 16. الأداء

### 16.1 نقاط القوة
- TanStack Query يُخزِّن نتائج API ويمنع الطلبات المتكررة
- PostgreSQL مع Drizzle ORM يوفر استعلامات محسَّنة

### 16.2 نقاط الضعف
- **لا Pagination:** جميع GET Endpoints تُرجع جميع السجلات دفعة واحدة (خطر عند تضخم البيانات)
- **لا Filtering في Backend:** الفلترة تتم في Frontend فقط
- **MemoryStore:** لا يتوسع لأكثر من خادم واحد
- **Dashboard:** يطلب 4 APIs بشكل مستقل بدلاً من API موحَّد محسَّن

---

## 17. جودة الكود

### 17.1 نقاط القوة
- ✅ TypeScript كامل مع أنواع واضحة
- ✅ Repository Pattern في `storage.ts` يفصل منطق البيانات
- ✅ Shared Schema يمنع التكرار بين Frontend و Backend
- ✅ Zod للتحقق من البيانات في كلا الطرفين
- ✅ React Query Hooks منفصلة ومنظمة

### 17.2 مشاكل جودة الكود

#### Code Smells
- وحدات `modules/`, `core/`, `ui/` خارجية (JavaScript خام) غير مدمجة ومكررة للوظائف الموجودة
- `createInvoice` في `storage.ts` يُسقط حقل `insuranceDiscount` و`insuranceId` عند الإنشاء

#### Technical Debt
- تعليقات TODO في كود الإنتاج: `// In production, use bcrypt!`
- مجلدات `tests/` و`database/migrations/` فارغة تماماً
- ملف `client/requirements.md` لا يُستخدم

#### Dead Code
- جميع ملفات `modules/` و`core/` و`ui/` خارج المشروع الفعلي

---

## 18. قابلية التوسع

### 18.1 هل يمكن تحويله إلى SaaS؟
**⚠️ ممكن مع تعديلات جوهرية** — يحتاج:
- إضافة جدول `clinics/tenants` مع Tenant ID في جميع الجداول
- عزل البيانات بين العيادات
- نظام اشتراك وفوترة

### 18.2 هل يمكن تحويله إلى White Label؟
**✅ قريب من ذلك** — إعدادات العيادة (الاسم، الشعار، العنوان) قابلة للتخصيص حالياً.

### 18.3 هل يمكن تحويله إلى Marketplace؟
**❌ يحتاج إعادة هيكلة كاملة** — يتطلب نماذج أعمال مختلفة تماماً.

### 18.4 Multi-Tenant
**❌ غير مدعوم حالياً** — جميع البيانات في نفس الجداول بدون فصل.

---

## 19. التقرير النهائي (Executive Summary)

### 19.1 ملخص تنفيذي

**MediCare / ClinicPro** هو نظام إدارة عيادات طبية Full-Stack مبني بتقنيات حديثة (React + TypeScript + Express + PostgreSQL). يوفر منظومة متكاملة من الأدوات اللازمة لإدارة عيادة صغيرة إلى متوسطة الحجم، تشمل إدارة المرضى، المواعيد، الفواتير، الوصفات، المخزون، والتأمين الصحي.

النظام في مرحلة **MVP متقدمة** مع واجهة مستخدم عربية احترافية ومكتملة بصرياً. إلا أن بعض الثغرات الأمنية الحرجة (كلمات المرور غير مشفَّرة) تمنع استخدامه في بيئة الإنتاج الفعلية دون معالجة عاجلة.

### 19.2 نقاط القوة
- ✅ واجهة عربية RTL احترافية ومتجاوبة
- ✅ تغطية وظيفية شاملة لعمليات العيادة
- ✅ بنية كود نظيفة ومنظمة (TypeScript + Repository Pattern)
- ✅ Schema مشترك يوفر Type Safety كاملاً
- ✅ دعم تصدير PDF و Excel
- ✅ صفحة زوار عامة لحجز المواعيد
- ✅ نظام إشعارات داخلي
- ✅ سجل مراجعة للأحداث
- ✅ دعم التأمين الصحي بنسب الخصم

### 19.3 نقاط الضعف
- 🔴 كلمات المرور غير مشفَّرة (bcrypt غائب)
- 🔴 MemoryStore للجلسات غير مناسب للإنتاج
- 🔴 لا Pagination — خطر الأداء مع البيانات الكبيرة
- ⚠️ لا Rate Limiting ولا Security Headers
- ⚠️ وحدات JavaScript خارجية غير مدمجة تُشكِّل ديناً تقنياً
- ⚠️ اختبارات تلقائية غائبة تماماً
- ⚠️ دورة الموعد غير مكتملة (لا تغيير حالة الموعد)

### 19.4 SWOT Analysis

| | إيجابي | سلبي |
|--|--------|-------|
| **داخلي** | **Strengths:** UI متكامل، TypeScript كامل، Schema مشترك، تغطية وظيفية | **Weaknesses:** أمان ضعيف، لا اختبارات، لا Pagination، كود ميت |
| **خارجي** | **Opportunities:** سوق إدارة العيادات العربية كبير، سهل التحول لـ SaaS/White Label | **Threats:** متطلبات الامتثال الطبي (HIPAA/GDPR)، المنافسة، البيانات الحساسة |

---

## 20. جاهزية المشروع — التقييم الشامل

| المحور | النسبة | الملاحظات |
|--------|--------|-----------|
| البنية | 75% | منظمة لكن تحتوي على طبقتين متوازيتين |
| الأمان | 30% | ثغرة حرجة في تشفير كلمات المرور |
| الأداء | 55% | TanStack Query جيد، لكن لا Pagination |
| التنظيم | 70% | TypeScript + Pattern جيد، لكن وحدات غير مدمجة |
| التوسع | 50% | ممكن لكن يحتاج Multi-tenant |
| سهولة الصيانة | 65% | أنواع TypeScript تُسهّل الصيانة، لكن لا اختبارات |
| **المجموع** | **57/100** | **MVP قابل للتطوير** |

---

## 21. ما الذي ينقص المشروع؟ — قائمة مرتبة بالأولوية

### 🔴 Critical (حرجة — يجب معالجتها فوراً)
1. **تشفير كلمات المرور** — استخدام bcrypt قبل أي نشر للإنتاج
2. **استبدال MemoryStore** — استخدام `connect-pg-simple` لتخزين الجلسات في PostgreSQL

### 🟠 High (عالية)
3. **Pagination للقوائم** — لتجنب أداء سيء مع البيانات الكثيرة
4. **Rate Limiting** — حماية API من الإساءة
5. **Security Headers** — إضافة Helmet.js
6. **تحديث حالة المواعيد** — إضافة ميزة إنهاء/إلغاء الموعد من UI

### 🟡 Medium (متوسطة)
7. **تصدير الفاتورة/الوصفة كـ PDF** — من صفحة الفاتورة مباشرة
8. **تعديل وحذف السجلات** — تعديل/حذف المرضى والفواتير والمواعيد
9. **نظام RBAC متقدم** — صلاحيات دقيقة لكل عملية
10. **الاختبارات التلقائية** — Unit + Integration tests

### 🟢 Low (منخفضة)
11. **دمج وحدات JS الخارجية أو حذفها**
12. **Audit Logging شاملة** — تتبع جميع الأحداث لا إنشاء الفواتير فقط
13. **Push Notifications / SMS**
14. **Multi-Clinic Support**

---

## 22. الاستخدام التجاري

### 22.1 من يمكنه شراء هذا المشروع؟
- أطباء يرغبون في رقمنة عياداتهم
- شركات برمجيات طبية ترغب في منصة جاهزة
- مستثمرون في قطاع Health Tech

### 22.2 القطاعات المناسبة
- عيادات طب عام
- عيادات متخصصة (أسنان، عيون، جلدية...)
- مراكز صحية صغيرة
- مجمعات طبية متوسطة

### 22.3 هل يصلح كـ SaaS؟
**نعم، بعد إضافة:**
- نظام Multi-Tenant
- بوابة اشتراكات شهرية
- عزل بيانات العيادات

### 22.4 هل يصلح كـ White Label؟
**نعم، تقريباً جاهز** — الإعدادات تسمح بتخصيص اسم العيادة وشعارها.

---

## 23. جدول حالة المشروع الحالية

| الوحدة | الحالة | نسبة الإنجاز | ملاحظات |
|--------|--------|-------------|---------|
| **Authentication** | ✅ مكتمل | 85% | يحتاج bcrypt |
| **User Management** | ✅ مكتمل | 90% | إنشاء/تعديل/حذف |
| **Patient Management** | ✅ مكتمل | 80% | ينقصه تعديل/حذف |
| **Medical Records** | ✅ مكتمل | 85% | 5 أنواع سجلات |
| **Appointments** | ⚠️ جزئي | 65% | ينقصه تغيير الحالة |
| **Inventory** | ✅ مكتمل | 80% | ينقصه تعديل/حذف |
| **Billing** | ✅ مكتمل | 80% | ينقصه تعديل الفاتورة |
| **Payments** | ✅ مكتمل | 80% | ينقصه استرجاع الدفع |
| **Prescriptions** | ✅ مكتمل | 80% | ينقصه PDF مستقل |
| **Prescription Templates** | ✅ مكتمل | 90% | جاهز تقريباً |
| **Insurance** | ✅ مكتمل | 85% | |
| **Suppliers** | ✅ مكتمل | 75% | ينقصه تعديل/حذف |
| **Reports** | ✅ مكتمل | 75% | يمكن إضافة تقارير أكثر |
| **Notifications** | ✅ مكتمل | 70% | ينقصه Real-time |
| **Audit Logs** | ⚠️ جزئي | 50% | يسجّل أحداث محدودة |
| **System Settings** | ✅ مكتمل | 85% | |
| **Visitor Booking** | ✅ مكتمل | 80% | |
| **Data Backup** | ⚠️ جزئي | 40% | بيانات جزئية فقط |
| **Security** | ❌ ناقص | 30% | كلمات مرور غير مشفَّرة |
| **Testing** | ❌ غائب | 0% | لا اختبارات |
| **Pagination** | ❌ غائب | 0% | خطر أداء |
| **Rate Limiting** | ❌ غائب | 0% | |
| **Multi-Clinic** | ❌ غائب | 0% | |
| **Mobile App** | ❌ غائب | 0% | |
| **Payment Gateway** | ❌ غائب | 0% | تسجيل يدوي فقط |
| **Maps Integration** | ❌ غائب | 0% | |
| **SMS/Email** | ❌ غائب | 0% | |

---

*انتهى التقرير — تم إنشاؤه بتاريخ 2026-06-27*
*هذه وثيقة رسمية تحليلية ولا تتضمن أي تعديل على الكود*
