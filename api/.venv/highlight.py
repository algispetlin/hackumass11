import fitz

def highlight_text_in_pdf(pdf_path, texts_to_highlight, output_pdf_path="out/out.pdf"):
    # Open the PDF
    doc = fitz.open(pdf_path)

    for text in texts_to_highlight:
        for page in doc:
            text_instances = page.search_for(text)

            # Highlight each instance of the text
            for inst in text_instances:
                highlight = page.add_highlight_annot(inst)

    # Save the highlighted PDF
    doc.save(output_pdf_path)
    doc.close()
    return output_pdf_path
