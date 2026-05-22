import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import siteLogo from "../images/cybercrime-logo.png";
import heroImage from "../images/hero-image.jpg";
import cardHeaderImage from "../images/card-header.PNG";
import "./MemberIdCard.css";
import qrcode from "../images/cyber-qr.png";
import Signature from "../images/signature.png";
function getRoleLabel(role) {
  if (!role) {
    return "Member";
  }

  const normalized = String(role).toLowerCase();
  if (normalized === "village coordinator") {
    return "Village Coordinator";
  }
  if (normalized === "technical advisor") {
    return "Technical Advisor";
  }
  if (normalized === "pro media") {
    return "P.R.O. Media";
  }
  if (normalized === "member") {
    return "Member";
  }

  return role;
}

function formatDateToDDMMYYYY(dateString) {
  if (!dateString) return "01/01/1990";
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // If parsing fails, try alternative formats
      const parts = dateString.split(/[-/]/);
      if (parts.length === 3) {
        let day, month, year;
        
        // Try to determine format: DD-MM-YYYY, MM-DD-YYYY, or YYYY-MM-DD
        if (parts[0].length === 4) {
          // YYYY-MM-DD format
          year = parts[0];
          month = parts[1];
          day = parts[2];
        } else if (parts[2].length === 4) {
          // DD-MM-YYYY or MM-DD-YYYY format
          if (parseInt(parts[0]) > 12) {
            // DD-MM-YYYY
            day = parts[0];
            month = parts[1];
          } else {
            // MM-DD-YYYY
            month = parts[0];
            day = parts[1];
          }
          year = parts[2];
        }
        
        const formattedDay = String(day).padStart(2, "0");
        const formattedMonth = String(month).padStart(2, "0");
        return `${formattedDay}-${formattedMonth}-${year}`;
      }
      return dateString;
    }
    
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  } catch (error) {
    return dateString;
  }
}

function parseDateParts(dateString) {
  if (!dateString) {
    return null;
  }

  const normalizedInput = String(dateString).split("T")[0].trim();
  const parts = normalizedInput.split(/[-/]/);

  if (parts.length !== 3) {
    return null;
  }

  if (parts[0].length === 4) {
    return {
      day: parts[2],
      month: parts[1],
      year: parts[0],
    };
  }

  if (parts[2].length === 4) {
    if (parseInt(parts[0], 10) > 12) {
      return {
        day: parts[0],
        month: parts[1],
        year: parts[2],
      };
    }

    return {
      day: parts[1],
      month: parts[0],
      year: parts[2],
    };
  }

  return null;
}

function formatValidityAfterOneYear(dateString) {
  const parts = parseDateParts(dateString);

  if (!parts) {
    return "--";
  }

  const day = String(parts.day).padStart(2, "0");
  const month = String(parts.month).padStart(2, "0");
  const year = Number(parts.year) + 1;

  return `${day}-${month}-${year}`;
}

export default function MemberIdCard({ member }) {
  const frontCardRef = useRef(null);
  const backCardRef = useRef(null);
  const [downloading, setDownloading] = useState(false);

  const memberId = member?.referralCode || member?.id || "CCSS-00001";
  const memberName = member?.fullName || "Member Name";
  const roleLabel = getRoleLabel(member?.role);
  const email = member?.email || "demo@gmail.com";
  const block = member?.blockName || "-";
  const village = member?.villageName || "-";
  const district = member?.districtName || "Moradabad";
  const state = member?.stateName || "Uttar Pradesh";
  const dob = formatDateToDDMMYYYY(member?.dateOfBirth || member?.cardDateOfBirth || "01/01/1990");
  const validUpto = formatValidityAfterOneYear(
    member?.registrationDate || member?.createdAt || member?.registeredAt || member?.approvedAt,
  );
  const mobile = member?.mobileNumber || member?.mobile || "9XXXXXXXXX";
  const memberPhoto = member?.cardPhotoDataUrl || member?.photoDataUrl || heroImage;
  const cardMemberId = member?.referralCode || member?.id || member?._id || "-";
  const fullAddress = `${village}, ${block}, ${district}, ${state}`;
  const isLongAddress = fullAddress.length > 48;

  const handleDownloadPDF = async () => {
    if (!frontCardRef.current || !backCardRef.current) {
      return;
    }

    setDownloading(true);
    try {
      // Create PDF in landscape for both cards side by side
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // Capture front side
      const frontCanvas = await html2canvas(frontCardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      // Capture back side
      const backCanvas = await html2canvas(backCardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const frontImageData = frontCanvas.toDataURL("image/png");
      const backImageData = backCanvas.toDataURL("image/png");

      // Calculate scaling: 85.6mm x 53.98mm - standard ID card size
      // For landscape A4: width 297mm, height 210mm
      const cardWidth = 80;
      const cardHeight = 125;

      // Add front side on left
      pdf.addImage(frontImageData, "PNG", 20, 40, cardWidth, cardHeight);

      // Add back side on right
      pdf.addImage(backImageData, "PNG", 115, 40, cardWidth, cardHeight);

      const safeName = String(memberName)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      pdf.save(`${safeName || "member"}-id-card.pdf`);
    } catch (_error) {
      console.error("PDF generation error:", _error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section
      className="member-id-card-wrap"
      aria-label="Member ID card preview"
    >
      <div className="member-id-card-actions">
        <button
          type="button"
          className="admin-submit-btn member-card-download-btn"
          onClick={handleDownloadPDF}
          disabled={downloading}
        >
          {downloading ? "Preparing..." : "Download Both Cards PDF"}
        </button>
      </div>

      <div className="member-id-cards-display">
        {/* Front side */}
        <div className="member-id-card member-id-card-front" ref={frontCardRef}>
          {/* Header Image */}
          <div className="card-header-image-container">
            <img
              src={cardHeaderImage}
              alt="Card Header"
              className="card-header-image"
            />
          </div>

          {/* Identity Card Label */}
          <div className="card-identity-label">IDENTITY CARD</div>

          {/* Top info row */}
          <div className="card-top-info">
            <div className="card-reg-number">Reg - 67/2025</div>
            <div className="card-id-number">
              ID -{cardMemberId}
            </div>
          </div>

          {/* Main content grid */}
          <div className="card-content-grid">
            {/* Left column - Name and Photo */}
            <div className="card-left-section">
              <div className="card-member-name name-width">{memberName}</div>
              <div className="card-member-photo-container-new">
                <img
                  src={memberPhoto}
                  alt="Cyber Crime Logo"
                  className="card-member-photo"
                />
                <img
                  src={siteLogo}
                  alt="Member"
                  className="card-member-photo"
                />
              </div>
            </div>

            {/* Right column - Badge and details */}
            <div className="card-right-section">
              <div className="card-role-badge">{roleLabel}</div>
            </div>
          </div>

          {/* Details section */}
          <div className="card-details-section">
            <div className="detail-row">
              <span className="detail-label">DOB :</span>
              <span className="detail-value">{dob}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">MOB :</span>
              <span className="detail-value">{mobile}</span>
            </div>
            <div className="detail-row detail-row-address">
              <span className="detail-label">Address :</span>
              <span className={`detail-value detail-value-address ${isLongAddress ? "detail-value-address-compact" : ""}`}>
                {fullAddress}
              </span>
            </div>
          </div>
          <div className="footer-section">
            <img
                  src={qrcode}
                  alt="Member"
                  className="footer-image"
                />
              <img 
              src={Signature}
              alt="digital Signature"
              className="signature-image-front"
                />
            <span className="signature-front">Official Signature</span>
          </div>
          <div className="card-footer-strip-front-card" >जागरूक रहें, सुरक्षित रहें</div>
        </div>

        {/* Back side */}
        <div className="member-id-card member-id-card-back" ref={backCardRef}>
          {/* Header Image */}
          <div className="card-header-image-container">
            <img
              src={cardHeaderImage}
              alt="Card Header"
              className="card-header-image"
            />
          </div>

          {/* Logo and Badge Area */}
          <div className="card-back-top">
            <div className="card-back-logo">
              <img
                src={siteLogo}
                alt="Organization Logo"
                className="back-logo-img"
              />
            </div>
            <img
                src={qrcode}
                alt="Organization Logo"
                className="back-logo-img-qrcode"
              />
          </div>
            <div className="card-validity-member">Valid Upto : {validUpto}</div>
          {/* Back content */}
          <div className="card-back-content">
            <div className="back-instructions">
              <ol className="instructions-list">
                <li>ID केवल संगठन की अधिकृत गतिविधियों के लिए उपयोग करें।</li>
                <li>भारत के साइबर कानूनों का पालन अनिवार्य है।</li>
                <li>संगठन की गोपनीय जानकारी साझा न करें।</li>
                <li>ID का दुरुपयोग करने पर सदस्यता रद्द की जाएगी।</li>
                <li>अपने कार्यों के लिए स्वयं जिम्मेदार रहेंगे।</li>
              </ol>
            </div>

            <div className="back-contact-info">
              <div className="contact-section">
                <div className="contact-title">Head Office</div>
                <div className="contact-details">
                  Bilari Moradabad U.P. 244411
                </div>
              </div>

              <div className="contact-section">
                <div className="contact-title">Corporate Office</div>
                <div className="contact-details">
                  C 165, Kalidas marg, Lucknow
                </div>
              </div>

              <div className="contact-section">
                <div className="contact-title">Website</div>
                <div className="contact-details">
                  cybercrimesurakhasangh.com
                </div>
              </div>

              <div className="contact-section">
                <div className="contact-title">E-mail</div>
                <div className="contact-details">
                  care@cybercrimesurakhasangh.com
                </div>
              </div>
            </div>
          </div>

          {/* Footer strip */}
          <div className="card-footer-strip-back-card" >जागरूक रहें, सुरक्षित रहें</div>
        </div>
      </div>
    </section>
  );
}
