# BGCut — Free AI Background Remover

Next.js app jo browser mein hi (client-side ML model se) image ka background
remove karta hai. Koi server cost nahi, koi API key nahi.

## 1. Local test (optional)

Agar VS Code / terminal use kar rahe ho:

```bash
npm install
npm run dev
```

Browser mein `http://localhost:3000` khol kar dekh lo.

## 2. Vercel pe deploy karna

1. Is folder ko GitHub pe push karo (naya repo banao, code upload karo).
2. [vercel.com](https://vercel.com) pe jao, "Add New Project" -> apna GitHub
   repo select karo.
3. Framework "Next.js" auto-detect ho jayega. Bas "Deploy" dabao.
4. 2-3 minute mein tumhara tool live ho jayega, jaise:
   `https://bgcut-yourname.vercel.app`

## 3. Apna domain lagana (recommended for SEO)

Free `.vercel.app` domain bhi chal jayega, lekin agar SEO seriously karna hai
to sasta domain (`.xyz`, `.online` ~$1-10/year) le kar Vercel ke
"Settings -> Domains" mein add kar do. Custom domain Google ranking aur
trust dono mein help karta hai.

## 4. AdSterra lagana

1. [adsterra.com](https://adsterra.com) pe publisher account banao, apna
   domain add karo, approval ka wait karo.
2. Ad units banao (Banner, Native, Social Bar — jo bhi chuno).
3. AdSterra tumhein `<script>` code dega. Wo code:
   - Site-wide script ho to `app/layout.tsx` mein `<head>` wale comment ke
     jaga paste karo.
   - Specific banner ad ho to `app/page.tsx` mein in teen jagah paste karo
     (dhoondo `id="ad-slot-top"`, `id="ad-slot-mid"`, `id="ad-slot-bottom"`).
4. Vercel pe dubara deploy karo (GitHub pe push karte hi auto-deploy ho
   jayega).

**Tip:** shuru mein zyada ads mat lagao — 1-2 banner + social bar kaafi hai.
Zyada ads se bounce rate barh jata hai aur Google ranking gir sakti hai.

## 5. SEO — organic traffic k liye

`app/layout.tsx` mein `metadataBase` ko apne asal domain se replace karo:

```ts
metadataBase: new URL("https://tumhara-domain.com"),
```

Phir ye karo:

- **Google Search Console** mein site verify karo (free), sitemap submit karo.
- Title/description already optimized hain "background remover", "remove
  background from image" jaise keywords ke liye — chaho to apne hisab se
  aur customize kar sakte ho `app/layout.tsx` mein.
- Page pe already FAQ aur "how to" content hai — ye Google ko batata hai ke
  page useful hai, sirf ek tool nahi.
- Backlinks: Reddit (r/webdev, relevant subreddits), Product Hunt, Facebook
  groups mein share karo — launch ke pehle hafte mein traffic seed karne ke
  liye zaroori hai.
- Speed: Vercel already fast hai, lekin images bohot bara mat rakhna.

## Tech stack

- Next.js 14 (App Router)
- Tailwind CSS
- `@imgly/background-removal` — client-side ML model, koi backend nahi
  chahiye, koi API cost nahi.

## Notes

- Pehli image process hone mein thora time lagta hai (model load hota hai,
  ~40-80MB, browser cache kar leta hai). Isko UI mein "Loading the model"
  message se handle kiya hai.
- Bara images (jaise 4000x4000+) slow ho sakti hain kyunke sab kuch device
  pe process hota hai — normal use ke liye (phone/camera photos) bilkul
  theek chalega.
