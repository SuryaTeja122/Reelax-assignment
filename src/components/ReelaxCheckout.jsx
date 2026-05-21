import { useState } from "react";

const STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
  "Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka",
  "Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram",
  "Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana",
  "Tripura","Uttar Pradesh","Uttarakhand","West Bengal",
  "Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli",
  "Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry",
];

const CITIES = {
  Telangana: ["Hyderabad","Warangal","Nizamabad","Karimnagar","Khammam"],
  Maharashtra: ["Mumbai","Pune","Nagpur","Nashik","Aurangabad"],
  Karnataka: ["Bengaluru","Mysuru","Mangaluru","Hubli","Belagavi"],
  "Tamil Nadu": ["Chennai","Coimbatore","Madurai","Salem","Tiruchirappalli"],
  Gujarat: ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar"],
  Delhi: ["New Delhi","Dwarka","Rohini","Saket","Lajpat Nagar"],
  "Uttar Pradesh": ["Lucknow","Noida","Agra","Kanpur","Varanasi"],
  Rajasthan: ["Jaipur","Jodhpur","Udaipur","Ajmer","Kota"],
  "West Bengal": ["Kolkata","Howrah","Durgapur","Asansol","Siliguri"],
  Punjab: ["Chandigarh","Ludhiana","Amritsar","Jalandhar","Patiala"],
};

const COUPONS = [
  { code: "WELCOME20", label: "20% off on your first month" },
  { code: "ANNUAL50", label: "50% off on annual plans" },
];

const SUBTOTAL = 14999;
const TAX_RATE = 0.18;

export default function ReelaxCheckout() {
  const [form, setForm] = useState({
    companyName: "abhigyan",
    email: "abhigyan.pandey@getreelax.com",
    gst: "",
    pan: "",
    premise: "",
    street: "",
    state: "",
    city: "",
    country: "India",
    pincode: "",
  });

  const [couponInput, setCouponInput] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState("WELCOME20");
  const [walletApplied, setWalletApplied] = useState(false);
  const [couponOpen, setCouponOpen] = useState(true);

  const discount =
    selectedCoupon === "WELCOME20"
      ? SUBTOTAL * 0.2
      : selectedCoupon === "ANNUAL50"
      ? SUBTOTAL * 0.5
      : 0;

  const walletDiscount = walletApplied ? 500 : 0;
  const discountedSubtotal = SUBTOTAL - discount - walletDiscount;
  const tax = discountedSubtotal * TAX_RATE;
  const total = discountedSubtotal + tax;

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const cities = CITIES[form.state] || [];

  return (
    <div style={styles.root}>
      {/* Navbar */}
      <nav style={styles.nav}>
        <div style={styles.navInner}>
          <div style={styles.searchWrap}>
            <input
              style={styles.searchInput}
              placeholder="Find influencers to collaborate with"
            />
            <span style={styles.searchIcon}>
              <SearchIcon />
            </span>
          </div>
          <div style={styles.navActions}>
            <button style={styles.upgradeBtn}>⚡ Upgrade</button>
            <button style={styles.createBtn}>+ Create Campaign</button>
            <div style={styles.avatar}>
              <UserIcon />
            </div>
            <MenuIcon />
          </div>
        </div>
      </nav>

      {/* Page Body */}
      <div style={styles.page}>
        {/* Back */}
        <div style={styles.backRow}>
          <button style={styles.backBtn}>
            <ArrowLeftIcon />
            Back to plans
          </button>
        </div>

        <div style={styles.cols}>
          {/* LEFT – Billing Form */}
          <div style={styles.card}>
            <h1 style={styles.pageTitle}>Review your details</h1>
            <h2 style={styles.sectionTitle}>Billing Information</h2>

            <div style={styles.grid2}>
              <Field label="Company Name">
                <input
                  style={styles.input}
                  value={form.companyName}
                  onChange={set("companyName")}
                  placeholder="abhigyan"
                />
              </Field>
              <Field label="Email">
                <input
                  style={styles.input}
                  value={form.email}
                  onChange={set("email")}
                  placeholder="abhigyan.pandey@getreelax.com"
                />
              </Field>
              <Field label="GST Number (Optional)">
                <input
                  style={styles.input}
                  value={form.gst}
                  onChange={set("gst")}
                  placeholder="GST Number"
                />
              </Field>
              <Field label="PAN Number (Optional)">
                <input
                  style={styles.input}
                  value={form.pan}
                  onChange={set("pan")}
                  placeholder="PAN Number"
                />
              </Field>
              <Field label="Premise/House no.">
                <input
                  style={styles.input}
                  value={form.premise}
                  onChange={set("premise")}
                  placeholder="Premise/House no."
                />
              </Field>
              <Field label="Street">
                <input
                  style={styles.input}
                  value={form.street}
                  onChange={set("street")}
                  placeholder="Street"
                />
              </Field>
              <Field label="State">
                <div style={styles.selectWrap}>
                  <select
                    style={styles.select}
                    value={form.state}
                    onChange={(e) => {
                      setForm((f) => ({ ...f, state: e.target.value, city: "" }));
                    }}
                  >
                    <option value="">Select state</option>
                    {STATES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <ChevronDownIcon />
                </div>
              </Field>
              <Field label="City">
                <div style={styles.selectWrap}>
                  <select
                    style={{
                      ...styles.select,
                      color: !form.state ? "#9ca3af" : "#374151",
                    }}
                    value={form.city}
                    onChange={set("city")}
                    disabled={!form.state}
                  >
                    <option value="">Select city</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDownIcon />
                </div>
              </Field>
              <Field label="Country">
                <input
                  style={{ ...styles.input, background: "#f9fafb", color: "#6b7280" }}
                  value={form.country}
                  readOnly
                />
              </Field>
              <Field label="Pin Code">
                <input
                  style={styles.input}
                  value={form.pincode}
                  onChange={set("pincode")}
                  placeholder="Pincode"
                  maxLength={6}
                />
              </Field>
            </div>

            <div style={styles.formActions}>
              <button style={styles.cancelBtn}>Cancel</button>
              <button style={styles.saveBtn}>Save Details</button>
            </div>
          </div>

          {/* RIGHT – Order Summary */}
          <div style={styles.card}>
            <h2 style={styles.pageTitle}>Order Summary</h2>

            {/* Plan Box */}
            <div style={styles.planBox}>
              <div>
                <span style={styles.planPrice}>₹4,999</span>
                <span style={styles.planPer}> /month</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={styles.selectedPlanLabel}>SELECTED PLAN</div>
                <div style={styles.planName}>Startup</div>
              </div>
            </div>
            <p style={styles.planInclude}>Includes 5,000 credits/mo.</p>

            <button style={styles.upgradeGrowth}>
              <UpgradeCircleIcon />
              Upgrade to Growth Plan
            </button>

            {/* Wallet */}
            <div style={styles.walletRow}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <WalletIcon />
                <div>
                  <div style={styles.walletLabel}>Wallet Balance</div>
                  <div style={styles.walletAmt}>₹500.00 available</div>
                </div>
              </div>
              <button
                style={{
                  ...styles.applyBtn,
                  ...(walletApplied ? styles.appliedBtn : {}),
                }}
                onClick={() => setWalletApplied(!walletApplied)}
              >
                {walletApplied ? "Applied" : "Apply"}
              </button>
            </div>

            {/* Coupon */}
            <div style={styles.couponSection}>
              <div
                style={styles.couponHeader}
                onClick={() => setCouponOpen(!couponOpen)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <TagIcon />
                  <span style={styles.couponTitle}>Apply Coupon</span>
                </div>
                <ChevronUpDownIcon open={couponOpen} />
              </div>

              {couponOpen && (
                <div style={styles.couponBody}>
                  <div style={styles.couponInputRow}>
                    <input
                      style={styles.couponInput}
                      placeholder="Enter coupon code"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    />
                    <button
                      style={styles.applyBtn}
                      onClick={() => {
                        const found = COUPONS.find((c) => c.code === couponInput);
                        if (found) setSelectedCoupon(found.code);
                      }}
                    >
                      Apply
                    </button>
                  </div>

                  {COUPONS.map((c) => (
                    <div
                      key={c.code}
                      style={{
                        ...styles.couponOption,
                        ...(selectedCoupon === c.code ? styles.couponSelected : {}),
                      }}
                      onClick={() =>
                        setSelectedCoupon(selectedCoupon === c.code ? null : c.code)
                      }
                    >
                      <div>
                        <span style={styles.couponCode}>{c.code}</span>
                        <span style={styles.couponDesc}> {c.label}</span>
                      </div>
                      <div style={styles.radio}>
                        {selectedCoupon === c.code && (
                          <div style={styles.radioDot} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Totals */}
            <div style={styles.totalsSection}>
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Subtotal</span>
                <span style={styles.totalValue}>
                  ₹{SUBTOTAL.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
              {discount > 0 && (
                <div style={styles.totalRow}>
                  <span style={{ ...styles.totalLabel, color: "#16a34a" }}>
                    Coupon discount
                  </span>
                  <span style={{ ...styles.totalValue, color: "#16a34a" }}>
                    −₹{discount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              )}
              {walletApplied && (
                <div style={styles.totalRow}>
                  <span style={{ ...styles.totalLabel, color: "#16a34a" }}>
                    Wallet applied
                  </span>
                  <span style={{ ...styles.totalValue, color: "#16a34a" }}>
                    −₹500.00
                  </span>
                </div>
              )}
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Tax (18% GST)</span>
                <span style={styles.totalValue}>
                  ₹{tax.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div style={styles.grandRow}>
              <span style={styles.grandLabel}>Total due today</span>
              <span style={styles.grandValue}>
                {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <button style={styles.payBtn}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

/* ── Icon Components ── */

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ cursor: "pointer" }}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="m12 5-7 7 7 7" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={styles.chevron}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ChevronUpDownIcon({ open }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s" }}>
      <path d="m18 15-6-6-6 6" />
    </svg>
  );
}

function UpgradeCircleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ marginRight: 6 }}>
      <circle cx="12" cy="12" r="10" />
      <path d="m16 12-4-4-4 4" />
      <path d="M12 16V8" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
      stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <path d="M1 10h22" />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
      stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

/* ── Styles ── */

const styles = {
  root: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    background: "#f0f2f5",
    minHeight: "100vh",
    fontSize: 14,
    color: "#1a1a1a",
  },
  nav: {
    background: "#fff",
    borderBottom: "1px solid #e5e7eb",
    padding: "0 24px",
    height: 56,
    display: "flex",
    alignItems: "center",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  navInner: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  searchWrap: {
    position: "relative",
    width: 280,
  },
  searchInput: {
    width: "100%",
    padding: "8px 36px 8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 13,
    outline: "none",
    background: "#fff",
    boxSizing: "border-box",
    color: "#374151",
  },
  searchIcon: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
  },
  navActions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  upgradeBtn: {
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "7px 14px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  createBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "7px 14px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    border: "1px solid #d1d5db",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    background: "#f9fafb",
  },
  page: {
    maxWidth: 1100,
    margin: "0 auto",
    padding: "24px",
  },
  backRow: {
    marginBottom: 16,
  },
  backBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
    color: "#374151",
    fontSize: 14,
    padding: 0,
    fontFamily: "inherit",
  },
  cols: {
    display: "grid",
    gridTemplateColumns: "1fr 380px",
    gap: 24,
    alignItems: "start",
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    padding: "28px 32px",
  },
  pageTitle: {
    margin: "0 0 18px",
    fontSize: 22,
    fontWeight: 700,
    color: "#111827",
  },
  sectionTitle: {
    margin: "0 0 20px",
    fontSize: 16,
    fontWeight: 600,
    color: "#111827",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "16px 20px",
  },
  label: {
    fontSize: 13,
    color: "#374151",
    fontWeight: 500,
  },
  input: {
    padding: "9px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 13,
    color: "#374151",
    outline: "none",
    background: "#fff",
    width: "100%",
    boxSizing: "border-box",
    fontFamily: "inherit",
    transition: "border-color .15s",
  },
  selectWrap: {
    position: "relative",
  },
  select: {
    appearance: "none",
    width: "100%",
    padding: "9px 32px 9px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 13,
    color: "#374151",
    background: "#fff",
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  chevron: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
  formActions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 12,
    marginTop: 28,
  },
  cancelBtn: {
    padding: "10px 28px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    background: "#fff",
    fontSize: 14,
    cursor: "pointer",
    color: "#374151",
    fontWeight: 500,
    fontFamily: "inherit",
  },
  saveBtn: {
    padding: "10px 28px",
    border: "none",
    borderRadius: 8,
    background: "#2563eb",
    color: "#fff",
    fontSize: 14,
    cursor: "pointer",
    fontWeight: 600,
    fontFamily: "inherit",
  },
  planBox: {
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: "14px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 22,
    fontWeight: 700,
    color: "#111827",
  },
  planPer: {
    fontSize: 13,
    color: "#6b7280",
  },
  selectedPlanLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: "#2563eb",
    letterSpacing: "0.06em",
    textAlign: "right",
    marginBottom: 2,
  },
  planName: {
    fontSize: 16,
    fontWeight: 700,
    color: "#111827",
    textAlign: "right",
  },
  planInclude: {
    margin: "0 0 14px",
    fontSize: 12,
    color: "#6b7280",
  },
  upgradeGrowth: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    border: "1px solid #bfdbfe",
    borderRadius: 8,
    background: "#fff",
    color: "#2563eb",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    marginBottom: 16,
    fontFamily: "inherit",
  },
  walletRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 14px",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    marginBottom: 12,
  },
  walletLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: "#111827",
  },
  walletAmt: {
    fontSize: 12,
    color: "#6b7280",
  },
  applyBtn: {
    padding: "6px 14px",
    border: "1px solid #2563eb",
    borderRadius: 6,
    background: "#fff",
    color: "#2563eb",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "inherit",
    whiteSpace: "nowrap",
  },
  appliedBtn: {
    background: "#eff6ff",
    borderColor: "#93c5fd",
  },
  couponSection: {
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
  },
  couponHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    cursor: "pointer",
    userSelect: "none",
  },
  couponTitle: {
    fontSize: 13,
    fontWeight: 600,
    color: "#111827",
  },
  couponBody: {
    padding: "0 14px 14px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  couponInputRow: {
    display: "flex",
    gap: 8,
    marginBottom: 4,
  },
  couponInput: {
    flex: 1,
    padding: "8px 12px",
    border: "1px solid #d1d5db",
    borderRadius: 6,
    fontSize: 13,
    outline: "none",
    fontFamily: "inherit",
    color: "#374151",
  },
  couponOption: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px",
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    cursor: "pointer",
    background: "#fff",
    transition: "border-color .15s, background .15s",
  },
  couponSelected: {
    borderColor: "#2563eb",
    background: "#eff6ff",
  },
  couponCode: {
    fontWeight: 700,
    fontSize: 13,
    color: "#111827",
  },
  couponDesc: {
    fontSize: 12,
    color: "#6b7280",
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    border: "2px solid #2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#2563eb",
  },
  totalsSection: {
    borderTop: "1px solid #e5e7eb",
    paddingTop: 12,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    marginBottom: 12,
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 13,
    color: "#6b7280",
  },
  totalValue: {
    fontSize: 13,
    color: "#374151",
    fontWeight: 500,
  },
  grandRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #e5e7eb",
    paddingTop: 12,
    marginBottom: 16,
  },
  grandLabel: {
    fontSize: 15,
    fontWeight: 700,
    color: "#111827",
  },
  grandValue: {
    fontSize: 22,
    fontWeight: 800,
    color: "#2563eb",
  },
  payBtn: {
    width: "100%",
    padding: "13px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "inherit",
  },
};
