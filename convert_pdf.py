import fitz

doc = fitz.open('Main_Logo.pdf')
page = doc.load_page(0)
# alpha=True ensures transparency is preserved if the PDF supports it
pix = page.get_pixmap(dpi=300, alpha=True)
pix.save('public/logo/main_logo.png')
print("Successfully converted PDF to PNG.")
