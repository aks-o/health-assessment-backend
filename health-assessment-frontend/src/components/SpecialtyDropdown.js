import React from "react";

const specialties = [
  {
    system: "Allopathy (Modern Medicine)",
    emoji: "\uD83C\uDFE5",
    options: [
      { value: "anesthesiology", label: "Anesthesiology" },
      { value: "cardiology", label: "Cardiology" },
      { value: "cardiothoracic-surgery", label: "Cardiothoracic Surgery" },
      { value: "dermatology", label: "Dermatology" },
      { value: "emergency-medicine", label: "Emergency Medicine" },
      { value: "endocrinology", label: "Endocrinology" },
      { value: "family-medicine", label: "Family Medicine" },
      { value: "gastroenterology", label: "Gastroenterology" },
      { value: "general-surgery", label: "General Surgery" },
      { value: "geriatrics", label: "Geriatrics" },
      { value: "gynecology-obstetrics", label: "Gynecology & Obstetrics" },
      { value: "hematology", label: "Hematology" },
      { value: "infectious-disease", label: "Infectious Disease" },
      { value: "internal-medicine", label: "Internal Medicine" },
      { value: "nephrology", label: "Nephrology" },
      { value: "neurology", label: "Neurology" },
      { value: "neurosurgery", label: "Neurosurgery" },
      { value: "oncology", label: "Oncology" },
      { value: "ophthalmology", label: "Ophthalmology" },
      { value: "orthopedics", label: "Orthopedics" },
      { value: "otolaryngology", label: "Otolaryngology (ENT)" },
      { value: "pathology", label: "Pathology" },
      { value: "pediatrics", label: "Pediatrics" },
      { value: "plastic-surgery", label: "Plastic Surgery" },
      { value: "psychiatry", label: "Psychiatry" },
      { value: "pulmonology", label: "Pulmonology" },
      { value: "radiology", label: "Radiology" },
      { value: "rheumatology", label: "Rheumatology" },
      { value: "urology", label: "Urology" },
      { value: "vascular-surgery", label: "Vascular Surgery" }
    ]
  },
  {
    system: "Homeopathy",
    emoji: "\uD83C\uDF3F",
    options: [
      { value: "homeo-general", label: "General Homeopathy" },
      { value: "homeo-constitutional", label: "Constitutional Homeopathy" },
      { value: "homeo-classical", label: "Classical Homeopathy" },
      { value: "homeo-clinical", label: "Clinical Homeopathy" },
      { value: "homeo-pediatric", label: "Pediatric Homeopathy" },
      { value: "homeo-dermatology", label: "Homeopathic Dermatology" },
      { value: "homeo-psychiatry", label: "Homeopathic Psychiatry" },
      { value: "homeo-gynecology", label: "Homeopathic Gynecology" },
      { value: "homeo-respiratory", label: "Homeopathic Respiratory Medicine" },
      { value: "homeo-digestive", label: "Homeopathic Digestive Disorders" },
      { value: "homeo-lifestyle", label: "Homeopathic Lifestyle Medicine" },
      { value: "homeo-chronic", label: "Chronic Disease Management (Homeopathy)" }
    ]
  },
  {
    system: "Ayurveda",
    emoji: "\uD83D\uDD09",
    options: [
      { value: "ayur-general", label: "General Ayurveda" },
      { value: "kayachikitsa", label: "Kayachikitsa (Internal Medicine)" },
      { value: "shalya-tantra", label: "Shalya Tantra (Surgery)" },
      { value: "shalakya-tantra", label: "Shalakya Tantra (ENT & Ophthalmology)" },
      { value: "kaumarbhritya", label: "Kaumarbhritya (Pediatrics)" },
      { value: "agadtantra", label: "Agadtantra (Toxicology)" },
      { value: "bhutavidya", label: "Bhutavidya (Psychiatry)" },
      { value: "rasayana", label: "Rasayana (Rejuvenative Medicine)" },
      { value: "vajikarana", label: "Vajikarana (Reproductive Health)" },
      { value: "prasuti-tantra", label: "Prasuti Tantra (Obstetrics & Gynecology)" },
      { value: "stri-roga", label: "Stri Roga (Women's Health)" },
      { value: "panchakarma", label: "Panchakarma Specialist" },
      { value: "ayur-nutrition", label: "Ayurvedic Nutrition & Dietetics" },
      { value: "ayur-dermatology", label: "Ayurvedic Dermatology" },
      { value: "ayur-orthopedics", label: "Ayurvedic Orthopedics" },
      { value: "nadi-pariksha", label: "Nadi Pariksha (Pulse Diagnosis)" }
    ]
  }
];

export default function SpecialtyDropdown({ value, onChange, required }) {
  return (
    <select
      id="specialty"
      name="specialty"
      value={value}
      onChange={onChange}
      required={required}
      style={{
        width: "100%",
        padding: "15px",
        border: "2px solid #e0e6ed",
        borderRadius: "10px",
        fontSize: "16px",
        background: "white",
        color: "#2c3e50",
        transition: "all 0.3s ease",
        cursor: "pointer"
      }}
    >
      <option value="">-- Choose a Specialty --</option>
      {specialties.map((group) => (
        <optgroup key={group.system} label={`${group.emoji} ${group.system}`}>
          {group.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
