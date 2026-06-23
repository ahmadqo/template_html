import React, { useImperativeHandle, useRef } from "react";
import DummyQRCode from "@/assets/qr-code-big-deals.png";

export interface GuestFolioTransaction {
  date: string;
  room: string;
  description: string;
  qty: number | string;
  charges: string;
  payment: string;
}

export interface GuestFolioPrintData {
  propertyName: string;
  propertyAddress: string;
  propertyEmail: string;
  propertyPhone: string;
  propertySocial?: string;
  propertyNote?: string;
  folioNumber: string;
  guestName: string;
  reservationType: string;
  guestAddress: string;
  roomName: string;
  roomType: string;
  arrivalDate: string;
  departureDate: string;
  totalNights: number | string;
  voucherNumber: string;
  transactions: GuestFolioTransaction[];
  totalCharges: string;
  totalPayment: string;
  balance: string;
}

export interface GuestFolioTemplateHandle {
  mainEl: HTMLDivElement | null;
}

export interface GuestFolioPrintTemplateProps {
  data: GuestFolioPrintData;
  propertyLogoBase64?: string | null;
  qrCodeBase64?: string | null;
  printedBy: string;
  printedAt: string;
  previewMode?: boolean;
}

const thStyle: React.CSSProperties = {
  padding: "5px 8px",
  textAlign: "left",
  fontWeight: 600,
  color: "#111827",
  fontSize: "11px",
  backgroundColor: "#F3E5FF", // primary-100
  borderBottom: "1px solid #e5e7eb",
};

const tdStyle: React.CSSProperties = {
  padding: "5px 8px",
  color: "#111827",
  fontSize: "11px",
  borderBottom: "1px solid #f3f4f6",
};

const GuestFolioPrintTemplate = React.forwardRef<
  GuestFolioTemplateHandle,
  GuestFolioPrintTemplateProps
>(({ data, propertyLogoBase64, printedBy, printedAt, previewMode }, ref) => {
  const innerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      get mainEl() {
        return innerRef.current;
      },
    }),
    [],
  );

  const wrapperStyle = previewMode
    ? {
        padding: "40px",
        backgroundColor: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
      }
    : {
        position: "fixed" as const,
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        overflow: "hidden",
        zIndex: -9999,
        pointerEvents: "none" as const,
      };

  return (
    <div style={wrapperStyle}>
      <div
        ref={innerRef}
        id="guest-folio-print-template"
        style={{
          position: "relative",
          width: "794px",
          minHeight: "1123px",
          backgroundColor: "#ffffff",
          fontFamily: "'Segoe UI','Helvetica Neue',Arial,sans-serif",
          color: "#111827",
          fontSize: "11px",
          lineHeight: "1.4",
          padding: "12px 24px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingBottom: "12px",
            marginBottom: "16px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                flexShrink: 0,
                backgroundColor: propertyLogoBase64 ? "transparent" : "#ede9fe",
              }}
            >
              {propertyLogoBase64 ? (
                <img
                  src={propertyLogoBase64}
                  alt="Logo"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <span
                  style={{
                    color: "#7c3aed",
                    fontWeight: 700,
                    fontSize: "18px",
                  }}
                >
                  {data.propertyName?.charAt(0)?.toUpperCase() || "P"}
                </span>
              )}
            </div>
            <div>
              <h2
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  margin: 0,
                  lineHeight: "1.2",
                }}
              >
                {data.propertyName}
              </h2>
              <p style={{ color: "#111827", margin: 0, lineHeight: "1.3" }}>
                {data.propertyAddress}
              </p>
              <p style={{ color: "#111827", margin: 0, lineHeight: "1.3" }}>
                {data.propertyEmail} &bull; {data.propertyPhone}
              </p>
              {data.propertySocial && (
                <p style={{ color: "#111827", margin: 0, lineHeight: "1.3" }}>
                  {data.propertySocial}
                </p>
              )}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <h1
              style={{
                fontSize: "20px",
                fontWeight: 700,
                margin: 0,
                lineHeight: "1.2",
              }}
            >
              Guest Folio
            </h1>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid #22c55e",
                color: "#16a34a",
                backgroundColor: "#f0fdf4",
                padding: "3px 10px",
                borderRadius: "20px",
                fontSize: "11px",
                fontWeight: 600,
                marginTop: "6px",
              }}
            >
              {data.folioNumber}
            </span>
          </div>
        </div>

        {/* INFO BOXES */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          {/* Guest Details */}
          <div
            style={{
              flex: "0 0 42%",
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{ fontSize: "11px", fontWeight: 700, marginBottom: "4px" }}
            >
              {data.guestName}
            </div>
            <div style={{ color: "#111827", marginBottom: "8px" }}>
              {data.reservationType}
            </div>
            <div
              style={{ color: "#111827", lineHeight: "1.5", maxWidth: "90%" }}
            >
              {data.guestAddress}
            </div>
          </div>

          {/* Reservation Details */}
          <div
            style={{
              flex: 1,
              border: "1px solid #d1d5db",
              borderRadius: "6px",
              padding: "12px",
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "12px",
            }}
          >
            <div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#6b7280",
                  marginBottom: "2px",
                  display: "block",
                }}
              >
                Room
              </span>
              <div
                style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}
              >
                {data.roomName} - {data.roomType}
              </div>
            </div>
            <div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#6b7280",
                  marginBottom: "2px",
                  display: "block",
                }}
              >
                Arrival - Departure
              </span>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1px solid #d1d5db",
                  borderRadius: "20px",
                  overflow: "hidden",
                  backgroundColor: "#fff",
                  marginTop: "2px",
                }}
              >
                <span
                  style={{
                    padding: "4px 12px",
                    fontSize: "11px",
                    color: "#374151",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                >
                  {data.arrivalDate} - {data.departureDate}
                </span>
                <span
                  style={{
                    backgroundColor: "#111827",
                    color: "#fff",
                    padding: "4px 12px",
                    fontSize: "11px",
                    fontWeight: 600,
                    borderRadius: "0 20px 20px 0",
                    whiteSpace: "nowrap",
                  }}
                >
                  {data.totalNights} Nights
                </span>
              </div>
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "#6b7280",
                  marginBottom: "2px",
                  display: "block",
                }}
              >
                Voucher
              </span>
              <div
                style={{ fontSize: "12px", fontWeight: 700, color: "#111827" }}
              >
                {data.voucherNumber}
              </div>
            </div>
          </div>
        </div>

        {/* TRANSACTIONS TABLE */}
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
            marginBottom: "8px",
            borderRadius: "6px",
            overflow: "hidden",
            border: "1px solid #d1d5db",
          }}
        >
          <thead>
            <tr>
              <th style={{ ...thStyle, width: "14%" }}>Date</th>
              <th style={{ ...thStyle, width: "12%" }}>Room</th>
              <th style={{ ...thStyle, width: "41%" }}>Description</th>
              <th style={{ ...thStyle, width: "5%", textAlign: "center" }}>
                Qty
              </th>
              <th style={{ ...thStyle, width: "14%", textAlign: "right" }}>
                Charges
              </th>
              <th style={{ ...thStyle, width: "14%", textAlign: "right" }}>
                Payment
              </th>
            </tr>
          </thead>
          <tbody>
            {(data.transactions || []).map((trx, idx) => (
              <tr key={idx} style={{ pageBreakInside: "avoid" }}>
                <td style={{ ...tdStyle, whiteSpace: "nowrap" }}>{trx.date}</td>
                <td style={tdStyle}>{trx.room}</td>
                <td style={tdStyle}>{trx.description}</td>
                <td style={{ ...tdStyle, textAlign: "center" }}>{trx.qty}</td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  {trx.charges}
                </td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  {trx.payment}
                </td>
              </tr>
            ))}
            <tr style={{ pageBreakInside: "avoid" }}>
              <td
                colSpan={2}
                style={{
                  ...tdStyle,
                  backgroundColor: "#F3E5FF",
                  borderBottom: "none",
                }}
              />
              <td
                style={{
                  ...tdStyle,
                  backgroundColor: "#F3E5FF",
                  fontWeight: 700,
                  borderBottom: "none",
                  textAlign: "left",
                }}
              >
                Total
              </td>
              <td
                style={{
                  ...tdStyle,
                  backgroundColor: "#F3E5FF",
                  borderBottom: "none",
                }}
              />
              <td
                style={{
                  ...tdStyle,
                  backgroundColor: "#F3E5FF",
                  fontWeight: 700,
                  borderBottom: "none",
                  textAlign: "right",
                }}
              >
                {data.totalCharges}
              </td>
              <td
                style={{
                  ...tdStyle,
                  backgroundColor: "#F3E5FF",
                  fontWeight: 700,
                  borderBottom: "none",
                  textAlign: "right",
                }}
              >
                {data.totalPayment}
              </td>
            </tr>
          </tbody>
        </table>

        {/* ── BALANCE BOX ── */}
        <table
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
            marginBottom: "8px",
            borderRadius: "6px",
            backgroundColor: "#ffffff",
            overflow: "hidden",
            border: "1px solid #d1d5db",
            pageBreakInside: "avoid",
          }}
        >
          <tbody>
            <tr>
              <td style={{ width: "14%", padding: "8px", border: "none" }} />
              <td style={{ width: "12%", padding: "8px", border: "none" }} />
              <td
                style={{
                  width: "41%",
                  padding: "8px",
                  border: "none",
                  fontWeight: 700,
                  textAlign: "left",
                  color: "#374151",
                  fontSize: "11px",
                }}
              >
                Balance
              </td>
              <td style={{ width: "5%", padding: "8px", border: "none" }} />
              <td
                style={{
                  width: "14%",
                  padding: "8px",
                  border: "none",
                  fontWeight: 700,
                  textAlign: "right",
                  color: "#111827",
                  fontSize: "12px",
                }}
              >
                {data.balance}
              </td>
              <td style={{ width: "14%", padding: "8px", border: "none" }} />
            </tr>
          </tbody>
        </table>

        {/* FOOTER */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "12px",
            pageBreakInside: "avoid",
          }}
        >
          {/* Left: Notes */}
          <div
            style={{
              flex: 1,
              maxWidth: "50%",
              color: "#374151",
              fontSize: "11px",
              lineHeight: "1.4",
            }}
          >
            <p style={{ fontWeight: 700, margin: "0 0 4px 0" }}>
              Please Come back soon...
            </p>
            <p style={{ margin: "0 0 2px 0" }}>
              Please check that you have not left any valuables in the room
              personal safe.
            </p>
            <p style={{ margin: 0 }}>
              Thank you for choosing to stay with us and we wish you a pleasant
              onward journey.
            </p>
          </div>
          {/* Right: Signatures + QR */}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              gap: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "120px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderTop: "1px solid #d1d5db",
                  marginBottom: "6px",
                  marginTop: "60px",
                }}
              />
              <span
                style={{ fontSize: "11px", fontWeight: 600, color: "#111827" }}
              >
                {printedBy}
              </span>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "120px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  borderTop: "1px solid #d1d5db",
                  marginBottom: "6px",
                  marginTop: "60px",
                }}
              />
              <span
                style={{ fontSize: "11px", fontWeight: 600, color: "#111827" }}
              >
                {data.guestName}
              </span>
            </div>
            <div style={{ width: "80px", height: "80px" }}>
              <img
                src={DummyQRCode}
                alt="QR Code"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            width: "100%",
            pageBreakInside: "avoid",
          }}
        >
          <div
            style={{
              fontSize: "10px",
              color: "#9ca3af",
              fontWeight: 500,
              textAlign: "left",
            }}
          >
            Printed: {printedBy} on {printedAt}
          </div>
          {data.propertyNote && (
            <>
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid #d1d5db",
                  margin: 0,
                }}
              />
              <div
                style={{
                  fontSize: "10px",
                  color: "#111827",
                  textAlign: "justify",
                  lineHeight: "1.4",
                }}
              >
                {data.propertyNote}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

GuestFolioPrintTemplate.displayName = "GuestFolioPrintTemplate";

export default GuestFolioPrintTemplate;
