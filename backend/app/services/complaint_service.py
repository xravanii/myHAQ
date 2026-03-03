from io import BytesIO
from datetime import datetime
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.units import inch


def generate_complaint_pdf(data):

    rewritten_body = data.description

    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer)
    elements = []

    styles = getSampleStyleSheet()
    normal = styles["Normal"]

    today = datetime.now().strftime("%d %B %Y")

    # Header
    elements.append(Paragraph("From:", normal))
    elements.append(Paragraph(data.full_name, normal))
    elements.append(Paragraph(data.address, normal))
    elements.append(Paragraph(f"Phone: {data.phone}", normal))
    elements.append(Spacer(1, 0.3 * inch))

    elements.append(Paragraph("To,", normal))
    elements.append(Paragraph("The Station House Officer", normal))
    if data.police_station:
        elements.append(Paragraph(data.police_station, normal))
    elements.append(Spacer(1, 0.3 * inch))

    elements.append(Paragraph(f"Date: {today}", normal))
    elements.append(Spacer(1, 0.3 * inch))

    elements.append(
        Paragraph(
            f"<b>Subject:</b> Complaint regarding incident dated {data.incident_date}",
            normal,
        )
    )
    elements.append(Spacer(1, 0.3 * inch))

    elements.append(Paragraph("Respected Sir/Madam,", normal))
    elements.append(Spacer(1, 0.2 * inch))

    body_text = f"""
The incident occurred on {data.incident_date} at {data.incident_location}.

{rewritten_body}
"""

    elements.append(Paragraph(body_text, normal))
    elements.append(Spacer(1, 0.3 * inch))

    if data.accused_name:
        elements.append(Paragraph(f"Accused (if known): {data.accused_name}", normal))
        elements.append(Spacer(1, 0.2 * inch))

    if data.witness_details:
        elements.append(Paragraph(f"Witness Details: {data.witness_details}", normal))
        elements.append(Spacer(1, 0.2 * inch))

    if data.evidence_details:
        elements.append(Paragraph(f"Evidence Available: {data.evidence_details}", normal))
        elements.append(Spacer(1, 0.2 * inch))

    if data.loss_amount:
        elements.append(Paragraph(f"Estimated Loss: {data.loss_amount}", normal))
        elements.append(Spacer(1, 0.2 * inch))

    elements.append(Spacer(1, 0.3 * inch))

    elements.append(
        Paragraph(
            "I request you to kindly take necessary action in this matter and register my complaint.",
            normal,
        )
    )
    elements.append(Spacer(1, 0.5 * inch))

    elements.append(Paragraph("Sincerely,", normal))
    elements.append(Spacer(1, 0.3 * inch))
    elements.append(Paragraph(data.full_name, normal))
    elements.append(Spacer(1, 0.5 * inch))

    

    doc.build(elements)

    buffer.seek(0)
    return buffer