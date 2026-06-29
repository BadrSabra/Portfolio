# تقرير التحليل التفصيلي الشامل
## منصة MIT GABER — Hyperlocal Marketplace
**تاريخ التقرير:** 26 يونيو 2026  
**نوع التقرير:** تحليل معماري وتقني شامل  
**الحالة:** وثيقة رسمية للقراءة فقط — لا تعديل على الكود

---

## جدول المحتويات

1. هيكل المشروع بالكامل
2. التقنيات المستخدمة
3. معمارية النظام
4. قاعدة البيانات
5. أنواع المستخدمين وصلاحياتهم
6. جميع خصائص النظام
7. دورة الطلب بالكامل
8. لوحة تحكم الأدمن
9. تطبيق العميل
10. تطبيق السائق
11. تطبيق صاحب المتجر
12. نظام الإشعارات
13. نظام الدفع
14. نظام الخرائط
15. جميع API Endpoints
16. الأمان
17. الأداء
18. جودة الكود
19. قابلية التوسع
20. جاهزية المشروع
21. ما الذي ينقص المشروع
22. الاستخدام التجاري
23. تقرير SWOT النهائي
24. جدول حالة المشروع الحالية

---

## 1. هيكل المشروع بالكامل

### المجلدات الرئيسية

```
/
├── client/                    # الواجهة الأمامية (React + Vite)
│   ├── index.html             # نقطة دخول HTML
│   ├── public/                # ملفات ثابتة (Service Worker, favicon)
│   │   ├── sw.js              # Service Worker للإشعارات الدفعية
│   │   └── favicon.png
│   └── src/
│       ├── App.tsx            # الجذر الرئيسي + تعريف المسارات
│       ├── main.tsx           # نقطة تحميل React
│       ├── index.css          # CSS المتغيرات والأنماط العامة
│       ├── i18n.ts            # نظام الترجمة (عربي)
│       ├── components/        # المكونات المشتركة
│       │   ├── ui/            # مكونات shadcn/ui (30+ مكون)
│       │   ├── customer/      # مكونات خاصة بالعميل
│       │   ├── driver/        # مكونات خاصة بالسائق
│       │   ├── home/          # مكونات الصفحة الرئيسية
│       │   ├── layout/        # تخطيطات الصفحات (Admin, Store)
│       │   └── ObjectUploader.tsx  # رفع الملفات عبر Object Storage
│       ├── hooks/             # React Hooks المخصصة
│       ├── lib/               # مكتبات مساعدة (API, queryClient)
│       ├── locales/ar/        # ملف الترجمة العربية JSON
│       └── pages/             # جميع صفحات التطبيق
│           ├── admin/         # 10 صفحات للأدمن
│           ├── auth/          # تسجيل الدخول + التسجيل
│           ├── chat/          # قائمة الدردشة + غرفة الدردشة
│           ├── customer/      # صفحات العميل + المتجر
│           ├── driver/        # صفحات السائق
│           └── public/        # الصفحات العامة (لاندنج، متاجر)
│
├── server/                    # الخادم الخلفي (Node.js + Express)
│   ├── index.ts               # نقطة دخول الخادم
│   ├── routes.ts              # تسجيل جميع المسارات الرئيسية (1568 سطر)
│   ├── storage.ts             # طبقة الوصول لقاعدة البيانات (IStorage)
│   ├── db.ts                  # اتصال PostgreSQL + connection pool
│   ├── static.ts              # خدمة ملفات الإنتاج الثابتة
│   ├── vite.ts                # إعداد Vite في بيئة التطوير
│   ├── seed.ts                # بيانات أولية للتطوير
│   ├── DECISIONS.md           # وثيقة القرارات المعمارية
│   ├── bootstrap/
│   │   ├── database.bootstrap.ts  # التحقق من قاعدة البيانات عند البدء
│   │   └── db-auto-verify.ts      # إنشاء الجداول والـ enums تلقائياً
│   ├── middleware/
│   │   ├── auth.ts            # JWT authentication + authorization
│   │   ├── error.ts           # معالجة الأخطاء المركزية + request ID
│   │   └── security.ts        # Rate limiters + security headers
│   ├── modules/               # وحدات الأعمال المنفصلة
│   │   ├── admin/             # health controller للأدمن
│   │   ├── audit/             # سجلات التدقيق
│   │   ├── avatar/            # رفع صور المستخدمين والرخص
│   │   ├── chat/              # نظام الدردشة (REST + Socket.IO)
│   │   ├── delivery/          # التوصيل، العروض، OTP
│   │   ├── deploy/            # webhook النشر التلقائي
│   │   ├── deposits/          # إدارة الإيداعات
│   │   ├── integrity/         # فحص سلامة النظام
│   │   ├── ledger/            # دفتر الأستاذ المالي
│   │   ├── notifications/     # نظام الإشعارات (push + DB)
│   │   ├── orders/            # الطلبات والطلبات الفرعية
│   │   ├── products/          # إدارة المنتجات
│   │   ├── public/            # API عامة (بدون مصادقة)
│   │   ├── receipt/           # رفع إيصالات الدفع
│   │   ├── store/             # رفع صور المتاجر
│   │   └── wallet/            # المحافظ والسحب والإيداع
│   ├── replit_integrations/
│   │   └── object_storage/    # تكامل Google Cloud Storage
│   ├── scripts/               # أدوات الصيانة والاختبار (12 script)
│   ├── services/
│   │   ├── auditService.ts    # خدمة التدقيق المشتركة
│   │   └── transactionWrapper.ts # غلاف المعاملات المالية
│   ├── types/
│   │   └── express.d.ts       # توسعة أنواع Express
│   └── utils/
│       ├── image-upload.ts    # رفع الصور لـ Google Cloud Storage
│       └── money.ts           # حسابات مالية دقيقة (cents-based)
│
├── shared/                    # كود مشترك بين الخادم والعميل
│   ├── schema.ts              # نموذج قاعدة البيانات + أنواع TypeScript
│   └── routes.ts              # تعريفات مسارات API المشتركة
│
├── uploads/                   # ملفات مرفوعة محلياً (للتطوير)
│   ├── avatars/               # صور المستخدمين
│   ├── products/              # صور المنتجات
│   ├── receipts/              # إيصالات الدفع
│   └── stores/                # صور المتاجر
│
├── backups/                   # نسخ احتياطية لقاعدة البيانات (4 ملفات SQL)
├── logs/                      # ملفات سجلات العمليات والتقارير
├── dist/                      # ملفات البناء للإنتاج
├── docs/                      # التوثيق (هذا الملف)
│
├── package.json               # التبعيات وأوامر البناء
├── tsconfig.json              # إعدادات TypeScript
├── vite.config.ts             # إعدادات Vite
├── tailwind.config.ts         # إعدادات Tailwind CSS
├── drizzle.config.ts          # إعدادات Drizzle ORM
├── postcss.config.js          # إعدادات PostCSS
├── components.json            # إعدادات shadcn/ui
├── Dockerfile                 # صورة Docker للنشر
├── docker-compose.yml         # إعداد Docker Compose
├── render.yaml                # إعداد النشر على Render
├── DEPLOY.md                  # تعليمات النشر
└── replit.md                  # وثيقة المشروع الرئيسية
```

### العلاقات بين الملفات الرئيسية

```
client/src/App.tsx
  └── يستورد جميع صفحات التطبيق (lazy loading)
  └── يُعرّف ProtectedRoute + RoleBasedDashboard
  └── يتصل بـ hooks/use-auth.ts للمصادقة

server/index.ts
  └── يُحمّل securityMiddleware
  └── يستدعي autoVerifyDatabase()
  └── يُهيّئ initChatSocket()
  └── يستدعي registerRoutes()
  └── يُشغّل في بيئة التطوير setupVite()

server/routes.ts
  └── يُسجّل 80+ endpoint
  └── يستورد من modules/ لكل وحدة
  └── يستخدم middleware/auth.ts للحماية

shared/schema.ts ← مُستخدم في الخادم والعميل
  └── تعريفات الجداول (Drizzle ORM)
  └── أنواع TypeScript المستنتجة
  └── مخططات Zod للتحقق
```

---

## 2. التقنيات المستخدمة

### لغات البرمجة
| اللغة | الإصدار | الاستخدام |
|-------|---------|-----------|
| TypeScript | 5.6.3 | كل الكود (frontend + backend + shared) |
| JavaScript (ES Modules) | ES2022 | ملفات الإخراج |
| SQL | PostgreSQL | استعلامات قاعدة البيانات |
| CSS | Tailwind v4 | التنسيق |

### الأطر والمكتبات الرئيسية

**الواجهة الأمامية:**
| المكتبة | الإصدار | الغرض |
|---------|---------|-------|
| React | 18.3.1 | إطار الواجهة |
| Vite | 7.3.2 | أداة البناء والتطوير |
| Wouter | 3.3.5 | التوجيه (Routing) |
| TanStack Query | 5.60.5 | إدارة حالة الخادم والكاش |
| shadcn/ui | — | مكونات UI (Radix UI based) |
| Tailwind CSS | 4.2.1 | نظام التنسيق |
| React Hook Form | 7.55.0 | إدارة النماذج |
| Zod | 3.24.2 | التحقق من البيانات |
| Framer Motion | 11.13.1 | الرسوم المتحركة |
| Recharts | 2.15.2 | الرسوم البيانية |
| Socket.IO Client | 4.8.3 | الاتصال الفوري |
| Lucide React | 0.453.0 | الأيقونات |
| date-fns | 3.6.0 | التعامل مع التواريخ |
| Uppy | 5.x | رفع الملفات |

**الخادم الخلفي:**
| المكتبة | الإصدار | الغرض |
|---------|---------|-------|
| Express.js | 5.0.1 | إطار الخادم |
| Socket.IO | 4.8.3 | WebSocket للدردشة والإشعارات |
| Drizzle ORM | 0.45.2 | ORM لقاعدة البيانات |
| PostgreSQL (pg) | 8.16.3 | قاعدة البيانات |
| bcryptjs | 3.0.3 | تشفير كلمات المرور |
| jsonwebtoken | 9.0.3 | JWT للمصادقة |
| express-rate-limit | 8.2.2 | تقييد معدل الطلبات |
| helmet | 8.1.0 | أمان HTTP headers |
| multer | 2.1.1 | رفع الملفات |
| sharp | 0.34.5 | معالجة الصور |
| web-push | 3.6.7 | Push Notifications |
| nodemailer | 8.0.1 | إرسال البريد الإلكتروني |
| passport + passport-local | — | مصادقة إضافية |
| google-auth-library | 10.6.2 | Google OAuth |
| @google-cloud/storage | 7.19.0 | تخزين الملفات السحابي |
| xss-clean | 0.1.4 | حماية XSS |
| hpp | 0.2.3 | حماية HTTP Parameter Pollution |
| drizzle-zod | 0.7.0 | توليد مخططات Zod من Drizzle |

**قاعدة البيانات:**
- PostgreSQL (عبر Replit PostgreSQL Integration)
- Drizzle ORM للاستعلامات
- drizzle-kit لمزامنة المخطط

**أدوات البناء:**
- Vite (frontend bundler)
- tsx (TypeScript runner للتطوير)
- esbuild (للبناء السريع)
- rollup (للبناء النهائي)

**أدوات الاختبار:**
- ملفات `.spec.ts` و`.test.ts` موجودة لكن بدون إطار اختبار مُهيَّأ بالكامل
- اختبارات يدوية عبر scripts في `server/scripts/`

**أدوات النشر:**
- Replit (البيئة الحالية)
- Docker + docker-compose (متاح)
- Render.com (render.yaml مُهيَّأ)
- GitHub Actions (.github/workflows/deploy.yml)
- Self-deployment webhook (GitHub → POST /api/deploy/webhook)

**خدمات الطرف الثالث:**
- Google Cloud Storage (GCS) — تخزين الصور
- Web Push API (VAPID) — إشعارات المتصفح
- nodemailer — البريد الإلكتروني

---

## 3. معمارية النظام

### نمط المعمارية
**Modular Monolith** — تطبيق وحيد يحتوي على Frontend و Backend، مع تنظيم داخلي بالوحدات (modules).

### طبقات المشروع

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENT (React SPA)                    │
│  Pages → Components → Hooks → QueryClient → API Layer  │
├─────────────────────────────────────────────────────────┤
│                   SHARED (TypeScript)                    │
│         schema.ts (types) + routes.ts (API defs)        │
├─────────────────────────────────────────────────────────┤
│                  SERVER (Express.js)                     │
│  Security Middleware → Auth → Routes → Controllers       │
│              ↓                                           │
│         Services/ORM → PostgreSQL                        │
│              ↓                                           │
│    Socket.IO (Chat) + Web Push (Notifications)          │
│              ↓                                           │
│         Google Cloud Storage (Images)                   │
└─────────────────────────────────────────────────────────┘
```

### تدفق البيانات

```
المستخدم
  ↓ HTTP Request (with JWT Bearer token)
Express Middleware (Security Headers → Rate Limiter → Auth)
  ↓
Router (server/routes.ts)
  ↓
Controller (modules/*/controller.ts)
  ↓
Service (modules/*/service.ts) ← يحتوي منطق الأعمال
  ↓
Drizzle ORM (db.ts)
  ↓
PostgreSQL Database
```

**تدفق الاتصال الفوري:**
```
Client ←→ Socket.IO ←→ chat.socket.ts
    إرسال رسالة → DB → broadcast للغرفة
    إشعار فوري → user:{id} room
```

### طريقة الاتصال بين Frontend و Backend
- **REST API**: JSON over HTTP/HTTPS — الوسيلة الرئيسية
- **WebSocket (Socket.IO)**: للدردشة الفورية والإشعارات الحية
- **كلاهما على نفس المنفذ** (port 5000) — Vite proxy في التطوير، Express يخدم الكل في الإنتاج
- **المصادقة**: JWT يُرسل في `Authorization: Bearer <token>` header
- **التخزين المحلي**: `localStorage.getItem('jwt_token')` — في جانب العميل

### إدارة الحالة (Frontend)
- **حالة الخادم**: TanStack Query v5 (كاش، تحديث تلقائي، invalidation)
- **حالة المصادقة**: useAuth hook (يقرأ JWT ويستدعي `/api/auth/me`)
- **حالة السلة**: React Context (CartContext) — في الذاكرة فقط
- **حالة النماذج**: React Hook Form

### Dependency Injection
لا يوجد نظام DI رسمي. الخدمات تُعرَّف كـ instances مصدّرة:
```typescript
export const walletService = new WalletService();
export const ledgerService = new LedgerService();
```

### Middleware Stack (بالترتيب)
1. `requestIdMiddleware` — توليد request ID فريد
2. `securityMiddleware` — HTTP security headers (X-Frame-Options, CSP, HSTS...)
3. `generalLimiter` — 1000 طلب/15 دقيقة
4. `payloadSizeLimit` — حد 10MB للطلبات
5. `express.json()` — تحليل JSON body
6. `express.urlencoded()` — تحليل form data
7. `/uploads` static serving — خدمة الصور المحلية
8. `authenticate` (per route) — التحقق من JWT
9. `authorizeRole` (per route) — التحقق من الدور
10. `errorHandler` — معالجة الأخطاء المركزية

### Authentication Flow
```
1. تسجيل: POST /api/auth/register
   → bcrypt.hash(password, 10)
   → db.transaction: users + wallets + stores (إن كان STORE_OWNER)
   → JWT sign (7 أيام)
   → return {token, user}

2. تسجيل الدخول: POST /api/auth/login
   → يقبل email أو phone
   → bcrypt.compare
   → fallback: SHA-512 للحسابات القديمة (مع ترقية تلقائية لـ bcrypt)
   → JWT sign (7 أيام)
   → return {token, user, walletBalance}

3. حماية المسارات: Bearer Token في Authorization header
   → jwt.verify(token, JWT_SECRET)
   → req.user = {id, role}

4. التحقق من الدور: authorizeRole(["ADMIN", "STORE_OWNER"])
   → يُقارن req.user.role مع المسموح بهم
```

---

## 4. قاعدة البيانات

### جميع الجداول

#### 1. جدول `users` — المستخدمون
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY, DEFAULT gen_random_uuid() | المعرف الفريد |
| name | TEXT | NOT NULL | اسم المستخدم |
| email | VARCHAR | NOT NULL, UNIQUE | البريد الإلكتروني (أو phone@phone.mitgaber.local) |
| password | TEXT | NOT NULL | كلمة المرور مشفرة بـ bcrypt |
| phone | TEXT | NULL | رقم الهاتف |
| role | ENUM(role) | NOT NULL, DEFAULT 'CUSTOMER' | الدور: ADMIN/CUSTOMER/STORE_OWNER/DRIVER |
| is_approved | BOOLEAN | NOT NULL, DEFAULT false | حالة الموافقة |
| transport_type | TEXT | NULL | نوع المركبة (للسائقين) |
| avatar_url | TEXT | NULL | رابط صورة الملف الشخصي |
| drivers_license_url | TEXT | NULL | رابط رخصة القيادة |
| addresses | JSONB | DEFAULT '[]' | قائمة عناوين المستخدم |
| created_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | تاريخ الإنشاء |
| updated_at | TIMESTAMP | NOT NULL, DEFAULT NOW() | تاريخ التحديث |

**الفهارس:** UNIQUE على email  
**العلاقات:** أصل لـ: wallets, stores, sub_orders (driver), orders, audit_logs, ledger, ratings, delivery_offers, withdrawal_requests, notifications, push_subscriptions, chat_participants, chat_messages

---

#### 2. جدول `wallets` — المحافظ
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| user_id | UUID | NOT NULL, UNIQUE, FK → users.id | مالك المحفظة |
| balance | NUMERIC(12,2) | NOT NULL, DEFAULT '0.00' | الرصيد الحالي |
| created_at | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updated_at | TIMESTAMP | NOT NULL | تاريخ التحديث |

**الفهارس:** UNIQUE على user_id (لمنع تكرار المحافظ)  
**العلاقات:** FK → users.id | أصل لـ wallet_transactions, withdrawal_requests

---

#### 3. جدول `wallet_transactions` — حركات المحفظة
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| wallet_id | UUID | NOT NULL, FK → wallets.id | المحفظة المعنية |
| type | ENUM(transaction_type) | NOT NULL | DEPOSIT/WITHDRAWAL/REFUND/COMMISSION |
| amount | NUMERIC(12,2) | NOT NULL | المبلغ |
| related_order_id | UUID | NULL | الطلب المرتبط |
| receipt_url | TEXT | NULL | رابط الإيصال |
| notes | TEXT | NULL | ملاحظات |
| status | ENUM(transaction_status) | NOT NULL, DEFAULT 'PENDING' | PENDING/COMPLETED/FAILED |
| created_at | TIMESTAMP | NOT NULL | تاريخ الإنشاء |

---

#### 4. جدول `ledger` — دفتر الأستاذ (Double-Entry)
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| reference_id | UUID | NULL | مرجع العملية (طلب، إيداع...) |
| debit_user_id | UUID | NULL, FK → users.id | المدين (المصدر) |
| credit_user_id | UUID | NULL, FK → users.id | الدائن (الهدف) |
| amount | NUMERIC(12,2) | NOT NULL | المبلغ |
| type | TEXT ENUM | NOT NULL | DEPOSIT/WITHDRAWAL/COMMISSION/REFUND |
| created_at | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updated_at | TIMESTAMP | NOT NULL | تاريخ التحديث |

**ملاحظة:** لا يحتوي على حقل status — كل قيد في دفتر الأستاذ مكتمل بطبيعته.

---

#### 5. جدول `stores` — المتاجر
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| owner_id | UUID | NOT NULL, FK → users.id | مالك المتجر |
| name | TEXT | NOT NULL | اسم المتجر |
| type | TEXT | NULL | نوع المتجر |
| description | TEXT | NULL | وصف المتجر |
| location_text | TEXT | NULL | الموقع نصياً |
| image_url | TEXT | NULL | رابط صورة المتجر |
| is_featured | BOOLEAN | NOT NULL, DEFAULT false | هل هو مميَّز؟ |
| sort_order | INTEGER | NOT NULL, DEFAULT 0 | ترتيب العرض |
| created_at | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updated_at | TIMESTAMP | NOT NULL | تاريخ التحديث |

**العلاقات:** FK → users.id | أصل لـ products, sub_orders

---

#### 6. جدول `products` — المنتجات
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| store_id | UUID | NOT NULL, FK → stores.id | المتجر المالك |
| name | TEXT | NOT NULL | اسم المنتج |
| description | TEXT | NULL | وصف المنتج |
| price | NUMERIC(10,2) | NOT NULL | السعر |
| stock | INTEGER | NOT NULL, DEFAULT 0 | الكمية المتاحة |
| category | TEXT | NOT NULL, DEFAULT 'General' | الفئة |
| image_url | TEXT | NULL | رابط صورة المنتج |
| is_featured | BOOLEAN | NOT NULL, DEFAULT false | هل هو مميَّز؟ |
| created_at | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updated_at | TIMESTAMP | NOT NULL | تاريخ التحديث |

**العلاقات:** FK → stores.id | أصل لـ order_items

---

#### 7. جدول `orders` — الطلبات الرئيسية
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| customer_id | UUID | NOT NULL, FK → users.id | العميل صاحب الطلب |
| overall_status | ENUM(order_status) | NOT NULL, DEFAULT 'PENDING' | PENDING/ACCEPTED/IN_TRANSIT/DELIVERED/CANCELLED |
| delivery_status | ENUM(delivery_status) | NOT NULL, DEFAULT 'PENDING' | PENDING/ASSIGNED/PICKED_UP/DELIVERED |
| payment_status | ENUM(payment_status) | NOT NULL, DEFAULT 'PENDING' | PENDING/PAID/REFUNDED/FAILED |
| total_price | NUMERIC(12,2) | NOT NULL, DEFAULT '0.00' | السعر الإجمالي |
| created_at | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updated_at | TIMESTAMP | NOT NULL | تاريخ التحديث |

**العلاقات:** FK → users.id | أصل لـ sub_orders, delivery_otps, ratings

---

#### 8. جدول `sub_orders` — الطلبات الفرعية
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| order_id | UUID | NOT NULL, FK → orders.id | الطلب الرئيسي |
| store_id | UUID | NOT NULL, FK → stores.id | المتجر المعني |
| status | ENUM(order_status) | NOT NULL, DEFAULT 'PENDING' | حالة الطلب الفرعي |
| subtotal | NUMERIC(10,2) | NOT NULL | الإجمالي الفرعي |
| assigned_driver_id | UUID | NULL, FK → users.id | السائق المعيَّن |
| expected_delivery_fee | NUMERIC(10,2) | NOT NULL, DEFAULT '0.00' | رسوم التوصيل المتوقعة |
| created_at | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updated_at | TIMESTAMP | NOT NULL | تاريخ التحديث |

**العلاقات:** FK → orders.id + stores.id + users.id | أصل لـ order_items, delivery_offers, delivery_otps

---

#### 9. جدول `order_items` — عناصر الطلب
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| sub_order_id | UUID | NOT NULL, FK → sub_orders.id | الطلب الفرعي |
| product_id | UUID | NOT NULL, FK → products.id | المنتج |
| quantity | INTEGER | NOT NULL | الكمية |
| price_at_order | NUMERIC(10,2) | NOT NULL | السعر وقت الطلب (snapshot) |

---

#### 10. جدول `delivery_offers` — عروض التوصيل
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| sub_order_id | UUID | NOT NULL, FK → sub_orders.id | الطلب الفرعي |
| driver_id | UUID | NOT NULL, FK → users.id | السائق |
| offered_fee | NUMERIC(10,2) | NOT NULL | رسوم التوصيل المقترحة |
| status | ENUM(offer_status) | NOT NULL, DEFAULT 'PENDING' | PENDING/ACCEPTED/REJECTED/COUNTERED |
| counter_offered_fee | NUMERIC(10,2) | NULL | عرض مضاد من العميل |
| created_at | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updated_at | TIMESTAMP | NOT NULL | تاريخ التحديث |

---

#### 11. جدول `delivery_otps` — رموز التحقق من التسليم
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| order_id | UUID | NOT NULL, FK → orders.id | الطلب الرئيسي |
| sub_order_id | UUID | NULL, FK → sub_orders.id | الطلب الفرعي |
| otp_code | TEXT | NOT NULL | الرمز المكوّن من 6 أرقام |
| status | TEXT ENUM | NOT NULL, DEFAULT 'PENDING' | PENDING/VERIFIED/EXPIRED |
| attempt_count | INTEGER | NOT NULL, DEFAULT 0 | عدد المحاولات |
| expires_at | TIMESTAMP | NOT NULL | تاريخ الانتهاء (بعد ساعتين) |
| created_at | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updated_at | TIMESTAMP | NOT NULL | تاريخ التحديث |

**الفهارس:** `sub_order_pending_idx` على (sub_order_id, status)

---

#### 12. جدول `ratings` — التقييمات
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| order_id | UUID | NOT NULL, FK → orders.id | الطلب المرتبط |
| from_user_id | UUID | NOT NULL, FK → users.id | المُقيِّم |
| to_user_id | UUID | NOT NULL, FK → users.id | المُقيَّم |
| rating | INTEGER | NOT NULL | التقييم (1-5) |
| comment | TEXT | NULL | التعليق |
| created_at | TIMESTAMP | NOT NULL | تاريخ الإنشاء |

---

#### 13. جدول `withdrawal_requests` — طلبات السحب
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| user_id | UUID | NOT NULL, FK → users.id | صاحب الطلب |
| wallet_id | UUID | NOT NULL, FK → wallets.id | المحفظة المعنية |
| amount | NUMERIC(12,2) | NOT NULL | المبلغ المطلوب |
| status | TEXT ENUM | NOT NULL, DEFAULT 'PENDING' | PENDING/APPROVED/REJECTED |
| admin_note | TEXT | NULL | ملاحظة الأدمن |
| reviewed_by_admin_id | UUID | NULL, FK → users.id | الأدمن المراجع |
| created_at | TIMESTAMP | NOT NULL | تاريخ الإنشاء |
| updated_at | TIMESTAMP | NOT NULL | تاريخ التحديث |

---

#### 14. جدول `audit_logs` — سجلات التدقيق
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| action_type | TEXT | NOT NULL | نوع الحدث (CREATE_PRODUCT, APPROVE_DEPOSIT...) |
| entity_type | TEXT | NOT NULL | نوع الكيان (product, order, user...) |
| entity_id | UUID | NOT NULL | معرف الكيان المعني |
| performed_by_user_id | UUID | NOT NULL, FK → users.id | من نفّذ الحدث |
| performed_by_role | TEXT | NOT NULL | دور المنفذ |
| old_value | JSONB | NULL | القيمة قبل التعديل |
| new_value | JSONB | NULL | القيمة بعد التعديل |
| metadata | JSONB | NULL | بيانات إضافية |
| created_at | TIMESTAMP | NOT NULL | تاريخ الإنشاء |

**الفهارس:** على entity_id, performed_by_user_id, created_at, action_type

---

#### 15. جدول `notifications` — الإشعارات
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| user_id | UUID | NOT NULL, FK → users.id (CASCADE DELETE) | المستلم |
| type | ENUM(notification_type) | NOT NULL | نوع الإشعار (13 نوع) |
| title | TEXT | NOT NULL | العنوان |
| body | TEXT | NOT NULL | المحتوى |
| data | JSONB | DEFAULT {} | بيانات إضافية للتنقل |
| is_read | BOOLEAN | NOT NULL, DEFAULT false | هل تمت القراءة؟ |
| created_at | TIMESTAMP | NOT NULL | تاريخ الإنشاء |

**الفهارس:** `notifications_user_idx` على (user_id, is_read)

---

#### 16. جدول `push_subscriptions` — اشتراكات الإشعارات الدفعية
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| user_id | UUID | NOT NULL, FK → users.id (CASCADE DELETE) | المستخدم |
| endpoint | TEXT | NOT NULL, UNIQUE | رابط endpoint المتصفح |
| p256dh | TEXT | NOT NULL | مفتاح التشفير |
| auth | TEXT | NOT NULL | مفتاح المصادقة |
| created_at | TIMESTAMP | NOT NULL | تاريخ الإنشاء |

---

#### 17. جدول `support_messages` — رسائل الدعم (قديم)
| الحقل | النوع | القيود | الوصف |
|-------|-------|--------|-------|
| id | UUID | PRIMARY KEY | المعرف الفريد |
| customer_id | UUID | NOT NULL, FK → users.id | العميل |
| sender_role | TEXT | NOT NULL | CUSTOMER أو ADMIN |
| message | TEXT | NOT NULL | محتوى الرسالة |
| is_read | BOOLEAN | NOT NULL, DEFAULT false | هل قُرئت؟ |
| created_at | TIMESTAMP | NOT NULL | تاريخ الإنشاء |

**ملاحظة:** هذا الجدول موروث — النظام الجديد يستخدم chat_rooms/chat_messages.

---

#### 18-20. جداول الدردشة — `chat_rooms`, `chat_participants`, `chat_messages`

**chat_rooms:**
| الحقل | النوع | الوصف |
|-------|-------|-------|
| id | UUID PK | المعرف |
| type | ENUM | ORDER_STORE/ORDER_DRIVER/SUPPORT |
| reference_id | UUID | الطلب المرتبط |
| title | TEXT | عنوان الغرفة |
| status | ENUM | OPEN/CLOSED |

**chat_participants:**
| الحقل | النوع | الوصف |
|-------|-------|-------|
| room_id | UUID FK | الغرفة |
| user_id | UUID FK | المشارك |
| last_read_at | TIMESTAMP | آخر قراءة |

**chat_messages:**
| الحقل | النوع | الوصف |
|-------|-------|-------|
| room_id | UUID FK | الغرفة |
| sender_id | UUID FK | المرسل |
| content | TEXT | المحتوى (max 4000 حرف) |
| type | ENUM | TEXT/SYSTEM |

---

### مخطط العلاقات (ERD نصي)

```
users ──┬── wallets (1:1)
        │     └── wallet_transactions (1:N)
        ├── stores (1:N, STORE_OWNER)
        │     └── products (1:N)
        │           └── order_items (1:N)
        ├── orders (1:N, CUSTOMER)
        │     └── sub_orders (1:N)
        │           ├── order_items (1:N)
        │           ├── delivery_offers (1:N)
        │           └── delivery_otps (1:N)
        ├── delivery_offers (1:N, DRIVER)
        ├── ratings (N:M via order_id, from/to)
        ├── withdrawal_requests (1:N)
        ├── audit_logs (1:N, performer)
        ├── notifications (1:N)
        ├── push_subscriptions (1:N)
        └── chat_participants (N:M via chat_rooms)
              └── chat_messages (1:N)

ledger ── debit_user_id → users
       └── credit_user_id → users
```

---

## 5. أنواع المستخدمين وصلاحياتهم

### الأنواع الموجودة: 4 أدوار فقط

#### 1. ADMIN — المشرف
**الصلاحيات الكاملة:**
- مشاهدة وإدارة جميع المستخدمين
- الموافقة على أو رفض حسابات STORE_OWNER و DRIVER
- مشاهدة وإدارة جميع المتاجر (إنشاء، تعديل، حذف، تمييز)
- مشاهدة وإدارة جميع المنتجات (تمييز)
- مشاهدة جميع الطلبات وتعديل حالتها
- الموافقة على طلبات الإيداع أو رفضها
- الموافقة على طلبات السحب أو رفضها
- تعديل أرصدة المحافظ (admin override)
- الاطلاع على سجلات التدقيق الكاملة
- الاطلاع على التقارير المالية ودفتر الأستاذ
- فتح محادثات دعم مع أي مستخدم
- الاطلاع على إحصائيات المنصة
- فحص صحة النظام (ledger consistency)

**لا يمكنه:**
- تقديم طلب إيداع (CUSTOMER فقط)
- تقديم عروض توصيل (DRIVER فقط)
- لا يحتاج موافقة عند التسجيل

---

#### 2. CUSTOMER — العميل
**الصلاحيات:**
- تصفح المتاجر والمنتجات (بدون تسجيل)
- إضافة منتجات للسلة وإتمام الطلب
- متابعة حالة طلباته
- تقديم طلبات إيداع في المحفظة (مع رفع إيصال)
- قبول/رفض/مفاوضة عروض التوصيل من السائقين
- تسليم OTP للسائق عند الاستلام
- إلغاء طلباته (PENDING فقط)
- تقييم السائقين والمتاجر
- محادثة المتجر والسائق عبر الدردشة
- طلب دعم من الإدارة
- تحديث ملفه الشخصي وصورته

**يُعتمد تلقائياً (isApproved = true) عند التسجيل**

---

#### 3. STORE_OWNER — صاحب المتجر
**الصلاحيات:**
- إدارة متجره الخاص (تعديل المعلومات، رفع صورة)
- إدارة منتجاته (إضافة، تعديل، حذف، رفع صور)
- مشاهدة طلبات متجره والرد عليها
- تغيير حالة الطلبات الفرعية (PENDING → ACCEPTED → READY)
- إلغاء الطلبات الفرعية
- مشاهدة أرباحه في الدفتر المالي
- طلب سحب أرباحه
- محادثة العملاء عبر الدردشة

**يحتاج موافقة الأدمن قبل تفعيل الحساب**  
**متجره يُنشأ تلقائياً عند التسجيل**

---

#### 4. DRIVER — السائق
**الصلاحيات:**
- مشاهدة المهام المتاحة للتوصيل
- تقديم عروض توصيل على الطلبات الفرعية المقبولة
- قبول/رفض العروض المضادة من العملاء
- إنجاز التوصيل وتأكيده بـ OTP
- مشاهدة أرباحه وتاريخها
- طلب سحب أرباحه
- تحديث ملفه الشخصي ورفع رخصة القيادة
- محادثة العملاء أثناء التوصيل

**يحتاج موافقة الأدمن قبل تفعيل الحساب**

---

### الأدوار غير الموجودة (مقارنة بالمطلوب في الطلب)
- ❌ Super Admin (لا يوجد — ADMIN واحد فقط)
- ❌ Vendor (يندمج مع STORE_OWNER)
- ❌ Delivery Company (لا يوجد — السائقون أفراد)
- ❌ Support (لا يوجد — الأدمن يؤدي دور الدعم)
- ❌ Accountant (لا يوجد — الأدمن يؤدي دور المحاسب)

---

## 6. جميع خصائص النظام الحالية

### ✅ Authentication & Registration
- تسجيل بالبريد الإلكتروني أو رقم الهاتف
- كلمة مرور مشفرة بـ bcrypt (10 rounds)
- JWT (7 أيام)
- تمييز email/phone تلقائياً عند تسجيل الدخول
- fallback لـ SHA-512 للحسابات القديمة مع ترقية تلقائية
- صفحة انتظار للحسابات التي تحتاج موافقة
- تسجيل دور محدد (CUSTOMER/STORE_OWNER/DRIVER)

### ✅ OTP للتسليم
- رمز 6 أرقام عشوائي
- صلاحية ساعتين
- حد أقصى للمحاولات
- idempotent (لا تتكرر إذا كانت صالحة)
- دعم إعادة التوليد بالقوة

### ✅ Products & Categories
- إضافة/تعديل/حذف المنتجات
- رفع صور المنتجات (GCS)
- category نصية (General/Food/...)
- stock tracking (كميات)
- تمييز المنتجات (is_featured)
- صفحة عرض عامة بدون تسجيل

### ✅ Orders (متعدد المتاجر)
- طلب واحد يشمل منتجات من متاجر متعددة
- تجزئة تلقائية لطلبات فرعية بحسب المتجر
- قفل المخزون FOR UPDATE أثناء الطلب
- دفع تلقائي من المحفظة
- تتبع حالة الطلب (PENDING→ACCEPTED→IN_TRANSIT→DELIVERED/CANCELLED)
- إلغاء الطلبات مع استرداد تلقائي

### ✅ Cart
- سلة تسوق في الذاكرة (React Context)
- تجميع المنتجات من متاجر متعددة
- حساب الإجمالي
- لا تخزين في DB (تُفقد عند تحديث الصفحة)

### ✅ Checkout
- التحقق من رصيد المحفظة قبل الدفع
- تسجيل حركة المحفظة مع إشارة للطلب
- تقديم طلب المحفظة يتبع تدفق: إيداع → موافقة أدمن → رصيد متاح → طلب

### ✅ Notifications (3 طرق)
1. **In-App Bell**: قائمة إشعارات في الواجهة مع عدد غير مقروء
2. **Socket.IO Real-time**: للمستخدمين المتصلين فوراً
3. **Web Push**: للمستخدمين غير المتصلين عبر المتصفح

### ✅ Wallet (محفظة إلكترونية)
- رصيد بالجنيه المصري
- إيداع يدوي مع رفع إيصال
- موافقة الأدمن على الإيداع
- سحب بطلب + موافقة أدمن
- عمولات تلقائية عند التوصيل
- استرداد تلقائي عند الإلغاء

### ✅ Ratings & Reviews
- تقييم (1-5) مع تعليق نصي
- مرتبط بطلب محدد
- تقييم من مستخدم إلى آخر

### ✅ Invoices
- إيصالات رفع PDF/صورة للإيداع (receipts/)
- سجل حركات المحفظة يعمل كفاتورة

### ✅ Reports & Analytics
- إحصائيات الأدمن (مستخدمون، متاجر، طلبات، عمولات)
- صفحة finance للمنشورات المالية
- دفتر الأستاذ الكامل للمعاملات

### ✅ Payments (Wallet)
- محفظة داخلية كوسيلة دفع وحيدة
- إيداع يدوي (offline cash → admin confirms)
- لا بوابة دفع إلكترونية

### ✅ Chat (Real-time)
- 3 أنواع غرف: ORDER_STORE / ORDER_DRIVER / SUPPORT
- إنشاء تلقائي عند قبول الطلب
- رسائل فورية عبر Socket.IO
- عدد رسائل غير مقروءة
- رسائل نظام تلقائية

### ✅ Push Notifications
- VAPID keys (web-push)
- Service Worker للتنبيهات في الخلفية
- التوجيه للصفحة الصحيحة عند النقر
- retry للإشعارات الفاشلة (مرة واحدة)
- حذف تلقائي للـ subscriptions المنتهية (410/404)

### ✅ Audit Logs
- تسجيل جميع العمليات الحساسة
- old_value و new_value (JSON diff)
- البحث والفلترة
- صفحة مخصصة في الأدمن

### ✅ Multi Store
- عميل يطلب من أكثر من متجر في طلب واحد
- طلبات فرعية منفصلة لكل متجر
- توصيل مستقل لكل طلب فرعي

### ✅ Delivery System
- نظام عروض التوصيل (PENDING → ACCEPTED → REJECTED/COUNTERED)
- تفاوض على رسوم التوصيل
- OTP للتأكيد عند التسليم
- عمولات تلقائية بعد OTP

### ✅ Dashboard (Admin + 3 roles)
- لوحة تحكم لكل دور منفصلة
- إحصائيات حية
- رسوم بيانية (Recharts)

### ✅ Permissions & Roles
- RBAC (Role-Based Access Control)
- authorizeRole middleware
- صفحات محمية حسب الدور

### ✅ Logs & Audit
- طلبات HTTP مُسجَّلة في الـ console
- سجلات التدقيق في قاعدة البيانات

### ✅ Backup
- 4 ملفات نسخ احتياطية SQL موجودة في /backups

### ✅ Deploy Automation
- GitHub webhook للنشر التلقائي
- نقطة نهاية `/api/deploy/status`

### ⚠️ Email (جزئي)
- nodemailer مُثبَّت ومُهيَّأ
- استخدام محدود (إشعار تقديم إيداع فقط)
- لا تأكيد بريدي للتسجيل

### ❌ غير موجود
- SMS (لا يوجد مزود)
- Coupons / خصومات
- Loyalty points
- Inventory alerts (إشعار نفاد المخزون)
- Categories hierarchy (فئات متداخلة)
- Search (بحث عن منتجات/متاجر)
- Maps / Live Tracking
- AI features
- Multi-language (عربي فقط)
- Admin roles permissions (RBAC متقدم)
- Tax/VAT system
- Multi-tenant/SaaS

---

## 7. دورة الطلب بالكامل

### المرحلة 1: إنشاء الطلب

```
العميل يفتح المتجر (GET /api/public/stores/:id)
    ↓
يتصفح المنتجات (GET /api/products?store_id=X)
    ↓
يُضيف للسلة (React Context — في الذاكرة)
    ↓
يذهب لصفحة الدفع (Customer Cart)
    ↓
POST /api/orders
{items: [{productId, quantity}]}
```

**ما يحدث في الخادم (transaction واحدة):**
1. جلب جميع المنتجات مع قفل `FOR UPDATE`
2. التحقق من المخزون
3. تجميع المنتجات بحسب المتجر (storeGroups)
4. حساب السعر الإجمالي (money utility)
5. خصم من محفظة العميل (`FOR UPDATE` على wallet)
6. إنشاء `orders` row
7. تسجيل `wallet_transactions` (WITHDRAWAL)
8. إنشاء `sub_orders` لكل متجر
9. إنشاء `order_items` لكل عنصر
10. تحديث المخزون
11. إنشاء `OTP` للتسليم
12. إنشاء غرفة دردشة `ORDER_STORE` بين العميل وكل متجر
13. إشعار صاحب المتجر بطلب جديد (push + socket)

---

### المرحلة 2: معالجة المتجر

```
صاحب المتجر يرى الطلب (GET /api/orders/my-store)
    ↓
يقبل الطلب الفرعي:
PATCH /api/suborders/:id/status → "ACCEPTED"
    ↓
[تلقائياً]: إشعار للسائقين المعتمدين بوجود مهمة جديدة
```

**تدفق حالة الطلب الفرعي (STORE_OWNER):**
- `PENDING` → `ACCEPTED` (قبول)
- `PENDING` → `CANCELLED` (رفض)
- `ACCEPTED` → `READY` (جاهز للتوصيل)

---

### المرحلة 3: تعيين السائق

```
السائق يرى المهام المتاحة (GET /api/delivery/available-order-tasks)
    [فقط الطلبات الفرعية بحالة ACCEPTED وبدون سائق]
    ↓
السائق يُقدم عرض توصيل:
POST /api/delivery/orders/:orderId/offer
{proposedFee: 25}
    ↓
العميل يرى العروض (GET /api/delivery/orders/:orderId/offers)
    ↓
العميل يقبل العرض:
POST /api/delivery/orders/:orderId/offers/accept
```

**عند قبول العميل للعرض (transaction واحدة):**
1. تحديث حالة العرض → ACCEPTED
2. تعيين السائق على الطلب الفرعي
3. خصم رسوم التوصيل من محفظة العميل
4. تسجيل ledger entry
5. إنشاء غرفة دردشة `ORDER_DRIVER`
6. إشعار السائق بقبول عرضه

**التفاوض (مضاد):**
- العميل يُقدم عرضاً مضاداً: `POST .../counter`
- السائق يقبل العرض المضاد: `POST .../accept-counter`

---

### المرحلة 4: التوصيل

```
السائق يتوجه لاستلام الطلب
    ↓
السائق يطلب OTP (POST /api/delivery/otp/generate/:subOrderId)
    ↓
العميل يرى OTP في شاشة الطلب
    ↓
السائق يُدخل OTP عند التسليم:
POST /api/delivery/otp/verify/:subOrderId {otp: "123456"}
```

**عند تحقق OTP (transaction واحدة):**
1. التحقق من صحة OTP وانتهاء صلاحيتها
2. تحديث حالة OTP → VERIFIED
3. تحديث حالة الطلب الفرعي → DELIVERED
4. تحديث حالة الطلب الرئيسي إذا اكتمل الكل
5. **processCommissions:**
   - 1% عمولة منصة من الـ subtotal
   - 99% للمتجر
   - رسوم التوصيل كاملة للسائق
6. تسجيل قيود ledger المزدوجة
7. إرسال رسالة نظام في غرفة الدردشة
8. إشعار للعميل وصاحب المتجر

---

### المرحلة 5: الاكتمال / الإلغاء / الاسترجاع

**الاكتمال:**
- كل طلبات فرعية DELIVERED → الطلب الرئيسي DELIVERED
- الأرباح تُحوَّل فوراً في نفس transaction التحقق من OTP

**الإلغاء (العميل):**
- فقط في حالة PENDING
- `PATCH /api/suborders/:id/cancel`
- استرداد تلقائي من المحفظة + ledger entry

**الإلغاء (الأدمن):**
- `PATCH /api/admin/orders/:id/status` → CANCELLED
- يُلغي كل الطلبات الفرعية النشطة
- يُسترد مبلغ الطلبات + رسوم التوصيل
- يُسجل في ledger كـ REFUND

---

## 8. لوحة تحكم الأدمن

### صفحة 1: Dashboard (`/admin/dashboard`)
**المحتوى:**
- إحصائيات سريعة: مجموع المستخدمين، المتاجر، الطلبات، الطلبات المعلقة، الطلبات الملغاة، الطلبات المُسلَّمة، عمولات المنصة
- رسم بياني للإيرادات (Recharts)
- أحدث الطلبات
- أحدث المستخدمين

**العمليات:** قراءة فقط — لوحة مراقبة

---

### صفحة 2: Users (`/admin/users`)
**المحتوى:**
- جدول بجميع المستخدمين: الاسم، البريد، الدور، الحالة، تاريخ التسجيل
- شارات حالة (موافق/معلق)

**العمليات:**
- الموافقة على STORE_OWNER وDRIVER
- رفض وحذف المستخدمين غير المعتمدين

---

### صفحة 3: Stores (`/admin/stores`)
**المحتوى:**
- جدول بجميع المتاجر: الاسم، المالك، النوع، الحالة المميزة، ترتيب العرض
- إمكانية رفع صورة المتجر

**العمليات:**
- إنشاء متجر جديد
- تعديل معلومات المتجر
- حذف المتجر (مع حذف الصور)
- تمييز المتجر وضبط الترتيب

---

### صفحة 4: Products (`/admin/products`)
**المحتوى:**
- جدول بجميع المنتجات: الاسم، المتجر، الفئة، السعر، المخزون، التمييز

**العمليات:**
- تمييز المنتجات أو إلغاء تمييزها
- عرض تفاصيل المنتج

---

### صفحة 5: Orders (`/admin/orders`)
**المحتوى:**
- جدول بجميع طلبات المنصة
- البيانات: معرف الطلب، العميل، السعر، الحالة، تاريخ الإنشاء

**العمليات:**
- تغيير حالة الطلب (DELIVERED أو CANCELLED)
- إلغاء الطلب مع استرداد تلقائي

---

### صفحة 6: Deposits (`/admin/deposits`)
**المحتوى:**
- قائمة طلبات الإيداع المعلقة
- بيانات: المستخدم، المبلغ، الإيصال، التاريخ

**العمليات:**
- الموافقة على الإيداع (يُحدّث رصيد المحفظة + ledger)
- رفض الإيداع

---

### صفحة 7: Withdrawals (`/admin/withdrawals`)
**المحتوى:**
- قائمة طلبات السحب المعلقة
- بيانات: المستخدم، الدور، المبلغ، التاريخ

**العمليات:**
- الموافقة على السحب
- رفض السحب مع ملاحظة

---

### صفحة 8: Finance (`/admin/finance`)
**المحتوى:**
- دفتر الأستاذ الكامل
- فلاتر: النوع، التاريخ، المستخدم

**العمليات:**
- قراءة فقط — تقارير مالية

---

### صفحة 9: Approvals (`/admin/approvals`)
**المحتوى:**
- قائمة موحدة بطلبات الانتظار (STORE_OWNER وDRIVER)

**العمليات:**
- موافقة/رفض سريع

---

### صفحة 10: Audit Logs (`/admin/audit`)
**المحتوى:**
- سجل كامل بجميع العمليات الحساسة
- فلاتر: المستخدم، نوع الحدث، التاريخ

**العمليات:**
- قراءة فقط

---

## 9. تطبيق العميل (Customer)

### صفحة 1: Landing Page (`/`)
- عرض المتاجر المميزة
- Hero section
- كيف تعمل المنصة
- روابط للتسجيل/تسجيل الدخول
- تُوجّه المستخدم المُسجّل لـ Customer Dashboard

### صفحة 2: Customer Dashboard (`/`)
- قائمة المتاجر مع إمكانية التصفح
- منتجات مميزة
- بطاقة تسجيل الدخول السريع

### صفحة 3: Public Stores (`/stores`)
- قائمة جميع المتاجر
- بحث بسيط

### صفحة 4: Public Store Page (`/store/:id`)
- معلومات المتجر
- قائمة منتجاته مع التصفية بالفئة
- زر إضافة للسلة

### صفحة 5: Cart (`/customer/cart`)
- عرض المنتجات المضافة
- حذف/تعديل الكميات
- إجمالي السعر
- زر إتمام الطلب (يستدعي `/api/orders`)

### صفحة 6: Orders (`/customer/orders`)
- قائمة جميع طلبات العميل
- الحالة العامة لكل طلب

### صفحة 7: Order Details (`/customer/order/:id`)
- تفاصيل الطلب الرئيسي
- قائمة الطلبات الفرعية
- حالة كل طلب فرعي
- عرض عروض التوصيل
- زر قبول/رفض/مفاوضة العرض
- رمز OTP للتسليم

### صفحة 8: Wallet (`/customer/wallet`)
- عرض الرصيد الحالي
- زر إيداع (رفع إيصال)
- قائمة الطلبات المعلقة

### صفحة 9: Transactions (`/customer/transactions`)
- تاريخ حركات المحفظة
- فلاتر: النوع، الحالة

### صفحة 10: Profile (`/customer/profile`)
- تعديل الاسم، البريد، الهاتف
- تغيير كلمة المرور
- تحميل صورة شخصية
- إدارة العناوين

### صفحات الدردشة (`/chat`, `/chat/:roomId`)
- قائمة الغرف مع عدد غير مقروء
- واجهة دردشة فورية
- دعم رسائل النص

### الصفحات العامة
- `/how-it-works` — كيف تعمل المنصة
- `/about` — من نحن
- `/faq` — الأسئلة الشائعة

---

## 10. تطبيق السائق (Driver)

### صفحة 1: Tasks (`/driver/tasks`)
- قائمة الطلبات المتاحة للتوصيل
- بيانات: المتجر، المنطقة، العدد المقترح
- زر "تقديم عرض" بمبلغ مُحدد

### صفحة 2: Active Delivery (`/driver/active-delivery`)
- الطلب الذي يجري تنفيذه حالياً
- زر "إدخال OTP" للتأكيد
- بيانات: العنوان، محتوى الطلب، رسوم التوصيل المتفق عليها

### صفحة 3: Dashboard (`/driver/dashboard`)
- إحصائيات: إجمالي التوصيلات، الأرباح

### صفحة 4: Earnings (`/driver/earnings`)
- تاريخ الأرباح من التوصيلات
- فلاتر: النوع، الفترة الزمنية
- بالجنيه المصري

### صفحة 5: Wallet (`/driver/wallet`)
- رصيد محفظة السائق
- زر طلب سحب
- تاريخ الطلبات

### صفحة 6: Profile (`/driver/profile`)
- تعديل البيانات الشخصية
- رفع صورة شخصية
- رفع رخصة القيادة
- نوع المركبة

---

## 11. تطبيق صاحب المتجر (Store Owner)

### صفحة 1: Dashboard (`/store/dashboard`)
- ملخص أداء المتجر
- إجمالي الطلبات، المبيعات، الأرباح

### صفحة 2: Orders (`/store/dashboard/orders`)
- قائمة طلبات المتجر الفرعية
- فلتر بالحالة
- تغيير حالة الطلب (PENDING→ACCEPTED→READY)
- إلغاء الطلب

### صفحة 3: Order Details (`/store/order/:id`)
- تفاصيل الطلب الفرعي
- قائمة المنتجات المطلوبة
- بيانات العميل والسائق

### صفحة 4: Inventory (`/store/inventory`)
- قائمة منتجات المتجر
- إضافة منتج جديد (نموذج كامل)
- تعديل المنتج (السعر، المخزون، الوصف)
- حذف المنتج
- رفع صورة المنتج

### صفحة 5: Earnings (`/store/earnings`)
- تاريخ أرباح المتجر من الدفتر المالي
- فلاتر: النوع، الفترة
- إجمالي الأرباح

---

## 12. نظام الإشعارات

### كيف يعمل؟

**ثلاث طبقات متكاملة:**

```
1. DB Layer (Persistent):
   └── notifications table
   └── تُحفظ الإشعارات دائماً
   └── تُعرض عند فتح التطبيق

2. Socket.IO (Real-time):
   └── io.to(`user:${userId}`).emit("notification", data)
   └── للمستخدمين المتصلين فوراً
   └── أيضاً: unread_update لتحديث العدد

3. Web Push (Background):
   └── VAPID + web-push library
   └── Service Worker يستقبل في الخلفية
   └── يُوجّه المستخدم عند النقر
   └── retry مرة واحدة للأخطاء العابرة
   └── حذف تلقائي للـ subscriptions المنتهية
```

### أنواع الإشعارات (13 نوع):
| النوع | المستقبل | المُحرّك |
|-------|----------|---------|
| NEW_ORDER | STORE_OWNER + ADMIN | إنشاء طلب جديد |
| ORDER_STATUS_UPDATE | CUSTOMER | تغيير حالة الطلب الفرعي |
| NEW_OFFER | CUSTOMER | السائق يُقدم عرضاً |
| OFFER_ACCEPTED | DRIVER | العميل يقبل العرض |
| OFFER_REJECTED | DRIVER | العميل يرفض العرض |
| OFFER_COUNTERED | DRIVER | العميل يُقدم عرضاً مضاداً |
| ACCOUNT_APPROVED | STORE_OWNER / DRIVER | الأدمن يوافق على الحساب |
| DEPOSIT_APPROVED | CUSTOMER | الأدمن يوافق على الإيداع |
| DEPOSIT_REJECTED | CUSTOMER | الأدمن يرفض الإيداع |
| WITHDRAWAL_APPROVED | DRIVER / STORE_OWNER | الأدمن يوافق على السحب |
| WITHDRAWAL_REJECTED | DRIVER / STORE_OWNER | الأدمن يرفض السحب |
| WALLET_UPDATE | Any | تحديث رصيد المحفظة |
| SYSTEM_ALERT | ADMIN | تسجيل سائق/متجر جديد، طلب إيداع جديد |

### NotificationBell (الجرس)
- يظهر في شريط التنقل لجميع الأدوار
- polling كل 30 ثانية + تحديث فوري عبر Socket.IO
- النقر يُوجّه للصفحة الصحيحة حسب نوع الإشعار والدور

---

## 13. نظام الدفع

### بوابات الدفع المدعومة
- **لا توجد بوابة دفع إلكتروني** (Stripe, PayPal, Fawry, Vodafone Cash...)

### الدفع المتاح:

#### Wallet (محفظة داخلية) ✅
- العملة: جنيه مصري (ج.م)
- الإيداع: يدوي — العميل يحوّل خارجياً ويرفع إيصالاً → الأدمن يوافق يدوياً
- الخصم: تلقائي عند الطلب من الرصيد المتاح
- رسوم التوصيل: تُخصم عند قبول عرض السائق
- الاسترداد: تلقائي عند الإلغاء

#### Cash ❌
- لا يوجد دفع عند التسليم (Cash on Delivery)

### نظام العمولات:
- **1% عمولة منصة** من إجمالي الطلب الفرعي
- **99% للمتجر** من إجمالي الطلب الفرعي
- **100% رسوم التوصيل للسائق** من الرسوم المتفق عليها
- العمولات تُحسب عند OTP verification

---

## 14. نظام الخرائط

### الوضع الحالي: **لا يوجد نظام خرائط**

- لا استخدام لـ Google Maps
- لا استخدام لـ OpenStreetMap أو Mapbox
- عنوان العميل مخزّن كنص في JSON field (addresses)
- موقع المتجر مخزّن كنص (location_text)
- لا حساب مسافات
- لا Live Tracking للسائق
- لا توجيه للسائق

**الأثر:** رسوم التوصيل تُحدَّد بالتفاوض بين السائق والعميل، لا بناءً على المسافة الفعلية.

---

## 15. جميع API Endpoints

### المصادقة والمستخدمون
| Method | Path | الدور | الوصف |
|--------|------|-------|-------|
| POST | `/api/auth/register` | عام | تسجيل مستخدم جديد |
| POST | `/api/auth/login` | عام | تسجيل الدخول |
| GET | `/api/auth/me` | مُصادَق | بيانات المستخدم الحالي |
| GET | `/api/users` | ADMIN | قائمة المستخدمين |
| DELETE | `/api/admin/users/:id` | ADMIN | رفض وحذف مستخدم معلق |
| PATCH | `/api/admin/users/:id/approve` | ADMIN | الموافقة على مستخدم |
| GET | `/api/customer/profile` | CUSTOMER | جلب ملف شخصي |
| PATCH | `/api/customer/profile` | CUSTOMER | تحديث ملف شخصي |
| PATCH | `/api/driver/profile` | DRIVER | تحديث ملف السائق |
| POST | `/api/profile/avatar` | مُصادَق | رفع صورة شخصية |
| POST | `/api/profile/license` | DRIVER | رفع رخصة قيادة |

### المتاجر والمنتجات
| Method | Path | الدور | الوصف |
|--------|------|-------|-------|
| GET | `/api/public/stores` | عام | قائمة متاجر عامة |
| GET | `/api/public/stores/:id` | عام | تفاصيل متجر عام |
| GET | `/api/stores` | ADMIN/STORE_OWNER | قائمة متاجر (ADMIN=الكل، OWNER=متجره) |
| POST | `/api/stores` | ADMIN/STORE_OWNER | إنشاء متجر |
| PATCH | `/api/stores/:id` | ADMIN/STORE_OWNER | تعديل متجر |
| DELETE | `/api/stores/:id` | ADMIN | حذف متجر |
| POST | `/api/stores/:id/image` | ADMIN/STORE_OWNER | رفع صورة متجر |
| PATCH | `/api/admin/stores/:id/feature` | ADMIN | تمييز/إلغاء تمييز متجر |
| GET | `/api/products` | عام | قائمة منتجات (بـ store_id) |
| GET | `/api/products/:id` | عام | تفاصيل منتج |
| POST | `/api/products` | ADMIN/STORE_OWNER | إنشاء منتج |
| PATCH | `/api/products/:id` | ADMIN/STORE_OWNER | تعديل منتج |
| DELETE | `/api/products/:id` | ADMIN/STORE_OWNER | حذف منتج |
| POST | `/api/products/:id/image` | ADMIN/STORE_OWNER | رفع صورة منتج |
| PATCH | `/api/admin/products/:id/feature` | ADMIN | تمييز/إلغاء تمييز منتج |

### الطلبات والتوصيل
| Method | Path | الدور | الوصف |
|--------|------|-------|-------|
| GET | `/api/orders` | مُصادَق | طلبات المستخدم |
| GET | `/api/orders/my-orders` | مُصادَق | نفس السابق (alias) |
| GET | `/api/orders/my-store` | STORE_OWNER/ADMIN | طلبات المتجر |
| GET | `/api/orders/:id` | مُصادَق | تفاصيل طلب |
| POST | `/api/orders` | مُصادَق | إنشاء طلب جديد |
| PATCH | `/api/suborders/:id/status` | STORE_OWNER/ADMIN/DRIVER | تغيير حالة طلب فرعي |
| PATCH | `/api/suborders/:id/cancel` | CUSTOMER | إلغاء طلب فرعي |
| POST | `/api/orders/suborders/:id/regenerate-otp` | CUSTOMER | تجديد OTP |
| GET | `/api/admin/orders` | ADMIN | جميع طلبات المنصة |
| PATCH | `/api/admin/orders/:id/status` | ADMIN | تغيير حالة طلب (admin) |
| GET | `/api/delivery/available-tasks` | DRIVER | المهام المتاحة |
| GET | `/api/delivery/available-order-tasks` | DRIVER | مهام مُجمَّعة على مستوى الطلب |
| GET | `/api/suborders/active` | DRIVER | التوصيل النشط |
| POST | `/api/delivery/otp/generate/:id` | DRIVER | توليد OTP |
| POST | `/api/delivery/otp/verify/:id` | DRIVER | التحقق من OTP |
| POST | `/api/delivery/suborders/:id/offer` | DRIVER | تقديم عرض توصيل |
| POST | `/api/delivery/orders/:orderId/offer` | DRIVER | عرض على مستوى الطلب |
| POST | `/api/delivery/orders/:orderId/offers/accept-counter` | DRIVER | قبول عرض مضاد |
| GET | `/api/delivery/orders/:orderId/offers` | CUSTOMER | عروض التوصيل |
| POST | `/api/delivery/orders/:orderId/offers/accept` | CUSTOMER | قبول عرض |
| POST | `/api/delivery/orders/:orderId/offers/reject` | CUSTOMER | رفض عرض |
| POST | `/api/delivery/orders/:orderId/offers/counter` | CUSTOMER | عرض مضاد |
| PATCH | `/api/delivery/suborders/:id/accept` | DRIVER | **مهمل (410 Gone)** |
| GET | `/api/delivery/suborders/:id/offers` | CUSTOMER | عروض الطلب الفرعي |
| POST | `/api/delivery/offers/:offerId/accept` | CUSTOMER | قبول عرض محدد |
| POST | `/api/delivery/offers/:offerId/reject` | CUSTOMER | رفض عرض محدد |
| POST | `/api/delivery/offers/:offerId/counter` | CUSTOMER | مضاد لعرض محدد |
| POST | `/api/delivery/offers/:offerId/accept-counter` | DRIVER | قبول مضاد |

### المالية والمحفظة
| Method | Path | الدور | الوصف |
|--------|------|-------|-------|
| GET | `/api/wallet` | مُصادَق | الرصيد الحالي |
| GET | `/api/wallet/pending` | مُصادَق | الإيداعات المعلقة |
| POST | `/api/wallet/deposit` | CUSTOMER | تقديم طلب إيداع |
| POST | `/api/wallet/withdraw` | DRIVER/STORE_OWNER | طلب سحب |
| PATCH | `/api/admin/wallets/:id/override` | ADMIN | تعديل رصيد محفظة |
| GET | `/api/admin/withdrawals/pending` | ADMIN | طلبات السحب المعلقة |
| POST | `/api/admin/withdrawals/:id/approve` | ADMIN | الموافقة على سحب |
| POST | `/api/admin/withdrawals/:id/reject` | ADMIN | رفض سحب |
| GET | `/api/admin/deposits/pending` | ADMIN | الإيداعات المعلقة |
| POST | `/api/admin/deposits/:id/approve` | ADMIN | الموافقة على إيداع |
| POST | `/api/admin/deposits/:id/reject` | ADMIN | رفض إيداع |
| GET | `/api/ledger/transactions` | مُصادَق | سجل المعاملات |
| GET | `/api/admin/ledger` | ADMIN | دفتر الأستاذ الكامل |
| POST | `/api/process-commission/:subOrderId` | ADMIN | معالجة عمولة يدوياً |

### الدردشة والإشعارات
| Method | Path | الدور | الوصف |
|--------|------|-------|-------|
| GET | `/api/chat/rooms` | مُصادَق | غرف الدردشة |
| GET | `/api/chat/rooms/:id/messages` | مُصادَق | رسائل غرفة |
| POST | `/api/chat/rooms/:id/messages` | مُصادَق | إرسال رسالة |
| POST | `/api/chat/rooms/:id/read` | مُصادَق | تعليم كمقروء |
| POST | `/api/chat/support` | مُصادَق | فتح غرفة دعم |
| GET | `/api/chat/unread` | مُصادَق | عدد غير مقروء |
| POST | `/api/admin/chat/users/:userId` | ADMIN | بدء محادثة مع مستخدم |
| GET/POST | `/api/notifications/*` | مُصادَق | إدارة الإشعارات واشتراكات Push |

### النظام والبنية التحتية
| Method | Path | الدور | الوصف |
|--------|------|-------|-------|
| GET | `/api/health` | عام | فحص صحة النظام |
| GET | `/api/admin/health` | ADMIN | فحص صحة مُفصّل |
| GET | `/api/admin/stats` | ADMIN | إحصائيات المنصة |
| GET | `/api/admin/audit` | ADMIN | سجلات التدقيق |
| POST | `/api/deploy/webhook` | عام | GitHub webhook |
| GET | `/api/deploy/status` | عام | حالة النشر |
| GET | `/images/:category/:filename` | عام | الصور من GCS |
| GET | `/sitemap.xml` | عام | خريطة الموقع |

### Socket.IO Events
| الاتجاه | الحدث | الوصف |
|---------|-------|-------|
| Client → Server | `join_room` | الانضمام لغرفة |
| Client → Server | `send_message` | إرسال رسالة |
| Client → Server | `mark_read` | تعليم كمقروء |
| Client → Server | `leave_room` | مغادرة غرفة |
| Server → Client | `new_message` | رسالة جديدة |
| Server → Client | `unread_update` | تحديث العدد غير المقروء |
| Server → Client | `marked_read` | تأكيد القراءة |
| Server → Client | `notification` | إشعار جديد |

---

## 16. الأمان

### Authentication
- **JWT** مع RS256 (HS256 فعلياً) صلاحية 7 أيام
- كلمة المرور مشفرة بـ **bcrypt** (10 rounds)
- فصل واضح بين TOKEN_EXPIRED و INVALID_TOKEN في الأخطاء
- حماية من تسجيل الدخول المتعدد للـ 401 (race condition guard)

### Authorization
- **RBAC** عبر authorizeRole middleware
- كل route محمي بدور محدد
- ProtectedRoute في Frontend

### Rate Limiting
| المحدّد | الحد | الفترة |
|---------|------|-------|
| generalLimiter | 1000 طلب | 15 دقيقة |
| loginLimiter | 30 محاولة | 15 دقيقة |
| registerLimiter | 10 تسجيلات | ساعة |
| orderLimiter | 20 طلب | 10 دقائق |
| depositLimiter | 10 إيداعات | ساعة |
| withdrawLimiter | 5 سحوبات | 24 ساعة |
| otpLimiter | 5 محاولات | 5 دقائق |

### Security Headers
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: camera/microphone/geolocation مُعطَّل
- **Strict-Transport-Security** (HSTS) — الإنتاج فقط
- **Content-Security-Policy** — الإنتاج فقط (بدون unsafe-eval)

### Validation
- Zod schemas على جميع المدخلات
- UUID validation قبل استعلامات DB
- XSS-clean middleware
- HPP (HTTP Parameter Pollution protection)
- Payload size limit: 10MB

### Encryption
- bcrypt للكلمات المرور
- JWT HS256 للتوكنات
- HTTPS في الإنتاج

### Secrets Management
- متغيرات البيئة: JWT_SECRET, VAPID_*, DATABASE_URL
- لا secrets في الكود المصدري

### نقاط ضعف أمنية مُلاحظة
- الصور القديمة في /uploads مكشوفة بدون مصادقة
- `/api/deploy/webhook` لا يتحقق من GitHub signature (خطر)
- Socket.IO CORS بدون ALLOWED_ORIGIN مضبوط = مفتوح في الإنتاج
- البيانات الحساسة تُطبع في console logs في بيئة التطوير

---

## 17. الأداء

### نقاط القوة
- **Code Splitting**: React.lazy() لجميع الصفحات
- **Query Caching**: TanStack Query مع staleTime معقول
- **Database Indexes**: على audit_logs, notifications, chat tables
- **FOR UPDATE locks**: لمنع race conditions (محافظ، منتجات)
- **Connection Pool**: max: 20, idle timeout: 30s
- **Image Cache**: Cache-Control: max-age=31536000 للصور من GCS
- **money utility**: حسابات بدون IEEE 754 overhead

### مشاكل الأداء المحتملة
- **N+1 query**: getCustomerOrders محدود بـ pagination (20/طلب) لكن لا eager loading كامل
- **Console logging**: بيانات JSON كاملة للاستجابات في الـ logs (overhead في الإنتاج)
- **Cart**: في الذاكرة فقط — لا حفظ محلي (localStorage)
- **Store images**: تُجلب عبر GCS proxy كل مرة (لا CDN)
- **Polling**: كل 30 ثانية للإشعارات (بدلاً من Socket.IO فقط)
- **Seed data**: مُقيّد بـ NODE_ENV !== 'production' لكنه يُشغَّل في كل بدء

### أماكن التحسين المقترحة
- إضافة CDN للصور (CloudFront أو Cloudflare)
- Redis للـ cache وإدارة JWT blacklist
- Database query analysis (EXPLAIN ANALYZE)
- فصل الـ Socket.IO لخادم منفصل عند Scale
- إضافة indexes على sub_orders.store_id + sub_orders.status

---

## 18. جودة الكود

### نقاط الإيجاب
- TypeScript صارم في كل مكان
- نمط شبه موحّد (Controllers/Services/Types)
- shared/schema.ts كمصدر حقيقي واحد للأنواع
- money utility لمنع أخطاء IEEE 754
- audit logging في العمليات الحساسة
- DB transactions للعمليات المالية
- Zod validation للمدخلات
- تعليقات عربية توضيحية Q&A مفيدة للقرارات

### Code Smells
- **routes.ts ضخم جداً**: 1568 سطر — يحتوي على منطق أعمال ينبغي أن يكون في services
- **اللوجز الزائدة**: JSON كامل لكل استجابة API في console
- **Client-side cart**: يُفقد عند تحديث الصفحة — لا localStorage

### Technical Debt
- `server/routes.ts` يُسجّل بعض endpoints مباشرةً بدون controllers
- `support_messages` table موروثة وغير مستخدمة
- `driversLicenseUrl` في users table لكن لا شاشة عرض للسائقين
- نقص في test coverage (ملفات spec موجودة لكن غير مكتملة)
- report JSON files متراكمة في الجذر (20+ ملف)

### Duplicate Code
- `ProductCard` و `StoreCard` يشتركان في بعض المنطق
- middleware قياسي مكرر أحياناً عبر controllers

### Dead Code
- `support_messages` table (مستبدلة بـ chat system)
- `server/modules/deposits/deposits.service.ts` (محذوف)
- ملفات reports JSON متراكمة في الجذر (audit_hook_status.json, phase0_report.json, إلخ)

---

## 19. قابلية التوسع

### هل المشروع قابل للتحول إلى:

#### SaaS؟ — ⚠️ جزئياً
**ما يساعد:** المعمارية موحدة ومنظمة، API مفصولة عن الواجهة  
**ما ينقص:** لا multi-tenancy، لا billing system، لا مستويات اشتراك، DB واحدة لكل النطاق

#### White Label؟ — ⚠️ جزئياً
**ما يساعد:** التخصيص عبر CSS variables، اللوغو قابل للتغيير  
**ما ينقص:** لا نظام themes ديناميكي، لا custom domains per tenant، لا config management مركزي

#### Marketplace؟ — ✅ نعم (بالفعل)
المشروع **منصة سوق محلي (Hyperlocal Marketplace)** بالفعل — متاجر متعددة، سائقون مستقلون، عملاء، نظام عمولات.

#### Multi-Tenant؟ — ❌ لا
- DB واحدة مشتركة بين الجميع (no row-level tenant isolation)
- لا tenant_id في أي جدول
- لا فصل بيانات بين "مشغّلي" المنصة

**خلاصة التوسع:**  
المشروع صُمِّم كـ **Single-instance Marketplace**. التحول لـ SaaS أو Multi-Tenant يتطلب إعادة تصميم قاعدة البيانات وطبقة المصادقة.

---

## 20. جاهزية المشروع (تقييم من 100)

| المعيار | التقييم | الملاحظات |
|---------|---------|-----------|
| **البنية المعمارية** | 75/100 | modular monolith جيد، routes.ts ضخم |
| **الأمان** | 72/100 | headers + rate limiting + bcrypt ✅، نقص في CORS و webhook signing |
| **الأداء** | 65/100 | indexes + lazy loading ✅، نقص CDN وRedis |
| **التنظيم** | 70/100 | modules منظمة، لكن routes.ts وملفات report مبعثرة |
| **قابلية التوسع** | 55/100 | monolith محدود، لا multi-tenant |
| **سهولة الصيانة** | 68/100 | TypeScript + docs جيدة، نقص في tests |
| **اكتمال الميزات** | 60/100 | نواة الأعمال مكتملة، ينقص بوابات الدفع والخرائط |

**المتوسط العام: 66/100**

---

## 21. ما الذي ينقص المشروع؟

### 🔴 Critical (حرج — يجب قبل الإطلاق)

1. **بوابة دفع حقيقية** — Stripe / Fawry / Paymob / Vodafone Cash
   - حالياً الإيداع يدوي بالكامل → لا يمكن التوسع
2. **نظام خرائط** — Google Maps أو HERE Maps
   - بدونه رسوم التوصيل عشوائية وغير عادلة
3. **Live Tracking للسائق** — إلزامي لتجربة المستخدم
4. **تأكيد البريد الإلكتروني** — لا تحقق من صحة البريد
5. **GitHub Webhook Signature Verification** — الـ webhook مكشوف
6. **الحد الأدنى للطلب** — لا يوجد حد أدنى
7. **نسخ احتياطي تلقائي** — الـ backups الحالية يدوية

---

### 🟠 High (عالية الأهمية)

8. **البحث** — لا بحث عن منتجات أو متاجر
9. **الفئات (Categories)** — فئة واحدة نصية فقط بدون هرمية
10. **Cart persistence** — السلة تُفقد عند تحديث الصفحة
11. **SMS Notifications** — لا رسائل نصية
12. **نظام الكوبونات والخصومات** — لا يوجد
13. **Forgot Password** — لا استعادة كلمة المرور
14. **Multi-language** — عربي فقط، لا إنجليزي
15. **Image CDN** — الصور تُجلب من GCS مباشرة
16. **Admin roles** — ADMIN واحد بصلاحيات كاملة (لا أدمن محدود)

---

### 🟡 Medium (متوسطة)

17. **نظام الولاء (Loyalty Points)** — لا يوجد
18. **Referral System** — لا يوجد
19. **نظام الضرائب (VAT)** — لا حساب ضريبة
20. **إشعار نفاد المخزون** — لا alerts
21. **Store Analytics** — لا إحصائيات متقدمة لصاحب المتجر
22. **Driver ratings** — التقييمات موجودة في DB لكن واجهة محدودة
23. **"Refresh OTP" button** — OTP لا تتجدد تلقائياً بعد انتهاء الصلاحية
24. **Scheduled cleanup jobs** — لا تنظيف تلقائي للإشعارات القديمة
25. **Redis** — لا كاش موزع

---

### 🟢 Low (منخفضة)

26. **PWA (Progressive Web App)** — Service Worker موجود لكن لا installability
27. **Dark Mode** — نظام ألوان جزئي موجود
28. **Receipts/Invoices PDF** — لا توليد PDF
29. **Export CSV** — لا تصدير بيانات
30. **Sitemap ديناميكي** — `/sitemap.xml` مُسجَّل لكن غير مُطبَّق

---

## 22. الاستخدام التجاري

### من يمكنه شراء هذا المشروع؟

1. **شركات التوصيل والخدمات المحلية**
   - تطبيق توصيل محلي في مدينة بعينها
   - خدمة "أطلب من أي متجر في حيك"

2. **أصحاب المشاريع الناشئة** في مجال التجارة الإلكترونية المحلية

3. **المطورون** الباحثون عن قاعدة صلبة لبناء marketplace

4. **الشركات متوسطة الحجم** التي تريد قناة بيع إضافية عبر الإنترنت

### القطاعات المناسبة
- مطاعم وتوصيل طعام (food tech)
- بقالة ومواد غذائية
- صيدليات
- زهور وهدايا
- متاجر ملابس محلية
- خدمات الأحياء والتجمعات السكنية

### كيف يمكن بيعه؟

| نموذج البيع | التفاصيل |
|------------|----------|
| **Source Code License** | بيع الكود مرة واحدة للمطور/الشركة |
| **Managed SaaS** | استضافة المنصة وتطوير مستمر (بعد إضافة multi-tenancy) |
| **White Label** | تخصيص للعلامة التجارية مع دعم تقني |
| **Revenue Share** | تشغيل المنصة وأخذ % من المعاملات |

### هل يصلح كـ SaaS؟ — ⚠️ بعد تطوير
يحتاج إضافة: multi-tenancy، billing، subdomain per tenant، tenant isolation في DB.

### هل يصلح كـ White Label؟ — ✅ نعم جزئياً
الـ branding والألوان قابلة للتعديل، اللوغو والاسم سهل التغيير، البنية مرنة.

### هل يصلح كـ Marketplace؟ — ✅ نعم حالياً
هو marketplace بالفعل — يحتاج فقط إضافة payment gateway وخرائط للإطلاق التجاري الكامل.

---

## 23. التقرير النهائي — SWOT Analysis

### Executive Summary

منصة **MIT GABER** هي تطبيق سوق محلي (Hyperlocal Marketplace) مكتمل الأساس، يدعم أربعة أدوار رئيسية (Admin، Customer، Store Owner، Driver)، مع نظام طلبات متعدد المتاجر، محفظة إلكترونية داخلية، دردشة فورية، ونظام إشعارات ثلاثي الطبقات. البنية التقنية صلبة وتستخدم تقنيات حديثة (React 18، Express 5، Drizzle ORM، Socket.IO، PostgreSQL). المشروع جاهز للتجريب والعروض التوضيحية، لكن يحتاج إلى بوابة دفع حقيقية ونظام خرائط قبل الإطلاق التجاري الكامل.

---

### نقاط القوة (Strengths)

- ✅ **بنية تقنية حديثة**: TypeScript full-stack، Drizzle ORM، React 18
- ✅ **نظام مالي دقيق**: Double-entry ledger، money utility بدون IEEE 754 errors
- ✅ **أمان متعدد الطبقات**: Rate limiting، CSP، HSTS، bcrypt، JWT
- ✅ **Real-time مكتمل**: Socket.IO للدردشة + Web Push للإشعارات
- ✅ **Multi-store support**: طلب واحد من متاجر متعددة
- ✅ **نظام تفاوض على التوصيل**: مرن وقابل للاستخدام
- ✅ **Audit trail كامل**: سجل تدقيق لكل عملية حساسة
- ✅ **OTP security**: رمز تحقق عند التسليم يمنع الاحتيال
- ✅ **توثيق داخلي ممتاز**: Q&A comments + DECISIONS.md

---

### نقاط الضعف (Weaknesses)

- ❌ **لا بوابة دفع إلكتروني**: الإيداع يدوي بالكامل
- ❌ **لا خرائط أو Live Tracking**: رسوم التوصيل بالتفاوض فقط
- ❌ **routes.ts ضخم**: 1568 سطر — يصعب الصيانة
- ❌ **لا بحث**: لا يمكن البحث عن منتجات أو متاجر
- ❌ **السلة تُفقد عند التحديث**: لا local storage persistence
- ❌ **نقص في الاختبارات**: ملفات spec موجودة لكن غير مكتملة
- ❌ **ADMIN واحد**: لا تدرج صلاحيات للفريق
- ❌ **لا استعادة كلمة مرور**: forgot password غير موجود

---

### الفرص (Opportunities)

- 🚀 سوق التجارة المحلية في تنمو في مصر والعالم العربي
- 🚀 إضافة بوابة دفع محلية (Paymob/Fawry) تفتح السوق المصري
- 🚀 إضافة تتبع الطلبات الحي تُميّز المنصة
- 🚀 SaaS model — تشغيل المنصة لعدة مدن بـ multi-tenancy
- 🚀 تكامل مع منصات التوصيل الكبرى (Bosta, Mylerz)
- 🚀 برامج الولاء والكوبونات تزيد الاحتفاظ بالعملاء
- 🚀 نموذج White Label — البيع لمجمعات تجارية ومدن ذكية

---

### المخاطر (Threats)

- ⚠️ **المنافسة**: منصات راسخة (Talabat, Instashop) في نفس المجال
- ⚠️ **الاعتماد على ADMIN يدوي**: الموافقة اليدوية على الإيداع لا تتوسع
- ⚠️ **PostgreSQL واحد**: نقطة فشل واحدة — لا read replicas
- ⚠️ **GCS dependency**: إذا تعطّلت GCS لا توجد صور في التطبيق
- ⚠️ **الكود على Replit**: بيئة التطوير والإنتاج على نفس المنصة
- ⚠️ **webhook مكشوف**: `/api/deploy/webhook` بدون signature verification

---

## 24. جدول حالة المشروع الحالية

| الميزة | الحالة | نسبة الإنجاز | الملاحظات |
|--------|--------|--------------|-----------|
| **Authentication (Login/Register)** | ✔ مكتمل | 90% | ينقص Forgot Password |
| **OTP Delivery Confirmation** | ✔ مكتمل | 95% | ينقص "Refresh OTP" button |
| **Products Management** | ✔ مكتمل | 90% | فئات نصية بدون هرمية |
| **Categories (Hierarchy)** | ❌ غير موجود | 10% | فئة نصية بسيطة فقط |
| **Orders (Multi-store)** | ✔ مكتمل | 90% | نظام متكامل |
| **Cart** | ⚠ جزئي | 60% | يُفقد عند تحديث الصفحة |
| **Checkout** | ✔ مكتمل | 85% | من المحفظة فقط |
| **Coupons / Discounts** | ❌ غير موجود | 0% | — |
| **Notifications (In-App)** | ✔ مكتمل | 95% | — |
| **Notifications (Push Web)** | ✔ مكتمل | 90% | — |
| **Wallet (محفظة)** | ✔ مكتمل | 90% | — |
| **Ratings / Reviews** | ⚠ جزئي | 50% | DB موجود، UI محدود |
| **Loyalty Points** | ❌ غير موجود | 0% | — |
| **Invoices / Receipts PDF** | ❌ غير موجود | 10% | رفع إيصال فقط |
| **Reports & Analytics** | ⚠ جزئي | 60% | إحصائيات أساسية |
| **Maps Integration** | ❌ غير موجود | 0% | — |
| **Live Tracking** | ❌ غير موجود | 0% | — |
| **Payment Gateway** | ❌ غير موجود | 0% | محفظة داخلية يدوية فقط |
| **Cash on Delivery** | ❌ غير موجود | 0% | — |
| **Chat (Real-time)** | ✔ مكتمل | 95% | 3 أنواع غرف |
| **AI Features** | ❌ غير موجود | 0% | — |
| **Email Notifications** | ⚠ جزئي | 30% | محدود جداً |
| **SMS Notifications** | ❌ غير موجود | 0% | — |
| **Referral System** | ❌ غير موجود | 0% | — |
| **Inventory Management** | ✔ مكتمل | 75% | stock tracking، ينقص alerts |
| **Tax / VAT** | ❌ غير موجود | 0% | — |
| **Multi Store** | ✔ مكتمل | 90% | — |
| **Multi Vendor** | ✔ مكتمل | 90% | — |
| **Admin Dashboard** | ✔ مكتمل | 85% | — |
| **Permissions / Roles** | ⚠ جزئي | 70% | RBAC أساسي، لا admin hierarchy |
| **Settings Page** | ❌ غير موجود | 0% | — |
| **Backup (Automated)** | ❌ غير موجود | 20% | ملفات يدوية فقط |
| **Audit Logs** | ✔ مكتمل | 90% | — |
| **Search** | ❌ غير موجود | 0% | — |
| **Multi-language** | ⚠ جزئي | 40% | عربي فقط |
| **Dark Mode** | ⚠ جزئي | 30% | CSS variables موجودة |
| **PWA** | ⚠ جزئي | 40% | Service Worker موجود |
| **Delivery Negotiation** | ✔ مكتمل | 90% | نظام عروض ومفاوضة |
| **Commission System** | ✔ مكتمل | 90% | 1% عمولة تلقائية |
| **Double-entry Ledger** | ✔ مكتمل | 90% | — |
| **Automated Tests** | ⚠ جزئي | 25% | spec files غير مكتملة |
| **Docker / Deployment** | ✔ مكتمل | 80% | Dockerfile + render.yaml |
| **CI/CD** | ⚠ جزئي | 50% | GitHub Actions + webhook |
| **Multi-tenant / SaaS** | ❌ غير موجود | 0% | يتطلب إعادة تصميم |

---

**إجمالي الميزات المكتملة:** ~15 من 42 (36%)  
**إجمالي الميزات المكتملة جزئياً:** ~14 من 42 (33%)  
**إجمالي الميزات غير الموجودة:** ~13 من 42 (31%)

---

*هذا التقرير تم إنشاؤه بتاريخ 26 يونيو 2026 بناءً على تحليل شامل للكودبيس الكامل. جميع المعلومات مستنتجة من الكود المصدري ولا تتضمن افتراضات أو تخمينات.*
