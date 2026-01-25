# Tracking Scripts & Analytics - REMOVED

This document lists all tracking, analytics, and third-party scripts that have been identified and should be **REMOVED** from the React implementation.

---

## 1. Google Analytics

### Google Tag Manager (gtag.js)
**Location:** Lines 4-12 (HEAD section)

**Script to Remove:**
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-68BYWS0B7C"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-68BYWS0B7C');
</script>
```

**Tracking ID:** `G-68BYWS0B7C`

### Google Analytics (analytics.js)
**Location:** Lines 1347-1351 (before closing BODY tag)

**Script to Remove:**
```html
<script>
    window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
    ga('create','UA-61390921-1','auto');ga('send','pageview')
</script>
<script src="https://www.google-analytics.com/analytics.js" async defer></script>
```

**Tracking ID:** `UA-61390921-1`

**Purpose:** Tracks page views, user behavior, and site analytics

---

## 2. LeadForensics Tracking

### LeadForensics Script
**Location:** Lines 1344-1345 (before closing BODY tag)

**Script to Remove:**
```html
<script type="text/javascript" src="https://secure.leadforensics.com/js/26001.js"></script>
<noscript><img src="https://secure.leadforensics.com/images/track/26001.png?trk_user=26001&trk_tit=jsdisabled&trk_ref=jsdisabled&trk_loc=jsdisabled" height="0" width="0" style="display:none;" alt=""></noscript>
```

**Tracking ID:** `26001`

**Purpose:** B2B visitor identification and lead generation tracking

**Vendor:** LeadForensics (https://www.leadforensics.com/)

---

## 3. Google reCAPTCHA

### reCAPTCHA v3 Integration
**Location:** Lines 1332-1342

**Scripts to Remove:**
```html
<script type="text/javascript" id="gforms_recaptcha_recaptcha-js-extra">
/* <![CDATA[ */
var gforms_recaptcha_recaptcha_strings = {"site_key":"6LdpgCcjAAAAAKtq28bycTOlVoNKxfkZ9NJN9IMS","ajaxurl":"https:\/\/www.gpjindia.com\/wp-admin\/admin-ajax.php","nonce":"6b5abbb7d0"};
/* ]]> */
</script>
<script type="text/javascript" src="https://www.google.com/recaptcha/api.js?render=6LdpgCcjAAAAAKtq28bycTOlVoNKxfkZ9NJN9IMS&amp;ver=1.4.0" id="gforms_recaptcha_recaptcha-js"></script>
<script type="text/javascript" id="gforms_recaptcha_recaptcha-js-after">
/* <![CDATA[ */
(function($){grecaptcha.ready(function(){$('.grecaptcha-badge').css('visibility','hidden');});})(jQuery);
/* ]]> */
</script>
```

**Site Key:** `6LdpgCcjAAAAAKtq28bycTOlVoNKxfkZ9NJN9IMS`

**Purpose:** Form spam protection (related to Gravity Forms contact forms)

**Note:** Since we're removing/disabling forms initially, this can be removed. Can be re-added later if contact forms are implemented.

---

## 4. Cloudflare Challenge Script

### Cloudflare Bot Detection
**Location:** Line 1351 (before closing BODY tag)

**Script to Remove:**
```html
<script>
(function(){
  function c(){
    var b=a.contentDocument||a.contentWindow.document;
    if(b){
      var d=b.createElement('script');
      d.innerHTML="window.__CF$cv$params={r:'9c2e20b65c798b82',t:'MTc2OTI0Mjk5Ni4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName('head')[0].appendChild(d)
    }
  }
  if(document.body){
    var a=document.createElement('iframe');
    a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';
    document.body.appendChild(a);
    if('loading'!==document.readyState)c();
    else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);
    else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}
  }
})();
</script>
```

**Purpose:** Cloudflare bot detection and challenge mechanism

---

## 5. WordPress-Related Scripts (Can be Removed)

### WordPress Emoji Scripts
**Location:** Lines 39-44 (HEAD section)

**Script to Remove:**
```html
<script type="text/javascript">
/* <![CDATA[ */
window._wpemojiSettings = {"baseUrl":"https:\/\/s.w.org\/images\/core\/emoji\/16.0.1\/72x72\/","ext":".png","svgUrl":"https:\/\/s.w.org\/images\/core\/emoji\/16.0.1\/svg\/","svgExt":".svg","source":{"concatemoji":"https:\/\/www.gpjindia.com\/wp-includes\/js\/wp-emoji-release.min.js?ver=6.8.3"}};
...
/* ]]> */
</script>
```

**Purpose:** WordPress emoji support (not needed in React)

### WordPress JSON API Links
**Location:** Lines 75-78 (HEAD section)

**Links to Remove:**
```html
<link rel="https://api.w.org/" href="https://www.gpjindia.com/wp-json/" />
<link rel="alternate" title="JSON" type="application/json" href="https://www.gpjindia.com/wp-json/wp/v2/pages/1113" />
<link rel="EditURI" type="application/rsd+xml" title="RSD" href="https://www.gpjindia.com/xmlrpc.php?rsd" />
<link rel="alternate" title="oEmbed (JSON)" type="application/json+oembed" href="https://www.gpjindia.com/wp-json/oembed/1.0/embed?url=https%3A%2F%2Fwww.gpjindia.com%2F" />
```

**Purpose:** WordPress REST API and oEmbed links (not needed in React)

### Speculation Rules (WordPress 6.8+ feature)
**Location:** Lines 1328-1330

**Script to Remove:**
```html
<script type="speculationrules">
{"prefetch":[{"source":"document","where":{"and":[{"href_matches":"\/*"},{"not":{"href_matches":["\/wp-*.php","\/wp-admin\/*","\/wp-content\/uploads\/sites\/6\/*","\/wp-content\/*","\/wp-content\/plugins\/*","\/wp-content\/themes\/main\/resources\/*","\/*\\?(.+)"]}},{"not":{"selector_matches":"a[rel~=\"nofollow\"]"}},{"not":{"selector_matches":".no-prefetch, .no-prefetch a"}}]},"eagerness":"conservative"}]}
</script>
```

**Purpose:** WordPress prefetching optimization (not needed in React)

---

## 6. Third-Party Plugin Scripts

### Page Links To Plugin
**Location:** Line 1331

**Script to Remove:**
```html
<script type="text/javascript" src="https://www.gpjindia.com/wp-content/plugins/page-links-to/dist/new-tab.js?ver=3.3.7" id="page-links-to-js"></script>
```

**Purpose:** WordPress plugin for custom link redirects

---

## 7. Yoast SEO Schema (Can be Simplified)

### Yoast SEO Structured Data
**Location:** Lines 18-34 (HEAD section)

**Script to Review:**
```html
<!-- This site is optimized with the Yoast SEO plugin v21.9.1 - https://yoast.com/wordpress/plugins/seo/ -->
<title>Live, Virtual &amp; Hybrid Events - GPJ India</title>
...
<script type="application/ld+json" class="yoast-schema-graph">
{
  "@context":"https://schema.org",
  "@graph":[...]
}
</script>
<!-- / Yoast SEO plugin. -->
```

**Action:** Keep the structured data (Schema.org JSON-LD) but remove Yoast SEO comments. Re-implement with React Helmet for better control.

---

## Summary of Removed Tracking

| Service | Type | Tracking ID | Purpose |
|---------|------|-------------|---------|
| Google Analytics (GA4) | Analytics | G-68BYWS0B7C | Page tracking |
| Google Analytics (Universal) | Analytics | UA-61390921-1 | Legacy tracking |
| LeadForensics | B2B Tracking | 26001 | Lead identification |
| Google reCAPTCHA | Security | 6LdpgCcjAAAAAKtq28bycTOlVoNKxfkZ9NJN9IMS | Form protection |
| Cloudflare Challenge | Security | N/A | Bot detection |

---

## Scripts/Links to KEEP

### 1. Vimeo Player API
**Location:** Line 226
```html
<script src="https://player.vimeo.com/api/player.js"></script>
```
**Status:** ✅ KEEP - Required for hero video playback

### 2. Font Awesome Icons
**Implicit in HTML** - Social media icons use Font Awesome classes
```html
<i class="fa-brands fa-linkedin-in"></i>
<i class="fa-brands fa-instagram"></i>
<i class="fa-brands fa-facebook-f"></i>
<i class="fa-brands fa-youtube"></i>
```
**Status:** ✅ KEEP - Required for social media icons

### 3. Google Fonts
**Location:** Line 71
```html
<link rel='stylesheet' id='google/font-css' href='https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap' type='text/css' media='all' />
```
**Status:** ✅ KEEP - Poppins font family

### 4. CDN Images (SwiftPic.io)
All images are hosted on `i[0-9].swiftpic.io/gpj/`
**Status:** ✅ KEEP - All image URLs are fine, using CDN

### 5. Favicon and Meta Tags
```html
<link rel="icon" href="https://www.gpjindia.com/wp-content/uploads/sites/6/2022/08/cropped-icon-32x32.png" sizes="32x32" />
<link rel="icon" href="https://www.gpjindia.com/wp-content/uploads/sites/6/2022/08/cropped-icon-192x192.png" sizes="192x192" />
<link rel="apple-touch-icon" href="https://www.gpjindia.com/wp-content/uploads/sites/6/2022/08/cropped-icon-180x180.png" />
<meta name="msapplication-TileImage" content="https://www.gpjindia.com/wp-content/uploads/sites/6/2022/08/cropped-icon-270x270.png" />
```
**Status:** ✅ KEEP - Essential for branding

---

## Implementation Notes for React

### DO NOT Include:
1. Any Google Analytics scripts
2. LeadForensics tracking
3. Google reCAPTCHA (unless forms are re-enabled)
4. Cloudflare challenge scripts
5. WordPress-specific scripts
6. WordPress JSON API links

### DO Include:
1. Vimeo Player API (`@vimeo/player` npm package)
2. Font Awesome (via npm or CDN)
3. Google Fonts (Poppins)
4. All CDN image URLs from extracted-data.json
5. Favicons and meta tags (via React Helmet)

### Future Considerations:
- If analytics are needed later, implement a **privacy-first solution**:
  - Plausible Analytics
  - Fathom Analytics
  - Matomo (self-hosted)
  - Google Analytics with proper consent management

- If contact forms are added back:
  - Use Netlify Forms or Formspree (no reCAPTCHA needed)
  - Or implement custom honeypot validation
  - Or use reCAPTCHA v3 with user consent

---

## Privacy & GDPR Compliance

By removing these tracking scripts, the React site will be:
1. **Faster** - Fewer external scripts to load
2. **More Private** - No third-party tracking by default
3. **GDPR Friendly** - No cookies or tracking without consent
4. **Cleaner** - Pure React implementation without WordPress baggage

If tracking is required in the future, implement:
- Cookie consent banner
- Privacy policy update
- Opt-in tracking only
- Data processing agreements with vendors
