# jeshwin.com

Static personal website for Jeshwin William James.

[![Live Site](https://img.shields.io/badge/Live-jeshwin.com-0b1123?style=for-the-badge&logo=googlechrome&logoColor=79f7c6)](https://jeshwin.com)
[![GitHub Repo](https://img.shields.io/badge/GitHub-jeshwinwilliam%2Fportfolio-0b1123?style=for-the-badge&logo=github&logoColor=ffffff)](https://github.com/jeshwinwilliam/portfolio)
![HTML5](https://img.shields.io/badge/HTML5-Structure-e34f26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Dark%20UI-1572b6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-Interactions-f7df1e?style=for-the-badge&logo=javascript&logoColor=111111)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-111111?style=for-the-badge&logo=vercel&logoColor=white)
![Cloudflare DNS](https://img.shields.io/badge/DNS-Cloudflare-f38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![Status](https://img.shields.io/badge/Status-Live%20Portfolio-1b4332?style=for-the-badge&logo=vercel&logoColor=95d5b2)

## System design

```mermaid
flowchart TB
    User["Visitor Browser"] --> DNS["DNS Resolution<br/>jeshwin.com"]
    DNS --> Edge["CDN / Edge Cache<br/>Global static delivery"]
    Edge --> App["Portfolio Application Shell<br/>index.html"]

    subgraph Frontend["Frontend Experience Layer"]
        App --> Styles["Design System<br/>styles.css"]
        App --> Client["Interaction Layer<br/>script.js"]
        App --> Resume["Resume Asset<br/>PDF download"]
        App --> Sections["Content Surfaces"]
        Sections --> Hero["Hero / Brand Story"]
        Sections --> Projects["Projects / Case Studies"]
        Sections --> SystemDesign["System Design Narratives"]
        Sections --> Contact["Contact / Link Hub"]
    end

    subgraph ExternalServices["External Services Layer"]
        Client --> Counter["Visitor Counter API<br/>countapi.xyz"]
        Client --> ExternalLinks["Outbound Proof Links"]
        ExternalLinks --> GitHub["GitHub Profile + Repositories"]
        ExternalLinks --> LinkedIn["LinkedIn Profile"]
        ExternalLinks --> Springer["Springer Publication"]
        ExternalLinks --> Email["Email / Phone Contact"]
    end

    subgraph QualityAttributes["Non-Functional Goals"]
        Perf["Fast static delivery"]
        Secure["HTTPS-first delivery"]
        Portable["No backend required"]
        Observable["View counter integration"]
        Credible["O-1 / recruiter-ready evidence"]
    end

    Edge --> Perf
    Edge --> Secure
    App --> Portable
    Client --> Observable
    Sections --> Credible
```

## Deployment architecture

```mermaid
flowchart TB
    subgraph Source["Source Control Layer"]
        Local["Local Portfolio Source<br/>HTML / CSS / JS / Assets"] --> Git["Git Repository"]
        Git --> GitHub["GitHub Repo<br/>jeshwinwilliam/portfolio"]
    end

    subgraph CI["Build and Delivery Layer"]
        GitHub --> Webhook["Vercel Git Integration"]
        Webhook --> Build["Static Build Detection"]
        Build --> Artifact["Deployable Static Artifact"]
    end

    subgraph Hosting["Hosting and Edge Layer"]
        Artifact --> EdgeNetwork["Vercel Edge Network"]
        EdgeNetwork --> Cache["CDN Cache Nodes"]
        EdgeNetwork --> SSL["Managed TLS / HTTPS"]
    end

    subgraph Domain["Domain and Routing Layer"]
        Registrar["Domain Registrar"] --> DNS["DNS Records"]
        DNS --> DomainName["jeshwin.com"]
        DomainName --> EdgeNetwork
    end

    subgraph Runtime["Runtime Experience Layer"]
        EdgeNetwork --> Browser["Visitor Browser"]
        Browser --> HTML["index.html"]
        Browser --> CSS["styles.css"]
        Browser --> JS["script.js"]
        Browser --> PDF["Resume PDF"]
        JS --> CounterAPI["countapi.xyz"]
    end

    subgraph Operations["Operational Outcomes"]
        Rollback["Instant rollback"]
        Global["Global low-latency delivery"]
        SecureLive["Automatic HTTPS"]
        Simple["Static hosting simplicity"]
    end

    EdgeNetwork --> Rollback
    Cache --> Global
    SSL --> SecureLive
    Artifact --> Simple
```

## Architecture notes

- The site is intentionally backend-light so it can deploy fast, stay inexpensive, and remain easy to maintain.
- Static assets are served through an edge network, which improves load time and keeps the experience responsive across regions.
- The external proof system is part of the design: GitHub, LinkedIn, the Springer publication, and the downloadable resume work together as credibility surfaces.
- The only dynamic client-side dependency is the visitor counter, which can later be replaced with first-party analytics or a custom serverless endpoint.
- The deployment model is optimized for portfolio reliability: simple builds, fast rollbacks, HTTPS by default, and clear custom-domain routing.

## Contents

- `index.html`: portfolio structure and content
- `styles.css`: visual system and responsive layout
- `script.js`: lightweight visitor counter integration
- `assets/Jeshwin-William-James-Resume.pdf`: downloadable resume

## Local preview

From this folder:

```bash
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080).

## Visitor counter

The site currently uses `countapi.xyz` in the browser for a no-backend total view counter.
If you prefer a first-party analytics solution later, replace the fetch call in `script.js`.

## Recommended deployment

This is a static site and can be deployed cleanly to:

- Cloudflare Pages
- Netlify
- Vercel
- GitHub Pages

Point the custom domain `jeshwin.com` to the hosting provider and enable HTTPS.
