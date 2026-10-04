import os
import sys

OUTPUT_DIR = r"d:\1.Antigravity Projects\14_Final_Year_Project\figures"
os.makedirs(OUTPUT_DIR, exist_ok=True)

try:
    import qrcode
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    # Fallback using urllib to generate crisp QR code if library not yet installed
    import urllib.request
    url = "https://fyp-sustainable-eps-mortar.vercel.app/"
    api_url = f"https://api.qrserver.com/v1/create-qr-code/?size=600x600&data={url}&format=png"
    target_path = os.path.join(OUTPUT_DIR, "Poster_Live_Demo_QRCode.png")
    urllib.request.urlretrieve(api_url, target_path)
    print(f"[OK] Downloaded high-res QR code to {target_path}")
    sys.exit(0)

def generate_qr():
    url = "https://fyp-sustainable-eps-mortar.vercel.app/"
    
    # 1. Generate High-Res Standalone QR Code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_H, # High error tolerance (30%)
        box_size=15,
        border=3,
    )
    qr.add_data(url)
    qr.make(fit=True)

    # University Navy Blue QR Code on White Background
    qr_img = qr.make_image(fill_color="#1E3A8A", back_color="#FFFFFF").convert("RGB")
    qr_path = os.path.join(OUTPUT_DIR, "Poster_Live_Demo_QRCode.png")
    qr_img.save(qr_path, dpi=(300, 300))
    print(f"[OK] Standalone High-Res QR code saved to: {qr_path}")

    # 2. Generate a Complete Framed Poster Badge Card
    badge_w, badge_h = 700, 880
    badge = Image.new("RGB", (badge_w, badge_h), "#FFFFFF")
    draw = ImageDraw.Draw(badge)

    # Draw border and header strip
    draw.rectangle([(10, 10), (badge_w - 10, badge_h - 10)], outline="#CBD5E1", width=2)
    draw.rectangle([(10, 10), (badge_w - 10, 85)], fill="#1E3A8A")

    # Header text
    draw.text((badge_w // 2, 48), "INTERACTIVE RESEARCH PORTAL", fill="#FFFFFF", anchor="mm")

    # Paste QR Code in center
    resized_qr = qr_img.resize((500, 500), Image.Resampling.LANCZOS)
    badge.paste(resized_qr, ((badge_w - 500) // 2, 110))

    # Caption text below QR code
    draw.text((badge_w // 2, 640), "Scan to Access Live Web App", fill="#0F172A", anchor="mm")
    draw.text((badge_w // 2, 680), "• 3D Response Surface Models (RSM)", fill="#475569", anchor="mm")
    draw.text((badge_w // 2, 715), "• Interactive CCF Optimization Matrix", fill="#475569", anchor="mm")
    draw.text((badge_w // 2, 750), "• Full SEM-EDS Microstructural Datasets", fill="#475569", anchor="mm")
    
    # URL link in monospace
    draw.rectangle([(50, 785), (badge_w - 50, 840)], fill="#F1F5F9", outline="#CBD5E1", width=1)
    draw.text((badge_w // 2, 812), "fyp-sustainable-eps-mortar.vercel.app", fill="#1E3A8A", anchor="mm")

    badge_path = os.path.join(OUTPUT_DIR, "Poster_QR_Code_Badge_Card.png")
    badge.save(badge_path, dpi=(300, 300))
    print(f"[OK] Framed Poster QR Badge saved to: {badge_path}")

if __name__ == '__main__':
    generate_qr()
