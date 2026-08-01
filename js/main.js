// ===== Mobile Navigation Toggle =====
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (navLinks && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});

// ===== Gallery Filter =====
const filterButtons = document.querySelectorAll('.filter-btn');
const thesisCards = document.querySelectorAll('#thesis-grid .card');

if (filterButtons.length > 0) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter cards
      thesisCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());

    // Basic validation
    if (!data.name || !data.email || !data.subject_area || !data.level || !data.message) {
      alert('Please fill in all required fields.');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Please enter a valid email address.');
      return;
    }

    // Submit to Web3Forms
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const json = JSON.stringify(Object.fromEntries(formData));

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
    .then(res => res.json())
    .then(response => {
      if (response.success) {
        formSuccess.classList.add('show');
        contactForm.reset();
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(() => {
          formSuccess.classList.remove('show');
        }, 8000);
      } else {
        alert('Something went wrong. Please try again or contact us directly via WhatsApp.');
      }
    })
    .catch(() => {
      alert('Something went wrong. Please try again or contact us directly via WhatsApp.');
    })
    .finally(() => {
      submitBtn.textContent = 'Send Enquiry';
      submitBtn.disabled = false;
    });
  });
}

// ===== Thesis Detail Page - Dynamic Content =====
const thesisData = {
  1: {
    title: 'Impact of AI on Modern Healthcare Systems',
    subject: 'Computer Science',
    subjectFull: 'Computer Science & Healthcare',
    pages: '85',
    level: "Master's Degree",
    levelFull: "Master's Thesis",
    year: '2025',
    refs: '120+ sources',
    abstract: 'This thesis presents a comprehensive analysis of artificial intelligence applications in modern healthcare systems. The research examines how AI-driven tools are transforming diagnostics, patient care protocols, and hospital management operations. Through a mixed-methods approach combining quantitative data analysis and qualitative interviews with healthcare professionals, this study reveals significant improvements in diagnostic accuracy and operational efficiency.',
    objectives: 'The primary objective of this research is to evaluate the current state of AI implementation in healthcare institutions and measure its impact on patient outcomes. Secondary objectives include identifying barriers to AI adoption, assessing cost-effectiveness, and proposing frameworks for responsible AI integration in clinical settings.',
    methodology: 'This study employs a mixed-methods research design, combining quantitative analysis of hospital performance data from 15 healthcare institutions with qualitative semi-structured interviews conducted with 45 healthcare professionals including doctors, nurses, and hospital administrators. Data collection spanned 12 months, providing a longitudinal perspective on AI adoption patterns.',
    findings: 'The research reveals that AI implementation in diagnostic imaging has improved accuracy rates by 23% on average. Hospital workflow optimization through AI scheduling systems reduced patient wait times by 34%. However, significant challenges remain in staff training, data privacy compliance, and integration with legacy systems.',
    conclusion: 'AI technology presents transformative potential for healthcare systems when implemented with proper governance, staff training, and ethical considerations. The findings suggest that institutions adopting a phased implementation approach with strong leadership support achieve significantly better outcomes.'
  },
  2: {
    title: 'Sustainable Business Models in Developing Economies',
    subject: 'Business',
    subjectFull: 'Business & Economics',
    pages: '92',
    level: "Master's Degree",
    levelFull: "Master's Thesis",
    year: '2025',
    refs: '95+ sources',
    abstract: 'This thesis investigates how sustainable business practices can drive economic growth in developing nations. Through case studies of 20 enterprises across five countries, the research demonstrates that sustainable models not only preserve environmental resources but also create competitive advantages and long-term profitability.',
    objectives: 'To analyze the relationship between sustainability practices and business performance in developing economies, identify key success factors for sustainable business model implementation, and propose a framework for enterprises transitioning to sustainable operations.',
    methodology: 'A multi-case study approach was employed, examining 20 businesses across manufacturing, agriculture, and services sectors in five developing nations. Data was collected through financial records analysis, interviews with business leaders, and community impact assessments over a 14-month period.',
    findings: 'Businesses adopting sustainable models showed 18% higher revenue growth over three years compared to traditional counterparts. Key success factors include strong community engagement, access to green financing, and supportive government policies. Barriers include high initial investment costs and limited technical expertise.',
    conclusion: 'Sustainable business models in developing economies are not only environmentally responsible but economically viable. The proposed transition framework provides a practical roadmap for businesses seeking to adopt sustainable practices while maintaining profitability.'
  },
  3: {
    title: 'Climate Change Effects on Marine Biodiversity',
    subject: 'Environmental Science',
    subjectFull: 'Environmental Science & Biology',
    pages: '110',
    level: 'PhD',
    levelFull: 'Doctoral Thesis',
    year: '2024',
    refs: '180+ sources',
    abstract: 'This doctoral thesis examines the cascading effects of rising ocean temperatures on coral reef ecosystems and marine biodiversity across three major ocean basins. Utilizing a decade of field data combined with predictive modeling, the research quantifies biodiversity loss patterns and projects future scenarios under different climate pathways.',
    objectives: 'To quantify the relationship between ocean temperature increases and biodiversity loss in coral reef ecosystems, develop predictive models for future marine biodiversity under various climate scenarios, and propose conservation strategies based on empirical findings.',
    methodology: 'A longitudinal field study spanning 10 years across 25 reef sites in the Pacific, Indian, and Atlantic oceans. Data collection included species surveys, water temperature monitoring, coral health assessments, and genetic analysis. Advanced statistical modeling and machine learning were used for predictive analysis.',
    findings: 'A 1.5°C increase in average ocean temperature corresponds to a 15-22% decline in reef fish species diversity. Coral bleaching events have increased 300% in frequency since 2000. However, certain reef systems show resilience factors that could inform conservation strategies.',
    conclusion: 'Marine biodiversity loss from climate change is accelerating but not uniform. Targeted conservation of resilient reef systems, combined with aggressive emissions reduction, offers the best pathway for preserving marine ecosystems for future generations.'
  },
  4: {
    title: 'Renewable Energy Integration in Smart Grid Systems',
    subject: 'Electrical Engineering',
    subjectFull: 'Electrical Engineering & Energy',
    pages: '78',
    level: "Master's Degree",
    levelFull: "Master's Thesis",
    year: '2025',
    refs: '85+ sources',
    abstract: 'This thesis analyzes the technical challenges and solutions for integrating renewable energy sources, particularly solar and wind, into existing power grid infrastructure. The research proposes an optimized smart grid architecture that maximizes renewable energy utilization while maintaining grid stability.',
    objectives: 'To identify key technical barriers to renewable energy grid integration, develop an optimized control algorithm for managing intermittent renewable sources, and validate the proposed architecture through simulation and pilot testing.',
    methodology: 'The research combines theoretical modeling with practical simulation using MATLAB/Simulink. A pilot smart grid system was developed and tested over 6 months, monitoring power quality metrics, grid stability, and renewable energy utilization rates under various load conditions.',
    findings: 'The proposed smart grid architecture achieved 40% higher renewable energy utilization compared to conventional grid systems. Battery storage optimization reduced power quality issues by 60%. The control algorithm successfully managed supply-demand fluctuations during peak periods.',
    conclusion: 'Smart grid technology with advanced control algorithms can significantly improve renewable energy integration. The proposed architecture is scalable and can be adapted to existing grid infrastructure with manageable upgrade costs.'
  },
  5: {
    title: 'Blockchain Technology in Supply Chain Management',
    subject: 'Computer Science',
    subjectFull: 'Computer Science & Logistics',
    pages: '72',
    level: "Master's Degree",
    levelFull: "Master's Thesis",
    year: '2025',
    refs: '90+ sources',
    abstract: 'This thesis explores how distributed ledger technology can revolutionize supply chain management by improving transparency, traceability, and efficiency. Through analysis of blockchain implementations across three industries, the research evaluates practical benefits and adoption challenges.',
    objectives: 'To evaluate blockchain implementations in supply chain contexts, measure improvements in transparency and efficiency, identify adoption barriers, and develop a decision framework for organizations considering blockchain integration.',
    methodology: 'Case study analysis of blockchain implementations in food supply chains, pharmaceutical distribution, and luxury goods authentication. Data collected through system performance metrics, stakeholder interviews, and cost-benefit analysis over a 10-month study period.',
    findings: 'Blockchain implementations reduced product verification time by 75% and traceability queries from days to seconds. Food safety recall response time improved by 60%. However, integration costs and interoperability challenges remain significant barriers for smaller organizations.',
    conclusion: 'Blockchain technology offers substantial improvements to supply chain transparency and efficiency, particularly in industries where provenance and authenticity are critical. A phased adoption approach with industry consortium collaboration produces the best results.'
  },
  6: {
    title: 'Mental Health Interventions in University Students',
    subject: 'Psychology',
    subjectFull: 'Psychology & Health Sciences',
    pages: '95',
    level: "Master's Degree",
    levelFull: "Master's Thesis",
    year: '2025',
    refs: '110+ sources',
    abstract: 'This thesis evaluates the effectiveness of digital mental health interventions and traditional counseling programs for undergraduate students experiencing anxiety and depression. A randomized controlled trial with 300 participants compares outcomes across intervention modalities.',
    objectives: 'To compare the effectiveness of digital mental health tools versus traditional counseling for university students, identify factors predicting treatment success, and develop recommendations for university mental health service delivery.',
    methodology: 'A randomized controlled trial with 300 undergraduate students across three universities. Participants were assigned to digital therapy apps, traditional counseling, or a combined approach. Outcomes measured using validated psychological scales at baseline, 8 weeks, and 6 months.',
    findings: 'Combined digital-traditional approaches showed the highest improvement rates (72% significant symptom reduction). Digital-only interventions were effective for mild cases but less so for moderate-severe symptoms. Accessibility and reduced stigma were key advantages of digital tools.',
    conclusion: 'Universities should adopt a blended mental health service model combining digital tools for early intervention with traditional counseling for complex cases. This approach maximizes accessibility while maintaining clinical effectiveness.'
  },
  7: {
    title: 'Digital Marketing Strategies for Small Businesses',
    subject: 'Marketing',
    subjectFull: 'Marketing & Business',
    pages: '68',
    level: "Bachelor's Degree",
    levelFull: "Bachelor's Thesis",
    year: '2025',
    refs: '65+ sources',
    abstract: 'This thesis analyzes cost-effective digital marketing strategies that small businesses can leverage to compete with larger enterprises. Through surveys of 150 small business owners and analysis of marketing campaign data, the research identifies high-ROI digital marketing approaches.',
    objectives: 'To identify the most cost-effective digital marketing channels for small businesses, analyze ROI patterns across different strategies, and develop a practical digital marketing framework tailored to limited budgets.',
    methodology: 'Mixed-methods research combining quantitative surveys of 150 small business owners with qualitative analysis of marketing campaign performance data. Campaign metrics from social media, email, SEO, and paid advertising were analyzed over 12 months.',
    findings: 'Content marketing and SEO showed the highest long-term ROI for small businesses, while social media advertising provided the quickest results. Email marketing maintained the highest conversion rates. Businesses spending at least 15% of revenue on digital marketing saw 3x growth.',
    conclusion: 'Small businesses can effectively compete digitally by focusing on content marketing and SEO for long-term growth, supplemented by targeted social media campaigns for immediate visibility. The proposed framework provides actionable steps for businesses at any stage.'
  },
  8: {
    title: 'The Influence of Social Media on Political Discourse',
    subject: 'Political Science',
    subjectFull: 'Political Science & Communications',
    pages: '88',
    level: "Master's Degree",
    levelFull: "Master's Thesis",
    year: '2024',
    refs: '130+ sources',
    abstract: 'This thesis examines how social media platforms have transformed political communication, public opinion formation, and democratic participation. Through content analysis of political discourse on major platforms and surveys of voters, the research reveals both democratizing and polarizing effects.',
    objectives: 'To analyze how social media has changed political discourse patterns, measure its impact on voter behavior and opinion formation, and evaluate platform governance policies effectiveness in maintaining healthy political dialogue.',
    methodology: 'Content analysis of 50,000 political posts across Twitter, Facebook, and Reddit during two election cycles. Combined with surveys of 1,200 voters and interviews with political communication professionals. Sentiment analysis and network mapping were used for pattern identification.',
    findings: 'Social media has increased political engagement among young voters by 45% but also increased polarization. Echo chambers formed in 78% of analyzed political groups. Platform moderation policies showed limited effectiveness, with misinformation spreading 6x faster than corrections.',
    conclusion: 'Social media has fundamentally altered political discourse with both positive and negative consequences. Effective solutions require collaboration between platforms, governments, and civil society to preserve democratic benefits while mitigating polarization and misinformation.'
  },
  9: {
    title: 'Earthquake-Resistant Building Design Methods',
    subject: 'Civil Engineering',
    subjectFull: 'Civil Engineering & Architecture',
    pages: '96',
    level: "Master's Degree",
    levelFull: "Master's Thesis",
    year: '2024',
    refs: '100+ sources',
    abstract: 'This thesis presents a comparative study of modern seismic design approaches and evaluates their effectiveness in protecting structures during earthquakes. Through finite element analysis and case studies of buildings that survived major seismic events, optimal design principles are identified.',
    objectives: 'To compare performance of different seismic design methodologies, identify optimal material and structural configurations for earthquake resistance, and develop updated design guidelines incorporating lessons from recent seismic events.',
    methodology: 'Finite element modeling of 12 building configurations under simulated seismic loads of varying magnitudes. Combined with post-earthquake structural assessments of 30 buildings in recent earthquake zones. Material testing and cost analysis supplemented the computational work.',
    findings: 'Base isolation systems reduced structural damage by 70% compared to conventional fixed-base designs. Performance-based design approaches outperformed prescriptive code-based methods by 35% in damage prevention. Hybrid steel-concrete systems showed superior resilience-cost ratios.',
    conclusion: 'Modern seismic design should prioritize base isolation and performance-based approaches for critical structures. The research provides updated guidelines that balance structural safety with construction cost considerations for different building categories.'
  },
  10: {
    title: 'Gene Therapy Approaches for Genetic Disorders',
    subject: 'Biotechnology',
    subjectFull: 'Biotechnology & Genetics',
    pages: '120',
    level: 'PhD',
    levelFull: 'Doctoral Thesis',
    year: '2024',
    refs: '200+ sources',
    abstract: 'This doctoral thesis reviews and evaluates current gene therapy techniques for treating inherited genetic conditions. Through systematic review of clinical trials and laboratory research, the study assesses efficacy, safety, and ethical considerations of various gene therapy approaches.',
    objectives: 'To systematically evaluate the efficacy and safety of current gene therapy approaches, identify promising candidates for clinical application, analyze ethical frameworks governing gene therapy research, and propose guidelines for responsible clinical implementation.',
    methodology: 'Systematic review of 250 published clinical trials and preclinical studies. Meta-analysis of efficacy and adverse event data. Supplemented by expert interviews with gene therapy researchers and bioethicists. Ethical analysis using established bioethics frameworks.',
    findings: 'CRISPR-based therapies show 85% efficacy in monogenic disorders in clinical trials. AAV vector delivery systems demonstrate acceptable safety profiles with 5-year follow-up data. Ethical concerns center on germline editing, access equity, and long-term unknown effects.',
    conclusion: 'Gene therapy has matured from experimental to clinically viable for specific genetic disorders. Responsible scaling requires addressing manufacturing costs, ensuring equitable access, and maintaining strict ethical oversight of germline applications.'
  },
  11: {
    title: 'Post-Colonial Literature and National Identity',
    subject: 'Literature',
    subjectFull: 'Literature & Cultural Studies',
    pages: '82',
    level: "Master's Degree",
    levelFull: "Master's Thesis",
    year: '2025',
    refs: '75+ sources',
    abstract: 'This thesis explores how post-colonial literary works have shaped and reflected national identity construction in three African nations. Through close reading and cultural analysis of selected novels, poetry, and drama, the research traces the evolution of identity narratives from independence to the present.',
    objectives: 'To analyze how post-colonial literature contributed to national identity formation, trace the evolution of identity themes across three decades of literary production, and examine the interplay between literary imagination and political reality in post-colonial nations.',
    methodology: 'Comparative literary analysis of 25 major works from Nigerian, Kenyan, and South African post-colonial literature. Close reading combined with historical context analysis and postcolonial theoretical frameworks. Author interviews and archival research supplemented textual analysis.',
    findings: 'Post-colonial literature evolved through three distinct phases: resistance narratives, nation-building idealism, and critical self-reflection. Authors played active roles in shaping national consciousness, with literature often preceding political movements in articulating new identity possibilities.',
    conclusion: 'Post-colonial literature remains central to ongoing identity negotiation in African nations. Contemporary authors are redefining national identity in global contexts, creating hybrid narratives that honor historical roots while engaging with transnational realities.'
  },
  12: {
    title: 'Telemedicine Adoption in Rural Healthcare',
    subject: 'Public Health',
    subjectFull: 'Public Health & Technology',
    pages: '76',
    level: "Master's Degree",
    levelFull: "Master's Thesis",
    year: '2025',
    refs: '88+ sources',
    abstract: 'This thesis studies the barriers and enablers of telemedicine adoption in underserved rural communities across three developing nations. Through surveys and pilot program evaluation, the research identifies practical solutions for expanding healthcare access through technology.',
    objectives: 'To identify barriers preventing telemedicine adoption in rural areas, evaluate pilot telemedicine programs effectiveness, develop a telemedicine implementation framework for resource-limited settings, and measure patient satisfaction and health outcomes.',
    methodology: 'Mixed-methods study combining surveys of 500 rural residents and 80 healthcare providers with evaluation of three pilot telemedicine programs. Patient outcome data, technology usage metrics, and cost-effectiveness analysis collected over 12 months.',
    findings: 'Internet connectivity (65%) and digital literacy (48%) were the primary barriers to adoption. Pilot programs using low-bandwidth solutions achieved 80% patient satisfaction. Telemedicine reduced unnecessary referrals by 40% and saved patients average 4 hours travel time per consultation.',
    conclusion: 'Telemedicine can dramatically improve rural healthcare access when designed for local constraints. Low-bandwidth solutions, community health worker training, and government infrastructure investment are essential for sustainable implementation.'
  }
};

// Load thesis detail based on URL parameter
function loadThesisDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const thesisId = urlParams.get('id');

  if (!thesisId || !thesisData[thesisId]) return;

  const thesis = thesisData[thesisId];

  // Update page title
  document.title = thesis.title + ' - ThesisHub';

  // Update content
  const titleEl = document.getElementById('thesis-title');
  const breadcrumbEl = document.getElementById('breadcrumb-title');
  const subjectEl = document.getElementById('thesis-subject');
  const pagesEl = document.getElementById('thesis-pages');
  const levelEl = document.getElementById('thesis-level');
  const yearEl = document.getElementById('thesis-year');
  const bodyEl = document.getElementById('thesis-body');
  const sidebarSubject = document.getElementById('sidebar-subject');
  const sidebarLevel = document.getElementById('sidebar-level');
  const sidebarPages = document.getElementById('sidebar-pages');
  const sidebarRefs = document.getElementById('sidebar-refs');
  const sidebarYear = document.getElementById('sidebar-year');

  if (titleEl) titleEl.textContent = thesis.title;
  if (breadcrumbEl) breadcrumbEl.textContent = thesis.title;
  if (subjectEl) subjectEl.textContent = thesis.subject;
  if (pagesEl) pagesEl.textContent = thesis.pages;
  if (levelEl) levelEl.textContent = thesis.level;
  if (yearEl) yearEl.textContent = thesis.year;
  if (sidebarSubject) sidebarSubject.textContent = thesis.subjectFull;
  if (sidebarLevel) sidebarLevel.textContent = thesis.levelFull;
  if (sidebarPages) sidebarPages.textContent = thesis.pages + ' pages';
  if (sidebarRefs) sidebarRefs.textContent = thesis.refs;
  if (sidebarYear) sidebarYear.textContent = thesis.year;

  if (bodyEl) {
    bodyEl.innerHTML = `
      <h2>Abstract</h2>
      <p>${thesis.abstract}</p>
      <h2>Research Objectives</h2>
      <p>${thesis.objectives}</p>
      <h2>Methodology</h2>
      <p>${thesis.methodology}</p>
      <h2>Key Findings</h2>
      <p>${thesis.findings}</p>
      <h2>Conclusion</h2>
      <p>${thesis.conclusion}</p>
    `;
  }
}

// Run on page load
if (document.getElementById('thesis-title')) {
  loadThesisDetail();
}

// ===== Smooth Scroll for anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ===== Add fade-in animation CSS =====
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;
document.head.appendChild(style);
