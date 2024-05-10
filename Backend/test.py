from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Image, SimpleDocTemplate, Table, TableStyle

# Create a PDF document
pdf = SimpleDocTemplate("reportlab_table_advanced.pdf", pagesize=letter)

# Sample data for the table
data = [
    ["Name", "Age", "Gender", "Description"],
    [
        "John Doe",
        "30",
        "Male",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    ],
    [
        "Jane Smith",
        "25",
        "Female",
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
]

# Define column widths as percentages
column_widths = [20, 10, 10, 60]

# Create a table with specified column widths
table = Table(data, colWidths=column_widths)

# Add style to the table
# style = TableStyle(
#     [
#         ("BACKGROUND", (0, 0), (-1, 0), colors.gray),
#         ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
#         ("ALIGN", (0, 0), (-1, -1), "CENTER"),
#         ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
#         ("BOTTOMPADDING", (0, 0), (-1, 0), 12),
#         ("BACKGROUND", (0, 1), (-1, -1), colors.beige),
#         ("GRID", (0, 0), (-1, -1), 1, colors.black),
#     ]
# )

# table.setStyle(style)

# # Merge cells in the first row
# table._argW[0] = sum(column_widths[:1]) * inch
# table._argW[1] = sum(column_widths[1:3]) * inch
# table._argW[2] = sum(column_widths[3:4]) * inch
# table._argH[0] = 0.5 * inch

# # Add an image
# logo = Image("logo.png", width=1*inch, height=1*inch)

# # Add style to the image
# logo_style = ParagraphStyle(name='Center', alignment=TA_CENTER)
# logo.addStyle(logo_style)

# Add the table and image to the PDF document
pdf.build(
    [
        table,
    ]
)

print("PDF generated successfully!")
